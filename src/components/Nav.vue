<script setup>
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
</script>

<template>
    <nav v-show="authStore.user" class="navigation-bar navbar-dark">
        <div class="navbar-nav flex-column">
            <RouterLink to="/" class="nav-item nav-link">Home</RouterLink>
            <RouterLink to="/admin" class="nav-item nav-link">Admin</RouterLink>
            <button @click="authStore.logout()" class="btn btn-link nav-item nav-link">Logout</button>
        </div>
    </nav>
</template>

<style>

.navbar-darke {
    color: var(--cde-c-text-light-1);
}

.navigation-bar{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 20%;
    background-color: var(--cde-c-palette-dark-1);
    color: var(--cde-c-text-light-1);
}
</style>