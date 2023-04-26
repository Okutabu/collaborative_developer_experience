<script setup>

import VueApexCharts from "vue3-apexcharts";

const props = defineProps({
  nbUser : Number,
  activeUser : Number
})


var series = []
series.push(props.activeUser)
series.push(props.nbUser)


var ratios = {
    
    chartOptions: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Team A', 'Team B'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }

};

</script>

<template>

    <div id="chart">
        <VueApexCharts type="pie" height="400" :options="ratios" :series="series"></VueApexCharts>
    </div>

</template>


<style>
    #chart {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
    
 