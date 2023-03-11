<script setup>
import { storeToRefs } from 'pinia';
import { useAdminStore } from '@/stores';
import { useUsersStore } from '@/stores';

// const usersStore = useUsersStore();
// const { users } = storeToRefs(usersStore);


const adminStore = useAdminStore();
const { users } = storeToRefs(adminStore);
adminStore.getUsers();


function triLastActivity() {
    if (adminStore.desc) {
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
    <h1>Users</h1>
    <table class="table table-striped">
        <thead>
            <tr>
                <th style="width: 30%">First Name <button @click=triName()>trier</button></th>
                <th style="width: 30%">Last Name <button @click=triSurname()>trier</button></th>
                <th style="width: 30%">Last activity <button @click=triLastActivity()>trier</button></th>
                <th style="width: 10%"></th>
            </tr>
        </thead>
        <tbody>
            <template v-if="users">
                <tr v-for="user in users.users">
                    <td>{{ user.surname }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ (new Date(user.lastInteraction.low * 1000)).toLocaleString().split(',')[0] }}</td>
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