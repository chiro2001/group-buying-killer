import selenium.common
from selenium import webdriver
from selenium.webdriver import Chrome
from selenium.webdriver import ChromeOptions
import requests
from gbk.config import config
from gbk.utils import logger, fmt_time
import time
import json


def browser_init():
    options = ChromeOptions()
    options.add_experimental_option('excludeSwitches', ['enable-automation'])
    options.add_experimental_option('useAutomationExtension', False)
    # 设置为无头模式
    # options.add_argument("--headless")

    bro = Chrome(options=options)
    # 防止被检测
    bro.execute_cdp_cmd("Page.addScriptToEvaluateOnNewDocument", {
        "source": """
        Object.defineProperty(navigator, 'webdriver', {
          get: () => undefined
        })
      """
    })
    return bro


def test_login(cookie,
               url=f'https://e.dianping.com/sku/api/merchant/ktvreserve/queryreservetable.json?shopid=581990543&timestamp={fmt_time(time.time() * 1000)}'):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0",
        "Cookie": cookie
    }
    req = requests.get(url, headers=headers)
    try:
        js = req.json()
        if js['code'] == 200:
            return True
    except json.decoder.JSONDecodeError:
        return False
    except KeyError:
        return False
    return False


def browser_login(browser, account=None, password=None, enter_exit=True):
    # browser.get(
    #     "https://epassport.meituan.com/new/login/account?service=dpmerchantlogin&feconfig=dpmerchantlogin&bg_source=2")
    browser.get("https://e.dianping.com")
    browser.implicitly_wait(3)
    if account is not None:
        browser.find_element_by_id("account").send_keys(account)
    if password is not None:
        browser.find_element_by_id("password").send_keys(password)
    # input("登录完成后来这里按下回车")
    timeout = 60 * 10
    while timeout > 0:
        try:
            if 'https://e.dianping.com/app/merchant-platform/' in browser.current_url:
                logger.info('登录完成')
                break
            browser.get_cookies()
        except selenium.common.exceptions.WebDriverException:
            logger.error("浏览器被手动关闭")
            exit(1)
        time.sleep(3)
        timeout -= 3
    if timeout <= 0:
        logger.warning("Timeout!!")
        if enter_exit:
            logger.error("尝试登录超时，回车退出")
            input()
        else:
            logger.error("尝试登录超时")
        exit(1)
    cookies = browser.get_cookies()
    logger.info('cookies: %s' % cookies)
    cookies_str = '; '.join([f"{d['name']}={d['value']}" for d in cookies])
    logger.info('cookies_str: %s' % cookies_str)
    # test(cookies_str)
    return cookies_str


def main(enter_exit=True, re_login=False):
    # logger.debug('replacing cookie...')
    # config.cookies = "_lxsdk_cuid=17771fd8425c8-0f5b6f7abba2ce8-4c3f217f-ca800-17771fd8425c8; _lxsdk=17771fd8425c8-0f5b6f7abba2ce8-4c3f217f-ca800-17771fd8425c8; _hc.v=6594ea87-cd60-00b4-94e8-05bc93197b85.1612525177; mpmerchant_portal_shopid=581990543; __utma=1.458675775.1615809801.1615809801.1615809801.1; __utmz=1.1615809801.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); _lxsdk_s=1783a0f35e8-ed9-745-a7a%7C%7C67; edper=GG0X8NYFrZ9UqzH3wnTLqdRGpSYN5iMTDXinruwu_9YRRTfgluNHEfK-q5RjRmEJJ7diRjn5uZY9s3Ilx-roRw; JSESSIONID=A399CFC1BB3CE8771D7B3DD0006BFD55; merchantBookShopID=581990543; merchantCategoryID=2890; logan_session_token=ur8o312ny2cxhtxg4r42; logan_custom_report="
    # config.save()
    # return
    if not test_login(config.cookies) or re_login:
        logger.info("正在打开 Chrome 浏览器...如果无反应请重启程序")
        logger.info('test: %s' % test_login(config.cookies))
        browser = browser_init()
        cookies_str = browser_login(browser)
        config.cookies = cookies_str
        config.save()
        browser.close()
        if enter_exit:
            input("完成，按回车键退出")
    else:
        logger.info('已经登录')


if __name__ == '__main__':
    main()
    # test()
