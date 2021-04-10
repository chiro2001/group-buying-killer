import json
from gbk.utils import fmt_time, logger, get_date_tomorrow
import time

tid_cnt = int(time.time())


# cycle 等于0表示仅单次
# cycle 每一次减一
# cycle == -1 表示永久存在
# available 表示生效日期
class TimeTableNode:
    def __init__(self, roomItem, periodId, itemName, price, time_, cycle, available=True, available_start=None,
                 available_end=None, tid=None):
        global tid_cnt
        self.roomItem, self.periodId, self.itemName, self.price, self.time_, self.cycle = roomItem, periodId, itemName, price, time_, cycle
        self.available, self.available_start, self.available_end = available, available_start, available_end
        self.tid = tid
        if self.tid is None:
            self.tid = tid_cnt
            tid_cnt += 1

    def is_on_turn(self, time_stamp: int):
        if fmt_time(time_stamp) == fmt_time(self.time_):
            logger.info("Trigger: %s" % self.to_dict())
            self.update(time_stamp)
            return True
        self.update(time_stamp)
        return False

    def update(self, time_stamp: int):
        if fmt_time(time_stamp) == fmt_time(self.time_):
            if self.cycle == 0:
                self.available = False
                return False
            while fmt_time(self.time_) <= fmt_time(time_stamp):
                self.time_ += self.cycle
        if self.available_start is not None and self.available_end is not None:
            if not (self.available_start - 1000 <= time_stamp <= self.available_end):
                self.available = False
                return False
        if self.available_end is not None:
            if not time_stamp <= self.available_end:
                self.available = False
                return False

    # 获取设置的价格
    # 直接是数字的话，表示绝对价格
    # 用+/-开头则为相对价格
    def get_target_price(self):
        if type(self.price) is not str:
            return self.price
        # 无效的价格
        if len(self.price) == 0:
            return self.roomItem.price
        if self.price[0] == '+' or self.price[0] == '-':
            # TODO: 后端做数据合理性检查
            return float(self.roomItem.price) + float(self.price)
        return self.price

    def to_dict(self):
        result = {
            'roomItem': self.roomItem.__dict__,
            'periodId': self.periodId,
            'itemName': self.itemName,
            'price': self.price,
            'time_': self.time_,
            'cycle': self.cycle,
            'available': self.available,
            'tid': self.tid
        }
        if self.available_start:
            result['available_start'] = self.available_start
        if self.available_end:
            result['available_end'] = self.available_end
        return result

    @staticmethod
    def from_json(js):
        return TimeTableNode(RoomItem.from_json(js['roomItem']), js['periodId'], js.get('itemName', ''), js['price'],
                             js['time_'], js.get('cycle', 0), js.get('available', True),
                             js.get('available_start', None), js.get('available_end', None), js.get('tid'))


