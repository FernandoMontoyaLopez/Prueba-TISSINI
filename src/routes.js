const login = () => import('./views/login.vue');
const home = () => import('./views/home.vue');

export const routes = [

    {
        name: 'login',
        path: '/',
        component: login
    },
    

    {
        name: 'home',
        path: '/home',
        component: home
    }
];