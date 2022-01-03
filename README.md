## 安装项目 npx create-react-app jira --template typescript

## 启动项目 cd 进入项目文件夹，npm start 启动

## 准备安装 json-server 提供请求 api 数据 npm i json-server -D 项目安装 -g 全局安装

## 创建文件夹 _json_server_mock_ 创建文件 db.json

## 5.1 启动 json-server

    启动命令 json-server --watch db.json
    配置在项目中需要进入 packge.json 中 scripts
    添加"json-server": "json-server **json_server_mock**/db.json --watch --port 3001"
    测试 npm run json-server

## 5.2 使用开发工具 分布式 mock 接口

    npm add jira-dev-tool -d
    public 中会有一个mockServiceWorker.js
    在index.tsx添加引用

**注意两个.env 文件中变量名一定要是 REACT_APP_API_URL，不可自定义**

```
import { loadDevTools } from 'jira-dev-tool'
loadDevTools(() =>
ReactDOM.render(
<React.StrictMode>
<App />
</React.StrictMode>,
document.getElementById('root')
))
```

## 5.3 登录注册实现，并将保存到 localStorage

## 5.4context 全局数据管理

## 5.5 用 useAuth 切换登录与非登录状态

## 5.6 用 fetch 抽象通用 HTTP 请求方法，增强通用性

## 5.7 用 useHttp 管理 JWT 和登录状态，保持登录状态

## 5.8 TS 的联合类型

## 5.9Paritl，Omit，Types-Pick，的实现使用等

## 6.1 安装使用 Ant 库

1> 安装 Ant yarn add antd
2> 在入口 index.tsx 引入

`import 'antd/dist/antd.less'`
3> 自定义主题 yarn add @craco/craco
4>修改配置文件

```
/* package.json */
"scripts": {
-   "start": "react-scripts start",
-   "build": "react-scripts build",
-   "test": "react-scripts test",
+   "start": "craco start",
+   "build": "craco build",
+   "test": "craco test",
}
```

    5>配置主题  yarn add craco-less
    5> 创建craco.config.js

## 6.2 了解 CSS-in-JS 方案的优点

## 6.3 Emotion 的安装和使用

    yarn add @emotion/react @emotion/styled

## 6.4 使用 Grid 和 flexbox 布局

## 6.5 使用 CSS in JS 自定义组件

## 6.6 完善界面

    yarn add dayjs 处理时间的库

## 6.7 升级工具 清理错误日志

yarn add jira-dev-tool@next
yara add react-query
