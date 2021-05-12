from flask_restful import Resource
from gbk_auth.tjw_auth import *
from gbk_database.database import db
from utils.args_decorators import args_required_method
from utils.make_result import make_result


class Sync(Resource):
    args_upload = reqparse.RequestParser() \
        .add_argument("config", type=dict, required=True, location=["json", ])

    @args_required_method(args_upload)
    @auth_required_method
    def post(self, uid: int):
        """
        上传数据
        :return:
        """
        data = self.args_upload.parse_args()
        db.sync.update(uid, data)
        return make_result()

    @auth_required_method
    def get(self, uid: int):
        """
        下载数据
        :return:
        """
        data = db.sync.find_by_uid(uid)
        if data is None:
            return make_result(404)
        return make_result(data=data)
