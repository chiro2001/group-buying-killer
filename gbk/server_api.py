import os
from flask import Flask
import threading
import json
from flask_cors import CORS
from gbk.make_result import *
from gbk.config import config
from gbk.utils import *
from gbk.beans import *
from gbk.exceptions import *
from gbk.login import test_login
from gbk.scheduler import scheduler

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
                "description": 'Index and description of the API',
                'args': []
            }
        }
    })


@app.route("/test")
def test():
    t = TimeTableNode(RoomItem(0, 0, 0, 0, 0, 0, 0), 0, 0, 0, 0, 0)
    config.timetable_node.append(t)
    return make_result(data={
        "test": True,
        "timetable_node": TimeTableNode(RoomItem(0, 0, 0, 0, 0, 0, 0), 0, 0, 0, 0, 0).to_dict()
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


@app.route("/get/shop_info")
def get_shop_info():
    return make_result(data={
        'shop_info': scheduler.api.ktv.shop_info
    })


@app.route("/get/reserve_date")
def get_reserve_date():
    return make_result(data={
        'reserve_date': scheduler.api.ktv.reserve_date
    })


# date未指定：获取的是当天数据
# date指定：获取的是那一天的数据
@app.route("/get/reserve_table")
def get_reserve_table():
    date = request.args.get('date', get_date_today())
    logger.debug(f'date = {date}')
    try:
        resp = scheduler.api.ktv.get_reserve_table(date=date)
        logger.debug(f'reserve_table:{resp}')
        return make_result(data={
            'reserve_table': resp
        })
    except GBKPermissionError:
        return make_result(403)


# Bug: 在cors情况下post速度缓慢
# Fix: 通过不传送cookie解决或者取消跨域
@app.route("/add/timetable_node", methods=['POST'])
def add_timetable_node():
    node = get_request_json(request)
    logger.info(node)
    config.lock.acquire()
    config.timetable_node.append(TimeTableNode.from_json(node))
    config.lock.release()
    config.save()
    return make_result()


@app.route("/add/timetable_period", methods=['POST'])
def add_timetable_period():
    period = get_request_json(request)
    logger.info(period)
    config.lock.acquire()
    config.timetable_period.append(TimeTablePeriod.from_json(period))
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
