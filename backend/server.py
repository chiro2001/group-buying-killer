import os
from flask import *
import threading
import logging
import webbrowser

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
from gbk.utils import logger, get_ip_info, find_chrome_path, find_chrome_driver_path
from gbk.login import browser_init

# 只显示错误消息
logger_werkzeug = logging.getLogger('werkzeug')
logger_werkzeug.setLevel(logging.ERROR)

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
    port = int(os.environ.get("PORT", '8000'))

    mode = 'standalone'
    logger.info(f'Your IPs: {get_ip_info()}')
    browser = None

    # standalone 模式是指单独运行Python，Python负责后端响应
    if mode == 'standalone':
        logger.info('Opening browser...')
        url = f"http://localhost:{port}"
        logger.info(f'Please visit {url}')
        # webbrowser.open(f'http://localhost:{port}')
        # chrome_path = find_chrome_path()
        # os.system(f"{chrome_path} {url}")
        logger.info(os.path.abspath(os.curdir))
        logger.info(os.path.abspath(find_chrome_driver_path()))
        browser = browser_init()
        browser.get(url)
        browser.implicitly_wait(3)

    run_simple('0.0.0.0', port, dm, use_reloader=False)
