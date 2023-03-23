<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue'

import { useAuthStore } from '@/stores';
import { useRecoStore } from '@/stores';

const userSelected = ref(null);




</script>



<template>

    <p>User {{ Username }} {{ surname }}</p>
    <p>Mail : {{ mail }}</p>
    <p>Id : {{ id }}</p>


</template>