import { createRouter, createWebHistory } from 'vue-router'
import { useWristbandStore } from './stores/wristbandStore'
import { redirectToLogin, redirectToLogout } from './utils/auth-utils';

import HelloWorld from './pages/HelloWorld.vue'
import Home from './pages/Home.vue'

const routerHistory = createWebHistory()
const GenericComponent = { template: '<div></div>' };

const router = createRouter({
  scrollBehavior(to) {
    if (to.hash) {
      window.scroll({ top: 0 })
    } else {
      document.querySelector('html').style.scrollBehavior = 'auto'
      window.scroll({ top: 0 })
      document.querySelector('html').style.scrollBehavior = ''
    }
  },
  history: routerHistory,
  routes: [
    {
      path: '/signup',
      component: GenericComponent,
      beforeEnter: () => { location.href = '/api/auth/signup' },
    },
    {
      path: '/login',
      component: GenericComponent,
      beforeEnter: () => redirectToLogin('/api/auth/login'),
    },
    {
      path: '/logout',
      component: GenericComponent,
      beforeEnter: () => redirectToLogout('/api/auth/logout'),
    },
    {
      path: '/',
      component: Home,
    },
    {
      path: '/hello-world',
      component: HelloWorld,
      meta: { requiresAuth: true }
    },
    {
      // Catch-all route (for non-existent routes)
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

// Navigation guard for protected routes
router.beforeEach(async (to, from, next) => {
  const wristbandStore = useWristbandStore();
  const { state } = wristbandStore

  // Redirect to Home if not authenticated.
  if (to.path !== '/' && to.meta.requiresAuth && !state.wristband.isAuthenticated) {
    next({ path: '/' });
    return;
  }

  next();
});

export { router }
