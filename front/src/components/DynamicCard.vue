<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';
import UserCardSimplified from './UserCardSimplified.vue';
import UserCard from './UserCard.vue';


const props = defineProps({
  nom: String,
  type: String,
  reco : String, 
  techno: String,
})
var boolean = ref(false);
function swapComponent() {
    boolean.value = !boolean.value;
  }



      
</script>

<template>

    <div @click="swapComponent">
        <component :is="boolean ? UserCard : UserCardSimplified " :nom={nom}.nom :type={type}.type :reco={reco}.reco :techno={techno} />
    </div>


</template>
