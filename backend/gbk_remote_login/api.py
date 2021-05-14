from utils.api_tools import *
# import re


class RemoteLoginAPI(Resource):
    args_set_cookies = reqparse.RequestParser().add_argument("cookies", type=str, required=True, location=["json", ])

    def get(self):
        """
        获取远程服务器信息
        :return:
        """
        url = f"{Constants.LOGIN_SERVER_PROTOCOL}://{Constants.LOGIN_SERVER_HOST}:{Constants.LOGIN_SERVER_PORT}"
        return make_result(data={
            'server': url,
            'servers': [
                {
                    'url': url
                }
            ]
        })

    @args_required_method(args_set_cookies)
    @auth_required_method
    def post(self, uid: int):
        """
        设置 Cookies
        :param uid:
        :return:
        """
        cookies = self.args_set_cookies.parse_args().get('cookies')
        # cookies = "edper=pEe5_IensPI6FQe7XlI05VNmxdON9OXQc-s6yrNUjxmi4m2GmyXqSAUzdsVslIsYb9bGmcCRhmQ1A1Zdj6eVDA; Domain=.dianping.com; Path=/; HttpOnly"
        # 检查格式，提取
        # result = re.findall(r'edper=[^;] Domain=.dianping.com; Path=/; HttpOnly', cookies)
        # if len(result) == 0:
        #     return make_result(400)
        if not (cookies[:6] == "edper=" and cookies[6 + 86:] == "; Domain=.dianping.com; Path=/; HttpOnly"):
            return make_result(400)
        cookies = cookies[:-39]
        print(cookies)
        db.daemon.save(uid, cookies, data_type='cookies')
        return make_result()
