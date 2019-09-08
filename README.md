## mui文档介绍

### 框架目录结构
```
.
├── README.md
├── build
│   ├── build.js // 构建文件入口
│   ├── check-versions.js // 检查版本
│   ├── config.js // 配置文件
│   ├── dev.js // 开发文件入口
│   ├── utils.js // 开发工具
│   ├── vue-loader.conf.js // VueLoaderPlugin引入
│   ├── watcher.js // 监听pages目录自动生成路由
│   ├── webpack.base.conf.js // webpack通用配置
│   ├── webpack.dev.conf.js // wenpack开发环境配置
│   └── webpack.prod.conf.js // webpack生产环境配置
├── dist // 打包构建可布置静态网页
├── examples // 文档页目录
│   ├── index.html // 文档页入口html
│   └── src 
│       ├── app.vue // 文档页入口vue
│       ├── components // 布局目录组件
│       ├── main.js // 文档页入口js
│       └── routers.js // 文档页路由入口
├── index.html // 预览页的入口html
├── package.json // 依赖声明 命令
├── src // 预览页目录
│   ├── app.vue // 预览页入口vue
│   ├── components // ui组件库
│   │   ├── index.js // 组件入口 install
│   ├── main.js // 预览页入口js
│   ├── pages // 对应不同的预览页
│   ├── route-list.js //根据pages下组件预览目录自动生成
│   ├── routers 
│   │   └── index.js // 预览页路由js
│   ├── styles // 默认引入样式，基于weui样式
│   └── utils // 工具类js文件
└── static  // 静态文件
```

### 开发须知
- 开发的组件库需放在src/components下面，通过index.js进行暴露,将会以vue plugin的方式编写,入口.js文件中以Vue.use(install)的形式对UI库进行引用了
```
── components
    ├── index.js // 入口文件
    ├── 组件A
    │   ├── index.vue
    ├── 组件B
    │   ├── index.vue
    ├── 组件C
    │   ├── index.vue
    └── 组件D
        └── index.vue
```
- 对应的文件预览页，在pages下面写对应的组件库，目录格式为 
```
──pages
  ├── 页面A
  │   ├── index.vue
  │   └── README.md
  ├── 页面B
  │   ├── index.vue
  │   └── README.md
  ├── 页面C
  │   ├── index.vue
  │   └── README.md
  └── 页面D
      ├── index.vue
      └── README.md
```

在开发环境以及生产环境会自动运行build下面的watcher文件
如需手动运行科执行
```
npm run watcher
```
生产内容如下
```
module.exports = ['页面A','页面B','页面C','页面D']
```