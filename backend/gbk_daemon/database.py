from gbk_database.tools import *


class DaemonDB(BaseDB):
    def __init__(self, d):
        super().__init__(d, 'daemon')
        self.col_cookies = self.d.cookies

    def save(self, uid: int, data, data_type: str = 'base'):
        result = self.load(uid, data_type=data_type)
        update_dict = {
            'uid': uid,
            'data': data,
            'data_type': data_type
        }
        if result is None:
            auto_time_insert(self.col, update_dict)
        else:
            auto_time_update(self.col, {'uid': uid, 'data_type': data_type}, update_dict)

    def load(self, uid: int, data_type: str = 'base'):
        return find_one(self.col, {'uid': uid, 'data_type': data_type})
