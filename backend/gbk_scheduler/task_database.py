from gbk_database.tools import *


class TaskManagerDB(BaseDB):
    def __init__(self, d):
        super().__init__(d, 'task_manager')
        init_sequence_id(self.d.task_tid, "cnt_tid")

    def get_next_tid(self):
        return get_next_id(self.d.task_tid, "cnt_tid")

    def get_raw(self, uid: int) -> dict:
        result = self.col.find_one({'uid': uid}, {'_id': False})
        return result

    def save(self, uid: int, data: dict):
        self.col.update_one({'uid': uid}, {'$set': {'data': data}})

    def load(self, uid: int) -> dict:
        now = self.get_raw(uid)
        return now.get('data', {})

    def remove(self, uid: int):
        res = self.get_raw(uid)
        if res is None:
            return
        self.col.delete_one({'uid': uid})
