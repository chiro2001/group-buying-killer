from apscheduler.triggers.interval import IntervalTrigger
from werkzeug.middleware.dispatcher import DispatcherMiddleware
from werkzeug.serving import run_simple
# import logging
from io import StringIO
from utils.logger import logger
from gbk_database.config import config, Constants

from gbk_proxy.file_static import app as app_file
from gbk_api.main_api import app as app_api
from gbk_scheduler.task import scheduler, Task, ActionSimpleRun, task_manager

# 只显示错误消息
# logger_werkzeug = logging.getLogger('werkzeug')
# logger_werkzeug.setLevel(logging.ERROR)

api_prefix = config.data.get('api_prefix', '/api/v2')

# 中间件
dm = DispatcherMiddleware(app_file, {api_prefix: app_api})

if __name__ == '__main__':
    host, port = Constants.RUN_LISTENING, Constants.RUN_PORT
    logger.info(f'server started on http://{host}:{port}, API: http://{host}:{port}{api_prefix}')
    task_manager.add_task(Task().add_trigger(IntervalTrigger(seconds=1)).add_action(ActionSimpleRun(1, 2, a=3)))
    task_manager.enable()
    logger.info('scheduler tasks: ')
    f = StringIO()
    scheduler.print_jobs(out=f)
    f.seek(0)
    jobs_data = f.readlines()
    for line in jobs_data:
        logger.info(line[:-1])
    scheduler.start()
    run_simple(host, port, dm, use_reloader=False)
