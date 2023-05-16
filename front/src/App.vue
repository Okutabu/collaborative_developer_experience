<script setup>
import { RouterView } from 'vue-router';

import Nav from "./components/Nav.vue";
import Alert from "./components/Alert.vue";

import { useAuthStore } from '@/stores';    

const authStore = useAuthStore();

const moveContainerHome = (is_expanded) => {
    if(is_expanded){
        document.querySelector('.container-home').style.transform = 'translateX(250px)';
    }else{
        document.querySelector('.container-home').style.transform = 'translateX(0px)';
    }
}

</script>

<template>
  <div
    class="app-container"
    :class="authStore.user && 'bg-white'"
  >
    <div class="container-nav">
      <Nav @toggle-menu="moveContainerHome" />
    </div>
        
    <Alert />
    <div class="container-workspace">
      <RouterView />
    </div>
  </div>
</template>

<style>
@import '@/assets/base.css';
@import '@/assets/theme.css';

* {
    -webkit-print-color-adjust: exact !important;   /* Chrome, Safari 6 – 15.3, Edge */
    color-adjust: exact !important;                 /* Firefox 48 – 96 */
    print-color-adjust: exact !important;           /* Firefox 97+, Safari 15.4+ */
}


.container-workspace{
    width: 100%;
    background-color: white;
    margin-left: calc(2rem + 32px);
}

.container-nav{
    position: fixed;
    z-index: 100;
    background-color: white;
}


.container-routerview{
    width: 100%;
    height: 100%;
    position: relative;
}

@keyframes reveal{
    0%{
        opacity: 0;
        transform: translateY(100px);
    }
    100%{
        opacity: 1;
        transform: translateY(0px);
    }
}

</style>