<script>
  import CalendarHeatmap from 'vue3-calendar-heatmap';
  import { defineProps } from 'vue';

  const props = defineProps({
    data : Array,
    EndDate : String,
})

const today = new Date();

const obj = [
    { date: '2021-01-01', count: 1 },
    { date: '2021-02-02', count: 2 },
    { date: '2021-03-03', count: 3 },
    { date: '2021-04-04', count: 4 },
    { date: '2021-05-05', count: 5 },
    { date: '2021-05-06', count: 6 },
    { date: '2021-06-07', count: 7 },
    { date: '2021-07-08', count: 5 },
    { date: '2021-08-09', count: 7 },
    { date: '2021-08-10', count: 1 },
    { date: '2021-08-11', count: 5 },
    { date: '2021-09-12', count: 8 },
    { date: '2021-10-13', count: 13 },
    { date: '2021-11-14', count: 7 },
    { date: '2021-12-15', count: 2 },
    { date: '2022-01-16', count: 1 },
    { date: '2022-03-17', count: 8 },
    { date: '2022-04-18', count: 10 },
    { date: '2022-04-19', count: 9 },
    { date: '2022-07-20', count: 2 },
    { date: '2022-07-21', count: 5 },
    { date: '2022-08-22', count: 4 },
    { date: '2022-09-23', count: 9 },
    { date: '2022-10-24', count: 6 },
    { date: '2022-10-25', count: 7 },
    { date: '2022-11-26', count: 4 },
    { date: '2022-12-27', count: 2 },
    { date: '2023-01-28', count: 4 },
    { date: '2023-02-29', count: 11 },
]

var date = "2023-02-29"

</script>

<template>

  <div class="div">nzndzjdz</div>
  <CalendarHeatmap :values="obj" :endDate="date"></CalendarHeatmap>

</template>

