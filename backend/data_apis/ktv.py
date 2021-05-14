import json
import time
from utils.time_formats import *
from gbk_exceptions import *


class KTV:
    class RoomType:
        def __init__(self, roomName, roomCapacity):
            self.roomName, self.roomCapacity = roomName, roomCapacity

        @staticmethod
        def from_json(js):
            return KTV.RoomType(js['roomName'], js['roomCapacity'])

    class Period:
        def __init__(self, periodId, seriodDesc, signHours, periodType, roomMapItemEntry):
            self.periodId, self.seriodDesc, self.signHours, self.periodType, self.roomMapItemEntry = periodId, seriodDesc, signHours, periodType, roomMapItemEntry

        @staticmethod
        def from_json(js):
            return KTV.Period(js['periodId'], js['seriodDesc'], js['signHours'], js['periodType'],
                              js['roomMapItemEntry'])

    url_base = 'https://e.dianping.com/sku/api/merchant/ktvreserve/'
    url_get_shop_id = url_base + 'solutionshops.json?solutionid=%s'  # 参数：solutionid
    url_get_reserve_date = url_base + 'queryreservedate.json'  # 参数：无
    url_get_reserve_table = url_base + 'queryreservetable.json?shopid=%s&timestamp=%s'  # 参数：shopid，timestamp
    url_update_price = url_base + "updateprice.json?shopid=%s&itemid=%s&type=%s&price=%s"  # 参数：shopid, itemid, type, price
    url_temporary_change_item_status = url_base + "temporarychangeitemstatus.json?itemid=%s&status=%s&timestamp=%s"  # 参数：itemid, status[1=恢复, 2=下架], timestamp

    def __init__(self, request_func, shop_id: int):
        self.request_func = request_func
        self.shop_id = shop_id

    def set_shop_id(self, shop_id: int):
        self.shop_id = shop_id

    def get_shop_id(self, solution_id: int) -> int:
        resp = self.request_func(self.url_get_shop_id % solution_id)
        self.shop_id = resp['data'][0]['shopId']
        return self.shop_id

    @staticmethod
    def from_solution_id(request_func, solution_id: int):
        resp = request_func(KTV.url_get_shop_id % solution_id)
        shop_id = resp['data'][0]['shopId']
        return KTV(request_func, shop_id), shop_id

    def get_reserve_date(self):
        resp = self.request_func(self.url_get_reserve_date)
        return resp

    # 以date优先，timestamp默认为当前时间
    def get_reserve_table(self, timestamp: int = None, date: str = None):
        if date is not None:
            timestamp = get_date_timestamp(date)
        elif timestamp is not None:
            date = get_date_today()
            timestamp = get_date_timestamp(date)
        else:
            timestamp = int(time.time() * 1000)
        if self.shop_id == 0:
            raise GBKShopIdError("需要获取shopId")
        resp = self.request_func(self.url_get_reserve_table % (self.shop_id, timestamp))
        date = get_timestamp_date(timestamp)
        # 用 JSON 实现深度拷贝（
        temp = json.loads(json.dumps(resp['data']))
        # 在此修改 roomItem
        for i in range(len(resp['data']['periodList'])):
            period = resp['data']['periodList'][i]
            periodId = period['periodId']
            for j in period['roomMapItemEntry']:
                roomList = period['roomMapItemEntry'][j]
                for k in range(len(roomList)):
                    room = roomList[k]
                    room['periodId'] = periodId
                    room['date'] = date
                    room['roomType'] = j
                    temp['periodList'][i]['roomMapItemEntry'][j][k] = room
        # self.reserve_table[date] = temp
        return temp

    # 1 表示调整价格
    def update_price(self, item_id: int, price: str, type_: int = 1):
        if self.shop_id == 0:
            raise GBKShopIdError("需要获取shopId")
        logger.warn(f'updating to price {price}')
        return self.request_func(self.url_update_price % (self.shop_id, item_id, type_, price))
