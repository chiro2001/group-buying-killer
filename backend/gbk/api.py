import time
import json
from gbk.utils import *
import requests
from lxml import etree
from gbk.config import config
from gbk.exceptions import *


# g_cookies = "_lxsdk_cuid=17771fd8425c8-0f5b6f7abba2ce8-4c3f217f-ca800-17771fd8425c8; _lxsdk=17771fd8425c8-0f5b6f7abba2ce8-4c3f217f-ca800-17771fd8425c8; _hc.v=6594ea87-cd60-00b4-94e8-05bc93197b85.1612525177; mpmerchant_portal_shopid=581990543; __utma=1.458675775.1615809801.1615809801.1615809801.1; __utmz=1.1615809801.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); _lxsdk_s=1783a0f35e8-ed9-745-a7a%7C%7C67; edper=GG0X8NYFrZ9UqzH3wnTLqdRGpSYN5iMTDXinruwu_9YRRTfgluNHEfK-q5RjRmEJJ7diRjn5uZY9s3Ilx-roRw; JSESSIONID=A399CFC1BB3CE8771D7B3DD0006BFD55; merchantBookShopID=581990543; merchantCategoryID=2890; logan_session_token=ur8o312ny2cxhtxg4r42; logan_custom_report="


class API:
    class Shop:
        url = 'https://e.dianping.com/merchant/portal/common/cityshop'

        def __init__(self, request_func):
            self.request_func = request_func
            self.shop_id = None

        def get_shop_id(self):
            js = self.request_func(self.url)
            self.shop_id = js['data']['currentShopId']
            return self.shop_id

    class Solution:
        url = 'https://e.dianping.com/fun/ktv/solutionlist'

        def __init__(self, request_func):
            self.request_func = request_func

        def get_solution_id(self):
            resp = self.request_func(self.url)
            if resp is None:
                raise GBKLoginError("需要登录")
            # print(resp)
            if '没有权限' in resp:
                raise GBKPermissionError("没有权限")
            try:
                html = etree.HTML(resp)
                try:
                    data = html.xpath('/html/body/div[1]/div/div/table/tbody/tr/td[4]/a')[0]
                except IndexError:
                    raise GBKPermissionError("没有权限")
                href = data.attrib['href']
                solution_id = int(href.split('=')[-1])
                return solution_id
            except GBKPermissionError as e:
                logger.warning(e)
                raise e
            except Exception as e:
                logger.warning(e)
                raise GBKError("未知错误")

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
            self.room_stock_data = resp['data']
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
            # self.reserve_table是reserveTable的缓存
            # TODO: Fix 这里的reserve_table可能变大的缺陷
            self.reserve_table = {}
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
            self.reserve_table[date] = temp
            return temp

        def update_price(self, item_id: int, type_: int, price: str):
            if self.shop_id == 0:
                raise GBKShopIdError("需要获取shopId")
            logger.warn(f'updating to price {price}')
            return self.request_func(self.url_update_price % (self.shop_id, item_id, type_, price))

    def __init__(self):
        self.ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0"
        self.solution = API.Solution(self.request_no_302)
        self.ktv = API.KTV(self.request_json)
        self.room_stock = API.RoomsStock(self.request_json)

    def request_no_302(self, url: str):
        resp = requests.get(url, headers={
            "User-Agent": self.ua,
            "Cookie": config.cookies
        }, allow_redirects=False)
        if resp.status_code != 200:
            return None
        text = resp.content.decode('utf8', errors='ignore')
        return text

    def request_json(self, url: str):
        # resp = requests.get(url, headers={
        #     "User-Agent": self.ua,
        #     "Cookie": config.cookies
        # }, proxies={
        #     "http": "",
        #     "https": ""
        # })
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


if __name__ == '__main__':
    _a = API()
    print(_a.solution.get_solution_id())