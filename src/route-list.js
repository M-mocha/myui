const fileModules = require('../build/temp/filelist')

// 普通的vue路由数组
const docRoutes = []
const appRoutes = []

/**
 * 文档系统的侧边栏信息，支持分组和分类，数组的每一项代表一个分组如 introduction、components
 * type DocNavInfosItem = Array<{
 *     name: string
 *     path: string // 侧边栏链接路由路径
 *     name: string // 侧边栏链接名字 subPath || group.indexName
 *     category?: string // 所属分类，可有可无，主要还是为了组件分类
 *     demoPath?: string // 对应的预览页路由路径
 * }>
 */
const docNavInfos = []


/**
 * 组件分类配置
 */
const componentCategory = [
    {
        name: 'base', // 分配名称
        group: ['flexbox', 'button'] // 组件名称数组
    }
]


/**
 * type SidebarNavConfigs = Array<{
 *      name: string, // 分组名称
 *      indexName?: string, // 该分组下的根路由名称, 作用在于如果以文件名作为路由名称时，README.md文件作为根路由需要一个名字替代 README
 *      base: '/', // 该分组的根路由
 *      match: /pages\/guide\/(.*?)\.(md|vue)/  // 分组配置规则 其中 (.*?) 匹配到的值作为为路由名称
 *      categories？: componentCategory // 为该分组配置组件分类
 * }>
 * SidebarNavConfigs 数组的每一项作为一个侧边栏的一个分组配置
 * 目前只配置了guide 和 compoennts 分组
 */
const sidebarNavConfigs = [
    {
        name: 'introduction',
        indexName: 'about',
        base: '/',
        match: /pages\/guide\/(.*?)\.(md|vue)/
    },
    {
        name: 'components',
        base: '/components',
        match: /pages\/components\/(.*?)\//,
        categories: componentCategory
    }
]


const vuePath = (vueModule) => !vueModule ? undefined : vueModule.path.replace('pages', '').replace(/\/\w*?.vue$/, '')


/**
 * 通过配置解析生成的文件，为对应的路由，demo路由、文档路由以及文档侧边栏信息
 * 
 * 1. 遍历配置项， 通过`match`字段提供的正则表达式获取对应的`.md`文件列表和每个文件的`name`,
 * 2. 对于每个`.md`文件，如果存在对应路径一致的`.vue`文件，就将其作为对应的预览页
 * 3. 如果`match`字段提供的正则表达式的提取的`name`是**文件名**，而非***路径名**，README.md 作为根路由文件，就需要提供`indexName` 作为它的`name`
 * 4. 通过配置项的`base`字段和文件的`name`, 作为路由路径
 */
const sidebarNavInfos = sidebarNavConfigs.map(group => {
    const modules = fileModules.filter(_module => group.match.test(_module.path));
    const mdModules = modules.filter(_module => /\.md$/.test(_module.path)).sort();
    const vueModules = modules.filter(_module => /\.vue$/.test(_module.path)).sort();

    const routes =  mdModules.map(_module => {
        let subPath = _module.path.match(group.match)[1];
        if (subPath === 'README' || !subPath) {subPath = '';}
        const path =  `/${group.base || group.name}/${subPath}`.replace(/\/{2,3}/, '/');
        docRoutes.push({path, component: _module.component})
        // 组件分类
        const category = ((group.categories || []).find(item => {
            return item.group.some(name => name === subPath)
        }) || {}).name;
        const demo = vueModules.find(item => {
            const expect = _module.path.replace('.md', '.vue').replace('README', 'index');
            return item.path === expect;
        })
        const docNavInfo = {path, name: subPath || group.indexName, category, demoPath: vuePath(demo)}
        docNavInfos.push(docNavInfo)
        return docNavInfo
    })
    return {name: group.name, routes}
})

// demo 路由数组
fileModules
    .filter(_module => /\.vue$/.test(_module.path))
    .forEach(_module => appRoutes.push({path: vuePath(_module), component: _module.component}))

module.exports = {
    docRoutes,
    appRoutes,
    sidebarNavInfos,
    docNavInfos
}
