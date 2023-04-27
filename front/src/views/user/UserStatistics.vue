<script setup>
import { storeToRefs } from 'pinia';
import { useUsersStore } from '@/stores';
import { ref } from "vue";
import CalendarHeatmap from '@/components/CalendarHeatmap.vue';
import UserCard2 from '../../components/UserCard2.vue';

const temp = localStorage.getItem('user')
const userJson = JSON.parse(temp)

const userStore = useUsersStore();
const { stats } = storeToRefs(userStore);
userStore.getUserStats(6309);

var endDate = new Date('2023-03-27');
var orientation = 'horizontal';

</script>


<template>
    <div class="container-stat">

        <div class="title">
            <h2>Statistiques utilisateur</h2>
        </div>

        <div class="container-heatmap">
            <h3 class="text">Mon taux de contribution</h3>
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
        <tr>
            <td>Le nombre de questions auquelles vous avez répondu</td>
            <td>{{ stats.nbAnswers }}</td>
        </tr>
        <tr>
            <td>Le nombre de questions que vous avez posé</td>
            <td>{{ stats.nbQuestions }}</td>
        </tr>
        <tr>
            <td>Les tags sur lesquelles vous avez le plus intéragit</td>
            <div v-for="tag in stats.topTags" class="container-tags">
                <td>{{ tag.tag + " : " + tag.nbInteractions }}</td>
            </div>
        </tr>
        <tr>
            <td>Le nombre de personnes que vous avez aidé</td>
            <td>{{ stats.nbHelped }}</td>
        </tr>
        <tr>
            <td>Le nombre de personnes qui vous ont aidé</td>
            <td>{{ stats.nbHelper }}</td>
        </tr>

    </table>
</template>

<style scoped>

body {
    font-family: sans-serif;
}
.title {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
}
.table-body td {
    width: 25%;
    padding: 5%;
}
.table-body tr {
    height: 50px;
    border-bottom: 1px solid rgb(200, 200, 200);
    border-top: 1px solid rgb(200, 200, 200);
    text-align: center;
}

.container-tags{
    display: flex;
    justify-content: space-around;
}

.container-tags td{
    padding: 1%;
}

.container-profile{
    display: flex;
    justify-content: space-evenly;
    border: 1px solid black;
    padding: 2.5%;
}

.container-heatmap{
    border: 1px solid black;
    padding: 2%;
}

.heatmap-component {
    margin: auto;
}

.container-card{
    border: 1px solid black;
    padding: 1%;
    width: 35%;
    /* align-items: center; */
}
.podium  {
    display: flex;
    align-items: flex-end;
    border: 1px solid black;
    padding: 1%;
    width: 35%;
}
.podium__item {
    width: 200px;
}
.podium__rank {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 35px;
    color: #fff;
}
.podium_tag {
    text-align: center;
    padding: 0 .5rem;
}
.podium__number {
    width: 27px;
    height: 75px;
}
.podium .first {
    min-height: 300px;
    background: rgb(255, 172, 37);
    background:
        linear-gradient(333deg,
            rgba(255, 172, 37, 1) 0%,
            rgba(254, 207, 51, 1) 13%,
            rgba(254, 224, 51, 1) 53%,
            rgba(255, 172, 37, 1) 100%);
}
.podium .second {
    min-height: 200px;
    background: blue;
}
.podium .third {
    min-height: 100px;
    background: green;
}
</style>