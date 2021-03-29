import os
from flask import *
import threading
from werkzeug.middleware.dispatcher import DispatcherMiddleware
from werkzeug.serving import run_simple
from werkzeug.middleware.http_proxy import ProxyMiddleware
from werkzeug.middleware.shared_data import SharedDataMiddleware
# from werkzeug.middleware.profiler import ProfilerMiddleware
from wsgiref.simple_server import make_server

from gbk.server_api import app as app_api
from gbk.file_server import app as app_file
from gbk.config import config
from gbk.scheduler import scheduler

# 代理到当前hot-update
# app_file = ProxyMiddleware(app_file, {
#     '/running': {
#         "target": "http://localhost:3000/"
#     },
#     '/static': {
#         "target": "http://localhost:3000/"
#     }
# })

# API性能测试
# app_api.wsgi_app = ProfilerMiddleware(app_api, profile_dir="./tmp")

# 中间件
dm = DispatcherMiddleware(app_file,
                          {
                              config.data.get('api_prefix', '/api/v1'): app_api
                          }
                          )


def run_scheduler():
    scheduler.run()


if __name__ == '__main__':
    # 启动运行线程
    t = threading.Thread(target=run_scheduler)
    t.setDaemon(True)
    t.start()
    config.thread = t
    # app.run("0.0.0.0", port=int(os.environ.get('PORT', '8000')), debug=False)
    run_simple('0.0.0.0', int(os.environ.get('PORT', '8000')), dm, use_reloader=True)
    # run_simple('0.0.0.0', int(os.environ.get('PORT', '8000')), dm, use_reloader=False)
    # app_api.root_path = '/api/v1/'
    # run_simple('0.0.0.0', int(os.environ.get('PORT', '8000')), app_api, use_reloader=False)
    # app_api.run("0.0.0.0", port=int(os.environ.get('PORT', '8000')), debug=False)
    # httpd = make_server('', int(os.environ.get('PORT', '8000')), app_api)
    # httpd.serve_forever()
