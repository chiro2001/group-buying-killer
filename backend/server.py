from utils.logger import logger
import platform

try:
    import flask.scaffold

    flask.helpers._endpoint_from_view_func = flask.scaffold._endpoint_from_view_func
except Exception as e:
    if platform.system() == 'Linux':
        logger.error(f'Maynot start without flask.scaffold!')
import flask_restful

from apscheduler.triggers.interval import IntervalTrigger
from werkzeug.middleware.dispatcher import DispatcherMiddleware
from werkzeug.serving import run_simple
# import logging
from io import StringIO
from gbk_database.config import config, Constants

from gbk_proxy.file_static import app as app_file
from gbk_api.main_api import app as app_api
from gbk_scheduler.task import scheduler, task_pool
# from gbk_remote_login.start_server import start_server
from start_modules import start_all

# 只显示错误消息
# logger_werkzeug = logging.getLogger('werkzeug')
# logger_werkzeug.setLevel(logging.ERROR)

api_prefix = config.data.get('api_prefix', '/api/v2')

# 中间件
dm = DispatcherMiddleware(app_file, {api_prefix: app_api})

if __name__ == '__main__':
    host, port = Constants.RUN_LISTENING, Constants.RUN_PORT
    logger.info(f'server started on http://{host}:{port}, API: http://{host}:{port}{api_prefix}')
    logger.info('launching modules...')
    # start_server()
    start_all()
    scheduler.start()
    # logger.info(f'task pool: {task_pool}')
    task_pool.enable()
    logger.info(f'enabled pool: {task_pool}')
    logger.info('scheduler tasks: ')
    f = StringIO()
    scheduler.print_jobs(out=f)
    f.seek(0)
    jobs_data = f.readlines()
    for line in jobs_data:
        logger.info(line[:-1])
    run_simple(host, port, dm, use_reloader=False)
