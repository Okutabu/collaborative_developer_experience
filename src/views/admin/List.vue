<script setup>
import { storeToRefs } from 'pinia';
import { useAdminStore } from '@/stores';
import { ref } from "vue";


let input = ref("");
const valeurs = [

{
    "idSTOW": {
        "low": 20935520,
        "high": 0
    },
    "lastInteraction": {
        "low": 1673879022,
        "high": 0
    },
    "mail": "lologan789@gmail.com",
    "surname": "Logan",
    "name": "Goddard"
},
{
    "idSTOW": {
        "low": 1234,
        "high": 0
    },
    "lastInteraction": {
        "low": 1678487711,
        "high": 0
    },
    "mail": "bapt.ps3@live.fr",
    "surname": "Baptiste",
    "name": "Griva"
}
];

const adminStore = useAdminStore();
const { users } = storeToRefs(adminStore);
adminStore.getUsers();

function filteredList() {

  return valeurs.filter((valeur) =>
    valeur.name.toLowerCase().includes(input.value.toLowerCase())
  );
}

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

console.log(users);



</script>

<template>
    <h1>Users</h1>
    <table class="table table-striped">
        <thead>
            <tr>
                <th style="width: 30%">First Name <button @click=triSurname()>trier</button></th>
                <th style="width: 30%">Last Name <button @click=triName()>trier</button></th>
                <th style="width: 30%">Last activity <button @click=triLastActivity()>trier</button></th>
                <th style="width: 10%"></th>
            </tr>
        </thead>
        <tbody>
            <template v-if="users">
                <input type="text" v-model="input" placeholder="Search dev..." />
                    <tr v-for="user in users" :key = "user">
                        <div v-if="user.name.toLowerCase().includes(input.toLowerCase()) || user.surname.toLowerCase().includes(input.toLowerCase())">
                            <td>{{ user.surname }}</td>
                            <td>{{ user.name }}</td>
                            <td v-if="user.lastInteraction.low != -1" >{{ (new Date(user.lastInteraction.low * 1000)).toLocaleString().split(',')[0] }}</td>
                            <td v-else>Inactif</td>
                        </div>
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
</template>