import { createRouter, createWebHistory } from 'vue-router'
import { useWristbandStore } from './stores/wristbandStore'

import HelloWorld from './pages/HelloWorld.vue'
import Home from './pages/Home.vue'

const routerHistory = createWebHistory()

const GenericComponent = { template: '<div></div>' };
const apiUrl = process.env.VUE_APP_API_URL;
const adminRole = process.env.VUE_APP_ADMIN_ROLE;

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
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home,
    },
    {
      // Intended for standard login UX only (no popup)
      path: '/signup',
      component: GenericComponent,
      beforeEnter: () => {location.href = `${apiUrl}/auth/signup`},
    },
    {
      // Intended for standard login UX only (no popup)
      path: '/login',
      component: GenericComponent,
      beforeEnter: () => {location.href = `${apiUrl}/auth/login`},
    },
    {
      path: '/logout',
      component: GenericComponent,
      beforeEnter: () => {location.href = `${apiUrl}/auth/logout`},
    },
    {
      path: '/hello-world',
      component: HelloWorld,
      meta: { requiresAuth: true }
    },
    {
      // Catch-all route (for non-existent routes)
      path: '/:pathMatch(.*)*',
      redirect: '/home'
    }
  ]
})

// Navigation guard for protected routes
router.beforeEach(async (to, from, next) => {
  const wristbandStore = useWristbandStore();
  const { state } = wristbandStore

  // Make sure to check if the user is already on the home page to prevent infinite redirect.
  if (to.path !== '/home') {
    // Redirect to Home if not authenticated.
    if (to.meta.requiresAuth && !state.wristband.isAuthenticated) {
      next({ path: '/home' });
      return;
    }

    // Redirect to Home if going to a role-protected page that the user doesn't have access to.
    const hasAdminRole = state.wristband.roles.some(role => role.name === adminRole)
    if (to.meta.requiresAdminRole && !hasAdminRole) {
      next({ path: '/home' });
      return;
    }
  }

  next();
});

export { router }
