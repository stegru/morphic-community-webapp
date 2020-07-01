import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import Home from '@/views/Home.vue'
import AboutMorphic from '@/views/AboutMorphic.vue'
import Communities from '@/views/Communities.vue'
import AboutUs from '@/views/AboutUs.vue'
import Contacts from '@/views/Contacts.vue'
import Terms from '@/views/Terms.vue'
import Registration from '@/views/Registration.vue'
import MyCommunity from '@/views/MyCommunity.vue'
import ResetPassword from '@/views/ResetPassword.vue'

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
    path: '/our-communities',
    name: 'Our Communities',
    component: Communities,
    meta: {
      title: 'Our Communities :: Morphic Community',
      authRoute: false
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
      title: 'Community Registration :: Morphic Community',
      locked: true
    }
  },
  {
    path: '/my-community',
    name: 'My Community',
    component: MyCommunity,
    meta: {
      title: 'My Community :: Morphic Community',
      authRoute: true
    }
  },
  {
    path: '/reset-password',
    name: 'Reset Password',
    component: ResetPassword,
    meta: {
      title: 'Reset Password :: Morphic Community'
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRoute)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/')
  } else if (to.matched.some(record => record.meta.locked)) {
    if (!store.getters.isLoggedIn) {
      next()
      return
    }
    next('/')
  } else {
    next()
  }
})

router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = to.meta.title
  })
})

export default router
