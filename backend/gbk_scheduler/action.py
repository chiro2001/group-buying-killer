from data_apis.api import API
from gbk_daemon.daemon import daemon, DaemonBean
from gbk_database.tools import *


class Action:
    def __init__(self, *args, **kwargs):
        self.args, self.kwargs = args, kwargs
        self.action_type = 'base'
        self.uid = kwargs.get('uid')
        # if self.uid is None:
        #     logger.warning('git empty uid')

    def __getstate__(self):
        return self.__dict__

    def __setstate__(self, state: dict):
        self.action_type = state.get('action_type', self.action_type)
        self.args = state.get('args', self.args)
        self.kwargs = state.get('kwargs', self.kwargs)
        self.uid = state.get('uid')

    def get_self_name(self):
        return f"#{self.__class__.__name__}{str(self.__hash__())[-4:]}"


class ActionSimpleRun(Action):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.action_type = 'simple_run'
        self.running = False
        # logger.warning(f"constructor: {__class__.__name__}")

    def __setstate__(self, state):
        super(ActionSimpleRun, self).__setstate__(state)

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
        self.action_type = 'adjust_price'
        self.target_price = kwargs.get('price', None)
        if self.target_price is None:
            logger.warning('got empty price!')
            self.target_price = 0
        self.item_id = kwargs.get('item_id')
        if self.item_id is None:
            logger.warning('got empty item_id')
            self.item_id = 0
        # TODO: 设置ActionPrice时候需要设置额外参数
        self.periodDesc: str = kwargs.get('periodDesc')
        self.roomName: str = kwargs.get('roomName')

    def exec(self):
        logger.info(f'adjusting price to {self.target_price}')
        if self.uid is None:
            raise GBKError(f"Empty uid")
        daemon_bean: DaemonBean = daemon.get_daemon(self.uid, init_new=True)
        api: API = daemon_bean.get_api()
        resp = api.ktv.update_price(item_id=self.item_id, price=self.target_price)
        logger.debug(f'{self.get_self_name()}: resp = {resp}')

    def __setstate__(self, state: dict):
        super(ActionPriceAdjust, self).__setstate__(state)
        self.target_price = state.get('target_price')
        self.item_id = state.get('item_id')
        self.periodDesc = state.get('periodDesc')
        self.roomName = state.get('roomName')


action_types = {
    'base': Action,
    'simple_run': ActionSimpleRun,
    'adjust_price': ActionPriceAdjust
}

# 能够让用户操作的Action
action_names_available = {
    'adjust_price': "调整价格action"
}

action_desc = {
    'adjust_price': "利用此Action可以调整价格到目标价格，或者设定价格上调、下调目标。"
}

action_names = {
    'base': "基础action",
    'simple_run': "简单action",
    'adjust_price': "调整价格action"
}
