import { Layout, AdminHomePage, List, AddEdit, Stats, Profile} from '@/views/admin';

export default {
    path: '/admin',
    component: Layout,
    children: [
        { path: '', component: AdminHomePage },
        { path: 'users/add', component: AddEdit },
        { path: 'edit/:id', component: AddEdit },
        { path: 'users/profile/:id', component: Profile},
        { path: 'users', component: List },
        { path: 'stats', component: Stats}
    ]
};

