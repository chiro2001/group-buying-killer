from utils.logger import logger
from gbk_database.database import db
from data_apis.api import API


class DaemonBean:
    def __init__(self, uid: int, cookies: str = None, shop_id: int = None,
                 solution_id: int = None, reserve_date: dict = None,
                 reserve_table: dict = None, room_stock: dict = None):
        self.uid: int = uid
        self.cookies: str = cookies
        self.shop_id: int = shop_id
        self.solution_id: int = solution_id
        self.reserve_date: dict = reserve_date
        self.reserve_table: dict = reserve_table
        self.room_stock: dict = room_stock

    def get_api(self):
        return API.from_all(cookies=self.cookies, solution_id=self.solution_id, shop_id=self.shop_id)

    def refresh(self):
        self.cookies = db.daemon.load(self.uid, data_type='cookies')
        self.shop_id = db.daemon.load(self.uid, data_type='shop_id')
        self.solution_id = db.daemon.load(self.uid, data_type='solution_id')
        self.reserve_date = db.daemon.load(self.uid, data_type='reserve_date')
        self.reserve_table = db.daemon.load(self.uid, data_type='reserve_table')
        self.room_stock = db.daemon.load(self.uid, data_type='room_stock')
        return self

    def save(self):
        db.daemon.save(self.uid, self.cookies, data_type='cookies') if self.cookies is not None else None
        db.daemon.save(self.uid, self.shop_id, data_type='shop_id') if self.shop_id is not None else None
        db.daemon.save(self.uid, self.solution_id, data_type='solution_id') if self.solution_id is not None else None
        db.daemon.save(self.uid, self.reserve_date, data_type='reserve_date') if self.reserve_date is not None else None
        db.daemon.save(self.uid, self.reserve_table,
                       data_type='reserve_table') if self.reserve_table is not None else None
        db.daemon.save(self.uid, self.room_stock, data_type='room_stock') if self.room_stock is not None else None
        return self


class Daemon:
    def __init__(self):
        self.pool = {}

    def get_daemon(self, uid: int):
        return self.pool.get(uid, default=None)

    def init_data(self, uid: int, cookies: str = None, update_data: bool = False):
        daemon_data: DaemonBean = self.pool.get(uid)
        if daemon_data is None:
            update_data = True
        if cookies is not None:
            db.daemon.save(uid, cookies, data_type='cookies')
        else:
            cookies = db.daemon.load(uid, data_type='cookies')
        api: API

        solution_id = db.daemon.load(uid, data_type='solution_id')
        shop_id = db.daemon.load(uid, data_type='shop_id')
        if solution_id is None or shop_id is None:
            api = API.from_cookies(cookies)
            solution_id = api.solution_id
            shop_id = api.shop_id
            db.daemon.save(uid, solution_id, data_type='solution_id')
            db.daemon.save(uid, shop_id, data_type='shop_id')
        else:
            api = API.from_all(cookies=cookies, solution_id=solution_id, shop_id=shop_id)

        logger.info(f'shop_id: {shop_id}')
        if update_data:
            logger.info('Loading reserve_date...')
            reserve_date = api.ktv.get_reserve_date()['data']
            logger.debug(reserve_date)
            db.daemon.save(uid, reserve_date, data_type='reserve_date')

            logger.info('Loading reserve_table...')
            reserve_table = api.ktv.get_reserve_table()
            logger.debug(reserve_table)
            db.daemon.save(uid, reserve_date, data_type='reserve_table')

            logger.info('Loading room_stock...')
            room_stock = api.room_stock.get_room_stock()
            logger.debug(room_stock)
            db.daemon.save(uid, reserve_date, data_type='room_stock')
            daemon_data = DaemonBean(uid, cookies=cookies, shop_id=shop_id, solution_id=solution_id,
                                     reserve_date=reserve_date, reserve_table=reserve_table, room_stock=room_stock)
        if daemon_data is None:
            daemon_data = DaemonBean(uid, shop_id=shop_id, solution_id=solution_id)
        return daemon_data


daemon = Daemon()
