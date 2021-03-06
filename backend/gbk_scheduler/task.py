from gbk_scheduler.action import *
from apscheduler.schedulers.background import BackgroundScheduler
# from apscheduler.triggers import interval, cron, date
from apscheduler.triggers.interval import IntervalTrigger
from apscheduler.triggers.date import DateTrigger
from apscheduler.triggers.cron import CronTrigger
from gbk_database.config import Constants
from gbk_database.database import db
from utils.formats import task_data_encode, task_data_decode
from utils.make_result import limit_list
from utils.logger import logger

scheduler = BackgroundScheduler(**Constants.SCHEDULE_CONFIG)

trigger_types = {
    'interval': IntervalTrigger,
    'date': DateTrigger,
    'cron': CronTrigger
}


def get_trigger_name_from_dict(trigger: dict):
    return 'interval' if 'interval' in trigger else 'date' if 'run_date' in trigger else 'cron'


def get_trigger_name_from_instance(trigger):
    return 'interval' if isinstance(trigger, IntervalTrigger) else 'date' if isinstance(trigger,
                                                                                        DateTrigger) else 'cron'


class Task:
    def __init__(self, tid: int = None, name: str = None, triggers: list = None, actions: list = None):
        self.triggers, self.actions = triggers if triggers is not None else [], actions if actions is not None else []
        # 全部参数都是空的时候不拿新的 tid
        self.tid = tid if (not (tid is None and name is None and
                                triggers is None and actions is None)) else db.task_manager.get_next_tid()
        self.task_name = name if name is not None else self.get_name_by_actions()
        self._name = name
        self.jobs = []

    def get_name_by_actions(self):
        return '_'.join(
            [f'{action.action_type}#{("H" + str(action.__hash__())[-4:]) if self.tid is None else self.tid}' for action
             in self.actions])

    def enable(self):
        if len(self.jobs) > 0:
            self.disable()
        # 保证每一个trigger都会触发所有action
        for i in range(len(self.actions)):
            for j in range(len(self.triggers)):
                trigger_args = self.triggers[j].__getstate__()
                if 'version' in trigger_args:
                    del trigger_args['version']
                job = scheduler.add_job(self.actions[i].exec, self.triggers[j])
                # logger.warning(f'trigger: {self.triggers[j]}')
                # logger.warning(f'trigger_args: {trigger_args}')
                # logger.warning(f'job: {job}')
                self.jobs.append(job)
        # logger.warning(f'enable jobs: {self.jobs}')
        return self

    def disable(self):
        # logger.warning(f'disable jobs: {self.jobs}')
        for job in self.jobs:
            # logger.warning(f'removing job: {job}')
            scheduler.remove_job(job_id=job.id)
        self.jobs = []
        return self

    def add_trigger(self, trigger):
        self.triggers.append(trigger)
        return self

    def add_action(self, action):
        self.actions.append(action)
        if self._name is None:
            self.task_name = self.get_name_by_actions()
        return self

    def get_task_data(self):
        return self.__getstate__()

    def set_task_data(self, data: dict):
        self.__setstate__(data)

    @staticmethod
    def from_task_data(data: dict):
        task = Task()
        task.set_task_data(data)
        return task

    def __getstate__(self):
        return {
            'triggers': [trigger.__getstate__() for trigger in self.triggers],
            'actions': [action.__getstate__() for action in self.actions],
            'task_name': self.task_name,
            'tid': self.tid
        }

    def __setstate__(self, state: dict):
        if 'triggers' in state:
            self.triggers = [trigger_types[get_trigger_name_from_dict(trigger)]() for trigger in state['triggers']]
            for i in range(len(state['triggers'])):
                data = task_data_decode(state['triggers'][i])
                # logger.warning(f"self.triggers[i]: {self.triggers[i]}, data: {data}, state['triggers'][i]: {state['triggers'][i]}")
                data_default = self.triggers[i].__getstate__()
                # logger.warning(f'data        : {data}')
                # logger.warning(f'data_default: {data_default}')
                data_default.update(data)
                self.triggers[i].__setstate__(data_default)
        if 'actions' in state:
            self.actions = [action_types[action['action_type']]() for action in state['actions']]
            for i in range(len(state['actions'])):
                self.actions[i].__setstate__(task_data_decode(state['actions'][i]))
        if 'task_name' in state:
            self.task_name = state['task_name']
        else:
            self.task_name = self.get_name_by_actions()
        if 'tid' in state:
            self.tid = state['tid']
        return self

    def __repr__(self):
        return str(self.__getstate__())


