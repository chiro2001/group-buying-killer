import os
import json
from gbk.beans import *

class Config:
    FILE_NAME = "kp.json"
    FILE_PATH = '.'

    def __init__(self):
        self.data_default = {
            "debug": True,
            "version": 0.1,
            "timetable_node": {
                "upgradable": False,
                "data": []
            },
            "timetable_period": {
                "upgradable": False,
                "data": []
            },
            "room_stock_plan": {
                "upgradable": False,
                "data": []
            }
        }
        self.data = self.data_default
        self.timetable_node = []
        self.timetable_period = []
        self.room_stock_plan = []
        self.load()

    def load(self):
        try:
            with open(os.path.join(Config.FILE_PATH, Config.FILE_NAME), "r") as f:
                data = json.load(f)
                if data['debug']:
                    self.data = self.data_default
                    self.save()
                if data['version'] < self.data_default['version']:
                    for k in self.data_default:
                        if type(self.data_default[k]) is dict and 'upgradable' in self.data_default[k]:
                            self.data[k] = self.data_default[k]
                    self.save()
                try:
                    timetable_node = [TimeTableNode.from_json(t) for t in data['timetable_node']['data']]
                except KeyError:
                    logger.warning('unable to load timetable_node!')
                    timetable_node = []
                self.timetable_node = timetable_node
                try:
                    timetable_period = [TimeTablePeriod.from_json(t) for t in data['timetable_period']['data']]
                except KeyError:
                    logger.warning('unable to load timetable_period!')
                    timetable_period = []
                self.timetable_period = timetable_period
                try:
                    room_stock_plan = [RoomStockPlanNode.from_json(t) for t in data['room_stock_plan']['data']]
                except KeyError:
                    logger.warning('unable to load room_stock_plan!')
                    room_stock_plan = []
                self.room_stock_plan = room_stock_plan
        except KeyError or json.decoder.JSONDecodeError:
            logger.error("Err loading.")
            self.data = self.data_default
        except FileNotFoundError:
            logger.info("Using default loader")
            self.data = self.data_default

    def save(self):
        timetable_node = [t.to_dict() for t in self.timetable_node]
        self.data['timetable_node']['data'] = timetable_node
        with open(os.path.join(Config.FILE_PATH, Config.FILE_NAME), "w") as f:
            json.dump(self.data, f)
