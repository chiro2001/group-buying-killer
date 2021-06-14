import time

from gbk_database.database import db
from gbk_system.database import SystemDB
from utils.formats import year_month_to_timestamp
from utils.logger import logger
from data_apis.api import API
from gbk_daemon.daemon import daemon, DaemonBean
from gbk_exceptions import *
from gbk_database.tools import *


class Action:
    def __init__(self, *args, **kwargs):
        self.args, self.kwargs = args, kwargs
        self.action_type = 'base'
        self.uid = kwargs.get('uid')
        # if self.uid is None:
        #     logger.warning('git empty uid')

    def __getstate__(self):
        return self.__dict__

    def __setstate__(self, state: dict):
        self.action_type = state.get('action_type', self.action_type)
        self.args = state.get('args', self.args)
        self.kwargs = state.get('kwargs', self.kwargs)
        self.uid = state.get('uid')

    def get_self_name(self):
        return f"#{self.__class__.__name__}{str(self.__hash__())[-4:]}"


class ActionSimpleRun(Action):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.action_type = 'simple_run'
        self.running = False
        # logger.warning(f"constructor: {__class__.__name__}")

    def __setstate__(self, state):
        super(ActionSimpleRun, self).__setstate__(state)

    def exec(self):
        logger.info(f"#{str(self.__hash__())[-4:]}, self.args: {self.args}, self.kwargs: {self.kwargs}")
        # if not self.running:
        #     # logger.info(self.__getstate__())
        #     logger.info(f"#{str(self.__hash__())[-4:]}, self.args: {self.args}, self.kwargs: {self.kwargs}")
        #     self.running = True
        # else:
        #     print('.', end='')


class ActionPriceAdjust(Action):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.action_type = 'adjust_price'
        self.target_price = kwargs.get('price', None)
        if self.target_price is None:
            logger.warning('got empty price!')
            self.target_price = 0
        self.item_id = kwargs.get('item_id')
        if self.item_id is None:
            logger.warning('got empty item_id')
            self.item_id = 0

    def exec(self):
        logger.info(f'adjusting price to {self.target_price}')
        if self.uid is None:
            raise GBKError(f"Empty uid")
        daemon_bean: DaemonBean = daemon.get_daemon(self.uid, init_new=True)
        api: API = daemon_bean.get_api()
        resp = api.ktv.update_price(item_id=self.item_id, price=self.target_price)
        logger.debug(f'{self.get_self_name()}: resp = {resp}')

    def __setstate__(self, state):
        super(ActionPriceAdjust, self).__setstate__(state)
        self.target_price = state.get('target_price')
        self.item_id = state.get('item_id')


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
        if len(self.uid_list) == 0:
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
        resp: dict = API(self.cookies).flow_data.get(key,
                                                     shop_id=self.shop_id,
                                                     end_time=next_key)
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
        resp: dict = API(self.cookies).trade_data.get(self.get_timestamp() * 1000,
                                                      self.get_next_month_timestamp() * 1000,
                                                      page=self.page, shop_id=self.shop_id)
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


action_types = {
    'base': Action,
    'simple_run': ActionSimpleRun,
    'adjust_price': ActionPriceAdjust
}

# 能够让用户操作的Action
action_names_available = {
    'adjust_price': "调整价格action"
}

action_desc = {
    'adjust_price': "利用此Action可以调整价格到目标价格，或者设定价格上调、下调目标。"
}

action_names = {
    'base': "基础action",
    'simple_run': "简单action",
    'adjust_price': "调整价格action"
}
