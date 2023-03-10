<script setup>
import { useAdminStore } from '@/stores';
import { storeToRefs } from 'pinia';

const adminStore = useAdminStore();
const { stats } = storeToRefs(adminStore);
adminStore.getStats();
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