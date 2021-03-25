import os
from flask import Flask
import threading
from flask_cors import CORS
from gbk.make_result import *
from gbk.config import config
from gbk.utils import *
from gbk.beans import *
from gbk.login import test_login

app = Flask(__name__)
# 设置可跨域访问
CORS(app, supports_credentials=True)
# CORS(app, supports_credentials=False)


@app.route("/")
def index():
    return make_result(data={
        'description': f'GroupBuyingKiller API v{config.data.get("version", None)}',
        'apis': {
            '/': {
                "description": 'Index and description of the API'
            }
        }
    })


@app.route("/test")
def test():
    return make_result(data={
        "test": True
    })


@app.route("/has_login")
def has_login():
    return make_result(data={
        "has_login": test_login(config.cookies)
    })


@app.route("/get/ips")
def get_ips():
    return make_result(data={
        "ips": get_ip_info()
    })


@app.route("/get/timetable_node")
def get_timetable_node():
    return make_result(data={
        "timetable_node": [node.to_dict() for node in config.timetable_node]
    })


@app.route("/get/timetable_period")
def get_timetable_period():
    return make_result(data={
        "timetable_period": [period.to_dict() for period in config.timetable_period]
    })


@app.route("/get/room_stock_plan")
def get_room_stock_plan():
    return make_result(data={
        "room_stock_plan": [stock.to_dict() for stock in config.room_stock_plan]
    })


@app.route("/get/status")
def get_status():
    return make_result(data={})


# Bug: 在cors情况下post速度缓慢
# Fix: 通过不传送cookie解决
@app.route("/add/timetable_node", methods=['POST', 'GET'])
def add_timetable_node():
    node = get_request_json(request)
    logger.info(node)
    config.lock.acquire()
    config.timetable_node.append(TimeTableNode.from_json(node))
    config.lock.release()
    config.save()
    return make_result()


@app.route("/logout")
def logout():
    logger.info(f'cookie before now: {config.cookies}')
    config.cookies = ""
    config.save()
    logger.debug("data: %s" % json.dumps(config.data))
    # t = threading.Thread(target=restart_program, args=(1, ))
    # t.setDaemon(True)
    # t.start()
    return make_result()


# 统一错误处理信息
@app.errorhandler(404)
def handler_404(error):
    logger.error(f"{error}")
    return make_result(404), 404


# 统一错误处理信息
@app.errorhandler(500)
def handler_500(error):
    logger.error(f"{error}")
    return make_result(500), 500


if __name__ == '__main__':
    app.run("0.0.0.0", port=os.environ.get("PORT", 8001), debug=False)
