<script setup>
import UserCard from './components/UserCard.vue'
import UserCardSimplified from './components/UserCardSimplified.vue'
import Header from './components/Header.vue'
import Navbar from './components/Navbar.vue'

import { ref } from 'vue'

// fetch data from API

const name1 = ref('Ortavio') 
const type1 = ref('Helper')
const name2 = ref('Baptiste') 
const type2 = ref('To help')
const name3 = ref('Paul')
const reco1 = ref('Expert neo4j')
const reco2 = ref('Debutant CSS')

let data = {name: "somehting", id:23445}// fetch data from API
</script>

<template>
  <div class="container_app">
    <div class="container_header">
      <Header />
    </div>
    <div class="container_navbar">
          <Navbar />
    </div>
    <main>
      <div class="container_main">
        <div class="container_recommended_user">
          <UserCardSimplified :nom="name1" :type="type1" :reco="reco1"/>
          <UserCardSimplified :nom="name2" :type="type2" :reco="reco1"/>
          <UserCardSimplified :nom="name3" :type="type1" :reco="reco2"/>
        </div>
        <div class="container_selected_user">
          <UserCard :data={data} />
        </div>
      </div>
    </main>
  </div>

</template>

<style scoped>


.container_app {
  margin: 0;
  padding: 0;
  display: grid;
  width: 100%;
  height: 200px;
  grid-template:
    [header-left] "nav head" 1fr [header-right]
    [main-left] "nav  main" 1fr [main-right]
    / 20% 1fr;
}

  

.container_header {
  margin-top: 10px;
  background-color: white;
  grid-area: head;
  height: 100px;
}


.container_navbar {

  background-color: white;
  grid-area: nav;
}

.container_main {
  background-color: #d8d9db;
  grid-area: main;
  border-top-left-radius: 10px;
}

.container_recommended_user{
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding:40px 0; 
}

.container_selected_user{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding:40px 0; 
}



</style>
