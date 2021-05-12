from lxml import etree
from gbk_exceptions import *

class Solution:
    url = 'https://e.dianping.com/fun/ktv/solutionlist'

    def __init__(self, request_func):
        self.request_func = request_func

    def get_solution_id(self):
        resp = self.request_func(self.url)
        if resp is None:
            raise GBKLoginError("需要登录")
        # print(resp)
        if '没有权限' in resp:
            raise GBKPermissionError("没有权限")
        try:
            html = etree.HTML(resp)
            try:
                data = html.xpath('/html/body/div[1]/div/div/table/tbody/tr/td[4]/a')[0]
            except IndexError:
                raise GBKPermissionError("没有权限")
            href = data.attrib['href']
            solution_id = int(href.split('=')[-1])
            return solution_id
        except GBKPermissionError as e:
            logger.warning(e)
            raise e
        except Exception as e:
            logger.warning(e)
            raise GBKError("未知错误")