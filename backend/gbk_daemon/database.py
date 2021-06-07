from gbk_database.tools import *


class DaemonDB(BaseDB):
    def __init__(self, d):
        super().__init__(d, 'daemon')
        self.col_cookies = self.d.cookies

    def delete(self, uid: int, data_type: str = "base"):
        try:
            self.col.delete_one({'uid': uid, 'data_type': data_type})
        except Exception as e:
            logger.error(e)

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
        if uid is None:
            return find_many(self.col, {'data_type': data_type})
        return find_one(self.col, {'uid': uid, 'data_type': data_type})
