import { Layout, Home, Statistics } from '@/views/user';


export default {
    path: '/',
    component: Layout,
    children: [
        { path: '/overview', component: Home },
        { path: '/statistics', component: Statistics },
        { path: '', redirect: '/overview'}
    ]
};
