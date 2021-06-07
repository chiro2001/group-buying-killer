const qrcode = require('qrcode-terminal');
const Pike = require("./message.js");
const {rohr} = require("./rohr.js");
const fetch = require("node-fetch");
const ws = require("nodejs-websocket");

// console.log(rohr);
// 三分钟失效
const wait_time = 1000 * 60 * 3;
const port = 8881;

const getId = async () => {
    const token = rohr.reload("https://e.dianping.com" + "/api/account/login?loginContinue=" + "https%3A%2F%2Fe.dianping.com%2Fshopaccount%2Flogin%2Fsetedper%3FtargetUrl%3Dhttps%253A%252F%252Fe.dianping.com%252Fshopportal%252Fpc%252Fnewindex" + "&&only_auth=" + undefined);
    // console.log('token', token);
    const resp = await fetch("https://epassport.meituan.com/gw/qrcode/getQrcodeUuid?service=dpmerchantlogin&bg_source=2", {
        // "credentials": "include",
        "headers": {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0",
            "Accept": "application/json",
            "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
            "Content-Type": "application/json;charset=utf-8",
            "x-requested-with": "XMLHttpRequest",
            "Pragma": "no-cache",
            "Cache-Control": "no-cache",
            // "Cookie": "uuid=20adb0fcbaa2406e6afd.1612525178.1.0.0"
            "Cookie": "uuid=ff6cb26ca227d4b068a3.1620916429.1.0.0"
        },
        "body": `{\"bgSource\":\"2\",\"appKey\":\"dpmerchantlogin\",\"rohrToken\":\"${token}\",\"platform\":\"2\",\"continueUrl\":\"https://e.dianping.com/shopaccount/login/setedper?targetUrl=https%3A%2F%2Fe.dianping.com%2Fshopportal%2Fpc%2Fnewindex\"}`,
        "method": "POST",
        // "mode": "cors"
    });
    const js = await resp.json();
    // console.log(js);
    let extra = js.data;
    delete extra.accessToken;
    return {
        uniqueId: extra.uniqueId,
        uuid: extra.uuid
    };
}

const sleep = time => {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
    })
}

const connect = (extra) => {
    extra.appkey = "dpmerchantlogin";
    let waiting = false;
    let start_time = null;
    let client = new Pike('sPoIsqfsOgLHShBt', {
        env: 'products', extra: extra, loglevel: "debug"
    });
    // console.log('client', client ? "Yes" : "No");
    return {
        promise: new Promise((resolve, reject) => {
            // console.log('run promise');
            const startWaiting = async () => {
                while (waiting) {
                    // console.log('run waiting')
                    await sleep(100);
                    if (new Date().getTime() > start_time + wait_time) {
                        console.log(`timeout after ${wait_time}ms`);
                        waiting = false;
                        reject();
                    }
                }
            };
            client.onReady(() => {
                // console.log("[Pike] connected!!!")
                // console.log("start counting...")
                waiting = true;
                start_time = new Date().getTime();
                startWaiting();
            });
            client.onClose((reason) => {
                // console.log("[Pike] closed!!!", reason)
                waiting = false;
            });
            client.onMessage(function (data) {
                var _JSON$parse = JSON.parse(data),
                    accessToken = _JSON$parse.accessToken,
                    refreshToken = _JSON$parse.refreshToken,
                    error = _JSON$parse.error;
                if ("二维码失效" === error) {
                    waiting = false;
                    reject();
                }
                let url = "https://epassport.meituan.com/account/loginbyqrcode" + "?bg_source=2&service=dpmerchantlogin&feconfig=dpmerchantlogin&leftBottomLink=https%3a%2f%2fe.dianping.com%2fshopaccount%2fphoneRegisterAccount&continue=https%3A%2F%2Fe.dianping.com%2Fshopaccount%2Flogin%2Fsetedper%3FtargetUrl%3Dhttps%253A%252F%252Fe.dianping.com%252Fshopportal%252Fpc%252Fnewindex" + "&accessToken=" + accessToken + "&refreshToken=" + refreshToken;
                // console.log('url', url);
                client.close();
                fetch(url).then(r => {
                    // console.log(r.headers, r.headers.get('set-cookie'));
                    const cookies = r.headers.get('set-cookie');
                    resolve(cookies);
                });
            })
        }),
        client: client
    }
};


const run = async (listener, setCilent, showCode = false) => {
    let cookies = null;
    do {
        let code = await getId();
        // console.log('code', code);
        if (listener) listener('code', code);
        if (showCode) qrcode.generate(JSON.stringify(code));
        try {
            let {promise, client} = connect(code);
            if (setCilent) setCilent(client);
            cookies = await promise;
        } catch (e) {
            continue;
        }
        break;
    } while (true);
    // console.log('cookies', cookies);
    if (listener) listener('cookies', cookies);
};

const startServer = () => {
    var server = ws.createServer(function (conn) {
        // console.log("New connection");
        console.log("[ws_server      ][startServer    ][INFO   ] New connection")
        let client = null;
        conn.on("text", function (str) {
            // console.log("Received " + str)
        });
        conn.on("close", function (code, reason) {
            // console.log("Connection closed")
            console.log("[ws_server      ][startServer    ][INFO   ] Connection closed")
            if (client) client.close();
        });
        run((name, data) => {
            try {
                if (name === 'code') {
                    conn.sendText(JSON.stringify({
                        cmd: 'code',
                        data: data
                    }))
                } else if (name === 'cookies') {
                    conn.sendText(JSON.stringify({
                        cmd: 'cookies',
                        data: data
                    }));
                    conn.close();
                }
            } catch (e) {
                console.error(e);
                console.error('Closing web socket...')
                conn.close();
            }
        }, c => {
            // console.log('got client');
            client = c;
        }, false);
    }).listen(port);
    console.log(`[ws_server      ][startServer    ][INFO   ] ws server started on ${port}`);
};

// 捕获 Ctrl + C，返回 2
process.on('SIGINT', function () {
    console.log('[ws_server      ][startServer    ][WARNING] Exit with Signal SIGINT now!');
    process.exit(2);
});

startServer();