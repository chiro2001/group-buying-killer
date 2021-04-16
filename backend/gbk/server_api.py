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
                'method': ['GET'],
                'args': {},
                'rets': {
                    'apis': "Lists of API urls and args"
                }
            },
            '/test': {
                "description": 'Test whether ths API is reachable',
                'method': ['GET'],
                'args': {},
                'rets': {
                    'test': 'Always is true',
                    'timetable_node': 'An instance of Object TimeTableNode',
                    'timetable_period': 'An instance of Object TimeTablePeriod',
                    'room_stock_plan': 'An instance of Object RoomStockPlan'
                }
            },
            '/has_login': {
                "description": 'Check teh state of login',
                'method': ['GET'],
                'args': {},
                'rets': {
                    'has_login': 'true if has login'
                }
            },
            '/get/ips': {
                "description": 'Get server ips',
                'method': ['GET'],
                'args': {},
                'rets': {
                    'ips': 'IPs of this server'
                }
            },
            '/get/timetable_node': {
                "description": 'get timetable nodes',
                'method': ['GET'],
                'args': {},
                'rets': {
                    'timetable_node': 'List of timetable nodes'
                }
            },
            '/get/timetable_period': {
                "description": 'get timetable periods',
                'method': ['GET'],
                'args': {},
                'rets': {
                    'timetable_period': 'List of timetable periods'
                }
            },
            '/get/room_stock_plan': {
                "description": 'get planned room stock plan',
                'method': ['GET'],
                'args': {},
                'rets': {
                    'timetable_node': 'List of room stock plan'
                }
            },
            '/get/status': {
                "description": 'Get running status',
                'method': ['GET'],
                'args': {},
                'rets': {}  # 待定
            },
            '/get/shop_info': {
                "description": 'Get shop info',
                'method': ['GET'],
                'args': {},
                'rets': {
                    'shop_info': 'Info of login shop'
                }
            },
            '/get/reserve_date': {
                "description": 'Get date info for reserve',
                'method': ['GET'],
                'args': {},
                'rets': {
                    'reserve_date': 'reserve date'
                }
            },
            '/get/reserve_table': {
                "description": 'Get reserve price table',
                'method': ['GET'],
                'args': {
                    'date': {
                        'type': 'optional',
                        'format': 'YYYY-MM-DD date',
                        "description": 'default date is today',
                    }
                },
                'rets': {
                    'reserve_table': 'reserve date'
                }
            },
            '/set/timetable_node': {
                "description": 'Add/update timetable node',
                'method': ['POST'],
                'args': {
                    'node': {
                        'type': 'required',
                        'format': 'json',
                        'description': 'If tid has set, will update timetable node; or will add new item'
                    }
                },
                'rets': {}
            },
            '/set/timetable_period': {
                "description": 'Add/update timetable period',
                'method': ['POST'],
                'args': {
                    'period': {
                        'type': 'required',
                        'format': 'json',
                        'description': 'If tid has set, will update timetable period; or will add new item'
                    }
                },
                'rets': {}
            },
            '/set/room_stock_plan': {
                "description": 'Add/update room stock plan',
                'method': ['POST'],
                'args': {
                    'period': {
                        'type': 'required',
                        'format': 'json',
                        'description': 'If tid has set, will update room stock plan; or will add new item'
                    }
                },
                'rets': {}
            },
            '/logout': {
                "description": 'Logout account',
                'method': ['GET'],
                'args': {},
                'rets': {}
            }
        }
    })


@app.route("/test")
def test():
    t = TimeTableNode(RoomItem(0, 0, 0, 0, 0, 0, 0), 0, 0, 0, 0, 0)
    # config.timetable_node.append(t)
    return make_result(data={
        "test": True,
        "timetable_node": TimeTableNode(RoomItem(0, 0, 0, 0, 0, 0, 0), 0, 0, 0, 0, 0).to_dict(),
        'timetable_period': TimeTablePeriod(RoomItem(0, 0, 0, 0, 0, 0, 0), 0, 0, 0, 0, 0, 0).to_dict(),
        "room_stock_plan": RoomStockPlan(RoomItem(0, 0, 0, 0, 0, 0, 0), RoomStockPlan.PlanTypeGreater, 0, 0).to_dict()
    })


