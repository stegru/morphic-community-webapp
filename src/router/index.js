import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import AboutMorphic from '@/views/AboutMorphic.vue'
import AboutUs from '@/views/AboutUs.vue'
import Contacts from '@/views/Contacts.vue'
import Terms from '@/views/Terms.vue'
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
    path: '/about-morphic',
    name: 'About Morphic',
    component: AboutMorphic,
    meta: {
      title: 'About Morphic :: Morphic Community'
    }
  },
  {
    path: '/about-us',
    name: 'About Us',
    component: AboutUs,
    meta: {
      title: 'About Us :: Morphic Community'
    }
  },
  {
    path: '/contact-us',
    name: 'Contact Us',
    component: Contacts,
    meta: {
      title: 'Contact Us :: Morphic Community'
    }
  },
  {
    path: '/terms-of-use',
    name: 'Terms of Use',
    component: Terms,
    meta: {
      title: 'Terms Of Use :: Morphic Community'
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
