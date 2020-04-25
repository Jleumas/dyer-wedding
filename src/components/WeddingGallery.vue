<template>
    <div>
        <ul class="gallery" style="list-style-type:none;">
            <li v-for="(photo, name) in photos" :key="name">
                <a :href="photoFolder + photo">
                    <img :src="photoFolder + photo" loading="lazy" />
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'WeddingGallery',
    data: () => ({
        photoFolder: '/img/getting-ready/',
        photos: [
            'img0.jpg',
            'img1.jpg',
            'img10.jpg',
            'img11.jpg',
            'img12.jpg',
            'img13.jpg',
            'img14.jpg',
            'img15.jpg',
            'img16.jpg',
            'img17.jpg',
            'img18.jpg',
            'img19.jpg',
            'img2.jpg',
            'img20.jpg',
            'img21.jpg',
            'img22.jpg',
            'img23.jpg',
            'img24.jpg',
            'img25.jpg',
            'img26.jpg',
            'img27.jpg',
            'img28.jpg',
            'img29.jpg',
            'img3.jpg',
            'img30.jpg',
            'img31.jpg',
            'img32.jpg',
            'img33.jpg',
            'img34.jpg',
            'img35.jpg',
            'img36.jpg',
            'img37.jpg',
            'img38.jpg',
            'img39.jpg',
            'img4.jpg',
            'img40.jpg',
            'img41.jpg',
            'img42.jpg',
            'img43.jpg',
            'img44.jpg',
            'img45.jpg',
            'img46.jpg',
            'img47.jpg',
            'img48.jpg',
            'img49.jpg',
            'img5.jpg',
            'img50.jpg',
            'img6.jpg',
            'img7.jpg',
            'img8.jpg',
            'img9.jpg'
        ]
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
