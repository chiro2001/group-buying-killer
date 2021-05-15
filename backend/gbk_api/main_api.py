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
from gbk_scheduler.task_api import *
from gbk_sync.api import *
from gbk_scheduler.action_api import *
from gbk_scheduler.trigger_api import *
from gbk_remote_login.api import *
from gbk_daemon.api import *


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
api.add_resource(TaskManagerAPI, '/task')
api.add_resource(TaskManagerTid, '/task/<int:tid>')
api.add_resource(ActionAPI, '/action')
api.add_resource(ActionName, '/action/<string:action_type>')
api.add_resource(TriggerAPI, '/trigger')
api.add_resource(TriggerName, '/trigger/<string:trigger_type>')
api.add_resource(Sync, '/sync')
api.add_resource(RemoteLoginAPI, '/remote_login')
api.add_resource(DaemonAPI, '/daemon')
if Constants.RUN_WITH_PREDICTS:
    if Constants.RUN_IGNORE_TF_WARNINGS:
        os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
    logger.info('Loading Tensorflow...')
    from gbk_predicts.api import Predicts

    api.add_resource(Predicts, '/predicts')


CORS(app)


@app.after_request
def api_after(res: Response):
    if len(res.data) > 0:
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
