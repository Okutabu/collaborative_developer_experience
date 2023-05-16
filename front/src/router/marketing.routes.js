import { Home } from '@/views/marketing';

export default {
    path: '/',
    component: Home,
    children: [
        { path: '/marketing', component: Home },
        { path: '', redirect: '/marketing'}
    ]
};
