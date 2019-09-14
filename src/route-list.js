const fileModules = require('../build/temp/filelist')

const docRoutes = []
const appRoutes = []

const componentCategory = [
    {
        name: '基础组件',
        group: ['flexbox', 'button']
    }
]

const sidebarNavConfigs = [
    [
        {
            name: '开发指南',
            indexName: 'about',
            base: '/',
            match: /pages\/guide\/(\w*)\.(md|vue)/
        },
        {
            name: '组件',
            base: '/components',
            match: /pages\/components\/(\w*)\//,
            categories: componentCategory
        }
    ]
]

const vuePath = (vueModule) => !vueModule ? undefined : vueModule.path.replace('pages', '').replace(/\/\w*?.vue$/, '')

const sidebarNavInfos = sidebarNavConfigs.map(cfg => {
    const navInfoGroup = cfg.map(group => {
        const modules = fileModules.filter(_module => group.match.test(_module.path));
        const mdModules = modules.filter(_module => /\.md$/.test(_module.path)).sort();
        const vueModules = modules.filter(_module => /\.vue$/.test(_module.path)).sort();
        const routes =  mdModules.map(_module => {
            let subPath = _module.path.match(group.match)[1];
            if (subPath === 'README' || !subPath) {subPath = '';}
            const path =  `/${group.base || group.name}/${subPath}`.replace('///', '/');
            docRoutes.push({path, component: _module.component})
            // 组件分类
            const category = ((group.categories || []).find(item => {
                return item.group.some(name => name === subPath)
            }) || {}).name;
            const demo = vueModules.find(item => {
                const expect = _module.path.replace('.md', '.vue').replace('README', 'index');
                return item.path === expect;
            })
            return {path, name: subPath || group.indexName, category, demoPath: vuePath(demo)}
        })
        return {name: group.name, routes}
    })
    return navInfoGroup
})
fileModules
    .filter(_module => /\.vue$/.test(_module.path))
    .forEach(_module => appRoutes.push({path: vuePath(_module), component: _module.component}))

export default {
    docRoutes,
    appRoutes,
    sidebarNavInfos
}
