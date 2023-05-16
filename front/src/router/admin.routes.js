import { Layout, List, Stats, Profile } from '@/views/admin';

export default {
  path: '/admin',
  component: Layout,
  children: [
    { path: 'list', component: List },
    { path: 'users/profile/:id', component: Profile },
    { path: 'stats', component: Stats },
    { path: '', redirect: '/admin/list' }
  ]
};
