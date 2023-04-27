<script setup>
import { defineProps } from 'vue';  
import UserCard from './UserCard.vue'

defineProps({
    name: String,
    surname: String,
    avatar: String,
    nom: String,
    techno: Object,
    reco: Object,
    lastInteract: Object
})

</script>

<template>

    <v-card>
      <v-layout>
        <v-navigation-drawer
        expand-on-hover
          rail
          location="right"
        >
          <template v-slot:prepend>
            <v-list-item
              lines="two"
              :prepend-avatar=avatar
              :title="`${name} ${surname}`"
              subtitle="Logged in"
            ></v-list-item>
          </template>
  
          <v-divider></v-divider>
          <UserCard :name="name" :avatar="avatar" :lastInteract="lastInteract" :reco="reco" :techno="techno"/>
          
        </v-navigation-drawer>
        <v-main style="height: 250px"></v-main>
      </v-layout>
    </v-card>
</template>

<style scoped>



</style>