import { createApp } from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ViewUIPlus from 'view-ui-plus'
import App from './App.vue'
import router from './router'
import store from './store'
import '@icon-park/vue-next/styles/index.css'
import 'view-ui-plus/dist/styles/viewuiplus.css'




const app = createApp(App)
app.use(store)
    .use(router)
    .use(ViewUIPlus)
    .use(VueAxios, axios)
    .mount('#app')
// 配置接口地址
axios.defaults.baseURL = 'http://localhost:10086'
// 允许跨域
axios.defaults.withCredentials = true

// 添加请求拦截器
axios.interceptors.request.use((config) => {
    // 在发送请求前的操作
    // 判断是否存在token,如果存在将每个页面header添加token
    if (store.state.token) {
        config.headers.Authorization = store.state.token
    }
    return config
}, (error) => Promise.reject(error))

