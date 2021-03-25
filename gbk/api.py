import time
from gbk.utils import logger
import requests
from gbk.config import config
from gbk.exceptions import *

# g_cookies = "_lxsdk_cuid=17771fd8425c8-0f5b6f7abba2ce8-4c3f217f-ca800-17771fd8425c8; _lxsdk=17771fd8425c8-0f5b6f7abba2ce8-4c3f217f-ca800-17771fd8425c8; _hc.v=6594ea87-cd60-00b4-94e8-05bc93197b85.1612525177; mpmerchant_portal_shopid=581990543; __utma=1.458675775.1615809801.1615809801.1615809801.1; __utmz=1.1615809801.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); _lxsdk_s=1783a0f35e8-ed9-745-a7a%7C%7C67; edper=GG0X8NYFrZ9UqzH3wnTLqdRGpSYN5iMTDXinruwu_9YRRTfgluNHEfK-q5RjRmEJJ7diRjn5uZY9s3Ilx-roRw; JSESSIONID=A399CFC1BB3CE8771D7B3DD0006BFD55; merchantBookShopID=581990543; merchantCategoryID=2890; logan_session_token=ur8o312ny2cxhtxg4r42; logan_custom_report="


class API:
    class RoomsStock:
        url_base = 'https://e.dianping.com/ktv/api/'
        url_load_price_table = url_base + 'loadpricetable.wbc?shopid=%s'  # 参数：shopid

        def __init__(self, request_func):
            self.request_func = request_func
            self.shop_id = 0
            self.room_stock_data = []

        def set_shop_id(self, shop_id):
            self.shop_id = shop_id

        def get_room_stock(self):
            resp = self.request_func(self.url_load_price_table % self.shop_id)
            self.room_stock_data = resp['data']['dailyStockList']
            return resp

    class KTV:
        class RoomType:
            def __init__(self, roomName, roomCapacity):
                self.roomName, self.roomCapacity = roomName, roomCapacity

            @staticmethod
            def from_json(js):
                return API.KTV.RoomType(js['roomName'], js['roomCapacity'])

        class Period:
            def __init__(self, periodId, seriodDesc, signHours, periodType, roomMapItemEntry):
                self.periodId, self.seriodDesc, self.signHours, self.periodType, self.roomMapItemEntry = periodId, seriodDesc, signHours, periodType, roomMapItemEntry

            @staticmethod
            def from_json(js):
                return API.KTV.Period(js['periodId'], js['seriodDesc'], js['signHours'], js['periodType'],
                                      js['roomMapItemEntry'])

        url_base = 'https://e.dianping.com/sku/api/merchant/ktvreserve/'
        url_get_shop_id = url_base + 'solutionshops.json?solutionid=%s'  # 参数：solutionid
        url_get_reserve_date = url_base + 'queryreservedate.json'  # 参数：无
        url_get_reserve_table = url_base + 'queryreservetable.json?shopid=%s&timestamp=%s'  # 参数：shopid，timestamp
        url_update_price = url_base + "updateprice.json?shopid=%s&itemid=%s&type=%s&price=%s"  # 参数：shopid, itemid, type, price

        def __init__(self, request_func):
            self.request_func = request_func
            self.shop_id = 0
            self.shop_info = None
            self.reserve_date = None
            self.reserve_table = None
            self.periods = []
            self.room_types = []

        def set_shop_id(self, shop_id: int):
            self.shop_id = shop_id

        def get_shop_id(self, solution_id: int):
            resp = self.request_func(self.url_get_shop_id % solution_id)
            self.shop_id = resp['data'][0]['shopId']
            self.shop_info = resp['data'][0]
            return self.shop_id

        def get_reserve_date(self):
            resp = self.request_func(self.url_get_reserve_date)
            self.reserve_date = resp['data']
            return resp

        def get_reserve_table(self, timestamp: int = None):
            if type(timestamp) is not int:
                timestamp = int(time.time() * 1000)
            if self.shop_id == 0:
                raise Exception("需要获取shopId")
            resp = self.request_func(self.url_get_reserve_table % (self.shop_id, timestamp))
            self.reserve_table = resp['data']
            return resp

        def update_price(self, item_id: int, type_: int, price: str):
            if self.shop_id == 0:
                raise Exception("需要获取shopId")
            return self.request_func(self.url_update_price % (self.shop_id, item_id, type_, price))

    def __init__(self):
        self.ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0"
        self.ktv = API.KTV(self.request)
        self.room_stock = API.RoomsStock(self.request)

    def request(self, url: str):
        resp = requests.get(url, headers={
            "User-Agent": self.ua,
            "Cookie": config.cookies
        })
        js = resp.json()
        if 'code' in js and js['code'] != 200:
            logger.warning("Got code %s and message: %s" % (js.get('code', None), js.get('message', None)))
            logger.warning(js)
            raise GBKPermissionError(js)
        return js
