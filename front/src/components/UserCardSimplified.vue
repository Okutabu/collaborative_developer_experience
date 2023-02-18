<script setup>

const props = defineProps({
  nom: String,
  type: String,
  reco : String
})

</script>

<template>

    <div class="container_user_card">
        <div class="container_user_info">
            <div class="user_picture">
                <img src="../assets/head.svg" alt="">
            </div>
                <div class="user_description">
                    <p class="name">{{ nom || 'Loading ...' }}</p> <!-- nom -->
                    <p class="type">{{ type || 'Loading ...'}}</p>   <!-- type -->
                    <p class="reco">{{ reco || 'Loading ...'}}</p>
                </div>
        </div>
    </div>

</template>

<style scoped>
.container_user_card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 10px;
    width: 300px;
    height: 200px;
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
    height: 40px;
    width: 40px;
}

</style>