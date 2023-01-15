<script setup>
import UserCard from './components/UserCard.vue'
import UserCardSimplified from './components/UserCardSimplified.vue'
import Header from './components/Header.vue'
import Navbar from './components/Navbar.vue'

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
          <UserCardSimplified />
          <UserCardSimplified />
          <UserCardSimplified />
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
    / 30% 1fr;
}

  

.container_header {
  margin-top: 10px;
  background-color: white;
  grid-area: head;
  height: 200px;
}


.container_navbar {

  background-color: white;
  grid-area: nav;
}

.container_main {
  background-color: #d8d9db;
  grid-area: main;
}

.container_recommend_user {
  display: flex;

}


</style>
