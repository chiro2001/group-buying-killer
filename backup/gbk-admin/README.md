### 团购杀手 - 后台管理

#### 环境搭建

同`用户前端`说明中的环境搭建。

#### 运行

1. `API`运行：到`./api`目录下运行`npm start`，即使用`node main.js`命令启动后台的后端`API`
2. `frontend`运行：到`./frontend`目录下运行`npm start`，可以在`http://localhost:3000`调试。如果之前已经运行了一个`frontend`，请在询问的时候输入`y`，则会在`http://localhost:3001`调试。

#### 部署

1. 本目录使用`npm deploy`即可部署`Serverless`项目到腾讯云`Serverless`，可以访问[腾讯云Serverless控制台](https://serverless.cloud.tencent.com/)查看。
2. 部署时可能需要扫码登录或者填入密钥，推荐填入密钥。
3. 部署完成后可以在控制台看到部署之后访问应用的链接，这个链接可能与`用户前端`所配置的`AuthAPI`链接不同，请记得修改。