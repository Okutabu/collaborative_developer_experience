import { Layout, AdminHomePage, List, AddEdit, Stats} from '@/views/admin';

export default {
    path: '/admin',
    component: Layout,
    children: [
        { path: '', component: AdminHomePage },
        { path: 'users/add', component: AddEdit },
        { path: 'edit/:id', component: AddEdit },
        { path: 'users', component: List },
        { path: 'stats', component: Stats}
    ]
};

