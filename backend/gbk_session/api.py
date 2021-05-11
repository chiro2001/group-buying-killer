from flask_restful import Resource
from gbk_auth.tjw_auth import *
from gbk_database.config import Statics
from gbk_database.database import db
from utils.args_decorators import args_required_method
from utils.make_result import make_result


class Session(Resource):
    args_login = reqparse.RequestParser() \
        .add_argument("username", type=str, required=True, location=["json", ]) \
        .add_argument("password", type=str, required=True, location=["json", ])
    args_update = reqparse.RequestParser() \
        .add_argument("refresh_token", type=str, required=True, location=["json", ])
    args_update_password = reqparse.RequestParser() \
        .add_argument("password")

    # Login
    @args_required_method(args_login)
    def post(self):
        args = self.args_login.parse_args()
        username, password = args.get('username'), args.get('password')
        user = db.user.find_by_username(username=username)
        if user is None:
            return make_result(403)
        uid = user.get('uid')
        result = db.session.check_password(uid=uid, password=password)
        if not result:
            return make_result(403)
        db.session.update_login(uid)
        token_payload = {'uid': uid}
        access_token = create_access_token(token_payload)
        refresh_token = create_refresh_token(token_payload)
        return make_result(data={'access_token': access_token, 'refresh_token': refresh_token})

    # 更新密码
    @args_required_method(args_update_password)
    def put(self, uid: int):
        password = self.args_update_password.parse_args().get('password')
        if not db.session.update_one(uid, password):
            return make_result(400)
        return make_result()

    @args_required_method(args_update)
    def get(self):
        """
        更新 access_token
        :return:
        """
        refresh_token = self.args_update.parse_args().get('refresh_token')
        try:
            data = Statics.tjw_refresh_token.loads(refresh_token)
        except (BadSignature, BadData, BadHeader, BadPayload) as e:
            return make_result(422, message=f"Bad token: {e}")
        except BadTimeSignature:
            return make_result(424)
        uid = data.get('uid')
        payload = {
            'uid': uid
        }
        access_token = create_access_token(payload)
        refresh_token_new = create_refresh_token(payload)
        return make_result(data={
            'access_token': access_token,
            'refresh_token': refresh_token_new
        })

    @auth_required_method
    def delete(self, uid: int):
        """
        注销
        :return:
        """
        return make_result()
