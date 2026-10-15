<template>
    <div
        ref="root"
        class="lightbox"
        role="dialog"
        aria-modal="true"
        :aria-label="`Photo ${index + 1} of ${album.photos.length}`"
        tabindex="-1"
        @click.self="$emit('close')"
        @keydown="onKey"
        @touchstart.passive="onTouchStart"
        @touchend="onTouchEnd"
    >
        <figure @click.self="$emit('close')">
            <!-- The grid thumbnail is already cached, so show it instantly and
                 let the larger image fade in over it. -->
            <img class="placeholder" :src="thumbUrl(album, photo, 800)" alt="" :style="fit" />
            <img
                :key="photo.id"
                class="full"
                :class="{ loaded }"
                :src="largeUrl(album, photo)"
                :style="fit"
                alt=""
                @load="loaded = true"
            />
        </figure>

        <div class="bar">
            <span class="counter">{{ index + 1 }} / {{ album.photos.length }}</span>
            <a class="action" :href="originalUrl(album, photo)" download>Download</a>
            <button type="button" class="action" aria-label="Close" @click="$emit('close')">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
        </div>

        <button v-if="index > 0" type="button" class="arrow prev" aria-label="Previous photo" @click="go(-1)">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
        </button>
        <button
            v-if="index < album.photos.length - 1"
            type="button"
            class="arrow next"
            aria-label="Next photo"
            @click="go(1)"
        >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
        </button>
    </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { largeUrl, originalUrl, thumbUrl } from '../albums.js';

const props = defineProps({
    album: { type: Object, required: true },
    index: { type: Number, required: true }
});
const emit = defineEmits(['navigate', 'close']);

const root = ref(null);
const loaded = ref(false);
const photo = computed(() => props.album.photos[props.index]);
// Size both layers identically so the placeholder sits exactly under the full image.
const fit = computed(() => ({ '--r': photo.value.w / photo.value.h, '--w': `${photo.value.w}px` }));

function go(step) {
    const next = props.index + step;
    if (next >= 0 && next < props.album.photos.length) emit('navigate', next);
}

// Fetch the neighbours' large images so arrowing through feels instant.
function preloadNeighbours() {
    for (const i of [props.index - 1, props.index + 1]) {
        const p = props.album.photos[i];
        if (p) new Image().src = largeUrl(props.album, p);
    }
}

watch(
    () => props.index,
    () => {
        loaded.value = false;
        preloadNeighbours();
    }
);

function onKey(e) {
    if (e.key === 'Escape') emit('close');
    else if (e.key === 'ArrowLeft') go(-1);
    else if (e.key === 'ArrowRight') go(1);
}

let touchX = null;
let touchY = null;
function onTouchStart(e) {
    touchX = e.touches[0].clientX;
    touchY = e.touches[0].clientY;
}
function onTouchEnd(e) {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    const dy = e.changedTouches[0].clientY - touchY;
    touchX = touchY = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
    else if (dy > 80 && Math.abs(dy) > Math.abs(dx)) emit('close'); // swipe down to dismiss
}

let lastFocus = null;
onMounted(() => {
    lastFocus = document.activeElement;
    document.documentElement.style.overflow = 'hidden';
    root.value.focus();
    preloadNeighbours();
});
onBeforeUnmount(() => {
    document.documentElement.style.overflow = '';
    lastFocus?.focus?.({ preventScroll: true });
});
</script>

<style scoped>
.lightbox {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: grid;
    place-items: center;
    background: rgba(18, 14, 11, 0.94);
    cursor: zoom-out;
    animation: fade 0.2s ease;
    outline: none;
}
figure {
    position: relative;
    margin: 0;
    display: grid;
    place-items: center;
    width: 100vw;
    height: 100dvh;
    padding: 56px 16px;
}
figure img {
    grid-area: 1 / 1;
    /* Largest size that fits the viewport (minus the top bar) without upscaling. */
    width: min(100%, calc((100dvh - 112px) * var(--r)), var(--w));
    height: auto;
    aspect-ratio: var(--r);
    object-fit: cover;
    border-radius: 2px;
    cursor: default;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}
.placeholder {
    filter: blur(8px);
    transform: scale(1.01);
}
.full {
    /* The blurred placeholder's transform puts it on its own layer; lift this above it. */
    position: relative;
    opacity: 0;
    transition: opacity 0.25s ease;
}
.full.loaded {
    opacity: 1;
}
.bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px 10px 20px;
    color: rgba(255, 255, 255, 0.85);
    pointer-events: none;
}
.bar > * {
    pointer-events: auto;
}
.counter {
    margin-right: auto;
    font-size: 0.85rem;
    letter-spacing: 0.08em;
    font-variant-numeric: tabular-nums;
}
.action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 40px;
    height: 40px;
    padding: 0 12px;
    border: 0;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    font: 500 0.8rem var(--sans);
    letter-spacing: 0.06em;
    text-decoration: none;
    cursor: pointer;
}
.action:hover,
.arrow:hover {
    background: rgba(255, 255, 255, 0.2);
}
.arrow {
    position: fixed;
    top: 50%;
    width: 48px;
    height: 48px;
    margin-top: -24px;
    border: 0;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
    cursor: pointer;
    display: grid;
    place-items: center;
}
.prev {
    left: 12px;
}
.next {
    right: 12px;
}
svg {
    width: 22px;
    height: 22px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
}
.action svg {
    width: 18px;
    height: 18px;
}
button:focus-visible,
a:focus-visible {
    outline: 2px solid #fff;
    outline-offset: 2px;
}
@media (max-width: 640px), (hover: none) {
    /* Swipe instead; arrows would cover the photo on a phone. */
    .arrow {
        display: none;
    }
    figure {
        padding: 56px 0;
    }
}
@keyframes fade {
    from {
        opacity: 0;
    }
}
</style>
