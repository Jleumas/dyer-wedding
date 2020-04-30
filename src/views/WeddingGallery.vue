<template>
    <div>
        <ul :name="photos" class="gallery" style="list-style-type:none;">
            <li v-for="imagePath in imagePaths" :key="imagePath">
                <a :href="'img' + imagePath">
                    <img :src="'img/' + imagePath" />
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
function FindImages(imageRoutes, imgpath) {
    var allImages = [];

    for (let index = 0; index < imageRoutes.length; index++) {
        const photoContext = imageRoutes[index];

        const pathsForKey = photoContext.photos.map(
            photoName => `${photoContext.path}/${photoName}`
        );
        allImages = allImages.concat(pathsForKey);
    }

    return allImages.filter(x => x.startsWith(imgpath));
}

export default {
    name: 'WeddingGallery',
    props: ['folder', 'photos'],
    data() {
        return {
            imagePaths: []
        };
    },
    created() {
        // fetch the data when the view is created and the data is
        // already being observed
        this.fetchData();
    },
    watch: {
        // call again the method if the route changes
        $route: 'fetchData'
    },
    methods: {
        async fetchData() {
            // Hit AWS function to get photo paths.
            // TODO: Use Axios
            const imageRoutes = await window
                .fetch('/img/allphotos.json')
                .then(response => response.json());

            this.imagePaths = FindImages(
                imageRoutes.photos,
                this.$route.params.imgpath
            );
        }
    }
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