class TimeTablePeriod:
    def __init__(self, roomItem, periodId, itemName, price, time_start, time_end, cycle,
                 available=True,
                 available_start=None,
                 available_end=None,
                 tid=None):
        global tid_cnt
        self.roomItem, self.periodId, self.itemName, self.price, self.time_start, self.time_end, self.cycle = roomItem, periodId, itemName, price, time_start, time_end, cycle
        self.available, self.available_start, self.available_end = available, available_start, available_end
        self.tid = tid
        if self.tid is None:
            self.tid = tid_cnt
            tid_cnt += 1
        self.will_revoke = False

    def is_on_turn(self, time_stamp: int):
        if fmt_time(time_stamp) == fmt_time(self.time_start):
            logger.info("Trigger: %s" % self.to_dict())
            self.update(time_stamp)
            return True
        if fmt_time(time_stamp) == fmt_time(self.time_end):
            logger.info("Trigger end: %s" % self.to_dict())
            self.will_revoke = True
            self.update(time_stamp)
            return False
        self.update(time_stamp)
        return False

    def update(self, time_stamp: int):
        if fmt_time(time_stamp) == fmt_time(self.time_end):
            if self.cycle == 0:
                self.available = False
            while fmt_time(self.time_start) <= fmt_time(time_stamp):
                self.time_start += self.cycle
                self.time_end += self.cycle
        if self.available_start is not None and self.available_end is not None:
            if not (self.available_start - 1000 <= time_stamp <= self.available_end):
                self.available = False
                return False
        if self.available_end is not None:
            if not time_stamp <= self.available_end:
                self.available = False
                return False

    # 获取设置的价格
    # 直接是数字的话，表示绝对价格
    # 用+/-开头则为相对价格
    def get_target_price(self):
        if type(self.price) is not str:
            return self.price
        # 无效的价格
        if len(self.price) == 0:
            return self.roomItem.price
        if self.price[0] == '+' or self.price[0] == '-':
            # TODO: 后端做数据合理性检查
            return float(self.roomItem.price) + float(self.price)
        return self.price

    def to_dict(self):
        result = {
            'roomItem': self.roomItem.__dict__,
            'periodId': self.periodId,
            'itemName': self.itemName,
            'price': self.price,
            'time_start': self.time_start,
            "time_end": self.time_end,
            'cycle': self.cycle,
            'available': self.available,
            'tid': self.tid
        }
        if self.available_start:
            result['available_start'] = self.available_start
        if self.available_end:
            result['available_end'] = self.available_end
        return result

    @staticmethod
    def from_json(js):
        return TimeTablePeriod(RoomItem.from_json(js['roomItem']), js['periodId'], js.get('itemName', ''), js['price'],
                               js['time_start'], js['time_end'], js.get('cycle', 0), js.get('available', True),
                               js.get('available_start', None),
                               js.get('available_end', None), js.get('tid', None))


class RoomStockType:
    def __init__(self, roomName, itemStockNo, reserveDate, saleCount, remainCount, acceptOrder):
        self.roomName, self.itemStockNo, self.reserveDate, self.saleCount, self.remainCount, self.acceptOrder = \
            roomName, itemStockNo, reserveDate, saleCount, remainCount, acceptOrder

    @staticmethod
    def from_json(js):
        return RoomStockType(js['roomName'], js['itemStockNo'], js['reserveDate'],
                             js['saleCount'], js['remainCount'], js['acceptOrder'])


class RoomItem:
    def __init__(self, itemId, price, foodDesc, singHours, stock, itemType, periodType, roomType, periodId=None, date=None):
        self.itemId, self.price, self.foodDesc, self.singHours, self.stock, self.itemType, self.periodType, self.periodId, self.date, self.roomType = \
            itemId, price, foodDesc, singHours, stock, itemType, periodType, periodId, date, roomType

    @staticmethod
    def from_json(js):
        return RoomItem(js['itemId'], js['price'], js['foodDesc'], js['singHours'], js['stock'],
                        js['itemType'], js['periodType'], js['roomType'], js.get('periodId', None), js.get('date', None))


