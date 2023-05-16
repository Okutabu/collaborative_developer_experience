<script setup>

import VueApexCharts from "vue3-apexcharts";

const props = defineProps({
  technoratio: Object
})

var series = []
series.push({name: ratios, data: props.technoratio.techno.map(item => (item.ratio*100).toFixed(2))})

var ratios = {
    
    chart: {
        type: 'radar',
        toolbar: {
            show: false
        },
    },
    xaxis: {
        categories: props.technoratio.techno.map(item => item.techno)},
    
    fill: {
    opacity: 0.5,
    colors: ['#8099f6']
  },

  stroke: {
    show: true,
    width: 2,
    colors: ['#5147F1'],
    dashArray: 0
  },

  markers: {
    size: 5,
    colors: ['#9465F1'],
    strokeColors: '#fff',
    strokeWidth: 2,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    shape: "circle",
    radius: 2,
    offsetX: 0,
    offsetY: 0,
    onClick: undefined,
    onDblClick: undefined,
    showNullDataPoints: true,
    hover: {
      size: undefined,
      sizeOffset: 3
    }
},

    };

</script>

<template>

    <div id="chart">
        <VueApexCharts type="radar"  width="600" height="350" :options="ratios" :series="series"></VueApexCharts>
    </div>

</template>


<style>
    #chart {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
    
 