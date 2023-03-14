<script setup>
import { storeToRefs } from 'pinia';

import { useRoute } from 'vue-router';

import {useUsersStore} from '@/stores';

const route = useRoute();

const Username = route.query.name;
const surname = route.query.surname;
const id = route.query.id;
const mail = route.query.mail;

console.log(Username);

const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);

var user = usersStore.getById(1234);

console.log(user);



</script>



<template>

    <p>User {{ Username }} {{ surname }}</p>
    <p>Mail : {{ mail }}</p>
    <p>Id : {{ id }}</p>


</template>