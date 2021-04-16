import sys
import os
# from flask import *
import threading
import logging
import webbrowser

from werkzeug.middleware.dispatcher import DispatcherMiddleware
from werkzeug.serving import run_simple
# from werkzeug.middleware.http_proxy import ProxyMiddleware
# from werkzeug.middleware.shared_data import SharedDataMiddleware
# from werkzeug.middleware.profiler import ProfilerMiddleware
# from wsgiref.simple_server import make_server

error_info = '遇到错误，请重新启动程序！如果错误影响使用，请联系开发人员！\n错误信息：%s\n'

from gbk.utils import logger, get_ip_info, find_chrome_path, find_chrome_driver_path
try:
    logger.info('加载设置...')
    from gbk.config import config
    logger.info('加载错误汇报服务...')
    from gbk import error_report
except Exception as e:
    logger.error(error_info % str(e))
    input('按下回车键退出')
    sys.exit(1)

try:
    logger.info('导入API服务器...')
    from gbk.server_api import app as app_api
    logger.info('导入文件服务器...')
    from gbk.file_server import app as app_file
    logger.info('导入任务管理器...')
    from gbk.scheduler import scheduler
    logger.info('导入浏览器登录程序...')
    from gbk.login import browser_init
except Exception as e:
    error_report.report_it(e)

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
    # mode = 'standalone'
    mode = 'chrome'
    url = f"http://localhost:{port}"

    try:
        logger.info(f'Your IPs: {get_ip_info()}')
        # standalone 模式是指单独运行Python，Python负责后端响应
        if mode == 'standalone':
            logger.info('正在打开外部浏览器...')
            webbrowser.open(url)
        elif mode == 'chrome':
            logger.info('正在打开内部浏览器...')
            logger.info(f'Please visit {url}')
            logger.debug(os.path.abspath(os.curdir))
            logger.debug(os.path.abspath(find_chrome_driver_path()))
            try:
                browser = browser_init()
                browser.get(url)
                browser.implicitly_wait(3)
            except Exception as e:
                logger.error(f'打开浏览器错误: {e}')
                logger.info(f'尝试调用外部浏览器打开: {url}')
                webbrowser.open(url)
        run_simple('0.0.0.0', port, dm, use_reloader=False)
    except Exception as e:
        error_report.report_it(e)
