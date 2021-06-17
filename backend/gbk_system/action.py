import multiprocessing
import os
import time
import zipfile
from io import BytesIO

import secrets
from data_apis.api import API
from gbk_database.database import db, Constants
from gbk_database.tools import get_next_exist_id
from gbk_exceptions import GBKError, GBKPermissionError
from gbk_scheduler.action import Action, get_first_exist_id
from gbk_system.database import SystemDB
from utils.cos_uploader import upload_file
from utils.files import del_file
from utils.formats import year_month_to_timestamp
from utils.logger import logger


class ActionCycle(Action):
    FIRST_YEAR = 2020

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.service_type = kwargs.get('service_type', 'base')
        self.service: dict = db.system.get_service(self.service_type)
        self.uid: int = get_first_exist_id(db.user.col, 'uid')
        self.year: int = self.FIRST_YEAR
        self.month: int = 1
        self.page: int = 1
        self.page_count: int = None
        self.shop_id: int = None
        self.cookies: str = None
        # self.item_list: list = None
        self.uid_list: list = []
        self.load()
        self.save(state=SystemDB.SERVICE_STOP)

    def load(self):
        # logger.warning(f'loading {self.service}')
        if self.service is not None:
            self.uid = self.service.get('uid', self.uid)
            self.year = self.service.get('year', self.year)
            self.month = self.service.get('month', self.month)
            self.page = self.service.get('page', self.page)
            self.page_count = self.service.get('page_count', self.page_count)
            # self.item_list = self.service.get('item_list', self.item_list)

    def save(self, state: str = SystemDB.SERVICE_RUNNING):
        db.system.update_service_state(self.service_type, state=state, data=self.__getstate__())

    def __getstate__(self):
        # return {
        #     'uid': self.uid,
        #     'year': self.year,
        #     'month': self.month,
        #     'page': self.page,
        #     'page_count': self.page_count,
        #     # 'item_list': self.item_list
        # }
        d = self.__dict__
        if 'service' in d:
            del d['service']
        return d

    def update_uid(self, uid: int):
        self.uid_list = [uid, ].extend(self.uid_list)

    def next_uid(self):
        if len(self.uid_list) == 0 or not isinstance(self.uid_list, list):
            self.uid_list = []
            next_uid = get_first_exist_id(db.user.col, 'uid')
            while next_uid is not None:
                self.uid_list.append(next_uid)
                next_uid = get_next_exist_id(db.user.col, 'uid', next_uid)
        if len(self.uid_list) != 0:
            next_uid = get_next_exist_id(db.user.col, 'uid', self.uid_list[-1])
            if next_uid is None:
                next_uid = get_first_exist_id(db.user.col, 'uid')
            self.uid_list.append(next_uid)
            self.uid = self.uid_list[0]
            self.uid_list = self.uid_list[1:]
            if Constants.RUN_WITH_SYS_TASK_LOG:
                logger.warning(f'new uid: {self.uid}')
        else:
            raise GBKError("Users not enough!")
        self.year = self.FIRST_YEAR
        self.month = 1
        self.shop_id = None
        self.cookies = None

    def next_month(self):
        self.month += 1
        # self.item_list = None
        self.page_count = None
        if self.month > 12:
            self.month = 1
            self.year += 1
            if self.is_time_over():
                self.next_uid()

    def next_page(self):
        if self.page_count is None:
            self.next_month()
            self.page = 1
            return
        self.page += 1
        if self.page == self.page_count + 1:
            self.page = 1
            self.next_month()

    def is_time_over(self) -> bool:
        return time.time() < year_month_to_timestamp(self.year, self.month)

    def get_next_month_timestamp(self):
        if self.month == 12:
            return year_month_to_timestamp(self.year + 1, 1)
        return year_month_to_timestamp(self.year, self.month + 1)

    def get_timestamp(self):
        return year_month_to_timestamp(self.year, self.month)

    def update_shop_id(self):
        if self.shop_id is None:
            if self.cookies is None:
                cookies = db.daemon.load(self.uid, 'cookies')
                cookies = cookies if cookies is None else cookies.get('data')
                # TODO: Cookies校验
                if cookies is None:
                    self.next_uid()
                    return
                self.cookies = cookies
            api = API.from_cookies(self.cookies)
            self.shop_id = api.shop_id


