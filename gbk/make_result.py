from flask import *


class ResultCodeMessage:
    def __init__(self, code, message):
        self.code, self.message = code, message


class ResultRules:
    code_message = {
        200: "OK",
        404: "The Requested URL Was Not Found",
        500: "Internal Server Error"
    }


def make_result(code=200, message=None, data=None):
    result = {
        'code': code,
        'message': message if message is not None else ResultRules.code_message.get(code, "Unknown Error")
    }
    if data is not None:
        result['data'] = data
    return jsonify(result)
