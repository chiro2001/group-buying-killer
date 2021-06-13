import json
import time

import requests

from data_apis.flow_data import FlowData
from data_apis.trade_data import TradeData
from gbk_exceptions import *
from data_apis.ktv import KTV
from data_apis.solution import Solution
from data_apis.room_stock import RoomsStock
from gbk_database.config import Constants


class API:
    def __init__(self, cookies: str, solution_id: int = None, shop_id: int = None):
        self.ua = Constants.REQUEST_UA
        self.solution: Solution = Solution(self.request_no_302)
        self.trade_data: TradeData = TradeData(self.request_json)
        self.flow_data: FlowData = FlowData(self.request_json)
        self.ktv: KTV = None
        self.room_stock: RoomsStock = None
        self.cookies: str = cookies
        self.shop_id: int = shop_id
        self.shop_info: dict = None
        self.solution_id: int = solution_id
        # 给参数齐全了就直接初始化
        if self.shop_id is not None and self.solution_id is not None:
            self.ktv = KTV(self.request_json, self.shop_id)
            self.room_stock = RoomsStock(self.request_json, self.shop_id)

    def init_data(self):
        if self.solution_id is None:
            if Constants.RUN_WITH_SYS_TASK_LOG:
                logger.info('loading solution_id...')
            self.solution_id = self.solution.get_solution_id()
        if self.ktv is None or self.shop_id is None:
            if Constants.RUN_WITH_SYS_TASK_LOG:
                logger.info('loading shop_info and ktv...')
            self.ktv, self.shop_info = KTV.from_solution_id(self.request_json, self.solution_id)
            self.shop_id = self.shop_info['shopId']
            self.flow_data.shop_id = self.shop_id
            self.trade_data.shop_id = self.shop_id
        if self.room_stock is None:
            if Constants.RUN_WITH_SYS_TASK_LOG:
                logger.info('loading room_stock...')
            self.room_stock = RoomsStock(self.request_json, self.shop_id)
        return self

    @staticmethod
    def from_cookies(cookies: str):
        if cookies is None:
            raise GBKCookiesError("Got empty cookies")
        return API(cookies=cookies).init_data()

    # @staticmethod
    # def from_cookies_and_solution_id(cookies: str, solution_id: int):
    #     if cookies is None:
    #         raise GBKCookiesError("Got empty cookies")
    #     if solution_id is None:
    #         raise GBKError("solution_id is None")
    #     return API(cookies=cookies, solution_id=solution_id).init_data()

    @staticmethod
    def from_all(cookies: str, solution_id: int, shop_id: int):
        if cookies is None:
            raise GBKCookiesError("Got empty cookies")
        if solution_id is None:
            raise GBKError("solution_id is None")
        if shop_id is None:
            raise GBKError("shop_id is None")
        return API(cookies=cookies, solution_id=solution_id, shop_id=shop_id)

    def request_no_302(self, url: str):
        resp = requests.get(url, headers={
            "User-Agent": self.ua,
            "Cookie": self.cookies
        }, allow_redirects=False)
        if resp.status_code != 200:
            return None
        text = resp.content.decode('utf8', errors='ignore')
        return text

    def request_json(self, url: str, method: str = 'GET', **kwargs):
        kwargs2 = {
            "headers": {
                "User-Agent": self.ua,
                "Cookie": self.cookies
            }
        }
        kwargs2.update(kwargs)
        resp = requests.request(method, url, **kwargs2)
        if resp.status_code != 200:
            logger.warning(f"{url} Got code %s" % resp.status_code)
            # with open("error.html", 'wb') as f:
            #     f.write(resp.content)
            raise GBKError(resp.text)
        try:
            js = resp.json()
        except json.decoder.JSONDecodeError as e:
            logger.error(f'Decode error: {url}, {e}')
            raise GBKError(resp.text)
        if 'code' in js and (js['code'] != 200 and js['code'] != 0):
            logger.warning("Got code %s and message: %s" % (js.get('code', None), js.get('message', None)))
            logger.warning(js)
            raise GBKPermissionError(js)
        return js


if __name__ == '__main__':
    _a = API.from_cookies(Constants.REQUEST_DEBUG_COOKIES)
    # print(_a.trade_data.get(
    #     int(time.mktime(time.strptime("2021-04-01", "%Y-%m-%d")) * 1000),
    #     int(time.mktime(time.strptime("2021-05-01", "%Y-%m-%d")) * 1000),
    #     1, 1164657484
    # ))
    _res = _a.flow_data.get('2021-04-01', 1164657484, end_time='2021-05-01')
    print(_res)
    _js = json.dumps(_res)
    with open("../data/flow_data.json", 'w') as f:
        f.write(_js)
