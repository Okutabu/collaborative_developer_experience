<script setup>
import Header from '../../components/Header.vue'
import { ref } from 'vue'

const espace = ref('d\'administration')
const message = ref('Trouver des profils d\'utilisateurs specifiques et les statistiques de la plateforme')

const user = localStorage.getItem('user')
const userJson = JSON.parse(user)

</script>

<template>
    <div v-if="userJson">
        <Header :surname=userJson.user.surname  :name=userJson.user.name :espace=espace :message=message />
    </div>
    <div class="container-choix-admin">
        <router-link to="/admin/users" class="container-admin-user-page container-admin-page">Gestion des utilisateurs</router-link>
        <router-link to="/admin/stats" class="container-admin-stat-page container-admin-page">Statistiques de la platerforme</router-link>
    </div>
</template>

<style scoped>
.container-choix-admin {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background-color: rgb(230, 230, 230);
    padding-top: 200px;
    height: 766px;
}

.container-admin-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(87 , 176, 192, 0.3);
    width: 300px;
    height: 300px;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    margin: 20px;
    color: black;
    text-decoration: none;
    font-weight: bold;
}

.container-admin-page:hover {
    box-shadow: 0 0 30px 0 rgba(151, 144, 144, 0.5);
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    transform: perspective(1000px) rotate3d(0, 1, 0, 5deg) scale(1.1);
    background-image: linear-gradient(to right, rgba(87 , 176, 192, 0.3), rgba(87 , 176, 192, 0.8));
}


</style>