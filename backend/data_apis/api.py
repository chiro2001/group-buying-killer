import requests
from gbk_exceptions import *
from data_apis.ktv import KTV
from data_apis.solution import Solution
from data_apis.room_stock import RoomsStock
from gbk_database.config import Constants


class API:
    def __init__(self, cookies: str, solution_id: int = None, shop_id: int = None):
        self.ua = Constants.REQUEST_UA
        self.solution: Solution = Solution(self.request_no_302)
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
            logger.info('loading solution_id...')
            self.solution_id = self.solution.get_solution_id()
        if self.ktv is None or self.shop_id is None:
            logger.info('loading shop_info and ktv...')
            self.ktv, self.shop_info = KTV.from_solution_id(self.request_json, self.solution_id)
            self.shop_id = self.shop_info['shopId']
        if self.room_stock is None:
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
            "Cookie": self.cookies
        })
        js = resp.json()
        if 'code' in js and js['code'] != 200:
            logger.warning("Got code %s and message: %s" % (js.get('code', None), js.get('message', None)))
            logger.warning(js)
            raise GBKPermissionError(js)
        return js


if __name__ == '__main__':
    _a = API(Constants.REQUEST_DEBUG_COOKIES)
    print(_a.solution.get_solution_id())
