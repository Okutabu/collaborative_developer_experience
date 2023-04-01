<script setup>
import { defineProps } from 'vue';
import Radar from './Radar.vue';

const props = defineProps({
  nom: String,
  avatar: String,
  reco: String,
  techno: Array,
  lastInteract: Number,
});

const date = new Date(props.lastInteract * 1000).toLocaleString().split(',')[0];
</script>

<template>
    <div class="container_user_card">
      <div class="container_user_info">
        <div class="user_description">
          <div class="avatar">
            <img :src="avatar" />
          </div>
          <div class="info">
            <p class="bold name">{{ nom || 'loading...' }}</p>
            <p class="speciality">Point fort : {{ reco || 'loading...' }}</p>
            <p class="lastInteract">Dernière interaction : {{ date || 'loading...' }}</p>
            <button class="btn-contact">Profil</button>
          </div>
        </div>
      </div>
      <div>
        <Radar :technoratio={techno} :ref_key={techno} /> 
      </div>
    </div>
  </template>

<style scoped>
.container_user_card {
  background-color: #f7f7f7;
  border-radius: 15px;
  width: 450px;
  height: 500px;
  box-shadow: 0 0 10px 0 rgba(151, 144, 144, 0.2);
  margin-bottom: 30px;
  font-family: Arial, Helvetica, sans-serif;
}

.bold {
  font-weight: bold;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #ffffff;
  overflow: hidden;
  margin-top: -50px;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user_description {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
}

.info {
  margin-top: 20px;
  text-align: center;
}

.speciality {
  margin-top: 20px;
  font-size: 16px;
}

.lastInteract {
  margin-top: 20px;
  font-size: 14px;
  color: #888888;
}

.btn-contact {
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 20px;
  background-color: rgb(87, 176, 192);
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.btn-contact:hover {
  background-color: rgb(234, 51, 75);
}

@media only screen and (max-width: 500px) {
  .container_user_card {
    width: 100%;
  }
}
</style>
