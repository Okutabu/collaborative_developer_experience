import { Layout, Home, Statistics, UserPreferences } from '@/views/user';


export default {
    path: '/',
    component: Layout,
    children: [
        { path: '/overview', component: Home },
        { path: '/statistics', component: Statistics },
        { path: '/preferences', component: UserPreferences},
        { path: '', redirect: '/overview'}
    ]
};