class TaskManager:
    """
    单个用户的任务管理器
    """

    def __init__(self, uid: int):
        self.uid = uid
        self.tasks = []
        self.enabled = False
        self.load()

    def find_task_by_tid(self, tid: int):
        for task in self.tasks:
            if task.tid == tid:
                return task
        return None

    def add_task(self, task: Task):
        # logger.warning(f'before insert {self}, {task}')
        if self.enabled:
            task.enable()
        self.tasks.append(task)
        self.save()
        # logger.warning(f'after insert {self}')

    def remove_task(self, tid: int) -> bool:
        """
        移除一个任务
        :param tid:
        :return: 移除成功与否
        """
        target_index = None
        for i in range(len(self.tasks)):
            if self.tasks[i].tid == tid:
                target_index = i
                break
        if target_index is None:
            return False
        # logger.warning(
        #     f'will disable {self.tasks[target_index].tid} job: {self.tasks[target_index].jobs}, {self.tasks[target_index]}')
        self.tasks[target_index].disable()
        del self.tasks[target_index]
        self.save()
        return True

    def enable_all(self):
        if self.enabled:
            return
        [task.enable() for task in self.tasks]
        self.enabled = True

    def disable_all(self):
        if not self.enabled:
            return
        [task.disable() for task in self.tasks]
        self.enabled = False

    def get_tasks_data(self, offset: int = None, limit: int = None):
        data = self.__getstate__(offset=offset, limit=limit)
        data = task_data_encode(data)
        return data

    def set_tasks_data(self, data: dict):
        data = task_data_decode(data)
        self.__setstate__(data)

    def save(self):
        data = self.get_tasks_data()
        db.task_manager.save(self.uid, data)
        # Fix: 只会运行一个任务
        # self.set_tasks_data(data)

    def load(self):
        data = db.task_manager.load(self.uid)
        if data is not None:
            task_data_decode(data)

    def erase(self):
        # logger.warning(f'erasing {self.uid}')
        db.task_manager.remove(self.uid)

    def empty(self) -> bool:
        # logger.warning(f'empty? {len(self.tasks) == 0}')
        return len(self.tasks) == 0

    def __getstate__(self, offset: int = None, limit: int = None):
        # print('tasks', self.tasks, [task.__getstate__() for task in self.tasks])
        return {
            'enabled': self.enabled,
            'tasks': limit_list([task.__getstate__() for task in self.tasks], offset=offset, limit=limit)
        }

    def __setstate__(self, state: dict):
        # self.enabled = state.get('enabled', False)
        self.enabled = False
        self.tasks = [Task.from_task_data(task) for task in state.get('tasks', [])]
        # logger.warning(f'state: {state}, TaskManager tasks: {self.tasks}')
        if self.enabled:
            self.enable_all()
        return self

    def __repr__(self):
        return str(self.__getstate__())


class TaskPool:
    """
    管理所有用户的任务池子
    """

    def __init__(self):
        self.pool = {}
        self.enabled = False
        self.load_all()

    def enable(self):
        if self.enabled:
            return
        self.enabled = True
        for uid in self.pool:
            self.pool[uid].enable_all()

    def disable(self):
        if not self.enabled:
            return
        self.enabled = False
        for uid in self.pool:
            self.pool[uid].disable_all()

    def add_task(self, uid: int, task: Task) -> int:
        if uid not in self.pool:
            self.pool[uid] = TaskManager(uid=uid)
            if self.enabled:
                self.pool[uid].enable_all()
        # logger.warning(f'will done {self.pool[uid]}')
        self.pool[uid].add_task(task)
        # logger.warning(f'add done {self.pool[uid]}')
        return task.tid if task.tid is not None else -1

    def remove_task(self, uid: int, tid: int) -> bool:
        if uid not in self.pool:
            return False
        res = self.pool[uid].remove_task(tid)
        if self.pool[uid].empty():
            self.pool[uid].disable_all()
            self.pool[uid].erase()
            del self.pool[uid]
        return res

    def get_manager(self, uid: int):
        # print(self.pool)
        return self.pool[uid] if uid in self.pool else None

    def __getstate__(self):
        state = {
            'enabled': self.enabled,
            'pool': {}
        }
        for k in self.pool:
            state['pool'][k] = self.pool[k].__getstate__()
        return state

    def __setstate__(self, state: dict):
        # self.enabled = state.get('enabled', False)
        self.enabled = False
        self.pool = state.get('pool', {})
        # logger.warning(f'pool: {self.pool}')
        for k in self.pool:
            self.pool[k] = TaskManager(self.pool[k].get('uid', -1)).__setstate__(self.pool[k]['data'])
        return self

    def load_all(self):
        all_data = db.task_manager.get_all()
        # logger.warning(f'all_data: {all_data}')
        self.__setstate__({
            'pool': all_data
        })

    def __repr__(self):
        return str(self.__getstate__())


task_pool = TaskPool()
