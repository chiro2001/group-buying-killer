import os
import platform
import pymongo
from utils.logger import logger
import secrets
from itsdangerous import TimedJSONWebSignatureSerializer as TJWSS
from pytz import utc
# from apscheduler.jobstores.mongodb import MongoDBJobStore
from apscheduler.jobstores.memory import MemoryJobStore
from apscheduler.executors.pool import ThreadPoolExecutor, ProcessPoolExecutor


class Constants:
    # Version info
    VERSION = "0.2.0"
    OWNER = "Chiro"
    EMAIL = "Chiro2001@163.com"
    # Environment
    ENVIRONMENT = "release" if platform.system() == 'Linux' else "dev"
    # Find
    FIND_LIMIT = 30
    # JWT config
    JWT_SECRET_KEY = secrets.SECRET_WORDS
    JWT_HEADER_TYPE = ""
    JWT_HEADER_NAME = "Authorization"
    JWT_LOCATIONS = ['headers', ]
    JWT_MESSAGE_401 = f"Authorization required in {', '.join([location for location in JWT_LOCATIONS])}"
    # JWT_ACCESS_TIME = 60 * 5
    JWT_ACCESS_TIME = 60 * 50 * 100
    # JWT_ACCESS_TIME = 1
    JWT_REFRESH_TIME = 60 * 60 * 24 * 30 * 100
    # JWT_REFRESH_TIME = 1
    # Database
    DATABASE_URI = secrets.SECRET_MONGO_URI
    DATABASE_NAME = DATABASE_URI.split('/')[-1]
    DATABASE_COL_NAME = 'config'
    # Email
    EMAIL_SENDER = "LanceLiang2018@163.com"
    EMAIL_SMTP_PASSWORD = secrets.SECRET_EMAIL_SMTP_PASSWORD
    EMAIL_ERROR_TITLE = "chiblog errors"
    EMAIL_SMTP_SSL = 'smtp.163.com'
    EMAIL_SMTP_PORT = 465
    # Users
    USERS_OWNER_PASSWORD = secrets.SECRET_OWNER_PASSWORD
    USERS_OWNER_USERNAME = 'chiro'
    USERS_OWNER_NICK = 'Chiro'
    USERS_OWNER_GITHUB = 'chiro2001'
    USERS_OWNER = {
        'username': USERS_OWNER_USERNAME,
        'nick': USERS_OWNER_NICK,
        'state': 'normal',
        'profile': {
            'contact': {
                'github': USERS_OWNER_GITHUB
            }
        }
    }
    # API config
    API_PATH = '/api/v2'
    # Running config
    RUN_LISTENING = "0.0.0.0"
    RUN_PORT = int(os.environ.get("PORT", 8880))
    RUN_USE_RELOAD = False
    # RUN_REBASE = True
    RUN_REBASE = False
    RUN_WITH_PREDICTS = ENVIRONMENT == 'release'
    RUN_IGNORE_TF_WARNINGS = True
    RUN_WITH_DROP_DATA = True
    # RUN_WITH_SYS_TASK_LOG = True
    RUN_WITH_SYS_TASK_LOG = ENVIRONMENT != 'release'
    RUN_TASKS_DELAYS = {
        'sys_trade_data': 5.3,
        'sys_flow_data': 15.2,
        # 六小时备份
        'sys_backup': 60 * 60 * 6
    } if ENVIRONMENT == 'release' else {
        'sys_trade_data': 1.5,
        'sys_flow_data': 5.2,
        'sys_backup': 60 * 60 * 6
    }
    # Schedule
    SCHEDULE_JOBSTORES = {
        # 'default': MongoDBJobStore(
        #     client=(pymongo.MongoClient(DATABASE_URI) if len(DATABASE_URI) > 0 else pymongo.MongoClient)),
        'default': MemoryJobStore()
    }
    SCHEDULE_EXECUTORS = {
        'default': ThreadPoolExecutor(20),
        'processpool': ProcessPoolExecutor(5)
    }
    SCHEDULE_JOB_DEFAULTS = {
        'coalesce': False,
        'max_instances': 300,
        'misfire_grace_time': 10
    }
    SCHEDULE_CONFIG = {
        'jobstores': SCHEDULE_JOBSTORES, 'executors': SCHEDULE_EXECUTORS, 'job_defaults': SCHEDULE_JOB_DEFAULTS,
        'timezone': utc
    }
    # Request API
    REQUEST_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0"
    # REQUEST_DEBUG_COOKIES = "edper=-qBZL3fxGiq1-SgqKxlawjA90vmkZbHwgpL7h" \
    #                         "UAWDvFX30LKSLwSX6B32fZze_aJrNgBpxt1k2qwS2qiJFpMwQ;"
    REQUEST_DEBUG_COOKIES = "edper=TH_p-7_SmD_Z4XTTXiyIy_cXuTPZIjWpxms50k2" \
                            "ipsbdYdfcBpWPaKxDoZkpqkfKH_IoH-xtyxQpR7Z5JaX64A;"
    # Modules
    MODULES_PATH = "./"
    MODULES = {
        'login_server': None,
    }
    # 模块遇到错误是否重启重新执行n次
    MODULES_RUN_RETRY = 3
    # 是否模块退出了仍然执行该模块
    MODULES_RUN_FOREVER = True
    # MODULES_RUN_FOREVER = False
    MODULES_USE_THREAD = False
    # Remote Login Serverd
    LOGIN_SERVER_HOST = "127.0.0.1"
    LOGIN_SERVER_PORT = 8881
    LOGIN_SERVER_PROTOCOL = 'ws'
    LOGIN_SERVER = "ws://gbk-dev.chiro.work/ws" if ENVIRONMENT == 'release' else None
    # Dismiss rebase for multiprocessing
    PROC_DISMISS_REBASE = 'GBK_DB_RUNNING_PID'
    PROC_DISMISS_COS = 'GBK_COS_RUNNING_PID'
    PROC_DISMISS_DAEMON_INIT = "GBK_DAEMON_RUNNING_PID"


