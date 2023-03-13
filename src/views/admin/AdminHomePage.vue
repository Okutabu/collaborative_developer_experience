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
        <div class="container-admin-user-page container-admin-page">
            <router-link to="/admin/users">Users</router-link>
        </div>
        <div class="container-admin-stat-page container-admin-page">
            <router-link to="/admin/stats">Statistiques de la platerforme</router-link>
        </div>
    </div>
</template>

<style scoped>
.container-choix-admin {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    background-color: rgb(230, 230, 230);
    padding-top: 50px;
}

.container-admin-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(230, 230, 230);
    width: 300px;
    height: 300px;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    margin: 20px;
    
}


</style>