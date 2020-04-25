import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/getting-ready',
        name: 'THE PREP',
        component: () => import('../views/GettingReady.vue')
    },
    {
        path: '/the-first-look',
        name: 'THE FIRST LOOK',
        component: () => import('../views/TheFirstLook.vue')
    },
    {
        path: '/the-ceremony',
        name: 'THE CEREMONY',
        component: () => import('../views/TheCeremony.vue')
    },
    {
        path: '/the-reception',
        name: 'THE RECEPTION',
        component: () => import('../views/TheReception.vue')
    },
    {
        path: '/the-party',
        name: 'THE PARTY',
        component: () => import('../views/TheParty.vue')
    },
    {
        path: '/the-couple',
        name: 'THE COUPLE',
        component: () => import('../views/TheCouple.vue')
    },
    {
        path: '/the-details',
        name: 'THE DETAILS',
        component: () => import('../views/TheDetails.vue')
    }
];

const router = new VueRouter({
    routes
});

export default router;
