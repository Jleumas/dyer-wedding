<template>
    <div>
        <ul class="gallery" style="list-style-type:none;">
            <li v-for="(photo, name) in photos" :key="name">
                <a :href="'img' + $route.path + photo">
                    <img
                        :src="'img' + $route.path + '/' + photo"
                        loading="lazy"
                    />
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
// import WeddingHeader from '../components/WeddingHeader.vue';
import * as photos from '../../public/img/getting-ready/photos.json';
export default {
    name: 'GettingReady',
    data: () => ({
        photoFolder: '/img/getting-ready/',
        photos: photos.photos
    })
};
</script>

<style scoped>
div {
    width: 90%;
    margin: auto;
}
ul {
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    padding-inline-start: 0px;
}
li {
    flex-grow: 2;
    height: 40vh;
    padding: 10px;
}
li:last-child {
    flex-grow: 10;
}
img {
    max-height: 100%;
    min-width: 100%;
    object-fit: cover;
    vertical-align: bottom;
}
@media (max-aspect-ratio: 1/1) {
    li {
        height: 30vh;
    }
}
@media (max-height: 480px) {
    li {
        height: 80vh;
    }
}
@media (max-aspect-ratio: 1/1) and (max-width: 480px) {
    ul {
        flex-direction: row;
    }
    li {
        height: auto;
        width: 100%;
    }
    img {
        width: 100%;
        max-height: 75vh;
        min-width: 0;
    }
}
</style>
