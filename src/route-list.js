const fileModules = require('../build/temp/filelist')

const docRoutes = []
const appRoutes = []
const docNavInfos = []

const componentCategory = [
    {
        name: 'base',
        group: ['flexbox', 'button']
    }
]

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
