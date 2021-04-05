class GBKBaseError(Exception):
    def __init__(self, data):
        self.data = data


class GBKPermissionError(GBKBaseError):
    pass
