import os
from flask import *
import threading
from werkzeug.middleware.dispatcher import DispatcherMiddleware
from werkzeug.serving import run_simple

from gbk.server_api import app as app_api
from gbk.file_server import app as app_file
from gbk.config import config
from gbk.scheduler import Scheduler

# 中间件
dm = DispatcherMiddleware(app_file,
                          {
                              config.data.get('api_prefix', '/api/v1'): app_api
                          }
                          )

s = Scheduler()


def run_scheduler():
    s.run()


if __name__ == '__main__':
    # 启动运行线程
    t = threading.Thread(target=run_scheduler)
    t.setDaemon(True)
    # t.start()
    config.thread = t
    # app.run("0.0.0.0", port=int(os.environ.get('PORT', '8000')), debug=False)
    # run_simple('0.0.0.0', int(os.environ.get('PORT', '8000')), dm, use_reloader=True)
    run_simple('0.0.0.0', int(os.environ.get('PORT', '8000')), dm, use_reloader=False)
