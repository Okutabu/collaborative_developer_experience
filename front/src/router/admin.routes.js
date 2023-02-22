import { Layout, AdminHomePage, List, AddEdit} from '@/views/admin';

export default {
    path: '/admin',
    component: Layout,
    children: [
        { path: '', component: AdminHomePage },
        { path: 'add', component: AddEdit },
        { path: 'edit/:id', component: AddEdit },
        { path: 'users', component: List }
    ]
};
