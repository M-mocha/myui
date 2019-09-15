/**
 * markdown-it 插件
 * @param {*} md 
 * @param {*} {mode}, 'comment' or 'both' or 'colon'
 * from 
 *      <!--@ className --> 
 *          something here
 *      <!--@  -->
 * to 
 *      <div class='className'> 
 *          something here
 *      </div>
 * -----------------------------------------
 * from 
 *      <!--@ c_vuecomp --> 
 *          something here
 *      <!--@  -->
 * to 
 *      <vuecomp class='className'> 
 *          something here
 *      </vuecomp>
 * colon 模式下使用 
 *      :::className something here ::: 
 * 替代注释的写法
 * 
 */

function wrapTagPlugin(md, {mode}) {
    function colonReplace(str) {
        return str.replace(/:::(.*)((.|\r|\n)*?):::/g, (_, $1, $2) => {
            const trim1 = $1.trim()
            if (/^c_/.test(trim1)) {
                const tag = trim1.replace(/^c_/, '');
                return `\n<${tag}>\n${$2}\n</${tag}>\n`
            } else {
                return `\n<div class="${trim1}">\n${$2}\n</div>\n`
            }
        })
    }
    function commentReplace(str) {
        return str.replace(/\<\!--@(.*?)--\>((.|\r|\n)*?)\<\!--@\s*--\>/g, (_, $1, $2) => {
            const trim1 = $1.trim()
            if (/^c_/.test(trim1)) {
                const tag = trim1.replace(/^c_/, '');
                return `\n<${tag}>\n${$2}\n</${tag}>\n`
            } else {
                return `\n<div class="${trim1}">\n${$2}\n</div>\n`
            }
        })
    }
    let replace = null;
    switch(mode) {
        case 'comment':
            replace = commentReplace;
            break;
        case 'both': 
            replace = (str) => colonReplace(commentReplace(str));
            break;
        default:
            replace = colonReplace;
            break;
    }
    md.set({html: true})
    md.core.ruler.before('block', 'regReplace', (state, silent) => {
        if (silent) return false;
        state.src = replace(state.src)
    })
};

module.exports = {
    wrapTagPlugin,
}