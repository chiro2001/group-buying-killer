from gbk.utils import logger


class GBKBaseError(Exception):
    def __init__(self, data):
        self.data = data
        logger.error(self.__str__())

    def __str__(self):
        return f"Error: {self.__class__.__name__} : {self.data}"


class GBKPermissionError(GBKBaseError):
    pass


class GBKShopIdError(GBKBaseError):
    pass


class GBKError(GBKBaseError):
    pass
