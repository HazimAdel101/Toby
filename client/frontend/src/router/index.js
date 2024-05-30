import { createRouter, createWebHistory } from 'vue-router'

import login from '../views/login.vue';

const routes = [
    {
        path: '/login',
        name: 'Home',
        component: login
    },
    {
        path: '/login',
        name: 'login',
        component: login
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router;