class ActionFetchFlowData(ActionCycle):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs, service_type='flow_data')

    def exec(self):
        new_service_info = db.system.get_service_info(self.service_type)
        key = "%d-%02d-02" % (self.year, self.month)
        next_key = "%d-%02d-01" % (self.year if self.month != 12 else self.year + 1,
                                   self.month + 1 if self.month != 12 else 1)
        if new_service_info['state'] != SystemDB.SERVICE_STOP and Constants.RUN_WITH_SYS_TASK_LOG:
            logger.warning(f"[ flow_data ] uid:{self.uid}, {key} => {next_key} ( SKIP )")
            self.next_month()
            self.save(state=SystemDB.SERVICE_STOP)
            return
        self.save(state=SystemDB.SERVICE_RUNNING)
        if Constants.RUN_WITH_SYS_TASK_LOG:
            logger.warning(f"[ flow_data ] uid:{self.uid}, {key} => {next_key}")
        self.update_shop_id()
        try:
            resp: dict = API(self.cookies).flow_data.get(key,
                                                         shop_id=self.shop_id,
                                                         end_time=next_key)
        except GBKPermissionError as e:
            logger.error(f"[ flow_data ] {e}")
            self.next_uid()
            self.save(state=SystemDB.SERVICE_STOP)
            return
        if 'code' not in resp or \
                ('code' in resp and resp['code'] != 200 and resp['code'] != 0) or \
                'data' not in resp:
            logger.error(f"[ flow_data ] Resp error: uid:{self.uid}, {key} => {next_key}")
            logger.debug(resp)
            self.next_month()
            self.save(state=SystemDB.SERVICE_STOP)
            return
        db.spider.save(self.uid, {
            'flow_data': resp['data'],
            'task_data': self.__getstate__()
        }, 'flow_data', key)
        self.next_month()
        self.save(state=SystemDB.SERVICE_STOP)


# 内部Action，定时执行：TradeData
class ActionFetchTradeData(ActionCycle):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs, service_type='trade_data')

    def exec(self):
        new_service_info = db.system.get_service_info(self.service_type)
        key = "%d-%02d" % (self.year, self.month)
        if new_service_info['state'] != SystemDB.SERVICE_STOP and Constants.RUN_WITH_SYS_TASK_LOG:
            logger.warning(f"[ trade_data ] uid:{self.uid}, {key}, page: {self.page} ( SKIP )")
            return
        self.save(state=SystemDB.SERVICE_RUNNING)
        if Constants.RUN_WITH_SYS_TASK_LOG:
            logger.warning(
                f"[ trade_data ] uid:{self.uid}, {key}, page: {self.page} "
                f"({'%4.2f%%' % ((self.page / self.page_count * 100) if self.page_count is not None else 0)})")
        self.update_shop_id()
        try:
            resp: dict = API(self.cookies).trade_data.get(self.get_timestamp() * 1000,
                                                          self.get_next_month_timestamp() * 1000,
                                                          page=self.page, shop_id=self.shop_id)
        except GBKPermissionError as e:
            logger.error(f"[ trade_data ] {e}")
            self.next_uid()
            self.save(state=SystemDB.SERVICE_STOP)
            return
        if 'code' not in resp or ('code' in resp and resp['code'] != 200):
            logger.error(f"[ trade_data ] Resp error: uid:{self.uid}, {key}, page: {self.page}")
            self.next_page()
            self.save(state=SystemDB.SERVICE_STOP)
            return
        try:
            trade_data_list = resp['data']['itemList']
            self.page_count = resp['data']['pageCount']
        except KeyError as e:
            if Constants.RUN_WITH_SYS_TASK_LOG:
                logger.error(f'[ trade_data ] KeyError, {resp.keys()}, {e}')
            logger.debug(resp)
            self.next_page()
            return
        # if self.item_list is None:
        #     self.item_list = []
        # self.item_list.extend(trade_data_list)
        # db.spider.save(self.uid, self.item_list, 'trade_data', key)
        db.spider.save(self.uid, {
            'item_list': trade_data_list,
            'task_data': self.__getstate__()
        }, 'trade_data', key)
        self.next_page()
        self.save(state=SystemDB.SERVICE_STOP)


class ActionBackupData(ActionCycle):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs, service_type='backup')

    @staticmethod
    def run():
        os.chdir('./logs')
        if os.path.exists('dump') and os.path.isdir('dump'):
            del_file("dump")
        os.system(f"mongodump --gzip --uri {secrets.SECRET_MONGO_URI}")
        # db_name = secrets.SECRET_MONGO_URI.split('/')[-1]
        # li = os.listdir(os.path.join('dump', db_name))
        file_data = BytesIO()
        zip_file = zipfile.ZipFile(file_data, 'w')
        zip_file.write('dump', compress_type=zipfile.ZIP_DEFLATED)
        zip_file.close()
        file_data.seek(0)
        upload_file(f"mongo/gbk/{time.asctime().replace(' ', '_').replace(':', '-')}.zip",
                    file_data.read())
        if os.path.exists('dump') and os.path.isdir('dump'):
            del_file("dump")

    def exec(self):
        p = multiprocessing.Process(target=ActionBackupData.run)
        p.start()
