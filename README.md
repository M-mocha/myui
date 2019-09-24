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

### 自动生成目录实现思路

#### 1. 扫描文件列表思路

1. build/utils/fsTools.js 模块下中导出的`scanner`函数作用是扫描某个目录下的所有文件，生成一份文件列表，通过done回调函数获取该列表，watch模式下可通过onchange回调函数动态获取获取。

2. build/watcher.js 通过执行`scanner`函数(开发模式开启watch模式)，将得到的文件列表转化成如上形式的代码(写入到 build/temp/filelist.js 中)

3. 在 src/route-list.js 中引用build/temp/filelist.js，在src/route-list.js中可以用任**何一种特定的形式**去组装路由信息和侧边栏信息。

4. 在demo应用和doc应用中引入路由并注册。



#### 2. src/route-list.js 自动生成目录的实现思路

> 最终目的： 灵活地动态生成侧边栏信息，支持分组和分类,  自动映射文档和预览页

1. 关于 `src/route-list.js` 的输入输出结构如下

```Typescript
/** 输入 **/ 
type Category = Array<{ // 分类配置
  name: string, // 分配名称
  group: string[] //组件名称数组
}>
type SidebarNavConfigs = Array<{ // 侧边栏分组配置
  name: string,  // 分组名称
  indexName?: string,  // 该分组下的根路由名称, 作用在于如果以文件名作为路由名称时，README.md文件作为根路由需要一个名字替代 README
  base: '/',  // 该分组的根路由
  match: RegExp   // 分组配置规则, eg: /pages\/guide\/(.*?)\.(md|vue)/ 其中 (.*?) 匹配到的值作为为路由名称
  categories?: Category  // 为该分组配置组件分类
}>

/** 输出 **/
type docRoutes = {path: string, component: vueCompnent}
type appRoutes = {path: string, component: vueCompnent}
type docNavInfos = Array<{ // 侧边栏项目信息
  path: string // 侧边栏链接路由路径
  name: string // 侧边栏链接名字
  category?: string // 所属分类，可有可无，主要还是为了组件分类
  demoPath?: string // 对应的预览页路由路径, 如果没有预览页是app首页
}>
type sidebarNavInfos = Array<{ // 分组信息
  name: string // 分组名称
  routes: docNavInfos // 该分组下的所有文档路由信息
}>
```



2. 如何解析 `SidebarNavConfigs` ？

- 遍历配置项， 通过`match`字段提供的正则表达式获取对应的`.md`文件列表和每个文件的`name`,

- 对于每个`.md`文件，如果存在对应路径一致的`.vue`文件，就将其作为对应的预览页
-  如果`match`字段提供的正则表达式的提取的`name`是**文件名**，而非**路径名**，README.md 作为根路由文件，就需要提供`indexName` 作为它的`name`

- 通过配置项的`base`字段和文件的`name`, 作为路由路径

