class Shop:
    url = 'https://e.dianping.com/merchant/portal/common/cityshop'

    def __init__(self, request_func):
        self.request_func = request_func
        self.shop_id = None

    def get_shop_id(self):
        js = self.request_func(self.url)
        self.shop_id = js['data']['currentShopId']
        return self.shop_id

