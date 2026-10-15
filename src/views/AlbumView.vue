<template>
    <section class="album">
        <p class="count">{{ album.photos.length }} photos</p>
        <PhotoGrid :album="album" @open="open" />
        <Lightbox
            v-if="index !== -1"
            :album="album"
            :index="index"
            @navigate="show"
            @close="close"
        />
    </section>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PhotoGrid from '../components/PhotoGrid.vue';
import Lightbox from '../components/Lightbox.vue';

const props = defineProps({ album: { type: Object, required: true } });
const route = useRoute();
const router = useRouter();

// The open photo lives in the URL (?photo=img123) so it can be shared and
// so the browser/phone back button closes the viewer.
const index = computed(() => props.album.photos.findIndex((p) => p.id === route.query.photo));

function open(i) {
    router.push({ query: { photo: props.album.photos[i].id } });
}
function show(i) {
    router.replace({ query: { photo: props.album.photos[i].id } });
}
function close() {
    // If we opened it, going back restores the exact history entry; if the
    // page was loaded straight onto a photo link, just drop the query.
    if (window.history.state?.back === route.path) router.back();
    else router.replace({ query: {} });
}
</script>

<style scoped>
.album {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px 16px 0;
}
.count {
    margin: 0 4px 14px;
    color: var(--muted);
    font-size: 0.8rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
}
</style>
