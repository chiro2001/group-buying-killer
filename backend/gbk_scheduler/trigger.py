from datetime import datetime


class BaseTrigger:
    def __init__(self, rigger_type: str):
        self.trigger_type: str = 'base'

    def __getstate__(self):
        return self.__dict__


class StockTrigger(BaseTrigger):
    def __init__(self):
        super().__init__(rigger_type='stock')
        start_date: datetime = datetime.now()
        end_date: datetime = None
        value: int = 5
        operator: str = '>'
