<script setup>
import { storeToRefs } from 'pinia';

import { useAlertStore } from '@/stores';

const alertStore = useAlertStore();
const { alert } = storeToRefs(alertStore);
</script>

<template>
  <div
    v-if="alert"
    class="container"
  >
    <div class="m-3">
      <div
        class="alert alert-dismissable"
        :class="alert.type"
      >
        <button
          class="btn btn-link close"
          @click="alertStore.clear()"
        >
          &times;
        </button>
        {{ alert.message }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.container{
    position: absolute;
    top: 50;
    left: 50;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>