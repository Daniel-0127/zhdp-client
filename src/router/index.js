import {createRouter, createWebHistory} from 'vue-router'
import Travel from '@/components/Travel.vue'
import Recreation from '@/components/Recreation.vue'
import MyEmpty from '@/components/MyEmpty.vue'
import HomeGourmet from '@/views/HomeGourmet.vue'
import GourmetShow from '@/components/gourmet/show/GourmetShow.vue'
import GourmetShop from '@/components/gourmet/shop/GourmetShop.vue'
import store from '@/store'
import App from "@/App.vue";
import HomeHotel from "@/views/HomeHotel.vue";
import HotelShow from "@/components/hotel/HotelShow.vue";
import HomeMy from "@/views/HomeMy.vue";
import MyInfo from "@/components/my/MyInfo.vue";
import MyComments from "@/components/my/MyComments.vue";
import MyCollect from "@/components/my/MyCollect.vue";
import MyMessage from "@/components/my/MyMessage.vue";

const routes = [
    {
        path: '/',
        component: App,
        redirect: '/gourmet',
        children: [
            {
                path: 'gourmet',
                component: HomeGourmet,
                redirect: '/gourmet/show',
                children: [{path: 'show', component: GourmetShow},
                    {path: 'shop/:id', component: GourmetShop}]
            },
            {
                path: 'hotel',
                component: HomeHotel,
                redirect: '/hotel/show',
                children: [{path: 'show',component: HotelShow}]},
            {
                path: 'recreation',
                component: Recreation
            },
            {
                path: 'travel',
                component: Travel
            },
            {
                path: 'my',
                component: HomeMy,
                redirect: '/my/info',
                children: [{path: 'info',component:MyInfo},
                    {path: 'comments',component: MyComments},
                    {path: 'collect',component: MyCollect},
                    {path: 'message',component: MyMessage}]
            }
        ]
    },
    {
        path: '/MyEmpty',
        component: MyEmpty,
    }
]
if (sessionStorage.getItem('token')) {
    store.commit('updateToken', sessionStorage.getItem('token'))
}
const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
    scrollBehavior() {
        return {top: 0}
    }
})

export default router
