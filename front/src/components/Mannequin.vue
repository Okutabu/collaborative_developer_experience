<script setup>
import { defineProps } from 'vue';


const props = defineProps({
    myData : Object
})
      
</script>

<template>
  <div>
    <p> {{ props.myData }} </p>
  </div>
</template>

<style>
</style>
