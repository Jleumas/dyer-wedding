<template>
    <SiteHeader :album="currentAlbum" />
    <SiteNav />
    <main>
        <RouterView />
    </main>
    <footer class="footer">
        Photos by <a href="https://www.rachelartimephoto.com" rel="noopener">Rachel Artime</a>
    </footer>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import SiteHeader from './components/SiteHeader.vue';
import SiteNav from './components/SiteNav.vue';
import { albums, home } from './albums.js';

const route = useRoute();
const currentAlbum = computed(
    () => albums.find((a) => route.path === `/gallery/${a.slug}`) ?? home
);
</script>
