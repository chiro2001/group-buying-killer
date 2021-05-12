import time
from utils.logger import logger
from gbk_database.tools import *
from gbk_user.database import UserDB
from gbk_session.database import SessionDB
from gbk_scheduler.task_database import TaskManagerDB
from gbk_sync.database import SyncDB


class DataBase:
    COLLECTIONS = [
        'user', 'user_uid', 'gbk_bug', 'session', 'session_disabled_token', 'task_manager', 'task_tid'
    ]

    def __init__(self):
        self.client = None
        self.db = None
        self.connect_init()
        self.user: UserDB = None
        self.session: SessionDB = None
        self.task_manager: TaskManagerDB = None
        self.sync: SyncDB = None
        self.init_parts()
        if Constants.RUN_REBASE:
            self.rebase()

    def init_parts(self):
        self.user = UserDB(self.db)
        self.session = SessionDB(self.db)
        self.task_manager = TaskManagerDB(self.db)
        self.sync = SyncDB(self.db)

    def rebase(self):
        for col in DataBase.COLLECTIONS:
            logger.info(f'Dropping {col}')
            self.db[col].drop()
        self.init_parts()
        uid = self.user.insert(Constants.USERS_OWNER)
        self.session.insert(uid=uid, password=Constants.USERS_OWNER_PASSWORD)

    def connect_init(self):
        if len(Constants.DATABASE_URI) > 0:
            self.client = pymongo.MongoClient(Constants.DATABASE_URI)
        else:
            self.client = pymongo.MongoClient()
        self.db = self.client[Constants.DATABASE_NAME]

    def error_report(self, error):
        self.db.gbk_bug.insert_one({'time': time.asctime(), 'error': error})


mongo = None


def set_mongo(mongo_):
    global mongo
    mongo = mongo_


db = DataBase()

if __name__ == '__main__':
    pass
    db.rebase()
    db.session.insert('chiro', '3521')
    # logger.info(db.session.find_by_username('chiro'))
    logger.info(db.session.check_password('chiro', '3521'))
