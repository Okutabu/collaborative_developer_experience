<script setup>
import { RouterView } from 'vue-router';

import Nav from "./components/Nav.vue";
import Alert from "./components/Alert.vue";

import { useAuthStore } from '@/stores';

const authStore = useAuthStore();

</script>

<template>
    <div class="app-container" :class="authStore.user && 'bg-light'">
        <Nav />
        <Alert />
        <div class="container-workspace">
            <RouterView />
        </div>
    </div>
</template>

<style>
@import '@/assets/base.css';
@import '@/assets/theme.css';

.container-workspace{
    width: 100%;
}
</style>