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
