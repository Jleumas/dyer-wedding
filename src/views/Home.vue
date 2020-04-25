<template>
    <div class="home">
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
export default {
    name: 'Home'
};
</script>
