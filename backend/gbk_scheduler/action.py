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


class ActionSimpleRun(Action):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.action_type = 'simple_run'

    def exec(self):
        print(self.__getstate__())
        print(self.args, self.kwargs)


action_types = {
    'base': Action,
    'simple_run': ActionSimpleRun
}
