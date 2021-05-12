import time
from gbk_scheduler.action import *
from apscheduler.schedulers.background import BackgroundScheduler
# from apscheduler.triggers import interval, cron, date
from apscheduler.triggers.interval import IntervalTrigger
from apscheduler.triggers.date import DateTrigger
from apscheduler.triggers.cron import CronTrigger
from gbk_database.config import Constants
from gbk_database.database import db
from utils.formats import pymongo_data_encode, pymongo_data_decode

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
    def __init__(self, name: str = None, triggers: list = None, actions: list = None):
        self.triggers, self.actions = triggers if triggers is not None else [], actions if actions is not None else []
        self.task_name = name if name is not None else self.get_name_by_actions()
        self._name = name
        self.jobs = []

    def get_name_by_actions(self):
        return '_'.join([f'{action.action_type}#{str(action.__hash__())[-4:]}' for action in self.actions])

    def enable(self):
        if len(self.jobs) > 0:
            self.disable()
        for i in range(len(self.actions)):
            for j in range(len(self.triggers)):
                trigger_args = self.triggers[j].__getstate__()
                if 'version' in trigger_args:
                    del trigger_args['version']
                job = scheduler.add_job(self.actions[i].exec, self.triggers[j])
                self.jobs.append(job)
        return self

    def disable(self):
        for job in self.jobs:
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

    def __getstate__(self):
        return {
            'triggers': [trigger.__getstate__() for trigger in self.triggers],
            'actions': [action.__getstate__() for action in self.actions],
            'task_name': self.task_name
        }

    def __setstate__(self, state: dict):
        if 'triggers' in state:
            self.triggers = [trigger_types[get_trigger_name_from_dict(trigger)]() for trigger in state['triggers']]
            for i in range(len(state['triggers'])):
                self.triggers[i].__setstate__(state['triggers'][i])
        if 'actions' in state:
            self.actions = [action_types[action['action_type']]() for action in state['actions']]
            for i in range(len(state['actions'])):
                self.actions[i].__setstate__(state['actions'][i])
        if 'task_name' in state:
            self.task_name = state['task_name']
        else:
            self.task_name = self.get_name_by_actions()
        return self


class TaskManager:
    def __init__(self):
        self.tasks = []
        self.enabled = False
        self.load()

    def add_task(self, task: Task):
        if self.enabled:
            task.enable()
        self.tasks.append(task)
        self.save()

    def enable(self):
        if self.enabled:
            return
        [task.enable() for task in self.tasks]
        self.enabled = True

    def disable(self):
        if not self.enabled:
            return
        [task.disable() for task in self.tasks]
        self.enabled = False

    def save(self):
        data = self.__getstate__()
        # print(data)
        data = pymongo_data_encode(data)
        # print(data)
        db.task_manager.save(data)

    def load(self):
        data = db.task_manager.load()
        # print(data)
        data = pymongo_data_decode(data)
        # print(data)
        self.__setstate__(data)

    def __getstate__(self):
        return {
            'enabled': self.enabled,
            'tasks': [task.__getstate__() for task in self.tasks]
        }

    def __setstate__(self, state: dict):
        self.enabled = state.get('enabled', False)
        self.tasks = [Task().__setstate__(task) for task in state.get('tasks', [])]
        if self.enabled:
            self.enable()
        return self


task_manager = TaskManager()

if __name__ == '__main__':
    tr = IntervalTrigger(seconds=1)
    ac = ActionSimpleRun(1, 2, a=3)
    task_manager.add_task(Task().add_trigger(tr).add_action(ac))
    r1 = task_manager.__getstate__()
    task_manager.load()
    r2 = task_manager.__getstate__()
    print(r1)
    print(r2)
    task_manager.enable()
    scheduler.start()
    while True:
        time.sleep(0.5)
