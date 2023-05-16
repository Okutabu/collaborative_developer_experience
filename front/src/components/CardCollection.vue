<script setup>
// carousel imports 
import { Carousel, Navigation, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

//internal imports

import UserCarCollaborative from './UserCarCollaborative.vue';
import UserCard from './UserCard.vue';
import { storeToRefs } from 'pinia';
import { useRecoStore } from '@/stores';
import { ref } from 'vue';

import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const usersStore = useRecoStore();
const { usersCurrentReco} = storeToRefs(usersStore);

const typeSimilaire = ref('Projet similaire')

const headerdisapear = ref(true);

const userSelected = ref(null);
const contact = ref("contact")
const not_contact = ref(t("collabCard-help"))

var bouton = contact;

function swapCategoryToSimilar(){
    usersStore.rotateRecomendationsToSimilar();
    bouton = contact;
}
function swapCategoryToHelper(){
    usersStore.rotateRecomendationsToHelper();
    bouton = contact;
}
function swapCategoryToHelpable(){
    usersStore.rotateRecomendationsToHelpable();
    bouton = not_contact;
}

function onClick(userParam) {
    userSelected.value = userParam;
    if (headerdisapear.value == true) {
        headerdisapear.value = false;
    }
}
</script>

<template>

  <div class="container-board">
    <div class="container-title">
      <h2 class="title-section">{{t("similarities-title")}}</h2>
    </div>
    <div class="container-categories">
        <div class="category similar" @click="swapCategoryToSimilar">
            <div class="similar-icon-holder"><span class="material-symbols-outlined">
            contacts
            </span></div>
            
            &nbsp;
            <span class="text">{{t("similarities-category-similar")}}</span>
        </div>
        <div class="category helper" @click="swapCategoryToHelper">
            <div class="helper-icon-holder"><span class="material-symbols-outlined">
            network_intelligence_update
            </span></div>
            
            &nbsp;
            <span class="text">{{t("similarities-category-canHelp")}}</span>
        </div>
        <div class="category helpable" @click="swapCategoryToHelpable">
            <div class="helpable-icon-holder"><span class="material-symbols-outlined">
            network_intelligence_history
            </span></div>
            
            &nbsp;
            <span class="text">{{t("similarities-category-canBeHelped")}}</span>
        </div>
    </div>
    
    <div class="container-card-collection-holder">

        <div >

            <Carousel :items-to-show="3" :wrap-around="true" class="container-caroussel">
                <Slide v-for="user in usersCurrentReco.users" :key="user">
                    <!-- type is irrelevant -->

                    <UserCarCollaborative :user="user" :type="typeSimilaire" :bouton="bouton" class="container-card" @click="onClick(user)"/>
                </Slide>

                <template #addons>
                <Navigation />
                </template>
            </Carousel>

        </div>

    </div>

    <div class="container-usercard-peek" v-if="userSelected"> 
        <div>
            <UserCard :nom=userSelected[0].pseudo :techno=userSelected[1] :avatar=userSelected[0].avatar :reco=userSelected[1][0].techno :key=userSelected :lastInteract=userSelected[0].lastInteraction /> 
        </div>
    </div>

  </div>

</template>
<style scoped>

.container-usercard-peek {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}
.container-card-collection-holder{
    align-items: center;
    justify-content: space-between;
    display: flex;
    border-radius: 0.5%;
}

.container-card-collection{
    display: flex;
    justify-content: space-evenly;
    
}
.container-card{
    display: flex;
    justify-content: space-between;
    
}

.container-caroussel{
    width: 900px;
}

.container-control-button{
    padding: 25px;
}

.container-categories {
    display:flex;
    justify-content: space-between;
    width: 330px;
    font-size: large;
    margin-bottom: 20px;
}

.category{
    border: 2px solid rgb(225, 225, 225);
    border-radius: 10px;
    padding: 15px;
    transition: all 0.2s linear;
    display: flex;
    margin-right: 15px;
}

.category span{
    display: flex;
    align-items: center;
}

.category:hover.helper{
    border-color: #1e293b;
}
.category:hover.helpable{
    border-color: #1e293b;
}

.category:hover.similar{
    border-color: #1e293b;
}

.container-title{
    margin-bottom: 20px;
    
}

.title-section{
    color: #1e293b;
    font-size: 24px;
}

.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 48
}

.material-symbols-outlined{
    padding: 5px;
}

/* #category icon colors */

.helper-icon-holder{
    border-radius: 50%;
}

.helper-icon-holder .material-symbols-outlined{
    border-radius: 50%;
}


</style>