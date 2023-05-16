import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore, useAlertStore } from '@/stores';
import { Home } from '@/views';
import accountRoutes from './account.routes';
import adminRoutes from './admin.routes';
import userRoutes from './user.routes';
import marketingRoutes from './marketing.routes';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    // { path: '/', redirect: Home },
    { ...accountRoutes },
    { ...userRoutes },
    { ...adminRoutes },
    { ...marketingRoutes },
    // catch all redirect to home page
    { path: '/:pathMatch(.*)*', redirect: '/user' }
    // catch home page to userOverview
  ]
});

router.beforeEach(async (to) => {
  // clear alert on route change
  const alertStore = useAlertStore();
  alertStore.clear();

  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/account/login', '/account/register', '/admin/', '/admin/users', '/admin/users/add', '/admin/users/edit/:id', '/admin/collecteur', '/admin/list', '/admin/stats', '/admin/users/profile/:id', '/help/:id', '/marketing'];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  const user = localStorage.getItem('user');

  if (user && (to.path == '/account/login' || to.path == '/account/register')) {
    console.log('user', user);
    return '/';
  } else if (authRequired && !authStore.user) {
    console.log('authRequired', authRequired);
    authStore.returnUrl = to.path;
    return '/account/login';
  }
});
