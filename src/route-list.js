const fileModules = require('../build/temp/filelist')

const docRoutes = []
const appRoutes = []
const docNavInfos = []

/**
 * 组件分类配置
 */
const componentCategory = [
    {
        name: 'base',
        group: ['flexbox', 'button']
    }
]
/**
 * 这里侧边栏的解析规则配置正则中匹配到的第字符串——$0 对应的字符串将作为路由名称
 * 目前只配置了guide 和 compoennts
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
 * 同一个目录下如果存在REAMD.md和index.vue, 那么两者形成映射
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
fileModules
    .filter(_module => /\.vue$/.test(_module.path))
    .forEach(_module => appRoutes.push({path: vuePath(_module), component: _module.component}))

module.exports = {
    docRoutes,
    appRoutes,
    sidebarNavInfos,
    docNavInfos
}
