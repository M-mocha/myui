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
│   ├── vue-loader.conf.js // VueLoaderPlugin引入
│   ├── watcher.js // 监听pages目录自动生成路由
│   ├── webpack.base.conf.js // webpack通用配置
│   ├── webpack.dev.conf.js // wenpack开发环境配置
│   └── webpack.prod.conf.js // webpack生产环境配置
│   └── utils 
│       ├── index.js // 开发、构建工具函数入口
│       ├── fsTools.js // 文件操作相关工具
│       └── markdownTools.js // 目前编写一个markdown-it插件，支持将某些文本块包裹在div标签或vue标签中
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
- 对应的文件预览页，在pages/components下面写对应的组件库，pages/guide下写项目指引，目录格式为 
```
──pages
  ├── guide
  │   ├── README.md
  │   ├── howToUse.md
  │   └── changelog.md
  └── components
      ├── 页面C
      │   ├── index.vue
      │   └── README.md
      └── 页面D
          ├── index.vue
          └── README.md
```

在开发环境以及生产环境会自动运行build下面的watcher文件，
如需手动运行可执行
```
npm run watcher
```
生产文件到build/temp/filelist.js 文件中, 内容如下，src/route-list.js对其进行引用并解析
```
module.exports = [{
  path: 'pages/components/button/README.md',
  component: resolve => require(['/Users/qoxop/development/mynpm/myui/src/pages/components/button/README.md'], resolve)
}]
```