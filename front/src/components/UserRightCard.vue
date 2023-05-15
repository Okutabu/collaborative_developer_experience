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
  const section = document.getElementById('handshakes');

  // Faites défiler la page jusqu'à la position de l'élément
  window.scrollTo({
      top: section.offsetTop,
      behavior: 'smooth' // Optionnel : ajoute un effet de défilement fluide
    });
}

const showcomponent = ref(false);

var interval = setInterval(function() {
    if (localStorage.getItem('user') != null) {
      showcomponent.value = true;
      clearInterval(interval);
    }
}, 1000);

function scrollToSection() {
    // Sélectionnez l'élément vers lequel vous souhaitez faire défiler la page
    const section = document.querySelector('.Questions');

    // Faites défiler la page jusqu'à la position de l'élément
    window.scrollTo({
      top: section.offsetTop,
      behavior: 'smooth' // Optionnel : ajoute un effet de défilement fluide
    });
  }
  
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
              :prepend-avatar="avatar"
              :title="`${name} ${surname}`"
              subtitle="Logged in"
            ></v-list-item>
          </template>

          <v-divider></v-divider>

            <UserCard3 :nom=userJson.user.pseudo :techno=stats.profile[1] :avatar=userJson.user.avatar
                    :reco=stats.topTags[0].tag :lastInteract=stats.profile[0].lastInteraction v-if="showcomponent" />
          <v-card-actions class="justify-center">
          
           
            <v-list-item>
              
              <v-list-item-icon >
                <i class="fa fa-circle" aria-hidden="true"></i>
                <v-btn class="btn btn-primary" @click="onLinkClick">
                  <i class="fa fa-users" aria-hidden="true"></i>
                </v-btn>  
                <v-btn class="btn btn-primary" @click="scrollToSection">
                  <i class="fa fa-comments-o" aria-hidden="true"></i>
                </v-btn> 
              </v-list-item-icon>
            </v-list-item>          
          </v-card-actions>
          
            
        </v-navigation-drawer>
      </v-layout>
    </v-card>
</template>

<style scoped>

.fa-circle {
  color: #df1907;
  font-size: 15px;
}

.btn {
    border: none;
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  }
  
  .btn-primary {
    background-color: var(--primary);
    color: #fff;
    margin-right: 8px;
    margin-left: 10px;
  }

  .btn-secondary{
    background-color: var(--primary);
  }

  .btn-primary:hover {
    background-color: var(--primary-hover);
  }

  .btn-secondary:hover {
    background-color: var(--primary-hover);
  }

</style>