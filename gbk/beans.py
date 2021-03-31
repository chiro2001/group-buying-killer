from gbk.utils import fmt_time, logger


# cycle 等于0表示仅单次
# cycle 每一次减一
# cycle == -1 表示永久存在
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
        if self.cycle == 0:
            self.available = False
            return False
        if self.available_start is not None and self.available_end is not None:
            if not (self.available_start - 1000 <= time_stamp <= self.available_end):
                self.available = False
                return False
        while self.time_ <= time_stamp:
            self.time_ += self.cycle
            if self.cycle > 0:
                self.cycle -= 1

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
            'available': self.available
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
                             js.get('available_start', None), js.get('available_end', None))


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
            if self.cycle == 0:
                self.available = False
            if self.available_start is not None and self.available_end is not None:
                if not (self.available_start - 1000 <= time_stamp <= self.available_end):
                    self.available = False
            while self.time_start <= time_stamp:
                self.time_start += self.cycle
                self.time_end += self.cycle
                if self.cycle > 0:
                    self.cycle -= 1

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
            'available': self.available
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


class RoomStockPlan:
    PlanTypeLess = 'lt'
    PlayTypeLessOrEqual = 'le'
    PlanTypeGreater = 'gt'
    PlanTypeGreaterOrEqual = 'ge'

    def __init__(self, room_item: RoomItem, plan_type, value, price, available=True, available_start=None,
                 available_end=None):
        self.room_item, self.plan_type, self.value, self.price, self.available, self.available_start, self.available_end = \
            room_item, plan_type, value, price, available, available_start, available_end

    def is_on_turn(self, room_stock_data: dict):
        print(room_stock_data)
        return False

    def update(self, room_stock_data: dict):
        pass

    def to_dict(self):
        result = {
            'roomItem': self.room_item.__dict__,
            'planType': self.plan_type,
            'value': self.value,
            'price': self.price,
            'available': self.available
        }
        if self.available_start:
            result['available_start'] = self.available_start
        if self.available_end:
            result['available_end'] = self.available_end
        return result

    @staticmethod
    def from_json(js):
        return RoomStockPlan(js['room_item'], js['plan_type'], js['value'], js['price'],
                             js.get('available', True), js.get('available_start', None),
                             js.get('available_end', None))
