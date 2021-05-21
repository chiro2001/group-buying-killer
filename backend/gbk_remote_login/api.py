from utils.api_tools import *
from gbk_daemon.daemon import daemon, DaemonBean


class RemoteLoginAPI(Resource):
    args_set_cookies = reqparse.RequestParser().add_argument("cookies", type=str, required=True, location=["json", ])

    @auth_required_method
    def get(self, uid: int):
        """
        检查远程登录状态
        """
        d: DaemonBean = daemon.get_daemon(uid)
        if d is None:
            return make_result(200, message='has not remote login yet')
        return make_result(200, data=d.__getstate__())

    def patch(self):
        """
        获取远程服务器信息
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
        """
        cookies = self.args_set_cookies.parse_args().get('cookies')
        # cookies = "edper=pEe5_IensPI6FQe7XlI05VNmxdON9OXQc-s6yrNUjxmi4m2GmyXqSAUzdsVslIsYb9bGm
        # cCRhmQ1A1Zdj6eVDA; Domain=.dianping.com; Path=/; HttpOnly"
        # 检查格式，提取
        # result = re.findall(r'edper=[^;] Domain=.dianping.com; Path=/; HttpOnly', cookies)
        # if len(result) == 0:
        #     return make_result(400)
        if not (cookies[:6] == "edper=" and cookies[6 + 86:] == "; Domain=.dianping.com; Path=/; HttpOnly"):
            return make_result(400)
        cookies = cookies[:-39]
        # TODO: 更新Cookie之后更新Daemon状态
        # print(cookies)
        db.daemon.save(uid, cookies, data_type='cookies')
        if daemon.get_daemon(uid) is None:
            daemon.pool[uid] = daemon.init_data(uid, cookies=cookies)
        return make_result()
