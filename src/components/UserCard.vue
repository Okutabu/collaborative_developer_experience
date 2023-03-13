<script setup>
import { defineProps } from 'vue'
import Radar from './Radar.vue'



const props = defineProps({
  id: String,
  avatar: String,
  pseudo: String,
  type: String,
  reco : String,
  techno: Array,
  ratio: Number,
  lastInteract : Number,
})

const date = (new Date(props.lastInteract* 1000)).toLocaleString().split(',')[0] 


</script>

<template>

    <div class="container_user_card">
        <div class="container_user_info">
            <div class="user_description">
                <div class="avatar">
                    <img :src=avatar >    
                </div>
                <div class="info">
                    <p class="bold name">{{ pseudo || 'loading...' }}</p>
                    <p class="speciality">point fort : {{ reco || 'loading...' }}</p>
                    <p class="lastInteract" >Dernière interaction : {{ date || 'loading...' }}</p>
                </div>
                
            </div>
        </div>
        <div class="user_stats">
            <div> 
                <Radar :technoratio=props.techno :ref_key=props.techno /> 
            </div>
        </div>
    </div>

</template>

<style scoped>

.container_user_card {
    background-color: white;
    border-radius: 25px;
    width: 500px;
    height: 400px;
    box-shadow: 0 0 10px 0 rgba(151, 144, 144, 0.2);
    margin-bottom: 20px;
    font-family: sans-serif;
}

.bold {
    font-weight: bold;
}


.avatar {

    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 1px solid black;
    margin-bottom: 15px;
    margin-right: 40px;
    margin-top: 30px;
}

.info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
}

.avatar img {
    width: 100%;
    height: 100%;
    border-radius: 30%;
    
}

.user_description {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 30px;


}
.user_stats {
    align-items: center;
    justify-content: center;

}


</style>