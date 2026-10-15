import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import AlbumView from './views/AlbumView.vue';
import { albums, home } from './albums.js';
import './style.css';

// One route per album folder; nothing here needs editing when albums change.
const routes = [
    { path: '/', component: AlbumView, props: { album: home } },
    ...albums.map((album) => ({
        path: `/gallery/${album.slug}`,
        component: AlbumView,
        props: { album },
        meta: { title: album.title }
    })),
    { path: '/:rest(.*)*', redirect: '/' }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, saved) {
        // Opening or closing a photo only changes the query; keep the scroll position.
        if (to.path === from.path) return false;
        return saved ?? { top: 0 };
    }
});

router.afterEach((to) => {
    document.title = to.meta.title ? `${to.meta.title} · The Dyer Wedding` : 'The Dyer Wedding';
});

createApp(App).use(router).mount('#app');
