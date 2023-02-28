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
        <Transition name="bounce">
        <component :is="boolean ? UserCard : UserCardSimplified" :nom={nom}.nom :type={type}.type :reco={reco}.reco :techno={techno} />
        </Transition>
    </div>

</template>

<style scoped>

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.001s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

</style>