import { createRouter, createWebHistory } from 'vue-router'
import { useApplicationStore } from '@/stores/user.js'


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
      path: '/edit',
      name: 'edit',
      component: () => import('../views/UpdatePersonalInfoView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/hospitals/new',
      name: 'hospital-new',
      component: () => import('../views/CreateHospitalView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/hospitals',
      name: 'hospitals',
      component: () => import('../views/HospitalsView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/applications/new',
      name: 'application-new',
      component: () => import('../views/CreateApplicationView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/applications',
      name: 'applications',
      component: () => import('../views/ApplicationsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/application/:id',
      name: 'application',
      component: () => import('../views/ApplicationView.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'details',
          name: 'application-details',
          component: () => import("../views/ApplicationDetailsView.vue"),
          meta: { requiresAuth: true },
        },{
          path: 'delete',
          name: 'application-delete',
          component: () => import("../views/DeleteApplicationView.vue"),
          meta: { requiresAuth: true },
        }
      ]
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UsersView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/user/:id',
      name: 'user',
      component: () => import('../views/UserView.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'user-details',
          component: () => import("../views/UserDetailsView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: '',
          name: 'user-delete',
          component: () => import("../views/DeleteUserView.vue"),
          meta: { requiresAuth: true },
        },{
          path: '',
          name: 'user-edit',
          component: () => import("../views/EditUserCredentialsView.vue"),
          meta: { requiresAuth: true },
        }
      ]
    },{
      path: '/notifications',
      name: 'notifications',
      component: () => import('../views/NotificationsView.vue'),
      meta: { requiresAuth: true },
    },{
      path: '/notification/:id',
      name: 'notification',
      component: () => import('../views/NotificationView.vue'),
      meta: { requiresAuth: true },
      children : [
        {
          path: '',
          name: 'notification-delete',
          component: () => import("../views/DeleteNotificationView.vue"),
          meta: { requiresAuth: true },
        }
      ]
    },{
      path: '/notifications/new/',
      name: 'notifications-new',
      component: () => import('../views/CreateNotificationView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/SigninView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue')

    },
    {
      path: '/signout',
      name: 'signout',
      component: () => import('../views/SignoutView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/user-application/:id',
      name: 'user-application',
      component: () => import('../views/UserApplicationView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
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
