from gbk_database.tools import *


class TaskManagerDatabase:
    def __init__(self, d):
        self.d = d
        self.col: pymongo.collection.Collection = d.task_manager
        now = self.get_raw()
        if now is None:
            self.col.insert_one({'data': {}, 'finder': True})

    def get_raw(self):
        result = self.col.find_one({'finder': {'$exists': True}}, {'_id': False})
        return result

    def save(self, data: dict):
        self.col.update_one({'finder': {'$exists': True}}, {'$set': {'data': data}})

    def load(self) -> dict:
        now = self.get_raw()
        return now.get('data', {})
