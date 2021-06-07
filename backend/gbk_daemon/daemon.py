import os
import time

from utils.logger import logger
from gbk_database.database import db, Constants
from data_apis.api import API
from gbk_exceptions import *
from utils.time_formats import get_date_today, get_date_timestamp, get_timestamp_date

daemon_types = [
    "cookies", "shop_info", "solution_id", "reserve_date", "reserve_table", "room_stock"
]


class DaemonBean:
    def __init__(self, uid: int, cookies: str = None, shop_info: dict = None,
                 solution_id: int = None, reserve_date: dict = None,
                 reserve_table: dict = None, room_stock: dict = None):
        self.uid: int = uid
        self.cookies: str = cookies
        self.shop_info: dict = shop_info
        self.solution_id: int = solution_id
        self.reserve_date: dict = reserve_date
        self.reserve_table: dict = reserve_table
        self.room_stock: dict = room_stock

    def __getstate__(self):
        return self.__dict__

    def get_api(self):
        return API.from_all(cookies=self.cookies, solution_id=self.solution_id, shop_id=self.shop_info['shopId'])

    def refresh(self):
        self.cookies = db.daemon.load(self.uid, data_type='cookies').get("data")
        self.shop_info = db.daemon.load(self.uid, data_type='shop_info').get("data")
        self.solution_id = db.daemon.load(self.uid, data_type='solution_id').get("data")
        self.reserve_date = db.daemon.load(self.uid, data_type='reserve_date').get("data")
        self.reserve_table = db.daemon.load(self.uid, data_type='reserve_table').get("data")
        self.room_stock = db.daemon.load(self.uid, data_type='room_stock').get("data")
        return self

    def save(self):
        db.daemon.save(self.uid, self.cookies, data_type='cookies') if self.cookies is not None else None
        db.daemon.save(self.uid, self.shop_info, data_type='shop_info') if self.shop_info is not None else None
        db.daemon.save(self.uid, self.solution_id, data_type='solution_id') if self.solution_id is not None else None
        db.daemon.save(self.uid, self.reserve_date, data_type='reserve_date') if self.reserve_date is not None else None
        db.daemon.save(self.uid, self.reserve_table,
                       data_type='reserve_table') if self.reserve_table is not None else None
        db.daemon.save(self.uid, self.room_stock, data_type='room_stock') if self.room_stock is not None else None
        return self


