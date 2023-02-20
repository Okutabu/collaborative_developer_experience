<script setup>
import { storeToRefs } from 'pinia';

import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

</script>

<template>
    <div v-if="user">
        <h1>Bonjour {{user.user.surname}} !</h1>
        <p> Votre id Stack overflow est : {{ user.user.idSTOW }}</p>
        <p><router-link to="/users">Manage Users</router-link></p>
    </div>
</template>
