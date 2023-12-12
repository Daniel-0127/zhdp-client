import { createRouter, createWebHistory } from 'vue-router'
import HomeMain from '@/views/HomeMain.vue'
import Hotel from '@/components/Hotel.vue'
import Travel from '@/components/Travel.vue'
import Recreation from '@/components/Recreation.vue'
import MyEmpty from '@/components/MyEmpty.vue'
import HomeGourmet from '@/views/HomeGourmet.vue'
import GourmetShow from '@/components/gourmet/GourmetShow.vue'
import GourmetShop from '@/components/gourmet/GourmetShop.vue'
import store from '@/store'

const routes = [
  {
    path: '/',
    component: HomeMain,
    redirect: '/gourmet',
    children: [{ path: 'hotel', component: Hotel },
      {
        path: 'recreation',
        component: Recreation
      },
      {
        path: 'gourmet',
        component: HomeGourmet,
        redirect: '/gourmet/show',
        children: [{ path: 'show', component: GourmetShow }, { path: 'shop', component: GourmetShop }]
      },
      {
        path: 'travel',
        component: Travel
      },
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
    return { top: 0 }
  }
})

export default router
