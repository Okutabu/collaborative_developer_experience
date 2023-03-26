<script setup>
import { defineProps } from 'vue'
import Radar from './Radar.vue'

const props = defineProps({
  techno: Array,
})

</script>

<template>


        <div class="user_stats">
            <div> 
                <Radar :technoratio=props.techno :ref_key=props.techno /> 
            </div>
        </div>


</template>

<style scoped>
.user_stats {
    align-items: center;
    justify-content: center;
}


</style>