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
            <div class="container-top-info">
                <div class="user_picture">
                    <img class="avatar" :src=avatar >  
                </div>
                <div class="user_description">
                    <p class="name">{{ nom || 'Loading ...' }}</p> <!-- nom -->
                    <p class="type">{{ type || 'Loading ...'}}</p>   <!-- type -->
                </div>
            </div>
            <div class="container-bot-info">
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

.container-top-info {
    display: flex;
    align-items: center;
}

.container_user_card:hover {
    box-shadow: 0 0 50px 0 rgba(151, 144, 144, 0.5);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    transform: perspective(1000px) rotate3d(0, 1, 0, 5deg) scale(1.1);
}

.user_description {
    margin-top: 10px;
    margin-left: 30px;
}
.container_user_info {
    display: flex;
    flex-direction: column;
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
    height: 50px;
    width: 50px;
}

.avatar {
    border-radius: 30%;

}

</style>