// 整个包的入口
import Button from './button.vue'
import './fonts/iconfont.css'

const components = [
    Button
]
const install = function (Vue) {
    // 全局注册所有组件
    // 注册所有的组件
    components.forEach(item => {  
        Vue.component(item.name, item)
    })
    // 判断是否直接引入文件，如果是，就不用调用Vue.use()
    if (typeof window !== 'undefined' && window.Vue) {
        install(window.Vue)
    }

}
// vue插件必须保留install方法
export default { install }