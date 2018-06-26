## html打包
```
  html-webpack-plugin 将编译好的js引入入口index.html中
```
## ES6打包
```
  babel-core
  babel-loader
  babel-preset-env
```
## react打包
```
  babel-preset-react
```
## css打包
```
  css-loader
  style-loader
  extract-text-webpack-plugin:不添加这个插架，打包出来的css跟js在一起
```
## scss打包
```
  node-sass
  sass-loader
```
## 图片打包
```
  file-loader
  url-loader
```
## 小图标工具
```
  font-awesome
  import 'font-awesome/css/font-awesome.min.css'
```
## 打包提出公共模块
```
  CommonsChunkPlugin
```
##
```
  publicPath
```
## 启动项目-不在全局webpack中启动，不同项目webpack版本受限制
```
  node_modules/.bin/webpack-dev-server
  node_modules/.bin/webpack
```
## 执行项目脚本
```
  package.json中配置
  "scripts": {
      "dev": "node_modules/.bin/webpack-dev-server",
      "disk": "node_modules/.bin/webpack"
    }
```
## 启动项目:
```
  npm run dev
```
## 分页插件:
```
rc-pagination
```
## 请求接口代理映射
```
devServer: {
    proxy : {
      '/manage' : {
          target: 'http://admintest.happymmall.com',
          changeOrigin : true
      }
    }
  }
 Request URL: http://localhost:8080/manage/user/login.do
 Request URL: http://admintest.happymmall.com/manage/user/login.do
```
## fetch :
```
  post请求：login
  get请求：
```
## 登录 :
```
  账号：admin
  密码：admin
```
## 评价：
```
  UI框架有点老：bootstrap
  数据请求有点老：jquery
  理由实战不错：可以直接看代码
  /product/save/26：编辑商品模块，父子之间通信值得学习
  /product-category/index/:categoryId?：编辑品类模块，只有传值改变时，也会重新调用接口,重点是componentDidUpdate方法
```
