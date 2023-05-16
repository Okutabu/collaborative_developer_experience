<script setup>
import { storeToRefs } from 'pinia';
import { useUsersStore } from '@/stores';
import CalendarHeatmap from '@/components/CalendarHeatmap.vue';
import UserCard2 from '../../components/UserCard2.vue';

const temp = localStorage.getItem('user')
const userJson = JSON.parse(temp)

const userStore = useUsersStore();
const { stats } = storeToRefs(userStore);
userStore.getUserStats(userJson.user.idSTOW);

var endDate = new Date('2023-04-27');
var orientation = 'horizontal';

import { useI18n } from 'vue-i18n';
const { t } = useI18n();

</script>


<template>
    <div class="container-stat">

        <div class="title">
            <h2>{{t('stats')}}</h2>
        </div>

        <div class="container-heatmap">
            <calendar-heatmap class="heatmap-component" :values="stats.dates" :end-date="endDate"
                :style="{ 'max-width': orientation === 'vertical' ? '145px' : '800px' }" :round="2"
                :vertical="orientation === 'vertical'" />
        </div>


        <div class="container-profile">
            <div class="container-card">
                <UserCard2 :nom=userJson.user.pseudo :techno=stats.profile[1] :avatar=userJson.user.avatar
                    :reco=stats.topTags[0].tag :key=userCardValue :lastInteract=stats.profile[0].lastInteraction />
            </div>


            <div class="podium">
                <div class="podium__item">
                    <p class="podium_tag">{{ stats.topTags[1].tag }}</p>
                    <div class="podium__rank second">2</div>
                </div>
                <div class="podium__item">
                    <p class="podium_tag">{{ stats.topTags[0].tag }}</p>
                    <div class="podium__rank first">
                        <svg class="podium__number" viewBox="0 0 27.476 75.03" xmlns="http://www.w3.org/2000/svg">
                            <g transform="matrix(1, 0, 0, 1, 214.957736, -43.117417)">
                                <path class="st8"
                                    d="M -198.928 43.419 C -200.528 47.919 -203.528 51.819 -207.828 55.219 C -210.528 57.319 -213.028 58.819 -215.428 60.019 L -215.428 72.819 C -210.328 70.619 -205.628 67.819 -201.628 64.119 L -201.628 117.219 L -187.528 117.219 L -187.528 43.419 L -198.928 43.419 L -198.928 43.419 Z"
                                    style="fill: #000;" />
                            </g>
                        </svg>
                    </div>
                </div>
                <div class="podium__item">
                    <p class="podium_tag">{{ stats.topTags[2].tag }}</p>
                    <div class="podium__rank third">3</div>
                </div>
            </div>
        </div>
    </div>

    <table class="table-body">
        <tr class="table-first">
            <td>{{t('stats-nbAnswer')}}</td>
            <td>{{ stats.nbAnswers }}</td>
        </tr>
        <tr>
            <td>{{t('stats-nbQuestion')}}</td>
            <td>{{ stats.nbQuestions }}</td>
        </tr>
        <tr>
            <td>{{t('stats-topTags')}}</td>
            <div v-for="tag in stats.topTags" class="container-tags">
                <td>{{ tag.tag + " : " + tag.nbInteractions }}</td>
            </div>
        </tr>
        <tr>
            <td>{{t('stats-nbHelped')}}</td>
            <td>{{ stats.nbHelped }}</td>
        </tr>
        <tr class="table-last">
            <td>{{t('stats-nbHelper')}}</td>
            <td>{{ stats.nbHelper }}</td>
        </tr>
    </table>
</template>

<style scoped>
body {
    font-family: sans-serif;
    font-weight: 100;
}


.container-stat {
    display: flex;
    flex-direction: column;
    justify-content: center;
    animation: reveal 1s cubic-bezier(.17,.67,.4,1.02); 
}

.title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 3%;
}

.table-body {
    margin: 4%;
    width: 92%;
    background: #f1f5f9;
    border-collapse: collapse;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    border-radius: 20px;

}

.table-body td {
    width: 50%;
    padding: 1%;
    padding-left: 3%;
    text-align: center;
    color: #000;
    font-weight: bold;
}

.table-body tr {
    height: 5%;
    border-bottom: 1px solid rgb(200, 200, 200);
    border-top: 1px solid rgb(200, 200, 200);
    text-align: center;
}

.container-tags {
    display: flex;
}

.container-tags td {
    width: 100%;
    padding: 0.5%;
    padding-left: 3%;
}

.container-heatmap {
    padding: 2%;
}

.heatmap-component {
    margin: auto;
}

.container-profile {
    display: flex;
    justify-content: space-around;
    padding: 0%;
}
.container-card {
    padding: 1%;
    width: 50%;
    padding-left: 15%;
}

.podium {
    display: flex;
    align-items: flex-end;
    padding: 1%;
    padding-left: 7%;
    width: 50%;
    padding-bottom: 50px;
}

.podium__item {
    width: 150px;
}

.podium__rank {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 35px;
    color: #fff;
    border-radius: 20px 20px 2px 2px;
}

.podium_tag {
    text-align: center;
    padding: 0 .5rem;
    font-size: 35px;
    font-weight: bold;
}

.podium__number {
    width: 27px;
    height: 40px;
}

.podium .first {
    min-height: 250px;
    background: #577aff;
    opacity: 1;
}

.podium .second {
    min-height: 200px;
    background: #8099f6;
    opacity: 0.7;
    
}

.podium .third {
    min-height: 150px;
    background: #25b2c3;
    opacity: 0.7;
}
</style>