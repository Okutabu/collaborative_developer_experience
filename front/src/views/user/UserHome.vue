<script setup>
import { storeToRefs } from 'pinia';
import { ref, onMounted, onUnmounted } from 'vue';

import { useAuthStore } from '@/stores';
import { useRecoStore } from '@/stores';
import Header from '../../components/Header.vue';
import UserCard from '../../components/UserCard.vue';
import UserCarCollaborative from '../../components/UserCarCollaborative.vue';
import UserRightCard from '../../components/UserRightCard.vue';


const help = ref(null);
const contact = ref("contact")
const aide = ref("aide ce dev");

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const usersStore = useRecoStore();
const { usersReco, usersRecoSimilarity, usersRecoQuestion, collaborated } = storeToRefs(usersStore);

const dataForLoadingUsersRecos = {
                                
                                "answer": "Users found", 
                                "users":[ 
                                            [ {   
                                                "idSTOW": { "low": 11804213, "high": 0 }, 
                                                "pseudo": "Franck", 
                                                "avatar": "https://i.stack.imgur.com/H1G7n.png?s=256&g=1" },
                                                [ 
                                                    { "techno": "Macmini", "ratio": 18.52941176470588 }, 
                                                    { "techno": "material-ui", "ratio": 17.647058823529413 }, 
                                                    { "techno": "http-live-streaming", "ratio": 8.823529411764707 }, 
                                                    { "techno": "vercel", "ratio": 8.823529411764707 }, 
                                                    { "techno": "hls.js", "ratio": 8.823529411764707 } ] ]
                                                
                                            ]};

const dataForLoadingUsersRecosSimilarity = dataForLoadingUsersRecos;
const dataForLoadingUsersRecosQuestion = dataForLoadingUsersRecos;

const typeSimilaire = ref('Projet similaire')
const typeReponse= ref('Helper')
const typeQuestion = ref('To help')


const userSelected = ref(null);
const headerdisapear = ref(true);
const showHeader = ref(true);

function onClick(userParam) {
    userSelected.value = userParam;
    if (headerdisapear.value == true) {
        headerdisapear.value = false;
    }
}


const showComponent1 = ref(true)
const showComponent2 = ref(false)

function toogleComponent() {
    showComponent1.value = !showComponent1.value
    showComponent2.value = !showComponent2.value
}

if (localStorage.getItem('collaborated') != null) {
    showHeader.value = false;
}


var interval = setInterval(function() {
    if (localStorage.getItem('collaborated') != null) {
        if( JSON.parse(localStorage.getItem('collaborated')).answer == "Users found" ){
            showComponent2.value = ref(true)
        }
        headerdisapear.value = false;
        clearInterval(interval);
    }
}, 100);

</script>



