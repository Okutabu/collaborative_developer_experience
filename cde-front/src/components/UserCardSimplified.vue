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
    display: grid;
    grid-template-columns: 2fr 3fr;
    grid-template-rows: 1fr;
    grid-template-areas: "user_picture name" "user_picture type" "reco reco";
    width: 100%;
    height: 100%;
    
    
}

.user_picture {
    border: solid black 1px;
    grid-area: user_picture;
}

.name {
    border: solid black 1px;
    grid-area: name;
}

.type {
    border: solid black 1px;
    grid-area: type;
}

.reco {border: solid black 1px;
    grid-area: reco;
}

.user_picture img{
    height: 40px;
    width: 40px;
}

</style>