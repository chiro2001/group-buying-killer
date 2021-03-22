import binascii
from pyDes import des, CBC, PAD_PKCS5
import logging
from colorlog import ColoredFormatter


# 时间单位默认为毫秒，但是末尾请使用000
# 时间被更新为最近下一次的时间
def fmt_time(time_stamp) -> int:
    return int(time_stamp / 1000) * 1000


def des_encrypt(secret_key, s):
    iv = secret_key
    k = des(secret_key, CBC, iv, pad=None, padmode=PAD_PKCS5)
    en = k.encrypt(s, padmode=PAD_PKCS5)
    return binascii.b2a_hex(en)


def des_decrypt(secret_key, s):
    iv = secret_key
    k = des(secret_key, CBC, iv, pad=None, padmode=PAD_PKCS5)
    de = k.decrypt(binascii.a2b_hex(s), padmode=PAD_PKCS5)
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
