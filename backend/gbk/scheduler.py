import os
import json
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
        self.lock = threading.RLock()
        # 每分钟获取一次的房间数据
        self.room_stock_data = None
        self.
        # 计数
        self.count = 0

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
        logger.info('Loading shop_info')
        logger.debug(self.api.ktv.get_shop_id(self.solution_id))
        # with open(os.path.join(config.FILE_PATH, "shop_info.json"), 'w') as f:
        #     json.dump(self.api.ktv.shop_info, f)
        logger.info('Loading reserve_date...')
        logger.debug(self.api.ktv.get_reserve_date())
        # with open(os.path.join(config.FILE_PATH, "reserve_date.json"), 'w') as f:
        #     json.dump(self.api.ktv.reserve_date, f)
        logger.info('Loading reserve_table...')
        logger.debug(self.api.ktv.get_reserve_table())
        # with open(os.path.join(config.FILE_PATH, "reserve_table.json"), 'w') as f:
        #     json.dump(self.api.ktv.reserve_table, f)
        logger.info('Loading room_stock...')
        logger.debug(self.api.room_stock.get_room_stock())
        # with open(os.path.join(config.FILE_PATH, "room_stock.json"), 'w') as f:
        #     json.dump(self.api.room_stock.room_stock_data, f)

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

    @LoginTry
    def batch_inside(self):
        # logger.info('new batch')
        # 只判断到当前秒
        self.lock.acquire()
        self.count += 1
        # 每60秒更新一次room_stock_data
        if self.count == 60 or self.room_stock_data is None:
            self.room_stock_data = self.api.room_stock.get_room_stock()
            logger.info(f'got room_stock_data: {self.room_stock_data}')
            self.count = 0
        self.lock.release()
        time_stamp = int(time.time() * 1000)
        to_remove = []
        for node in config.timetable_node:
            if node.is_on_turn(time_stamp):
                logger.info(f"adjusting:{node.to_dict()}")
                self.api.ktv.update_price(node.roomItem.itemId, 1, node.get_target_price())
                # 然后如果不available就删除
                if not node.available:
                    to_remove.append(node)
        for period in config.timetable_period:
            if period.is_on_turn(time_stamp):
                logger.info(f"adjusting:{period.to_dict()}")
                self.api.ktv.update_price(period.roomItem.itemId, 1, period.get_target_price())
                # 然后如果不available就删除
                if not period.available:
                    to_remove.append(period)
        for stock in config.room_stock_plan:
            if stock.is_on_turn(self.room_stock_data):
                logger.info(f'adjusting:{stock.to_dict()}')
                self.api.ktv.update_price(stock.roomItem.itemId, 1, stock.get_target_price())
                if not stock.available:
                    to_remove.append(stock)
        for i in to_remove:
            if type(i) is TimeTableNode:
                config.timetable_node.remove(i)
            elif type(i) is TimeTablePeriod:
                config.timetable_period.remove(i)
            elif type(i) is RoomStockPlan:
                config.room_stock_plan.remove(i)

    def add_timetable_node(self, timetable_node: TimeTableNode):
        config.timetable_node.append(timetable_node)


scheduler = Scheduler()
