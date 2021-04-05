### 团购杀手 - 用户前端

#### 开发环境搭建

1. 下载`nodejs`并且安装，配置好`Path`。
2. 配置`npm`使用淘宝源：`npm config set registry https://registry.npm.taobao.org`
3. 到本目录(`根目录/frontend`)下运行`npm install`，等待依赖包安装完成（蛮久的……）

#### 运行

1. 调试：`npm start`，等待编译完成后会自动打开浏览器，在`http://localhost:3000`调试。
2. 生成：`npm build`，等待编译完成，之后编译好的文件会自动复制到`../backend/public`，即`Flask`后端的网络静态文件目录

