import os
from flask import Flask
from flask_cors import CORS
from gbk.make_result import *
from gbk.config import config
from gbk.utils import logger

app = Flask(__name__)
# 设置可跨域访问
CORS(app, supports_credentials=True)


@app.route("/")
def index():
    return make_result(data={
        'description': f'GroupBuyingKiller API v{config.data.get("version", None)}',
        'apis': {
            '/': {
                "description": 'Index and description of the API'
            }
        }
    })


@app.route("/test")
def test():
    return make_result(data={
        "test": True
    })


# 统一错误处理信息
@app.errorhandler(404)
def handler_404(error):
    # TODO: 添加404页面
    logger.error(f"{error}")
    return make_result(404), 404


if __name__ == '__main__':
    app.run("0.0.0.0", port=os.environ.get("PORT", 8001), debug=False)