<template>
    <div class="super-container-home">

    
    <div class="container-home">
        <div v-if="showHeader">
            <Transition name="slide-fade">
                <div v-if="headerdisapear">
                    <Header :surname=user.user.surname  :name=user.user.name />
                </div>
            </Transition>
        </div>
        <div class="container" ref="container" @scroll="handleScroll">
        </div>

                <div  v-if="showComponent1" key="component1">
                    <div class="container-similarities">
                        
                        <div class="container-raw-cosinus-similarity" v-if="usersRecoSimilarity">
                            <span class="categorie-recommendation">Utilisateurs similaires à vous</span>
                            <div @click="onClick(usersRecoSimilarity.users)">
                                <UserCarCollaborative :user="usersRecoSimilarity" :type="typeSimilaire" :bouton="contact" />
                            </div>
                        </div>
                        <div v-else>
                            <div class="custom-spinner" role="status">
                                <UserCarCollaborative :user="dataForLoadingUsersRecosSimilarity" :type="typeSimilaire"/>
                                <div class="cover">&nbsp;</div>
                            </div>
                        </div>
                        <div class="container-similarity-tag-answers" v-if="usersReco">
                            <span class="categorie-recommendation">Utilisateurs qui repondent à vos questions</span>
                            <div @click="onClick(usersReco.users)">
                                <UserCarCollaborative :user="usersReco" :type="typeReponse" :bouton="contact" />
                            </div>
                        </div>
                        <div v-else>
                            <div class="custom-spinner" role="status">
                                <UserCarCollaborative :user="dataForLoadingUsersRecos" :type="typeReponse"/>
                                <div class="cover">&nbsp;</div>
                            </div>
                        </div>
                        <div class="container-similarity-tag-questions" v-if="usersRecoQuestion">
                            <span class="categorie-recommendation">Utilisateurs que vous pouvez aider</span>
                            <div @click="onClick(usersRecoQuestion.users)">
                                <UserCarCollaborative :user="usersRecoQuestion" :type="typeQuestion" :bouton="aide" />
                            </div>
                        </div>
                        <div v-else>
                            <div class="custom-spinner" role="status">
                                <UserCarCollaborative :user="dataForLoadingUsersRecosQuestion" :type="typeQuestion"/>
                                <div class="cover">&nbsp;</div>
                            </div>
                        </div>
                    </div>

                    <div class="container-usercard-peek" v-if="userSelected"> 
                        <div>
                            <UserCard :nom=userSelected[0][0].pseudo :techno=userSelected[0][1] :avatar=userSelected[0][0].avatar :reco=userSelected[0][1][0].techno :key=userSelected :lastInteract=userSelected[0][0].lastInteraction /> 
                        </div>
                    </div>
                </div>

                <div v-if="showComponent2" key="component2" class="container-list-collaboration" >
                <table class="table " id="handshakes">
                    <thead class="table-head">
                        <tr>
                            <th class="table-head-impair">Vous avez collaboré sur StackOverflow avec ces developpeurs PTC ! </th>
                        </tr>
                    </thead>
                    <tbody class="table-body">
                        <tr v-for="collab in collaborated.users" :key = "collab">

                            <div class="container-user-enlisted">
                                <td class="user-enlisted"><img :src="collab.properties.avatar" alt="user avatar" width="80">
                                    <div class="container-for-column">
                                        <div class="container-user-description">
                                            
                                            <div class="user-description-name">
                                                <p>{{ collab.properties.surname +" "+ collab.properties.name }}</p>
                                            </div>
                                            
                                        </div>
                                        <div class="container-collab.properties-details">
                                            <div class="collab.properties-description-activity">
                                                <ul class="list-unstyled text-grey">
                                                    <li><i class="fa fa-filter pr-1" aria-hidden="true"></i>Développeur front-end &nbsp;</li>
                                                    <li><i class="fa fa-clock-o pr-1"></i>Derniere activitée:&nbsp;<p>{{ collab.properties.lastInteraction ? (new Date(collab.properties.lastInteraction.low * 1000)).toLocaleString().split(',')[0] : 'Pas d\'activité' }}</p>
                                            </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </div>                    

                        </tr>     
                    </tbody>
                </table>
            </div>
            
    </div>
    <UserRightCard :id="user.user.idSTOW" :surname="user.user.surname"  :name="user.user.name" :avatar="user.user.avatar"/>
</div>
    

    
    

</template>

<style scoped>


.container-similarities {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding-top: 50px;
    width: 100%;
    padding-right: 4%;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-50px);
  opacity: 0;
}

.container-usercard-peek {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

.custom-spinner {
    position: relative;
}

.cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(101deg, rgb(116, 208, 183) 0%, rgb(92, 60, 232) 48%, rgb(23, 190, 185) 100%); 
	background-size: 400% 400%;
	animation: gradient 15s ease infinite;
    z-index: 1;
    border-radius: 8px;
}

.container-raw-cosinus-similarity, .container-similarity-tag-answers, .container-similarity-tag-questions {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
}

.categorie-recommendation{
    font-size: 1em;
    font-weight: bold;
    margin-bottom: 1em;
    border-radius: 30px;
    padding-left: 1em;
    padding-right: 1em;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
}

.waiting-clic{
    height: 450px;
    background-color: rgb(230, 230, 230);
    
}

.container-home{
    animation: reveal 1s cubic-bezier(.17,.67,.4,1.02); 
}

@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
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
    width: 60vw;

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


.list-unstyled{
    display: flex;
}

.list-unstyled li{
    display: flex;
}

.container-list-collaboration{
    margin-top: 100px;
}


</style>