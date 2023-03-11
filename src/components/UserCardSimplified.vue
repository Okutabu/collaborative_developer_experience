<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  nom: String,
  type: String,
  reco : String,
  avatar: String
})

</script>

<template>

    <div class="container_user_card">
        <div class="container_user_info">
            <div class="user_picture">
                <img class="avatar" :src=avatar >  
            </div>
                <div class="user_description">
                    <p class="name">{{ nom || 'Loading ...' }}</p> <!-- nom -->
                    <p class="type">{{ type || 'Loading ...'}}</p>   <!-- type -->
                    <p class="reco">{{ reco || 'Loading ...'}}</p>  <!-- reco -->
                </div>
        </div>
    </div>

</template>

<style scoped>
.container_user_card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: white;
    border-radius: 25px;
    width: 300px;
    height: 190px;
    box-shadow: 0 0 10px 0 rgba(151, 144, 144, 0.2);
    margin: 10px;
}

.user_description {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.container_user_info {
    display: flex;
    
    
}

.user_picture {
   margin-right: 35px;
}

.name {
    font-size: 1.5em;
}

.type {
    font-size: 1em;
}

.reco {
    font-size: 2em;
}

.user_picture img{
    height: 60px;
    width: 60px;
}

.avatar {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    border: 1px solid black;
    margin-bottom: 15px;
}

</style>