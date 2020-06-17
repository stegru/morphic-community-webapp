import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Registration from '@/views/Registration.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home :: Morphic Community'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: 'About :: Morphic Community'
    }
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration,
    meta: {
      title: 'Community Registration :: Morphic Community'
    }
  }
]

const router = new VueRouter({
  routes
})

router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = to.meta.title
  })
})

export default router
