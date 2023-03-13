<script setup>
import { storeToRefs } from 'pinia';

import {useUsersStore} from '@/stores';

import DynamicCard from '@/components/DynamicCard.vue';

const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);

var user = usersStore.getById(1234);

console.log(user);



</script>



<template>

<DynamicCard :id={user}.id :avatar={user}.avatar :pseudo={user}.pseudo :type={user}.type :reco={user}.reco :techno={user}.techno :ratio={user}.ratio />

</template>