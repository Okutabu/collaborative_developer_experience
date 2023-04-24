<script setup>
import { storeToRefs } from 'pinia';
import { useUsersStore } from '@/stores';
import { ref } from "vue";
import CalendarHeatmap from '@/components/CalendarHeatmap.vue';
import UserCard2 from '../../components/UserCard2.vue';

import { defineProps } from 'vue';

const props = defineProps({
    title: String,
    datas: Array,
    graph: Array
})

const temp = localStorage.getItem('user')
const userJson = JSON.parse(temp)

const userStore = useUsersStore();
const { stats } = storeToRefs(userStore);
userStore.getUserStats(6309);

var endDate = new Date('2023-03-27');
var orientation= 'horizontal';

</script>


<template>
    <div class="container-stat">
        <div class="title">
            <h2>Statistiques utilisateur</h2>
        </div>
        <div class="container-heatmap">
                    <p class="text">Mon taux de contribution</p>
                <calendar-heatmap class="heatmap-component" :values="stats.dates" :end-date="endDate" :style="{'max-width': orientation === 'vertical' ? '145px' :  '800px'}" :round="2"
                                :vertical="orientation === 'vertical'"/>
            
        </div>
        {{ stats.profile[1][0].techno }}
        <div class="container-profile-">
            <div class="container-card"> <UserCard2 :nom=userJson.user.pseudo :techno=stats.profile[1] :avatar=userJson.user.avatar  :reco=stats.topTags[0].tag :key=userCardValue :lastInteract=stats.profile[0].lastInteraction /> </div>
        </div>
    </div>

</template>

<style scoped>

.title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
}

</style>