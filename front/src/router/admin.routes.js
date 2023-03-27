import { Layout, Collecteur, List, AddEdit, Stats, Profile} from '@/views/admin';


export default {
    path: '/admin',
    component: Layout,
    children: [
        { path: '', component: List },
        { path: 'users/add', component: AddEdit },
        { path: 'edit/:id', component: AddEdit },
        { path: 'users/profile/:id', component: Profile},
        { path: 'stats', component: Stats},
        { path: 'collecteur', component: Collecteur}
    ]
};

