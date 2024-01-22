import { createRouter, createWebHistory } from 'vue-router'
import { useApplicationStore } from '@/stores/application.js'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/hospitals',
      name: 'hospitals',
      component: () => import('../views/HospitalsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/hospitals/:id',
      name: 'hospital',
      component: () => import('../views/HospitalView.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'hospital-details',
          component: () => import('../views/HospitalDetailsView.vue'),
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/applications',
      name: 'application',
      component: () => import('../views/ApplicationsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/signin',
      name: 'signin',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SigninView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SignupView.vue')

    },
    {
      path: '/signout',
      name: 'signout',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SignoutView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useApplicationStore();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !isAuthenticated) {
    console.log('user not authenticated. redirecting to /signin');
    next('/signin');
  } else {
    next();
  }
});

export default router
