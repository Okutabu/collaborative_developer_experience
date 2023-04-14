<script setup>

import { result } from "lodash";
import VueApexCharts from "vue3-apexcharts";

const props = defineProps({
  technoratio: Array

})

const objName = [
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday",
"Sunday"
]

const obj =[ 
  [
    {
        x: 'Jan',
        y: 22
      }, {
        x: 'Feb',
        y: 29
      }, {
        x: 'Mar',
        y: 13
      }, {
        x: 'Apr',
        y: 32
      },{
        x: 'May',
        y: 22
      }, {
        x: 'Jun',
        y: 29
      }, {
        x: 'Jul',
        y: 13
      }, {
        x: 'Aug',
        y: 32
      },
      {
        x: 'Sep',
        y: 22
      }, {
        x: 'Oct',
        y: 29
      }, {
        x: 'Nov',
        y: 13
      }, {
        x: 'Dec',
        y: 32
      }

  ],
  [
    {
        x: 'Jan',
        y: 12
      }, {
        x: 'Feb',
        y: 19
      }, {
        x: 'Mar',
        y: 3
      }, {
        x: 'Apr',
        y: 22
      },{
        x: 'May',
        y: 12
      }, {
        x: 'Jun',
        y: 19
      }, {
        x: 'Jul',
        y: 3
      }, {
        x: 'Aug',
        y: 22
      },
      {
        x: 'Sep',
        y: 12
      }, {
        x: 'Oct',
        y: 19
      }, {
        x: 'Nov',
        y: 3
      }, {
        x: 'Dec',
        y: 22
      }

  ],
  [
    {
        x: 'Jan',
        y: 2
      }, {
        x: 'Feb',
        y: 9
      }, {
        x: 'Mar',
        y: 23
      }, {
        x: 'Apr',
        y: 12
      },{
        x: 'May',
        y: 2
      }, {
        x: 'Jun',
        y: 9
      }, {
        x: 'Jul',
        y: 23
      }, {
        x: 'Aug',
        y: 12
      },
      {
        x: 'Sep',
        y: 2
      }, {
        x: 'Oct',
        y: 9
      }, {
        x: 'Nov',
        y: 23
      }, {
        x: 'Dec',
        y: 12
      }

  ],
  [
    {
        x: 'Jan',
        y: 12
      }, {
        x: 'Feb',
        y: 19
      }, {
        x: 'Mar',
        y: 3
      }, {
        x: 'Apr',
        y: 22
      },{
        x: 'May',
        y: 12
      }, {
        x: 'Jun',
        y: 19
      }, {
        x: 'Jul',
        y: 3
      }, {
        x: 'Aug',
        y: 22
      },
      {
        x: 'Sep',
        y: 12
      }, {
        x: 'Oct',
        y: 19
      }, {
        x: 'Nov',
        y: 3
      }, {
        x: 'Dec',
        y: 22
      }
  ],
  [
    {
        x: 'Jan',
        y: 2
      }, {
        x: 'Feb',
        y: 9
      }, {
        x: 'Mar',
        y: 23
      }, {
        x: 'Apr',
        y: 12
      },{
        x: 'May',
        y: 2
      }, {
        x: 'Jun',
        y: 9
      }, {
        x: 'Jul',
        y: 23
      }, {
        x: 'Aug',
        y: 12
      },
      {
        x: 'Sep',
        y: 2
      }, {
        x: 'Oct',
        y: 9
      }, {
        x: 'Nov',
        y: 23
      }, {
        x: 'Dec',
        y: 12
      }
  ],
  [
    {
        x: 'Jan',
        y: 12
      }, {
        x: 'Feb',
        y: 19
      }, {
        x: 'Mar',
        y: 3
      }, {
        x: 'Apr',
        y: 22
      },{
        x: 'May',
        y: 12
      }, {
        x: 'Jun',
        y: 19
      }, {
        x: 'Jul',
        y: 3
      }, {
        x: 'Aug',
        y: 22
      },
      {
        x: 'Sep',
        y: 12
      }, {
        x: 'Oct',
        y: 19
      }, {
        x: 'Nov',
        y: 3
      }, {
        x: 'Dec',
        y: 22
      }
  ],
  [
    {
        x: 'Jan',
        y: 2
      }, {
        x: 'Feb',
        y: 9
      }, {
        x: 'Mar',
        y: 23
      }, {
        x: 'Apr',
        y: 12
      },{
        x: 'May',
        y: 2
      }, {
        x: 'Jun',
        y: 9
      }, {
        x: 'Jul',
        y: 23
      }, {
        x: 'Aug',
        y: 12
      },
      {
        x: 'Sep',
        y: 2
      }, {
        x: 'Oct',
        y: 9
      }, {
        x: 'Nov',
        y: 23
      }, {
        x: 'Dec',
        y: 12
      }
  ],

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
        type: 'category',
        categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
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