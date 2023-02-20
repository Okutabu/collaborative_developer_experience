<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue'
import UserCardSimplified from '../components/UserCardSimplified.vue';

import { useAuthStore } from '@/stores';
import { useRecoStore } from '@/stores';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const usersStore = useRecoStore();
const { getUser } = storeToRefs(usersStore);

console.log(getUser)

const name = ref('ortave') 
const type = ref('Helper')
const reco = ref('Expert neo4j')


</script>

<template>
    <div v-if="user">
        <h1>Bonjour {{user.user.surname}} !</h1>
        <p> Votre id Stack overflow est : {{ user.user.idSTOW }}</p>
        <p><router-link to="/users">Manage Users</router-link></p>
        <UserCardSimplified :nom="name" :type="type" :reco="reco"/>
    

    </div>
</template>
