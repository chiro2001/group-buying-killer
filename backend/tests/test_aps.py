import time
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers import interval, combining, date

# The "apscheduler." prefix is hard coded
scheduler = BackgroundScheduler({
    'apscheduler.jobstores.default': {
        'type': 'mongodb'
    },
    'apscheduler.executors.default': {
        'class': 'apscheduler.executors.pool:ThreadPoolExecutor',
        'max_workers': '20'
    },
    'apscheduler.executors.processpool': {
        'type': 'processpool',
        'max_workers': '3'
    },
    'apscheduler.job_defaults.coalesce': 'false',
    'apscheduler.job_defaults.max_instances': '10',
    'apscheduler.timezone': 'UTC',
})


def my_job(*args, **kwargs):
    print(args, kwargs)


if __name__ == '__main__':
    scheduler.print_jobs()
    kws = {
        'seconds': 2
    }
    scheduler.add_job(my_job, id='my_job', trigger='interval', replace_existing=True, **kws, args=(1, 2), kwargs={
        'a': 3, 'b': 4
    })
    jobs = scheduler.get_jobs()
    print('jobs', jobs)
    for j in jobs:
        print(j)
    scheduler.start()
    while True:
        time.sleep(1)
        # exit(0)
