// 整个包的入口
import Button from './button.vue'
import Dialog from "./dialog.vue"
import Input from "./input.vue"
import Switch from "./switch.vue"
import Radio from "./radio.vue"
import RadioGroup from "./radio-group.vue"
import CheckBox from "./checkbox.vue"
import CheckBoxGroup from "./checkbox-group.vue"
import Form from "./form.vue"
import FormItem from "./form-item.vue"
import Link from "./link.vue"
import Carousel from "./carousel.vue"
import CarouselItem from "./carousel-item.vue"
import Rate from "./rate.vue"
import Tag from "./tag.vue"
import Pagination from "./pagination.vue"
import './fonts/iconfont.css'

const components = [
    Button,
    Dialog,
    Input,
    Switch,
    Radio,
    RadioGroup,
    CheckBox,
    CheckBoxGroup,
    Form,
    FormItem,
    Link,
    Carousel,
    CarouselItem,
    Rate,
    Tag,
    Pagination


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