class RoomStockPlan:
    PlanTypeLess = 'lt'
    PlanTypeLessOrEqual = 'le'
    PlanTypeGreater = 'gt'
    PlanTypeGreaterOrEqual = 'ge'

    def __init__(self, roomItem: RoomItem,
                 planType,
                 value,
                 price,
                 available=True,
                 available_start=None,
                 available_end=None,
                 working=False,
                 tid=None):
        global tid_cnt
        self.roomItem, self.planType, self.value, self.price, self.available, self.available_start, self.available_end, self.working = \
            roomItem, planType, int(value), price, available, available_start, available_end, working
        self.tid = tid
        if self.tid is None:
            self.tid = tid_cnt
            tid_cnt += 1
        # target 表示执行价格调整的时候，当时的房间状态
        self.target: RoomItem = None
        self.will_revoke = False

    def is_on_turn(self, reserve_table: dict, time_stamp=None) -> bool:
        if reserve_table is None:
            logger.warn('reserve_table is None!!')
            return False
        if time_stamp is None:
            time_stamp = fmt_time(time.time() * 1000)
        # logger.info(json.dumps(room_stock_data))
        # logger.info(json.dumps(self.to_dict()))
        if not self.available:
            # self.update(time_stamp=time_stamp)
            return False
        if self.working:
            self.update(time_stamp=time_stamp)
            return False
        # 从数据中找到对应 roomItem
        target_t = None
        date_data = [self.roomItem.date, get_date_tomorrow(self.roomItem.date)]
        for date in date_data:
            for period in reserve_table[date]['periodList']:
                for roomType in period['roomMapItemEntry']:
                    for room in period['roomMapItemEntry'][roomType]:
                        # logger.info(f'{self.roomItem.itemId} => {json.dumps(room)}')
                        if room['itemId'] == self.roomItem.itemId:
                            target_t = room
        if target_t is None:
            logger.warn('Cannot find roomItem!!')
            return False
        target = RoomItem.from_json(target_t)
        # 记录差价
        self.target = target
        # 差价 = 需要调整到的价格 - 当前价格
        self.target.price = int(self.price) - int(self.target.price)
        if self.planType == RoomStockPlan.PlanTypeLess:
            if self.value > target.stock:
                self.working = False
                self.update(time_stamp=time_stamp)
                return True
        elif self.planType == RoomStockPlan.PlanTypeLessOrEqual:
            if self.value >= target.stock:
                self.working = False
                self.update(time_stamp=time_stamp)
                return True
        elif self.planType == RoomStockPlan.PlanTypeGreater:
            if self.value < target.stock:
                self.working = False
                self.update(time_stamp=time_stamp)
                return True
        elif self.planType == RoomStockPlan.PlanTypeGreaterOrEqual:
            if self.value <= target.stock:
                self.working = False
                self.update(time_stamp=time_stamp)
                return True
        else:
            logger.warn(f'Error PlanType {self.planType}')
            return False
        self.update(time_stamp=time_stamp)
        return False

    def update(self, time_stamp=None):
        if self.target is None:
            return
        if self.working:
            if self.planType == RoomStockPlan.PlanTypeLess:
                if not self.value > self.target.stock:
                    self.working = False
            elif self.planType == RoomStockPlan.PlanTypeLessOrEqual:
                if not self.value >= self.target.stock:
                    self.working = False
            elif self.planType == RoomStockPlan.PlanTypeGreater:
                if not self.value < self.target.stock:
                    self.working = False
            elif self.planType == RoomStockPlan.PlanTypeGreaterOrEqual:
                if not self.value <= self.target.stock:
                    self.working = False
            # 结束的时候恢复原来状态
            if not self.working:
                self.will_revoke = True
                return
        if time_stamp is not None:
            if self.available_start is not None and self.available_end is not None:
                if not (self.available_start - 1000 <= time_stamp <= self.available_end):
                    self.available = False
                    return
            if self.available_end is not None:
                if not time_stamp <= self.available_end:
                    self.available = False
                    return False
    
    # # 恢复状态
    # def revoke(self):
    #     # 差价 = 需要调整到的价格 - 当前价格
    #     # 原价 = -差价 + 需要调整到的价格
    #     price = -int(self.target.price) + self.price
    #     API().ktv.update_price(self.roomItem.itemId, 1, price)

    # 获取设置的价格
    # 直接是数字的话，表示绝对价格
    # 用+/-开头则为相对价格
    def get_target_price(self):
        if type(self.price) is not str:
            return self.price
        # 无效的价格
        if len(self.price) == 0:
            return self.roomItem.price
        if self.price[0] == '+' or self.price[0] == '-':
            # TODO: 后端做数据合理性检查
            return float(self.roomItem.price) + float(self.price)
        return self.price

    def to_dict(self):
        result = {
            'roomItem': self.roomItem.__dict__,
            'planType': self.planType,
            'value': self.value,
            'price': self.price,
            'available': self.available,
            'working': self.working,
            'tid': self.tid
        }
        if self.available_start:
            result['available_start'] = self.available_start
        if self.available_end:
            result['available_end'] = self.available_end
        return result

    @staticmethod
    def from_json(js):
        return RoomStockPlan(RoomItem.from_json(js['roomItem']), js['planType'], js['value'], js['price'],
                             js.get('available', True), js.get('available_start', None),
                             js.get('available_end', None),
                             js.get('working', False),
                             js.get('tid', None))
