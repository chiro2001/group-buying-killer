import os
import json
from gbk.beans import *
from gbk.utils import des_decrypt, des_encrypt
import binascii
import threading

# debug开关:
# 1. 使用默认配置
# 2. 配置文件保持最新


class Config:
    FILE_NAME = "kp.json"
    FILE_PATH = '.'
    # DES 加密秘钥
    KEY = '_chiro#*'

    def __init__(self):
        self.data_default = {
            "debug": True,
            "version": 0.1,
            "cookies": des_encrypt(Config.KEY,
                                   "_lxsdk_cuid=17771fd8425c8-0f5b6f7abba2ce8-4c3f217f-ca800-17771fd8425c8; _lxsdk=17771fd8425c8-0f5b6f7abba2ce8-4c3f217f-ca800-17771fd8425c8; _hc.v=6594ea87-cd60-00b4-94e8-05bc93197b85.1612525177; mpmerchant_portal_shopid=581990543; __utma=1.458675775.1615809801.1615809801.1615809801.1; __utmz=1.1615809801.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); _lxsdk_s=1783a0f35e8-ed9-745-a7a%7C%7C67; edper=GG0X8NYFrZ9UqzH3wnTLqdRGpSYN5iMTDXinruwu_9YRRTfgluNHEfK-q5RjRmEJJ7diRjn5uZY9s3Ilx-roRw; JSESSIONID=A399CFC1BB3CE8771D7B3DD0006BFD55; merchantBookShopID=581990543; merchantCategoryID=2890; logan_session_token=ur8o312ny2cxhtxg4r42; logan_custom_report="),
            # "cookies": "",
            "timetable_node": {
                "upgradable": False,
                "data": []
            },
            "timetable_period": {
                "upgradable": False,
                "data": []
            },
            "room_stock_plan": {
                "upgradable": False,
                "data": []
            },
            "api_server": {
                "upgradable": True,
                "api_prefix": "/api/v1"
            },
            "file_server": {
                "upgradable": True,
                "static_path": "./public",
                "index": "index.html",
                "routers": ["settings", "verify", "plan/time", "plan/stock", "connect"]
            }
        }
        self.data = self.data_default
        self.timetable_node = []
        self.timetable_period = []
        self.room_stock_plan = []
        self.cookies = ""
        self.lock = threading.RLock()
        self.thread = None
        self.load()

    def load_data(self):
        try:
            timetable_node = [TimeTableNode.from_json(t) for t in self.data['timetable_node']['data']]
        except KeyError:
            logger.warning('unable to load timetable_node!')
            timetable_node = []
        self.timetable_node = timetable_node
        try:
            timetable_period = [TimeTablePeriod.from_json(t) for t in self.data['timetable_period']['data']]
        except KeyError:
            logger.warning('unable to load timetable_period!')
            timetable_period = []
        self.timetable_period = timetable_period
        try:
            room_stock_plan = [RoomStockPlanNode.from_json(t) for t in self.data['room_stock_plan']['data']]
        except KeyError:
            logger.warning('unable to load room_stock_plan!')
            room_stock_plan = []
        self.room_stock_plan = room_stock_plan
        try:
            self.cookies = des_decrypt(Config.KEY, self.data['cookies'])
        except binascii.Error as e:
            logger.warning("unable to load cookie: %s" % e)
            self.cookies = ""

    def load(self):
        try:
            with open(os.path.join(Config.FILE_PATH, Config.FILE_NAME), "r") as f:
                data = json.load(f)
                # 如果在程序中设置了debug模式就直接替换文件
                if self.data_default['debug']:
                    self.data = self.data_default
                    self.load_data()
                else:
                    for k in data:
                        self.data[k] = data[k]
                    # 检查文件是否需要和做版本更新，用default更新内容
                    for k in self.data_default:
                        if k not in self.data:
                            self.data[k] = self.data_default[k]
                            continue
                        if data['version'] < self.data_default['version']:
                            # 在版本更新时候才会更新dict内的upgradable项
                            if type(self.data_default[k]) is dict and 'upgradable' in self.data_default[k]:
                                self.data[k] = self.data_default[k]
                        # 不含upgradable就直接更新
                        if not (type(self.data_default[k]) is dict and 'upgradable' in self.data_default[k]):
                            self.data[k] = self.data_default[k]
        except KeyError:
            logger.error("Err loading, KeyError.")
            self.data = self.data_default
        except json.decoder.JSONDecodeError:
            logger.error("Err loading, DecodeError.")
            self.data = self.data_default
        except FileNotFoundError:
            logger.info("Using default loader")
            self.data = self.data_default
        finally:
            self.load_data()
            logger.debug(f'config load from: {os.path.abspath(os.path.join(Config.FILE_PATH, Config.FILE_NAME))} got data: {self.data}')
            self.save()

    def save(self):
        timetable_node = [t.to_dict() for t in self.timetable_node]
        self.data['timetable_node']['data'] = timetable_node
        self.data['cookies'] = des_encrypt(Config.KEY, self.cookies)
        with open(os.path.join(Config.FILE_PATH, Config.FILE_NAME), "w") as f:
            json.dump(self.data, f)
        logger.debug(f'config saved to:  {os.path.abspath(os.path.join(Config.FILE_PATH, Config.FILE_NAME))} and data: {self.data}')


config = Config()
