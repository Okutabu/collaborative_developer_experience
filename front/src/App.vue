<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { onMounted, onBeforeUnmount } from 'vue';

import Nav from "./components/Nav.vue";
import Nav2 from "./components/Nav2.vue";
import Alert from "./components/Alert.vue";

import { useAuthStore } from '@/stores';    

const authStore = useAuthStore();

const handleScroll = () => {
  const scrollY = window.pageYOffset;
  const windowHeight = window.innerHeight;
  const prevScrollY = handleScroll.prevScrollY || 0;
  
  // si on scroll vers le bas et que la hauteur est inferieur à 1000px
  if (scrollY > prevScrollY) {
    // console.log(`Scroll down: ${scrollY + windowHeight}px`);  
    document.querySelector('.container-nav').style.transform = 'translateY(' + scrollY + 'px)';
  } else {
    // console.log(`Scroll up: ${scrollY}px`);
    document.querySelector('.container-nav').style.transform = 'translateY(' + scrollY + 'px)';

  }
  
  handleScroll.prevScrollY = scrollY;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});




// Set the threshold value (in pixels)
// const threshold = 2000;

// // Attach a scroll event listener to the window
// window.addEventListener('scroll', function() {
//   // Get the current scroll position
//   const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

//   // Check if the scroll position is beyond the threshold
//   if (scrollPosition > threshold) {
//     // If it is, prevent further scrolling
//     window.scrollTo(0, threshold);
//   }
// });

</script>

<template>
    <div class="app-container" :class="authStore.user && 'bg-light'">
        <div class="container-nav">
            <Nav />
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


body{
    /* overflow: hidden; */
}


.container-workspace{
    width: 100%;
    
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