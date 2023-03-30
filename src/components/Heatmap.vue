<script setup>

import { result } from "lodash";
import VueApexCharts from "vue3-apexcharts";

const props = defineProps({
  technoratio: Array

})

/*
HeatMap struct: {
name: ["string", 
              "string"
            ],
data: [ 
        [date, value, taille],
]
}
*/

const objName = [
"Stephen Williams",
"David Stuart",
"Amanda Davis",
"Lynn Willis",
"Mitchell Boyd"
]

const obj =[ 
  [
    ["03-07 GMT", 10],
    ["03-08 GMT", 1],
    ["03-09 GMT", 19],
    ["03-10 GMT", 5],
    ["03-11 GMT", 5]
  ],
  [
    ["03-07 GMT", 10],
    ["03-08 GMT", 1],
    ["03-09 GMT", 19],
    ["03-10 GMT", 5],
    ["03-11 GMT", 5]
  ],
  [
    ["03-07 GMT", 10],
    ["03-08 GMT", 1],
    ["03-09 GMT", 19],
    ["03-10 GMT", 5],
    ["03-11 GMT", 5]
  ],
  [
    ["03-07 GMT", 10],
    ["03-08 GMT", 1],
    ["03-09 GMT", 19],
    ["03-10 GMT", 5],
    ["03-11 GMT", 5]
  ],
  [
    ["03-07 GMT", 10],
    ["03-08 GMT", 1],
    ["03-09 GMT", 19],
    ["03-10 GMT", 5],
    ["03-11 GMT", 5]
  ]
]

function associateNamesWithObj(objName, obj) {
  const result = [];
  for (let i = 0; i < objName.length; i++) {
      var objet = {
        name: objName[i],
        data: obj[i]};
      result.push(objet);
  }
  return result;
}

const objWithName = associateNamesWithObj(objName, obj);
console.log(objWithName);

var series = objWithName;
//series.push(objWithName.map(item=>name: result.map(item=>item.obj), data: obj})

console.log(series);

var chartOptions = {
    
    chart: {
        type: 'heatmap',
        toolbar: {
            show: false
        },
    },
    colors: ["#00FF40"],
    dataLabels: {
        enabled: false
    },
    xaxis: {
        type: 'datetime',
        categories: [
            "03-07",
            "03-08",
            "03-09",
            "03-10",
            "03-11"
        ]
    },
    };

var date = "2023-02-29"

</script>

<template>

    <div id="chart">
        <VueApexCharts type="heatmap" height="350" :options="chartOptions" :series="series"></VueApexCharts>
    </div>


</template>


<style>

</style>