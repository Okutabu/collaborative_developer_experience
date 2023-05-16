<script setup>
import { storeToRefs } from 'pinia';
import { useAdminStore } from '@/stores';
import { ref } from "vue";

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

let input = ref("");
let inputName = ref("");
let inputTag = ref("");

const adminStore = useAdminStore();
const { users } = storeToRefs(adminStore);
adminStore.getUsers();


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
    

    <div class="container-table">
        <div class="container-search">
            <input type="text" v-model="input" :placeholder="t('first-name')" class="search-bar" />
            <input type="text" v-model="inputName" :placeholder="t('last-name')" class="search-bar" />
            <input type="text" v-model="inputTag" :placeholder="t('find-tag')" class="search-bar search-tag" />
        </div>
        <table class="table table-bordered">
            <thead class="table-head">
                <tr>
                    <th class="table-head-impair">{{t('first-name')}} <button class="sort-button" @click=triSurname()><i class="fa fa-sort"></i></button></th>
                    <th class="table-head-impair">{{t('last-activity')}} <button class="sort-button" @click=triLastActivity()><i class="fa fa-sort"></i></button></th>
                    <th class="table-head-pair">{{t('top-tags')}}</th>
                </tr>
            </thead>
            <tbody class="table-body">
                <template v-if="users">
                        <tr v-for="user in users" :key = "user">
                            <div class="container-user-enlisted">
                                <td class="user-enlisted" v-if="user.name.toLowerCase().includes(inputName.toLowerCase()) && user.surname.toLowerCase().includes(input.toLowerCase()) && (!user.topTag || user.topTag.toLowerCase().includes(inputTag.toLowerCase()))"><img :src="user.avatar" alt="user avatar" width="80">

                                    <div class="container-for-column">
                                        <div v-if="user.topTag" class="container-user-description">
                                            <router-link :to="{path :`/admin/users/profile/${user.idSTOW.low}`}">
                                            <div class="user-description-name">
                                                <p class="link-name-surname">{{ user.surname +" "+ user.name }}</p>
                                            </div>
                                            </router-link>
                                        </div>
                                        <div v-else class="container-user-description">
                                            <div class="user-description-name">
                                                <p class="link-name-surname">{{ user.surname +" "+ user.name }}</p>
                                            </div>
                                        </div>
                                        <div class="container-user-details">
                                            <div class="user-description-activity">
                                                <ul class="list-unstyled text-grey">
                                                    <li><i class="fa fa-filter pr-1" aria-hidden="true"></i>{{t('front-end')}} &nbsp;</li>
                                                    <li><i class="fa fa-clock-o pr-1"></i>{{t('last-activity')}}:&nbsp;<p>{{ user.lastInteraction ? (new Date(user.lastInteraction.low * 1000)).toLocaleString().split(',')[0] : t('no-activity') }}</p>
                                            </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </div>
                            
                            
                            <td v-if="user.name.toLowerCase().includes(inputName.toLowerCase()) && user.surname.toLowerCase().includes(input.toLowerCase()) && (!user.topTag || user.topTag.toLowerCase().includes(inputTag.toLowerCase()))">
                               <div v-if="user.lastInteraction" >
                                    {{ (new Date(user.lastInteraction.low * 1000)).toLocaleString().split(',')[0] }}
                                </div>
                                <div v-else>
                                    {{t('inactive')}}
                                </div>
                            </td>
                            <td v-if="user.name.toLowerCase().includes(inputName.toLowerCase()) && user.surname.toLowerCase().includes(input.toLowerCase()) && (!user.topTag || user.topTag.toLowerCase().includes(inputTag.toLowerCase()))">
                               <div v-if="user.topTag" >
                                    {{ user.topTag }}
                                </div>
                                <div v-else>
                                    {{t('inactive')}}
                                </div>
                            </td>
                        
                        </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<style scoped>

.search-bar {
    width: 25%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid rgb(87, 176, 192);
    outline: none;
    padding-left: 10px;
    margin: 10px;
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
    background-color: white;
}

.table-head-pair{
    background-color: white;
}


.table-body {
    background-color: white;
}


.user-enlisted {
    display: flex;
    flex-direction: row;
   
}

.user-enlisted img{
    border-radius: 50%;
    margin: 10px;
}

.container-user-enlisted {
    width: auto;

}

.user-description{
    display: flex;
    margin-left: 20px;
}

.container-user-description{
    display: flex;
    margin-bottom: 20px;
    color: rgb(187, 187, 187);
}
.container-user-details{
    display: flex;
    width: 100%;
    font-size: 0.8em;
    color: #646f79;
}

.container-for-column{
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    justify-content: center;
}

.user-description-name{
    display: flex;
    width: 100%;
}

p{
    margin: 0;
}

.list-unstyled{
    display: flex;
}

.list-unstyled li{
    display: flex;
}

.link-name-surname{
    color: #646f79;
    text-decoration: none;

}

</style>
