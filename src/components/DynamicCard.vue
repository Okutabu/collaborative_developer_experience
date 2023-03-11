<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';
import UserCardSimplified from './UserCardSimplified.vue';
import UserCard from './UserCard.vue';


const props = defineProps({
  nom: String,
  type: String,
  pseudo: String,
  avatar: String,
  reco : String, 
  techno: String,
})
var boolean = ref(true);
function swapComponent() {
    boolean.value = true;
  }



      
</script>

<template>

    <div @click="swapComponent">
        <component :is="boolean ? UserCard : UserCardSimplified " :nom={nom}.nom :type={type}.type :reco={reco}.reco :techno={techno} :avatar={avatar}.avatar :pseudo={nom}.nom />
    </div>


</template>
