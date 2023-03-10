<script setup>
import { useAdminStore } from '@/stores';
import { defineProps } from 'vue';
import { storeToRefs } from 'pinia';

const adminStore = useAdminStore();
const { stats } = storeToRefs(adminStore);

</script>

<template>
    <div>
        <p> nb tags : {{ stats.nbTags }}</p>
        <p> nb utilisateurs : {{ stats.nbUsers }}</p>
        <p> top tags : {{ stats.topTags }}</p>
    </div>

</template>

<style>

</style>