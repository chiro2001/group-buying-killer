import time
import threading
from gbk.api import API
from gbk.config import config
from gbk.beans import *
from gbk.utils import logger
from gbk.exceptions import *
from gbk.login import main as login_main
from gbk.login import test_login


class Scheduler:
    class Schedule:
        def __init__(self, weekday: int, item_id: int, price: str, description: str):
            self.weekday, self.item_id, self.price, self.description = weekday, item_id, price, description

    def __init__(self):
        self.api = API()
        self.solution_id = 1834526
        self.api.ktv.set_shop_id(581990543)
        self.api.room_stock.set_shop_id(581990543)
        self.has_login = test_login(config.cookies)

        self.running = False
        # 数据锁
        self.lock = threading.Lock()

        # 注意调用方式
        _ = self.fetch_init_data

    class LoginTry(object):
        def __init__(self, func):
            self.func = func

        def __get__(self, instance, owner):
            # logger.warning('#1 instance.has_login: %s' % instance.has_login)
            if not instance.has_login:
                login_main(enter_exit=False)
            try:
                rets = self.func(instance)
                instance.has_login = True
                return rets
            except GBKPermissionError as e:
                login_main(enter_exit=False)
            while not instance.has_login:
                try:
                    logger.warning('instance.has_login: %s' % instance.has_login)
                    rets = self.func(instance)
                    instance.has_login = True
                    return rets
                except GBKPermissionError as e:
                    login_main(enter_exit=False)

    # def login_try(func):
    #     def ware(self, *args, **kwargs):
    #         print('This is a decrator!', self.has_login)
    #         while not self.has_login:
    #             self.has_login = False
    #             try:
    #                 rets = func(self, *args, **kwargs)
    #                 self.has_login = True
    #                 return rets
    #             except GBKPermissionError as e:
    #                 login_main(enter_exit=False)
    #
    #     return ware

    @LoginTry
    def fetch_init_data(self):
        logger.info('Loading reserve_date...')
        logger.debug(self.api.ktv.get_reserve_date())
        logger.info('Loading reserve_table...')
        logger.debug(self.api.ktv.get_reserve_table())
        logger.info('Loading room_stock...')
        logger.debug(self.api.room_stock.get_room_stock())

    def run(self):
        self.running = True
        # 必须在一秒钟内完成这个while中的一次循环
        while self.running:
            t = threading.Thread(target=Scheduler.batch, args=(self,))
            t.setDaemon(True)
            t.start()
            time.sleep(1)

    @staticmethod
    def batch(self):
        # 排序计划数据
        config.timetable_node.sort(key=lambda x: x.time_)
        config.timetable_period.sort(key=lambda x: x.time_start)
        # 判断时间是否到了然后调整价格
        # 拿到时间信息之后再锁，防止信息被忽略
        while not self.has_login:
            time.sleep(0.31)
        _ = self.batch_inside
        # while not self.has_login:
        #     self.has_login = False
        #     try:
        #         self.batch_inside()
        #         self.has_login = True
        #     except GBKPermissionError as e:
        #         login_main(enter_exit=False)

    @LoginTry
    def batch_inside(self):
        logger.info('new batch')
        # 只判断到当前秒
        time_stamp = int(time.time()) * 1000
        for node in config.timetable_node:
            if node.is_on_turn(time_stamp):
                logger.info(f"adjusting:{node.to_dict()}")
                self.api.ktv.update_price(node.roomItem.itemId, node.roomItem.itemType, node.price)

        # TODO: 扫描房间状态判断是否调整

    def add_timetable_node(self, timetable_node: TimeTableNode):
        config.timetable_node.append(timetable_node)
