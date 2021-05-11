import time
import pymongo


class DataBase:
    def __init__(self):
        self.client = None
        self.db = None
        self.col = None
        self.connect_init()

    def connect_init(self):
        # self.client = pymongo.MongoClient("mongodb+srv://chiro:chirodb3521@shimamura.chiro.work/chiro?retryWrites=true&w=majority")
        self.client = pymongo.MongoClient('mongodb://chiro:chirodb3521@shimamura.chiro.work/chiro')
        self.db = self.client.chiro

    def error_report(self, error):
        self.db.gbk_bug.insert_one({'time': time.asctime(), 'error': error})


if __name__ == '__main__':
    _db = DataBase()

