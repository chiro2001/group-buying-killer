from apscheduler.triggers.interval import IntervalTrigger

from gbk_scheduler.task import Task, ActionFetchTradeData, ActionFetchFlowData

sys_tasks = {
    'sys_trade_data': Task(name="sys_trade_data",
                           actions=[ActionFetchTradeData(), ],
                           triggers=[IntervalTrigger(seconds=1.21), ]),
    'sys_flow_data': Task(name="sys_flow_data",
                          actions=[ActionFetchFlowData(), ],
                          triggers=[IntervalTrigger(seconds=5.2), ])
}
