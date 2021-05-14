from utils.api_tools import *
from gbk_scheduler.task import *


class TaskManagerAPI(Resource):
    args_task = reqparse.RequestParser().add_argument("task", type=dict, required=True, location=["json", ])

    @args_required_method(args_selector)
    @auth_required_method
    def get(self, uid: int):
        """
        获取当前所有任务
        :return:
        """
        args = args_selector.parse_args()
        # 从数据库读取
        # tasks_data = db.task_manager.get_raw(uid).get('data')
        # 从内存获取
        manager: TaskManager = task_pool.get_manager(uid)
        if manager is None:
            # logger.warning('got none manager')
            manager = TaskManager(uid)
        tasks_data = manager.get_tasks_data(offset=args.get('offset', None), limit=args.get('limit', None))
        return make_result(data=tasks_data)

    @args_required_method(args_task)
    @auth_required_method
    def post(self, uid: int):
        """
        添加新任务
        :param uid:
        :return:
        """
        task_data = self.args_task.parse_args().get('task')
        task = Task.from_task_data(task_data)
        logger.warning(f'task: {task}')
        tid = task_pool.add_task(uid, task)
        return make_result(data={
            'tid': tid
        })


class TaskManagerTid(Resource):
    @auth_required_method
    def get(self, uid: int, tid: int):
        """
        获取任务信息
        :param uid:
        :param tid:
        :return:
        """
        # 从数据库拿
        # manager: TaskManager = db.task_manager.get_raw(uid)
        # 从内存拿
        manager: TaskManager = task_pool.get_manager(uid)
        if manager is None:
            return make_result(400, message="manager not found")
        task: Task = manager.find_task_by_tid(tid)
        if task is None:
            return make_result(400, message="task not found")
        return make_result(data=task_data_encode(task.__getstate__()))

    @auth_required_method
    def delete(self, uid: int, tid: int):
        manager: TaskManager = task_pool.get_manager(uid)
        if manager is None:
            return make_result(400, message="manager not found")
        if not task_pool.remove_task(tid=tid, uid=uid):
            return make_result(400, message="task not found")
        return make_result()
