## 安装项目 npx create-react-app jira --template typescript

## 启动项目 cd 进入项目文件夹，npm start 启动

## 准备安装 json-server 提供请求 api 数据 npm i json-server -D 项目安装 -g 全局安装

## 创建文件夹 _json_server_mock_ 创建文件 db.json

## 启动 json-server

    启动命令 json-server --watch db.json
    配置在项目中需要进入 packge.json 中 scripts
    添加"json-server": "json-server **json_server_mock**/db.json --watch --port 3001"
    测试 npm run json-server

## 使用开发工具 分布式 mock 接口

    npm add jira-dev-tool -d
    public 中会有一个mockServiceWorker.js
    在index.tsx添加引用
    `import { loadDevTools } from 'jira-dev-tool'
    **注意两个.env文件中变量名一定要是REACT_APP_API_URL，不可自定义**

loadDevTools(() =>
ReactDOM.render(
<React.StrictMode>
<App />
</React.StrictMode>,
document.getElementById('root')
)
)
`

## 登录注册实现，并将保存到 localStorage
