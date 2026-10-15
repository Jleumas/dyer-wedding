<template>
    <header class="hero" :class="{ compact: album.slug !== home.slug }">
        <picture v-if="album.splash" :key="album.slug">
            <source
                :srcset="`${splashUrl(album, 960)} 960w, ${splashUrl(album, 1920)} 1920w`"
                sizes="100vw"
                type="image/webp"
            />
            <img :src="splashUrl(album, 1920)" alt="" fetchpriority="high" />
        </picture>
        <div class="hero-text">
            <RouterLink to="/" class="hero-title">The Dyer Wedding</RouterLink>
            <p v-if="album.slug === home.slug" class="hero-meta">
                February 15, 2020<span>·</span>Serenity Escape<span>·</span>Yucca Valley, California
            </p>
            <h1 v-else class="hero-album">{{ album.title }}</h1>
        </div>
    </header>
</template>

<script setup>
import { home, splashUrl } from '../albums.js';

defineProps({ album: { type: Object, required: true } });
</script>

<style scoped>
.hero {
    position: relative;
    height: min(72vh, 760px);
    min-height: 340px;
    display: grid;
    place-items: center;
    overflow: hidden;
    background: var(--ink);
    color: #fff;
}
.hero.compact {
    height: min(42vh, 440px);
    min-height: 240px;
}
picture,
img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
}
img {
    object-fit: cover;
    animation: fade 0.6s ease both;
}
.hero::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(20, 14, 10, 0.15), rgba(20, 14, 10, 0.55));
}
.hero-text {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 0 16px;
    text-shadow: 0 1px 12px rgba(0, 0, 0, 0.35);
}
.hero-title {
    font: 500 clamp(2.6rem, 8vw, 5.5rem) / 1 var(--serif);
    color: inherit;
    text-decoration: none;
}
.compact .hero-title {
    font-size: clamp(1rem, 2.5vw, 1.3rem);
    font-family: var(--sans);
    letter-spacing: 0.2em;
    text-transform: uppercase;
}
.hero-meta {
    margin-top: 18px;
    font-size: clamp(0.85rem, 1.8vw, 1.05rem);
    letter-spacing: 0.08em;
}
.hero-meta span {
    margin: 0 0.6em;
    opacity: 0.7;
}
.hero-album {
    margin-top: 10px;
    font: italic 500 clamp(2.4rem, 7vw, 4.8rem) / 1.05 var(--serif);
}
@keyframes fade {
    from {
        opacity: 0;
    }
}
</style>
