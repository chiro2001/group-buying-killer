class RoomsStock:
    url_base = 'https://e.dianping.com/ktv/api/'
    url_load_price_table = url_base + 'loadpricetable.wbc?shopid=%s'  # 参数：shopid

    def __init__(self, request_func):
        self.request_func = request_func
        self.shop_id = 0
        self.room_stock_data = []

    def set_shop_id(self, shop_id):
        self.shop_id = shop_id

    def get_room_stock(self):
        resp = self.request_func(self.url_load_price_table % self.shop_id)
        self.room_stock_data = resp['data']
        return resp
