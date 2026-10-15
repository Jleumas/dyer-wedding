<template>
    <nav ref="nav" class="nav" aria-label="Albums">
        <ul>
            <li v-for="album in albums" :key="album.slug">
                <RouterLink :to="`/gallery/${album.slug}`">{{ album.title }}</RouterLink>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { albums } from '../albums.js';

// On narrow screens the album list scrolls sideways; keep the current one visible.
const nav = ref(null);
const route = useRoute();
watch(
    () => route.path,
    async () => {
        await nextTick();
        const active = nav.value?.querySelector('.router-link-active');
        const list = active?.closest('ul');
        if (!active || list.scrollWidth <= list.clientWidth) return;
        list.scrollTo({
            left: active.offsetLeft - (list.clientWidth - active.offsetWidth) / 2,
            behavior: 'smooth'
        });
    },
    { immediate: true, flush: 'post' }
);
</script>

<style scoped>
.nav {
    position: sticky;
    top: 0;
    z-index: 10;
    background: color-mix(in srgb, var(--bg) 88%, transparent);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--line);
}
ul {
    list-style: none;
    margin: 0 auto;
    padding: 10px 16px;
    max-width: 1400px;
    display: flex;
    gap: 4px;
    overflow-x: auto;
    scrollbar-width: none;
    justify-content: safe center;
}
ul::-webkit-scrollbar {
    display: none;
}
a {
    display: block;
    padding: 8px 14px;
    border-radius: 999px;
    white-space: nowrap;
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
    text-decoration: none;
    transition: color 0.2s, background 0.2s;
}
a:hover {
    color: var(--ink);
}
a.router-link-active {
    color: #fff;
    background: var(--accent);
}
</style>
