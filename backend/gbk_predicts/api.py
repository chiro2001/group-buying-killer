from utils.api_tools import *
from gbk_predicts.predicts import predicts


class Predicts(Resource):
    args_predicts = reqparse.RequestParser() \
        .add_argument("小包最低价", type=list, required=True, location=['json', ]) \
        .add_argument("小包最高价", type=list, required=True, location=['json', ]) \
        .add_argument("中包最低价", type=list, required=True, location=['json', ]) \
        .add_argument("中包最高价", type=list, required=True, location=['json', ]) \
        .add_argument("大包最低价", type=list, required=True, location=['json', ]) \
        .add_argument("大包最高价", type=list, required=True, location=['json', ])

    # predicts
    @args_required_method(args_predicts)
    @auth_required_method
    def post(self):
        data = self.args_login.parse_args()
        res = predicts(data)
        return make_result(data=res)
