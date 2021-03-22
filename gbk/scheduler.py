import time
import threading
from gbk.api import API
from gbk.config import Config
from gbk.beans import *
from gbk.utils import logger


class Scheduler:
    class Schedule:
        def __init__(self, weekday: int, item_id: int, price: str, description: str):
            self.weekday, self.item_id, self.price, self.description = weekday, item_id, price, description

    def __init__(self):
        self.api = API()
        self.solution_id = 1834526
        self.api.ktv.set_shop_id(581990543)
        self.api.room_stock.set_shop_id(581990543)
        self.config = Config()
        # self.shop_id = self.api.ktv.get_shop_id(self.solution_id)
        # print(self.shop_id)
        logger.info('Loading reserve_date...')
        print(self.api.ktv.get_reserve_date())
        logger.info('Loading reserve_table...')
        print(self.api.ktv.get_reserve_table())
        logger.info('Loading room_stock...')
        print(self.api.room_stock.get_room_stock())

        self.running = False
        # 数据锁
        self.lock = threading.Lock()

        self.config.save()

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
        logger.info('new batch')
        # 排序计划数据
        self.config.timetable_node.sort(key=lambda x: x.time_)
        self.config.timetable_period.sort(key=lambda x: x.time_start)
        # TODO: 判断时间是否到了然后调整价格
        # 只判断到当前秒
        time_stamp = int(time.time()) * 1000
        for node in self.config.timetable_node:
            if node.is_on_turn(time_stamp):
                self.api.ktv.update_price(node.roomItem.itemId, node.roomItem.itemType, node.price)

        # TODO: 扫描房间状态判断是否调整

    def add_timetable_node(self, timetable_node: TimeTableNode):
        self.config.timetable_node.append(timetable_node)