class Statics:
    tjw_access_token = TJWSS(Constants.JWT_SECRET_KEY, Constants.JWT_ACCESS_TIME)
    tjw_refresh_token = TJWSS(Constants.JWT_SECRET_KEY, Constants.JWT_REFRESH_TIME)
    cos_readonly: bool = True
    cos_secret_id: str = None
    cos_secret_key: str = None
    cos_region = 'ap-guangzhou'
    cos_bucket = 'backup-1254016670'



class Config:
    def __init__(self):
        self.data_default = {
            "version": Constants.VERSION,
            "api_server": {
                "upgradable": True,
                "api_prefix": Constants.API_PATH
            },
            # 调试的时候用
            "file_server": {
                "upgradable": True,
                "static_path": "./public",
                "index": "index.html",
                "routers": []
            }
        }
        self.data = self.data_default
        self.load()

    # 这存取数据库单独处理不用database
    # 防止循环引用
    def save(self):
        client = pymongo.MongoClient(Constants.DATABASE_URI)
        db = client[Constants.DATABASE_NAME]
        col = db[Constants.DATABASE_COL_NAME]
        result = col.find_one({'version': {'$exists': True}}, {'_id': 0})
        if result is None:
            col.insert_one(self.data)
        else:
            col.update_one({'version': {'$exists': True}}, {'$set': self.data})
        client.close()

    def load(self):
        client = pymongo.MongoClient(Constants.DATABASE_URI)
        db = client[Constants.DATABASE_NAME]
        col = db[Constants.DATABASE_COL_NAME]
        result = col.find_one({'version': {'$exists': True}}, {'_id': 0})
        if result is None:
            logger.warning('loading default config data...')
            self.data = self.data_default
        else:
            # TODO: 数据库升级操作
            self.data = result
        self.save()
        client.close()


config = Config()
