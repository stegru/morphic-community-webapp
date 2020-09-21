import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

// General Marketing, Login and Register Components
import Home from '@/views/Home.vue'
import Terms from '@/views/Terms.vue'

// Dashboard Components
import Dashboard from '@/views/Dashboard.vue'
import MorphicBarPreconfigured from '@/views/MorphicBarPreconfigured.vue'
import MorphicBarEditor from '@/views/MorphicBarEditor.vue'
import MemberInvite from '@/views/MemberInvite.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home :: Morphic Community',
      locked: true
    }
  },
  {
    path: '/session-timed-out',
    name: 'Home-session-timed-out',
    component: Home,
    props: { messageId: 'sessionTimedOut' },
    meta: {
      title: 'Home :: Morphic Community',
      locked: true
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
  // {
  //   path: '/registration',
  //   name: 'Registration',
  //   component: Registration,
  //   meta: {
  //     title: 'Community Registration :: Morphic Community',
  //     locked: true
  //   }
  // },
  // {
  //   path: '/my-community',
  //   name: 'My Community',
  //   component: MyCommunity,
  //   meta: {
  //     title: 'My Community :: Morphic Community',
  //     authRoute: true
  //   }
  // },
  // {
  //   path: '/reset-password',
  //   name: 'Reset Password',
  //   component: ResetPassword,
  //   meta: {
  //     title: 'Reset Password :: Morphic Community'
  //   }
  // },

  // Dashboard mockups, needs to be properly renamed and re-arranged when starting to implement the API
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard :: Morphic Community',
      authRoute: true
    }
  },
  {
    path: '/dashboard/morphicbar-preconfigured',
    name: 'MorphicBar Preconfigured',
    component: MorphicBarPreconfigured,
    meta: {
      title: 'Pick a bar :: Morphic Community',
      authRoute: true
    }
  },
  {
    path: '/dashboard/morphicbar-editor/',
    name: 'MorphicBar Editor',
    component: MorphicBarEditor,
    meta: {
      title: 'MorphicBar Editor :: Morphic Community',
      authRoute: true
    }
  },
  {
    path: '/dashboard/member-invite',
    name: 'Member Invite',
    component: MemberInvite,
    meta: {
      title: 'Member Invite :: Morphic Community',
      authRoute: true
    }
  }
  // {
  //   path: '/dashboard/member/:memberId',
  //   name: 'Member Editor',
  //   component: MemberEditor,
  //   meta: {
  //     title: 'Member Details :: Morphic Community',
  //     authRoute: true
  //   }
  // }
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
    next('/dashboard')
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
