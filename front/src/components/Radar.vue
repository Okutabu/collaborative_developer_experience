<script>

import VueApexCharts from "vue3-apexcharts";
import { defineProps } from 'vue'

export default {
    name: 'radar',
    components: {
        VueApexCharts,
    },
    props: {
        nom: String,
        type: String,
        reco : String,
        techno: String,
        ratio: Number,
    },
    data: {
    
    series: [{
    name: 'Series 1',
    data: [80, 50, 30, 40, 100, 20],
    }],
    chartOptions: {
    chart: {
        height: 350,
        type: 'radar',
    },
    title: {
        text: 'Basic Radar Chart'
    },
    xaxis: {
        categories: ['January', 'February', 'March', 'April', 'May', 'June']
    }
    },
}
}




</script>

<template>

    
    <div id="chart">
        <VueApexchart type="radar" height="350" :options="chartOptions" :series="series"></VueApexchart>
    </div>

</template>


<style>
</style>
    
 