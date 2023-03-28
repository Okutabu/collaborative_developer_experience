<script setup>
import { RouterLink, RouterView } from 'vue-router';

import Nav from "./components/Nav.vue";
import Alert from "./components/Alert.vue";

import { useAuthStore } from '@/stores';

const authStore = useAuthStore();

</script>

<template>
    <div class="app-container" :class="authStore.user && 'bg-light'">
        <Nav />
        <Alert />
        <div class="container-workspace ">
            
            <RouterView />
            
            
        </div>
    </div>
</template>

<style>
@import '@/assets/base.css';
@import '@/assets/theme.css';

body{
    overflow: hidden;
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