<script setup>

import VueApexCharts from "vue3-apexcharts";

const props = defineProps({
  technoInteraction: Array
})

//console.log(props.technoInteraction.values);


var series = [];
/*
props.technoInteraction.forEach(elem => {
    series.push(elem.nbInteractions);
});
*/

for(let i =0; i < 5; i++){
    series.push(props.technoInteraction.nbInteractions);
}


var labels = [];
props.technoInteraction.forEach(elem => {
    labels.push(elem.tag);
});



var options = {
    
    chart: {
        type: 'donut'
        /*
        toolbar: {
            show: false
        },
        */
    },
    labels,
    series
    /*
    xaxis: {
        categories: props.technoratio.techno.map(item => item.techno)}
    };
    */
}
</script>

<template>

    <div id="chart">
        <VueApexCharts type="donut" height="300" :options="options"></VueApexCharts>
    </div>

</template>


<style>

</style>