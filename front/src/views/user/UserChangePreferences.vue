<script>


import { defineProps } from 'vue';

const props = defineProps({
    title: String,
    datas: Array,
    graph: Array
})

</script>


<template>
    <div class="container-stat">
        <div class="title">
            <h2>Statistiques utilisateur</h2>
        </div>
        <div class="data" v-for="data in datas">
            <div class="data-value">
                {{ data.value }}
            </div>
        </div>
    </div>

</template>

<style scoped>

.title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
}

</style>