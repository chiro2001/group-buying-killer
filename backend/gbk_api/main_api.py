import os
import json
from flask import Flask, Response
from flask_cors import CORS
from flask_restful import Resource, Api
from utils.logger import logger
from utils.docs import get_class_docs
from utils.make_result import make_result
from gbk_database.database import db

from gbk_user.api import *
from gbk_session.api import *


class MainAPI(Resource):
    """
    文档测试
    """

    def get(self):
        """
        文档：get
        :return:
        """
        return make_result(data={
            'docs': get_class_docs(self)
        })


class DropData(Resource):
    def get(self):
        db.rebase()
        return make_result()


app = Flask(__name__)
api = Api(app)
api.add_resource(MainAPI, '/')
api.add_resource(User, "/user")
api.add_resource(UserUid, "/user/<int:uid>")
api.add_resource(UserInfo, "/user_info")
api.add_resource(Session, "/session")
api.add_resource(Password, '/password')
api.add_resource(DropData, '/drop_data')
if Constants.RUN_WITH_PREDICTS:
    if Constants.RUN_IGNORE_TF_WARNINGS:
        os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
    logger.info('Loading Tensorflow...')
    from gbk_predicts.api import Predicts

    api.add_resource(Predicts, '/predicts')


@app.after_request
def api_after(res: Response):
    try:
        js = json.loads(res.data)
        js['code'] = res.status_code
        res.data = json.dumps(js).encode()
    except Exception as e:
        logger.error(e)
    # print(res.data)
    return res


if __name__ == '__main__':
    app.run()
