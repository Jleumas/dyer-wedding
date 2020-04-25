<template>
    <div id="headerContainer">
        <img id="splash" :src="'/img' + photoFolder + '/splash.jpg'" />
        <div id="textBlock">
            <router-link to="/"><h1>The Dyer Wedding</h1></router-link>
            <h3>February 15, 2020</h3>
            <h3>Serenity Escape</h3>
            <h3>Yucca Valley, California</h3>
            <a href="https://www.rachelartimephoto.com">
                <h3>Photos courtesy of Rachel Artime</h3>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WeddingHeader',
    props: ['photoFolder'],
    data: () => ({})
};
</script>

<style scoped>
#splash {
    opacity: 80%;
    position: relative;
    object-fit: cover;
    width: 100%;
    max-height: 50vw;
    margin: 0 auto;
}
#textBlock {
    opacity: 90%;
    position: absolute;
    top: 5%;
    width: 100%;
    color: white;
    text-shadow: 2px 2px black;
    text-align: center;
}
#headerContainer {
    position: relative;
}
h1 {
    color: white;
    font-size: 7vw;
    padding: 10px;
    margin: 10px;
}
h3 {
    color: white;
    font-size: 3vw;
    padding: 3px;
    margin: 3px;
}
a {
    text-decoration: none;
}
</style>
