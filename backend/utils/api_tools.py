from flask_restful import Resource
from gbk_auth.tjw_auth import *
from utils.args_decorators import args_required_method
from utils.make_result import make_result
from utils.password_check import password_check
from gbk_database.config import Statics
from gbk_database.database import db
import gbk_exceptions

args_selector = reqparse.RequestParser() \
    .add_argument("limit", type=int, required=False, location=["args", ]) \
    .add_argument("offset", type=int, required=False, location=["args", ])
