<script setup>
import UserCard from './components/UserCard.vue'
import UserCardSimplified from './components/UserCardSimplified.vue'

</script>

<template>

  <main>
    <div class="container_app">
      <div class="container_selected_user">
        <UserCard />
      </div>
      <div class="container_recommended_user">
        <UserCardSimplified />
        <UserCardSimplified />
        <UserCardSimplified />
      </div>
    </div>
  </main>
</template>

<style scoped>
  .container_app{
    display: grid;
    justify-content: center;
    grid-template-columns: 3fr 3fr;
    /* background-color: red; */
    color: black;
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  .container_selected_user, .container_recommended_user {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

 
</style>
