#html打包
html-webpack-plugin
#ES6打包
babel-core
babel-loader
babel-preset-env
#react打包
babel-preset-react
#css打包
css-loader
style-loader
extract-text-webpack-plugin:不添加这个插架，打包出来的css跟js在一起
#scss打包
node-sass
sass-loader
#图片打包
file-loader
url-loader
#小图标工具
font-awesome
#打包提出公共模块
CommonsChunkPlugin
#
publicPath
#启动项目-不在全局webpack中启动，不同项目webpack版本受限制
node_modules/.bin/webpack-dev-server
node_modules/.bin/webpack
##执行项目脚本
package.json中配置
"scripts": {
    "dev": "node_modules/.bin/webpack-dev-server",
    "disk": "node_modules/.bin/webpack"
  }
启动项目:npm run dev

## Development server