@app.route("/has_login")
def has_login():
    try:
        has_login_ = test_login(config.cookies)
    except (GBKLoginError, GBKPermissionError):
        has_login_ = False
    return make_result(data={
        "has_login": has_login_
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
@app.route("/set/timetable_node", methods=['POST'])
def set_timetable_node():
    node_t = get_request_json(request)
    logger.info(node_t)
    try:
        node = TimeTableNode.from_json(node_t)
    except (KeyError, ValueError) as e:
        return make_result(400, message=str(e))
    target = None
    for i in range(len(config.timetable_node)):
        if config.timetable_node[i].tid == node.tid:
            target = i
            break
    if target is not None:
        config.timetable_node[target] = node
        config.save()
        return make_result()
    config.lock.acquire()
    try:
        config.timetable_node.append(node)
    except KeyError as e:
        logger.error(e)
        return make_result(400, data={
            'detail': get_trackback()
        })
    config.lock.release()
    config.save()
    return make_result()


@app.route("/set/timetable_period", methods=['POST'])
def set_timetable_period():
    period_t = get_request_json(request)
    logger.info(period_t)
    try:
        period = TimeTablePeriod.from_json(period_t)
    except (KeyError, ValueError) as e:
        return make_result(400, message=str(e))
    target = None
    for i in range(len(config.timetable_period)):
        if config.timetable_period[i].tid == period.tid:
            target = i
            break
    if target is not None:
        config.timetable_period[target] = period
        config.save()
        return make_result()
    config.lock.acquire()
    try:
        config.timetable_period.append(period)
    except KeyError as e:
        logger.error(e)
        return make_result(400, data={
            'detail': get_trackback()
        })
    config.lock.release()
    config.save()
    return make_result()


@app.route("/set/room_stock_plan", methods=['POST'])
def set_room_stock_plan():
    stock_t = get_request_json(request)
    logger.info(stock_t)
    try:
        stock = RoomStockPlan.from_json(stock_t)
    except (KeyError, ValueError) as e:
        return make_result(400, message=str(e))
    target = None
    for i in range(len(config.room_stock_plan)):
        if config.room_stock_plan[i].tid == stock.tid:
            target = i
            break
    if target is not None:
        stock.working = config.room_stock_plan[target].working
        config.lock.acquire()
        config.room_stock_plan[target] = stock
        config.save()
        config.lock.release()
        return make_result()
    config.lock.acquire()
    try:
        config.room_stock_plan.append(stock)
    except KeyError as e:
        logger.error(e)
        return make_result(400, data={
            'detail': get_trackback()
        })
    config.lock.release()
    config.save()
    return make_result()


def delete_tid(tid: int) -> bool:
    for i in range(len(config.room_stock_plan)):
        if config.room_stock_plan[i].tid == tid:
            config.room_stock_plan.remove(config.room_stock_plan[i])
            return True
    for i in range(len(config.timetable_node)):
        if config.timetable_node[i].tid == tid:
            config.timetable_node.remove(config.timetable_node[i])
            return True
    for i in range(len(config.timetable_period)):
        if config.timetable_period[i].tid == tid:
            config.timetable_period.remove(config.timetable_period[i])
            return True
    return False


@app.route("/delete/timetable_node", methods=['POST'])
def delete_timetable_node():
    tid_t = get_request_json(request)
    if 'tid' not in tid_t:
        return make_result(400)
    tid = tid_t['tid']
    if not delete_tid(tid):
        return make_result(400, message=f'Cannot find tid: {tid}')
    return make_result()


@app.route("/delete/timetable_period", methods=['POST'])
def delete_timetable_period():
    tid_t = get_request_json(request)
    if 'tid' not in tid_t:
        return make_result(400)
    tid = tid_t['tid']
    if not delete_tid(tid):
        return make_result(400, message=f'Cannot find tid: {tid}')
    return make_result()


@app.route("/delete/room_stock_plan", methods=['POST'])
def delete_room_stock_plan():
    tid_t = get_request_json(request)
    if 'tid' not in tid_t:
        return make_result(400)
    tid = tid_t['tid']
    if not delete_tid(tid):
        return make_result(400, message=f'Cannot find tid: {tid}')
    return make_result()


@app.route('/delete/tid/<int:tid>')
def delete_from_tid(tid: int):
    if tid is None or tid == 0:
        return make_result(400)
    if not delete_tid(tid):
        return make_result(400, message=f'Cannot find tid: {tid}')
    return make_result()


@app.route("/upload/config", methods=['POST'])
def upload_config():
    config_ = get_request_json(request)
    if 'version_frontend' not in config_:
        return make_result(400)
    config.data['config_frontend']['data'] = config_
    return make_result()


@app.route("/download/config")
def download_config():
    if 'config_frontend' not in config.data or config.data['config_frontend']['data'] is None:
        return make_result(400)
    return make_result(data={
        'config_frontend': config.data['config_frontend']['data']
    })


@app.route("/logout")
def logout():
    logger.info(f'cookie before now: {config.cookies}')
    config.cookies = ""
    config.save()
    logger.debug("data: %s" % json.dumps(config.data))
    scheduler.re_login()
    # t = threading.Thread(target=restart_program, args=(1, ))
    # t.setDaemon(True)
    # t.start()
    return make_result()


# 统一错误处理信息
@app.errorhandler(404)
def handler_404(error):
    logger.error(f"{error}")
    return make_result(404)


# 统一错误处理信息
@app.errorhandler(500)
def handler_500(error):
    logger.error(f"{error}")
    return make_result(500)


if __name__ == '__main__':
    app.run("0.0.0.0", port=os.environ.get("PORT", 8001), debug=False)
