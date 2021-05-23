from gbk_database.database import db
from utils.logger import logger
from data_apis.api import API
from gbk_daemon.daemon import daemon


class Action:
    def __init__(self, *args, **kwargs):
        self.args, self.kwargs = args, kwargs
        self.action_type = 'base'

    def __getstate__(self):
        return self.__dict__

    def __setstate__(self, state: dict):
        self.action_type = state.get('action_type', self.action_type)
        self.args = state.get('args', self.args)
        self.kwargs = state.get('kwargs', self.kwargs)

    def get_self_name(self):
        return f"#{self.__class__.__name__}{str(self.__hash__())[-4:]}"


class ActionSimpleRun(Action):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.action_type = 'simple_run'
        self.running = False
        # logger.warning(f"constructor: {__class__.__name__}")

    def exec(self):
        logger.info(f"#{str(self.__hash__())[-4:]}, self.args: {self.args}, self.kwargs: {self.kwargs}")
        # if not self.running:
        #     # logger.info(self.__getstate__())
        #     logger.info(f"#{str(self.__hash__())[-4:]}, self.args: {self.args}, self.kwargs: {self.kwargs}")
        #     self.running = True
        # else:
        #     print('.', end='')


class ActionPriceAdjust(Action):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.action_type = 'price_adjust'
        self.target_price = kwargs.get('price', None)
        if self.target_price is None:
            logger.warning('got empty price!')
        self.uid = kwargs.get('uid')
        if self.uid is None:
            logger.warning('git empty uid')
        self.item_id = kwargs.get('item_id')
        if self.item_id is None:
            logger.warning('got empty item_id')

    def exec(self):
        logger.info(f'adjusting price to {self.target_price}')
        api: API = daemon.get_daemon(self.uid)
        resp = api.ktv.update_price(item_id=self.item_id, price=self.target_price)
        logger.debug(f'{self.get_self_name()}: resp = {resp}')


action_types = {
    'base': Action,
    'simple_run': ActionSimpleRun,
    'adjust_price': ActionPriceAdjust
}

action_names = {
    'base': "基础action",
    'simple_run': "简单action",
    'adjust_price': "调整价格action"
}

action_desc = {
    'adjust_price': "利用此Action可以调整价格到目标价格，或者设定价格上调、下调目标。"
}
