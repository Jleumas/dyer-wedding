import Vue from 'vue';
import VueRouter from 'vue-router';
import * as gettingReadyPhotos from '../../public/img/getting-ready/photos.json';
//import * as firstLookPhotos from '../../public/img/the-first-look/photos.json';

Vue.use(VueRouter);

// function returnJSON(folderName) {
//     switch (folderName) {
//         case '/getting-ready':
//             return gettingReadyPhotos.photos;
//         case 'the-first-look':
//             return firstLookPhotos.photos;
//         default:
//             return home.photos;
//     }
// }

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/:folder',
        props: {
            photos: gettingReadyPhotos.photos
        },
        component: () => import('../views/WeddingGallery.vue')
    }
];

const router = new VueRouter({
    routes
});

export default router;
