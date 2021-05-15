from utils.api_tools import *
from gbk_daemon.daemon import daemon, DaemonBean


class DaemonAPI(Resource):
    @auth_required_method
    def get(self, uid: int):
        """
        获取deamon
        :param uid:
        :return:
        """
        d: DaemonBean = daemon.get_daemon(uid)
        if d is None:
            return make_result(200, message='has not remote login yet')
        return make_result(200, data=d.__getstate__())
