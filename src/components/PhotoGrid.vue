<template>
    <ul class="grid">
        <li
            v-for="(photo, i) in album.photos"
            :key="photo.id"
            :style="{ '--r': photo.w / photo.h }"
        >
            <button type="button" :aria-label="`Open photo ${i + 1} of ${album.photos.length}`" @click="$emit('open', i)">
                <img
                    v-lazy="{
                        srcset: `${thumbUrl(album, photo, 400)} 400w, ${thumbUrl(album, photo, 800)} 800w`,
                        sizes: sizesFor(photo)
                    }"
                    :width="photo.w"
                    :height="photo.h"
                    alt=""
                />
            </button>
        </li>
    </ul>
</template>

<script setup>
import { thumbUrl } from '../albums.js';

defineProps({ album: { type: Object, required: true } });
defineEmits(['open']);

// Rendered tile width is roughly row height × aspect ratio, plus up to ~40%
// stretch to fill the row. Row heights match --row in the CSS below.
const sizesFor = (p) => {
    const r = (p.w / p.h) * 1.4;
    return `(max-width: 640px) ${Math.ceil(110 * r)}px, ${Math.ceil(260 * r)}px`;
};

// Images get their srcset only once they come within 200px of the
// viewport, so a 343-photo album loads only the thumbnails you scroll to.
const observer =
    'IntersectionObserver' in window
        ? new IntersectionObserver(
              (entries) => {
                  for (const e of entries) {
                      if (!e.isIntersecting) continue;
                      load(e.target);
                      observer.unobserve(e.target);
                  }
              },
              { rootMargin: '200px 0px' }
          )
        : null;

function load(img) {
    img.sizes = img._lazy.sizes;
    img.srcset = img._lazy.srcset;
    img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
}

const vLazy = {
    mounted(img, { value }) {
        img._lazy = value;
        observer ? observer.observe(img) : load(img);
    },
    updated(img, { value, oldValue }) {
        if (value.srcset === oldValue.srcset) return;
        img._lazy = value;
        img.classList.remove('loaded');
        img.removeAttribute('srcset');
        observer ? observer.observe(img) : load(img);
    },
    beforeUnmount(img) {
        observer?.unobserve(img);
    }
};
</script>

<style scoped>
/* Justified rows: each tile grows in proportion to its aspect ratio. */
.grid {
    --row: 260px;
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}
.grid::after {
    /* Stops the last row from stretching a lone photo across the page. */
    content: '';
    flex-grow: 1e4;
}
li {
    flex: calc(var(--r) * 100) 1 calc(var(--r) * var(--row));
    aspect-ratio: var(--r);
    min-width: 0;
}
button {
    display: block;
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    border-radius: 4px;
    overflow: hidden;
    cursor: zoom-in;
    background: var(--tile);
}
img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 0.4s ease, transform 0.4s ease;
}
img.loaded {
    opacity: 1;
}
button:hover img.loaded {
    transform: scale(1.02);
}
button:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
}
@media (max-width: 640px) {
    .grid {
        --row: 110px;
        gap: 4px;
    }
}
</style>
