<template>
    <v-app>
        <v-content transition="slide-x-transition">
            <WeddingNav></WeddingNav>
            <WeddingHeader :photoFolder="$route.path"></WeddingHeader>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
import WeddingNav from './components/WeddingNav.vue';
import WeddingHeader from './components/WeddingHeader.vue';
export default {
    name: 'App',
    components: {
        WeddingNav,
        WeddingHeader
    }
};
</script>

<style>
body {
    background-image: linear-gradient(
        to top,
        #ecedee 0%,
        #eceeef 75%,
        #adbfd1 100%
    );
    min-height: 100vh;
}
</style>
