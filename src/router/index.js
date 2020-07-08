import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

// General Marketing, Login and Register Components
import Home from '@/views/Home.vue'
import AboutMorphic from '@/views/AboutMorphic.vue'
import Communities from '@/views/Communities.vue'
import AboutUs from '@/views/AboutUs.vue'
import Contacts from '@/views/Contacts.vue'
import Terms from '@/views/Terms.vue'
import Registration from '@/views/Registration.vue'
import MyCommunity from '@/views/MyCommunity.vue'
import ResetPassword from '@/views/ResetPassword.vue'

// Dashboard Components
import DashboardWelcome from '@/views/DashboardWelcome.vue'
import DashboardWithBars from '@/views/DashboardWithBars.vue'
import DashboardFull from '@/views/DashboardFull.vue'
import MorphicBarChoose from '@/views/MorphicBarChoose.vue'
import MorphicBarPreconfigured from '@/views/MorphicBarPreconfigured.vue'
import MorphicBarEditor from '@/views/MorphicBarEditor.vue'
import MemberInvite from '@/views/MemberInvite.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DashboardWelcome, // temporary replacing the Home component
    meta: {
      title: 'Dashboard'
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
  },

  // Dashboard mockups, needs to be properly renamed and re-arranged when starting to implement the API
  {
    path: '/dashboard/welcome',
    name: 'Dashboard',
    component: DashboardWelcome, // empty dashboard
    meta: {
      title: 'Dashboard'
    }
  },
  {
    path: '/dashboard/with-bars',
    name: 'Dashboard (with MorphicBars)',
    component: DashboardWithBars, // dashboard with MorphicBars added, but no members
    meta: {
      title: 'Dashboard'
    }
  },
  {
    path: '/dashboard/full',
    name: 'Dashboard (with MorphicBars and Members)',
    component: DashboardFull, // dashboard with MorphicBars and Members added
    meta: {
      title: 'Dashboard'
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardWelcome,
    meta: {
      title: 'Dashboard Morphic Community'
    }
  },
  {
    path: '/dashboard/morphicbar-choose',
    name: 'MorphicBar Choose',
    component: MorphicBarChoose,
    meta: {
      title: 'Dashboard'
    }
  },
  {
    path: '/dashboard/morphicbar-preconfigured',
    name: 'MorphicBar Preconfigured',
    component: MorphicBarPreconfigured,
    meta: {
      title: 'MorphicBar Preconfigured'
    }
  },
  {
    path: '/dashboard/morphicbar-editor/',
    name: 'MorphicBar Editor',
    component: MorphicBarEditor,
    meta: {
      title: 'MorphicBar Editor'
    }
  },
  {
    path: '/dashboard/member-invite',
    name: 'Member Invite',
    component: MemberInvite,
    meta: {
      title: 'Member Invite'
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
