import requests
from gbk_exceptions import *
from data_apis.ktv import KTV
from data_apis.solution import Solution
from data_apis.room_stock import RoomsStock
from gbk_database.config import Constants


class API:
    def __init__(self, cookies: str):
        self.ua = Constants.REQUEST_UA
        self.solution = Solution(self.request_no_302)
        self.ktv = KTV(self.request_json)
        self.room_stock = RoomsStock(self.request_json)
        self.cookies = cookies

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
