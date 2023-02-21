<script setup>

import VueApexCharts from "vue3-apexcharts";

// export default {
//     series: [{
// name: 'Series 1',
// data: [80, 50, 30, 40, 100, 20],
// }],

// chartOptions: {
// chart: {
//     height: 350,
//     type: 'radar',
// },
// title: {
//     text: 'Basic Radar Chart'
// },
// xaxis: {
//     categories: ['January', 'February', 'March', 'April', 'May', 'June']
// }
// }
// }

const props = defineProps({
  technoratio: Array
})

var series = []
series.push({name: ratios, data: props.technoratio.techno.map(item => item.ratio)})

// console.log(series)
var ratios = {chart: {
    height: 350,
    type: 'radar',
},
title: {
    text: 'Proficiency radar'
},
xaxis: {
    
    categories: props.technoratio.techno.map(item => item.techno)}
};
// console.log(ratios)

</script>

<template>

    <div id="chart">
        <VueApexCharts type="radar" height="350" :options="ratios" :series="series"></VueApexCharts>
    </div>

</template>


<style>
</style>
    
 