class Daemon:
    def __init__(self, init_data: bool = True):
        self.pool = {}
        # 初始化所有已经远程登录的 daemon
        data = db.daemon.load(None, data_type='cookies')
        if init_data:
            for d in data:
                print('data', d)
                try:
                    self.pool[d['uid']] = self.init_data(d['uid'], cookies=d['data'])
                except (GBKLoginError, GBKPermissionError) as e:
                    logger.error(f'{e}, retrying')
                    try:
                        self.pool[d['uid']] = self.init_data(d['uid'])
                    except (GBKLoginError, GBKPermissionError) as e:
                        logger.error(f'{e}, passing uid {d["uid"]}')

        self.data_inited = init_data

    def delete_daemon(self, uid: int):
        if uid is None:
            return False
        if uid not in self.pool:
            return False
        del self.pool[uid]
        for daemon_type in daemon_types:
            db.daemon.delete(uid, daemon_type)
        return True

    def get_daemon(self, uid: int, init_new: bool = False, cookies: str = None):
        # return self.pool.get(uid, default=None)
        if uid is None:
            raise GBKError()
        if uid in self.pool:
            return self.pool[uid]
        if init_new and cookies is None:
            cookies = db.daemon.load(uid, data_type='cookies')
            cookies = cookies.get("data") if cookies is not None else None
        if init_new and cookies is not None:
            self.pool[uid] = self.init_data(uid, cookies=cookies)
            return self.pool[uid]
        return None

    def get_base_info(self, uid: int) -> tuple:
        solution_id = db.daemon.load(uid, data_type='solution_id')
        solution_id = solution_id.get('data') if solution_id is not None else None
        shop_info = db.daemon.load(uid, data_type='shop_info')
        shop_info = shop_info.get('data') if shop_info is not None else None
        return solution_id, shop_info

    def get_api(self, uid: int, cookies: str):
        api: API

        solution_id, shop_info = self.get_base_info(uid)
        if solution_id is None or shop_info is None:
            api = API.from_cookies(cookies)
            solution_id = api.solution_id
            shop_info = api.shop_info
            db.daemon.save(uid, solution_id, data_type='solution_id')
            db.daemon.save(uid, shop_info, data_type='shop_info')
        else:
            api = API.from_all(cookies=cookies, solution_id=solution_id, shop_id=shop_info['shopId'])
        logger.info(f'shop_info: {shop_info}')
        return api

    def update_data(self, uid: int, api: API = None, cookies: str = None, update_all: bool = False, **kwargs):
        if api is None:
            if cookies is None:
                cookies = db.daemon.load(uid, data_type='cookies').get('data', None)
                if cookies is None:
                    raise GBKError("No cookies!")
            api = self.get_api(uid, cookies=cookies)
        daemon_old = self.get_daemon(uid)
        # reserve_date = None if daemon_old is None else daemon_old.reserve_date
        if 'reserve_date' in kwargs or update_all:
            logger.info('Loading reserve_date...')
            reserve_date = api.ktv.get_reserve_date()['data']
            logger.debug(reserve_date)
            db.daemon.save(uid, reserve_date, data_type='reserve_date')

        reserve_table = None if daemon_old is None else daemon_old.reserve_table
        if 'reserve_table' in kwargs or update_all:
            date, timestamp = kwargs.get("reserve_table", {}).get("date", None), \
                              kwargs.get("reserve_table", {}).get("timestamp", None)
            if date is not None:
                timestamp = get_date_timestamp(date)
            elif timestamp is not None:
                date = get_date_today()
                timestamp = get_date_timestamp(date)
            else:
                timestamp = int(time.time() * 1000)
            date = get_timestamp_date(timestamp)
            logger.info(f'Loading reserve_table({date})...')
            reserve_table_today = api.ktv.get_reserve_table(**(kwargs.get("reserve_table", {})))
            logger.debug(f"{date}: {reserve_table_today}")
            if reserve_table is None:
                reserve_table = {date: reserve_table_today}
            else:
                reserve_table[date] = reserve_table_today
            db.daemon.save(uid, reserve_table, data_type='reserve_table')

        # room_stock = None
        if 'room_stock' in kwargs or update_all:
            logger.info('Loading room_stock...')
            room_stock = api.room_stock.get_room_stock().get("data", {})
            logger.debug(room_stock)
            db.daemon.save(uid, room_stock, data_type='room_stock')
        # solution_id, shop_info = self.get_base_info(uid)
        # daemon_data = DaemonBean(uid, cookies=cookies, shop_info=shop_info, solution_id=solution_id,
        #                          reserve_date=reserve_date,
        #                          reserve_table=reserve_table,
        #                          room_stock=room_stock)
        daemon_data = DaemonBean(uid=uid).refresh()
        return daemon_data

    def init_data(self, uid: int, cookies: str = None, update_data: bool = False, **kwargs):
        daemon_data: DaemonBean = self.pool.get(uid)
        # if daemon_data is None:
        #     update_data = True
        if cookies is not None:
            db.daemon.save(uid, cookies, data_type='cookies')
        else:
            cookies = db.daemon.load(uid, data_type='cookies')
            cookies = cookies.get('data') if cookies is not None else None
        api: API = self.get_api(uid, cookies=cookies)
        solution_id, shop_info = self.get_base_info(uid)
        if update_data:
            daemon_data = self.update_data(uid, api=api, update_all=True, **kwargs)
        if daemon_data is None:
            daemon_data = DaemonBean(uid, cookies=cookies, shop_info=shop_info, solution_id=solution_id)
        # daemon_data.shop_info = shop_info
        # daemon_data.solution_id = solution_id
        return daemon_data


# 由主进程启动的进程不重新初始化数据库
if os.getenv(Constants.PROC_DISMISS_DAEMON_INIT) is None:
    os.environ.setdefault(Constants.PROC_DISMISS_DAEMON_INIT, f"{os.getpid()}")

daemon = Daemon(init_data=os.getenv(Constants.PROC_DISMISS_DAEMON_INIT) != f"{os.getppid()}")
