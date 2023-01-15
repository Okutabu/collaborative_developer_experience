<script>

import Chart from './Chart.vue'

export default {

    components: {
    Chart
  },

    props: ['data'],
    setup(props) {
        const propsname = props.data.name
        return { propsname }}
}
</script>

<template>

    <div class="container_user_card">
        <div class="container_user_info">
            <div class="user_picture">
                <img src="../assets/logo.svg" alt="">
            </div>
            <div class="user_description">
                <p>{{ data }}</p>
                <p>age</p>
                <p>description</p>
            </div>
        </div>
        <div class="user_stats">
            <p>stats</p>
        <div> <Chart /> </div>
        </div>
    </div>

</template>

<style>


.container_user_info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50%;
    /* background-color: red; */
}

.container_user_card img{
    width: 100px;
    height: 100px;
}

.container_user_info {
    padding: 0;
    margin: 0;
    align-items: center;
    display: flex;
    justify-content: space-around;
}


</style>