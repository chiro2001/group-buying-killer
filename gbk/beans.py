from gbk.utils import fmt_time, logger


# cycle 小于等于0表示仅单次
# available 表示生效日期
class TimeTableNode:
    def __init__(self, roomItem, periodId, itemName, price, time_, cycle, available=True, available_start=None,
                 available_end=None):
        self.roomItem, self.periodId, self.itemName, self.price, self.time_, self.cycle = roomItem, periodId, itemName, price, time_, cycle
        self.available, self.available_start, self.available_end = available, available_start, available_end

    def is_on_turn(self, time_stamp: int):
        if fmt_time(time_stamp) == fmt_time(self.time_):
            logger.info("Trigger: %s" % self.to_dict())
            self.update(time_stamp)
            return True
        return False

    def update(self, time_stamp: int):
        if self.cycle <= 0:
            self.available = False
            return False
        if self.available_start is not None and self.available_end is not None:
            if not (self.available_start - 1000 <= time_stamp <= self.available_end):
                self.available = False
                return False
        while self.time_ <= time_stamp:
            self.time_ += self.cycle

    def to_dict(self):
        return {
            'roomItem': self.roomItem.__dict__,
            'periodId': self.periodId,
            'itemName': self.itemName,
            'price': self.price,
            'time_': self.time_,
            'cycle': self.cycle
        }

    @staticmethod
    def from_json(js):
        return TimeTableNode(RoomItem.from_json(js['roomItem']), js['periodId'], js.get('itemName', ''), js['price'],
                             js['time_'], js.get('cycle', 0))


# class TimeTablePeriod:
#     def __init__(self, periodId, itemName, price, time_start, time_end, cycle):
#         self.periodId, self.itemName, self.price, self.time_, self.day, self.cycle = periodId, itemName, price, time_start, time_end, cycle
#
#     @staticmethod
#     def from_json(js):
#         return TimeTablePeriod(js['periodId'], js['itemName'], js['price'], js['time_start'], js['time_end'],
#                                js['cycle'])

class TimeTablePeriod:
    def __init__(self, roomItem, periodId, itemName, price, time_start, time_end, cycle, available=True,
                 available_start=None,
                 available_end=None):
        self.roomItem, self.periodId, self.itemName, self.price, self.time_start, self.time_end, self.cycle = roomItem, periodId, itemName, price, time_start, time_end, cycle
        self.available, self.available_start, self.available_end = available, available_start, available_end

    def is_on_turn(self, time_stamp: int):
        if fmt_time(time_stamp) == fmt_time(self.time_start):
            logger.info("Trigger: %s" % self.to_dict())
            self.update(time_stamp)
            return True
        if fmt_time(time_stamp) == fmt_time(self.time_end):
            logger.info("Trigger end: %s" % self.to_dict())
            self.update(time_stamp)
        return False

    def update(self, time_stamp: int):
        if fmt_time(time_stamp) == fmt_time(self.time_end):
            if self.cycle <= 0:
                self.available = False
            if self.available_start is not None and self.available_end is not None:
                if not (self.available_start - 1000 <= time_stamp <= self.available_end):
                    self.available = False
            while self.time_start <= time_stamp:
                self.time_start += self.cycle
                self.time_end += self.cycle

    def to_dict(self):
        return {
            'roomItem': self.roomItem.__dict__,
            'periodId': self.periodId,
            'itemName': self.itemName,
            'price': self.price,
            'time_start': self.time_start,
            "time_end": self.time_end,
            'cycle': self.cycle
        }

    @staticmethod
    def from_json(js):
        return TimeTablePeriod(RoomItem.from_json(js['roomItem']), js['periodId'], js.get('itemName', ''), js['price'],
                               js['time_start'], js['time_end'], js.get('cycle', 0), js.get('available_start', None),
                               js.get('available_end', None))


class RoomStockType:
    def __init__(self, roomName, itemStockNo, reserveDate, saleCount, remainCount, acceptOrder):
        self.roomName, self.itemStockNo, self.reserveDate, self.saleCount, self.remainCount, self.acceptOrder = roomName, itemStockNo, reserveDate, saleCount, remainCount, acceptOrder

    @staticmethod
    def from_json(js):
        return RoomStockType(js['roomName'], js['itemStockNo'], js['reserveDate'],
                             js['saleCount'], js['remainCount'], js['acceptOrder'])


class RoomItem:
    def __init__(self, itemId, price, foodDesc, singHours, stock, itemType, periodType):
        self.itemId, self.price, self.foodDesc, self.singHours, self.stock, self.itemType, self.periodType = itemId, price, foodDesc, singHours, stock, itemType, periodType

    @staticmethod
    def from_json(js):
        return RoomItem(js['itemId'], js['price'], js['foodDesc'], js['singHours'], js['stock'],
                        js['itemType'], js['periodType'])


class RoomStockPlanNode:
    PlanTypeLe = 'less'
    PlayTypeLeQ = 'less_or_equal'
    PlanTypeGe = 'greater'
    PlanTypeGeQ = 'greater_or_equal'

    def __init__(self, room_type: RoomStockType, room_item: RoomItem, plan_type, value, price_adjust):
        self.room_type, self.room_item, self.plan_type, self.value, self.price_adjust = room_type, room_item, plan_type, value, price_adjust

    @staticmethod
    def from_json(js):
        return RoomStockPlanNode(js['room_type'], js['room_item'], js['plan_type'], js['value'], js['price_adjust'])
