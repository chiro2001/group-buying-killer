import time
from gbk.scheduler import Scheduler
from gbk.beans import *

if __name__ == '__main__':
    s = Scheduler()
    s.add_timetable_node(TimeTableNode(RoomItem(0, 0, 0, 0, 0, 0, 0), 0, 0, 0, fmt_time(time.time() * 1000), 0))
    s.run()
