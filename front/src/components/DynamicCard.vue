<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';
import UserCardSimplified from './UserCardSimplified.vue';
import UserCard from './UserCard.vue';


const props = defineProps({
  nom: String,
  type: String,
  reco : String, 

})
var boolean = ref(true);
function swapComponent() {
    boolean.value = !boolean.value;
  }



      
</script>

<template>

    <div @click="swapComponent">
        <component :is="boolean ? UserCard : UserCardSimplified " />
    </div>


</template>
