<template>
    <span>
        <span class="hidden-md-and-up">
            <v-card outlined class="pa-4 text-center" @click="drawer=!drawer">click me</v-card>
            <v-navigation-drawer
                v-model="drawer"
                absolute
                temporary>
                <v-card class="pa-4 text-center" v-for="(value, name) in pages" :key="name">
                    <router-link :to="value">
                        {{name}}
                    </router-link>
                </v-card>
            </v-navigation-drawer>
        </span>
        <v-toolbar app class="hidden-sm-and-down" light>
            <v-col v-for="(value, name) in pages" :key="name">
                <v-tab class="pa-4 text-center">
                    <router-link :to="value">
                        {{name}}
                    </router-link>
                </v-tab>
            </v-col>
        </v-toolbar>
    </span>
</template>

<script>
    export default {
        name: 'WeddingNav',
        data: () => ({
            drawer: null,
            pages: {
                'THE PREP': '/getting-ready',
                'THE FIRST LOOK': '/the-first-look',
                'THE CEREMONY': '/the-ceremony',
                'THE FAMILY': 'the-family',
                'THE PARTY': '/the-party',
                'THE COUPLE': 'the-couple',
                'THE DETAILS': 'the-details'
            }
        }),
    }
</script>

<style scoped>
    a {
        color: black;
        text-decoration: none;
        
    }
</style>
