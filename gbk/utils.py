import binascii
from pyDes import des, CBC, PAD_PKCS5
import logging
from colorlog import ColoredFormatter
import os
import sys
import time
import datetime
import re
import psutil


# from gbk.config import config


# 时间单位默认为毫秒，但是末尾请使用000
# 时间被更新为最近下一次的时间
def fmt_time(time_stamp) -> int:
    return int(time_stamp / 1000) * 1000


def des_encrypt(secret_key, s):
    iv = secret_key
    k = des(secret_key, CBC, iv, pad=None, padmode=PAD_PKCS5)
    en = k.encrypt(s, padmode=PAD_PKCS5)
    en = binascii.b2a_hex(en)
    if type(en) is not str:
        en = en.decode(encoding='utf8', errors='ignore')
    return en


def des_decrypt(secret_key, s):
    iv = secret_key
    k = des(secret_key, CBC, iv, pad=None, padmode=PAD_PKCS5)
    de = k.decrypt(binascii.a2b_hex(s), padmode=PAD_PKCS5)
    if type(de) is not str:
        de = de.decode(encoding='utf8', errors='ignore')
    return de


# secret_str = des_encrypt('12345678', 'I love YOU~')
# print(secret_str)
# clear_str = des_decrypt('12345678', secret_str)
# print(clear_str)


def get_logger(name=__name__):
    logger_base = logging.getLogger(name)
    logger_base.setLevel(logging.DEBUG)
    stream_handler = logging.StreamHandler()
    color_formatter = ColoredFormatter('%(log_color)s[%(module)-15s][%(funcName)-15s][%(levelname)-7s] %(message)s')
    stream_handler.setFormatter(color_formatter)
    logger_base.addHandler(stream_handler)
    return logger_base


logger = get_logger(__name__)


def get_net_info():
    net_info = []
    info = psutil.net_if_addrs()
    for k, v in info.items():
        for item in v:
            if item[0] == 2 and not item[1] == '127.0.0.1':
                net_info.append((k, item[1]))
    return net_info


def get_ip_info() -> list:
    return list(map(lambda k: k[-1], [item for item in get_net_info() if len(item) == 2]))


def get_static_file_path(static_path: str, path: str):
    return os.path.join(static_path, path)


def restart_program(timeout=3):
    time.sleep(timeout)
    python = sys.executable
    os.execl(python, python, *sys.argv)


# 检查请求路径有效性
def is_file_path_legal(static_path: str, path: str):
    # 文件要存在
    file_path = get_static_file_path(static_path, path)
    # logger.info('abspath: %s' % os.path.abspath(file_path))
    # logger.info('os.path.exists(file_path): %s' % os.path.exists(file_path))
    # logger.info('os.path.isfile(file_path): %s' % os.path.isfile(file_path))
    if not (os.path.exists(file_path) and os.path.isfile(file_path)):
        return False
    # 不能使用两个点向上目录
    if '..' in re.split(r"[/\\]", file_path):
        return False
    return True


def get_request_json(req):
    js = req.json
    return js


def get_date_timestamp(date) -> int:
    return int(datetime.datetime.timestamp(datetime.datetime.fromisoformat(date)) * 1000)


def get_timestamp_date(timestamp) -> str:
    return datetime.datetime.fromtimestamp(timestamp / 1000).isoformat()[:10]


# YYYY-MM-DD 格式
def get_date_today() -> str:
    return get_timestamp_date(datetime.datetime.today().timestamp() * 1000)
