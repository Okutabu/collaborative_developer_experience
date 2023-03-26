<script>
  import { CalendarHeatmap } from 'vue-calendar-heatmap'
  import ref from 'vue'

  export default {
    components: {
      CalendarHeatmap
    }
  }

  const props = defineProps({
    data : Array,
    color : String,
    tooltip : String,
    onClick : Function,
})

</script>

<template>



</template>

