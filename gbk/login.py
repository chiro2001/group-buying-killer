import selenium.common
from selenium import webdriver
from selenium.webdriver import Chrome
from selenium.webdriver import ChromeOptions
import requests
from gbk.config import config
from gbk.utils import logger
import time


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


def test(cookie,
         url='https://e.dianping.com/sku/api/merchant/ktvreserve/queryreservetable.json?shopid=581990543&timestamp=1615968223552'):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0",
        "Cookie": cookie
    }
    req = requests.get(url, headers=headers)
    print(req.text)


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


def main(enter_exit=True):
    logger.info("正在打开 Chrome 浏览器...如果无反应请重启程序")
    browser = browser_init()
    cookies_str = browser_login(browser)
    config.cookies = cookies_str
    config.save()
    browser.close()
    if enter_exit:
        input("完成，按回车键退出")


if __name__ == '__main__':
    main()
    # test()
