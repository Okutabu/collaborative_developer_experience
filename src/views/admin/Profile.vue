<script setup>
import { storeToRefs } from 'pinia';
import { useProfileStore } from '@/stores';

const profileStore = useProfileStore();
const { user } = storeToRefs(profileStore);



</script>



<template>

    <div class="container-profile-">
        {{ user }}
    </div>


</template>

<style>

</style>