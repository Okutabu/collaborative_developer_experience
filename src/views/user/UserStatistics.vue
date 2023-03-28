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

        </div>
        <div class="data" v-for="data in datas">
            <div class="data-value">
                {{ data.value }}
            </div>
        </div>
    </div>

</template>