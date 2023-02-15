<script setup>
import { RouterLink, RouterView } from 'vue-router';

import Nav from "./components/Nav.vue";
import Alert from "./components/Alert.vue";
import Reserve from "./components/Reserve.vue";

import { useAuthStore } from '@/stores';

const authStore = useAuthStore();

</script>

<template>
    <div class="app-container" :class="authStore.user && 'bg-light'">
        <Nav />
        <Alert />
        <div class="container pt-4 pb-4">
            <RouterView />
        </div>
    </div>
</template>

<style>
@import '@/assets/base.css';
</style>