<script setup>
import { storeToRefs } from 'pinia';
import { useAdminStore } from '@/stores';
import { ref } from "vue";
import Header from '../../components/Header.vue';


let input = ref("");
let inputName = ref("");
let inputTag = ref("");
const espace = ref('d\'administration')
const message = ref('Trouver le profil qu\'il vous faut parmis les utilisateurs CDE !')

const adminStore = useAdminStore();
const { users, userClic } = storeToRefs(adminStore);
adminStore.getUsers();
adminStore.getUserProficiency();


const user = localStorage.getItem('user')
const userJson = JSON.parse(user)

function triLastActivity() {
    if (!adminStore.desc) {
        adminStore.getUsersbyLastActivityDesc();
    } else {
        adminStore.getUsersbyLastActivity();
    }
    adminStore.desc = !adminStore.desc;
}

function triName() {
    if (adminStore.desc) {
        adminStore.getUsersbyNameDesc();
    } else {
        adminStore.getUsersbyName();
    }
    adminStore.desc = !adminStore.desc;
}

function triSurname() {
    if (adminStore.desc) {
        adminStore.getUsersbySurnameDesc();
    } else {
        adminStore.getUsersbySurname();
    }
    adminStore.desc = !adminStore.desc;

}

</script>

<template>
    
    <div v-if="userJson">
        <Header :surname=userJson.user.surname  :name=userJson.user.name :espace=espace :message=message />
    </div>
    <div class="container-table">
        <div class="container-search">
            <input type="text" v-model="input" placeholder="Prénom" class="search-bar" />
            <input type="text" v-model="inputName" placeholder="Nom" class="search-bar" />
            <input type="text" v-model="inputTag" placeholder="Rechercher un tag" class="search-bar search-tag" />
        </div>
        <table class="table table-striped">
            <thead class="table-head">
                <tr>
                    <th class="table-head-impair">First Name <button class="sort-button" @click=triSurname()><i class="fa fa-sort"></i></button></th>
                    <th class="table-head-pair">Last Name <button class="sort-button" @click=triName()><i class="fa fa-sort"></i></button></th>
                    <th class="table-head-impair">Last activity <button class="sort-button" @click=triLastActivity()><i class="fa fa-sort"></i></button></th>
                    <th class="table-head-pair">Top Tags</th>
                </tr>
            </thead>
            <tbody class="table-body">
                <template v-if="users">
                        <tr v-for="user in users" :key = "user">
                            <router-link :to="{path :`/admin/users/profile/${user}`, query:{name: user.name, id: user.idSTOW.low, surname: user.surname, mail: user.mail}}">
                            <td v-if="user.name.toLowerCase().includes(inputName.toLowerCase()) && user.surname.toLowerCase().includes(input.toLowerCase()) && userClic.userProfile[1][0].techno.toLowerCase().includes(inputTag.toLowerCase())">{{ user.surname }}</td>
                            </router-link>
                            <td v-if="user.name.toLowerCase().includes(inputName.toLowerCase()) && user.surname.toLowerCase().includes(input.toLowerCase()) && userClic.userProfile[1][0].techno.toLowerCase().includes(inputTag.toLowerCase())">{{ user.name }}</td>
                            <td v-if="user.name.toLowerCase().includes(inputName.toLowerCase()) && user.surname.toLowerCase().includes(input.toLowerCase()) && userClic.userProfile[1][0].techno.toLowerCase().includes(inputTag.toLowerCase())">
                                <div v-if="user.lastInteraction.low != -1" >
                                    {{ (new Date(user.lastInteraction.low * 1000)).toLocaleString().split(',')[0] }}
                                </div>
                                <div v-else>
                                    Inactif
                                </div>
                            </td>
                            <td v-if="user.name.toLowerCase().includes(inputName.toLowerCase()) && user.surname.toLowerCase().includes(input.toLowerCase()) && userClic.userProfile[1][0].techno.toLowerCase().includes(inputTag.toLowerCase())">{{ userClic.userProfile[1][0].techno }}</td>
                        
                        </tr>
                </template>
                <tr v-if="users.loading">
                    <td colspan="4" class="text-center">
                        <span class="spinner-border spinner-border-lg align-center"></span>
                    </td>
                </tr>
                <tr v-if="users.error">
                    <td colspan="4">
                        <div class="text-danger">Error loading users: {{users.error}}</div>
                    </td>
                </tr>            
            </tbody>
        </table>
    </div>
</template>

<style scoped>

.container-table {
    background-color: rgb(230, 230, 230);
}

.search-bar {
    width: 25%;
    height: 40px;
    border-radius: 25px;
}

.container-search {
    display: flex;
}

.search-tag {
    margin-left: 25%;
}

.sort-button{
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    align-content: right;
}
.sort-button:hover{
    color: rgb(87, 176, 192);
    transform: scale(1.2);
}

.table-head-impair {
    background-color: rgba(87 , 176, 192, 0.2);
}

.table-head-pair{
    background-color: rgb(211, 211, 211);
}

.table-body td{
    width: 25%;
}



</style>
