from werkzeug.middleware.dispatcher import DispatcherMiddleware
from werkzeug.serving import run_simple
import logging
from utils.logger import logger
from gbk_database.config import config, Constants

from gbk_proxy.file_static import app as app_file
from gbk_api.main_api import app as app_api

# 只显示错误消息
# logger_werkzeug = logging.getLogger('werkzeug')
# logger_werkzeug.setLevel(logging.ERROR)

api_prefix = config.data.get('api_prefix', '/api/v2')

# 中间件
dm = DispatcherMiddleware(app_file,
                          {
                              api_prefix: app_api
                          }
                          )

if __name__ == '__main__':
    host, port = Constants.RUN_LISTENING, Constants.RUN_PORT
    logger.info(f'server started on http://{host}:{port}, API: http://{host}:{port}{api_prefix}')
    run_simple(host, port, dm, use_reloader=False)
