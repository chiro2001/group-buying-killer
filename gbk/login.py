from selenium import webdriver
from selenium.webdriver import Chrome
from selenium.webdriver import ChromeOptions
import requests


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


def browser_login(browser, account=None, password=None):
    # browser.get(
    #     "https://epassport.meituan.com/new/login/account?service=dpmerchantlogin&feconfig=dpmerchantlogin&bg_source=2")
    browser.get("https://e.dianping.com")
    browser.implicitly_wait(3)
    if account is not None:
        browser.find_element_by_id("account").send_keys(account)
    if password is not None:
        browser.find_element_by_id("password").send_keys(password)
    input("登录完成后来这里按下回车")
    cookies = browser.get_cookies()
    print('cookies', cookies)
    cookies_str = '; '.join([f"{d['name']}={d['value']}" for d in cookies])
    print('cookies_str', cookies_str)
    test(cookies_str)


def main():
    browser = browser_init()
    browser_login(browser)
    input()


if __name__ == '__main__':
    main()
    # test()
