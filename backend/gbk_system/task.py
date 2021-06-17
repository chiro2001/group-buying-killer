from apscheduler.triggers.interval import IntervalTrigger

from gbk_scheduler.task import Task, Constants
from gbk_system.action import ActionFetchTradeData, ActionFetchFlowData, ActionBackupData

sys_tasks_delays = Constants.RUN_TASKS_DELAYS

sys_tasks = {
    'sys_trade_data': Task(name="sys_trade_data",
                           actions=[ActionFetchTradeData(), ],
                           triggers=[IntervalTrigger(seconds=sys_tasks_delays['sys_trade_data']), ]),
    'sys_flow_data': Task(name="sys_flow_data",
                          actions=[ActionFetchFlowData(), ],
                          triggers=[IntervalTrigger(seconds=sys_tasks_delays['sys_flow_data']), ]),
    'sys_backup': Task(name="sys_backup",
                       actions=[ActionBackupData(), ],
                       triggers=[IntervalTrigger(seconds=sys_tasks_delays['sys_backup']), ]),
}

if __name__ == '__main__':
    ActionBackupData().exec()
