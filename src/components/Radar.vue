<script setup>

import VueApexCharts from "vue3-apexcharts";

const props = defineProps({
  technoratio: Array
})

var series = []
series.push({name: ratios, data: props.technoratio.techno.map(item => item.ratio*100)})

var ratios = {
    
    chart: {
        type: 'radar',
        toolbar: {
            show: false
        },
    },
    xaxis: {
        categories: props.technoratio.techno.map(item => item.techno)}
    };

</script>

<template>

    <div id="chart">
        <VueApexCharts type="radar" height="300" :options="ratios" :series="series"></VueApexCharts>
    </div>

</template>


<style>

</style>
    
 