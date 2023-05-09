<script setup>
import { defineProps } from 'vue';  
import { useUsersStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

import UserCard3  from './UserCard3.vue';

defineProps({
    name: String,
    surname: String,
    avatar: String,
})

const temp = localStorage.getItem('user')
const userJson = JSON.parse(temp)

const userStore = useUsersStore();
const { stats } = storeToRefs(userStore);
userStore.getUserStats(userJson.user.idSTOW);

function onLinkClick() {
  document.getElementById('handshakes').scrollIntoView();
}

const showcomponent = ref(false);

var interval = setInterval(function() {
    if (localStorage.getItem('user') != null) {
      showcomponent.value = true;
      clearInterval(interval);
    }
}, 1000);


</script>

<template>

    <v-card>
      <v-layout>
        <v-navigation-drawer
        width="450"
        expand-on-hover
        rail
          location="right"
          style="background-color: white;"
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

            <UserCard3 :nom=userJson.user.pseudo :techno=stats.profile[1] :avatar=userJson.user.avatar
                    :reco=stats.topTags[0].tag :lastInteract=stats.profile[0].lastInteraction v-if="showcomponent" />
          <v-card-actions class="justify-center">
            <v-btn>
                <span class="material-icons" v-on:click="onLinkClick" style="color: white;" icon="mdi-vuetify">
            groups
            </span>
            </v-btn>
            </v-card-actions>
          
        </v-navigation-drawer>
      </v-layout>
    </v-card>
</template>

<style scoped>


</style>