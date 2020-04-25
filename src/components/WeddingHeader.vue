<template>
    <div id="headerContainer">
        <img id="splash" :src="'/img' + photoFolder + '/splash.jpg'" />
        <div id="textBlock">
            <h1>The Dyer Wedding</h1>
            <h3>February 15, 2020</h3>
            <h3>Serenity Escape</h3>
            <h3>Yucca Valley, California</h3>
            <h3>
                Photos courtesy of
                <a href="https://www.rachelartimephoto.com">Rachel Artime</a>
            </h3>
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
    position: absolute;
    top: 10%;
    width: 100%;
    color: white;
    text-shadow: 1px 1px black;
    text-align: center;
}
#headerContainer {
    position: relative;
}
h1 {
    font-size: 7vw;
    padding: 10px;
    margin: 10px;
}
h3 {
    font-size: 3vw;
    padding: 3px;
    margin: 3px;
}
a {
    text-decoration: none;
    text-shadow: none;
}
</style>
