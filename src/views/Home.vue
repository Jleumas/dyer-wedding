<template>
    <div class="home">
        <ul class="gallery" style="list-style-type:none;">
            <li v-for="imagePath in imagePaths" :key="imagePath">
                <a :href="imagePath">
                    <img :src="imagePath" />
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Home',
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
            // Hit AWS function to search photo paths.
            // TODO: Use Axios?
            const imageRoutes = await window
                .fetch('/gallery/allphotos.json')
                .then(response => response.json());

            this.imagePaths = imageRoutes.photos.filter(x =>
                x.includes('home/img')
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
    height: 60vh;
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
