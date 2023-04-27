<script setup>

import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useToHelpStore } from '@/stores';
import { useRoute } from 'vue-router'
import UserCard2 from '../../components/UserCard2.vue';

const route = useRoute()
const toHelpStore = useToHelpStore();
const { userToHelp } = storeToRefs(toHelpStore);
toHelpStore.getDataToHelp(route.params.id);




</script>

<template>
    <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>

    <h1 class="titre">Vous êtes le profil parfait pour aider {{ userToHelp.user.profile[0].pseudo }} !</h1>
    <div class="container-help-user">
        

        <!-- Affiche le profil de l'utilisateur qui a besoin d'aide -->
        <div class="container-profile-">
            <div class="container-card"> <UserCard2 :nom=userToHelp.user.profile[0].pseudo :techno=userToHelp.user.profile[1] :avatar=userToHelp.user.profile[0].avatar  :reco=userToHelp.user.profile[1][0].techno :key=userToHelp :lastInteract=userToHelp.user.profile[0].lastInteraction /> </div>
        </div>

        <div class="Questions">
            <h2 class="QuestionTitre">Voici les questions que vous pouvez aider à résoudre :</h2>

            <!-- affiche une liste de questions avec le nom de la question et un bouton pour acceder à l'url de la quesiton -->
            <ul>
            <li v-for="question in userToHelp.user.questions">
                <div class="question-wrapper">
                    <div class="question-title" v-html="question.title"></div>
                    <div id="container">
                    <button class="learn-more">
                        <span class="circle" aria-hidden="true">
                        <span class="icon arrow"></span>
                        </span>
                        <a :href="question.urlQuestion" target="_blank" class="button-text">Question</a>
                    </button>
                    </div>
                </div>
            </li>
            </ul>
        </div>
    </div>    
</template>

<style scoped>

.titre{
    text-align: center;
    margin-top: 20px;
    margin-bottom: 50px;
    font-family: 'Montserrat', sans-serif;
}

.QuestionTitre{
    text-align: center;
    margin-bottom: 25px;
    font-family: 'Montserrat', sans-serif;
}


.list-row{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    
}

.container-help-user{
    display: flex;
    justify-content: space-around;
}


.container-help-user{
    animation: reveal 1s cubic-bezier(.17,.67,.4,1.02); 
}

* {
	box-sizing: border-box;
}


.wrapper {
	max-width: 600px;
	margin: 0 auto;
}

ol {
	list-style: none;
	padding: 0;
}

li + li {
	margin-top: 1rem;
}

li {
	display: flex;
	align-items: center;
	gap: 1rem;
	background: aliceblue;
	padding: 1.5rem;
	border-radius: 1rem;
	width: calc(100% - 2rem);
	box-shadow: 0.25rem 0.25rem 0.75rem rgb(0 0 0 / 0.1);
}


@import url('https://fonts.googleapis.com/css?family=Mukta:700');

:root {
  --bg: #f3f8fa;
  --white: #fff;
  --black: #424cda;
}

button, button.learn-more {
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 0;
  vertical-align: middle;
  text-decoration: none;
  background: transparent;
  padding: 0;
  font-size: inherit;
  font-family: inherit;
}

button.learn-more {
  width: 12rem;
  height: auto;
  padding-top: 20px;

}

button.learn-more .circle {
  position: relative;
  display: block;
  margin: 0;
  width: 3rem;
  height: 3rem;
  background: var(--black);
  border-radius: 1.625rem;
  transition: all 0.45s cubic-bezier(0.65,0,.076,1);
}

button.learn-more .circle .icon {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  background: var(--white);
  transition: all 0.45s cubic-bezier(0.65,0,.076,1);
}

button.learn-more .circle .icon.arrow {
  left: 0.625rem; /*Pour changer la position de la flèche */
  width: 1.125rem;
  height: 0.125rem;
  background: none;
  transition: all 0.45s cubic-bezier(0.65,0,.076,1);
}

button.learn-more .circle .icon.arrow::before {
  position: absolute;
  content: '';
  top: -0.25rem;
  right: 0.0625rem; /*Pour changer la position de la flèche */
  width: 0.625rem;
  height: 0.625rem;
  border-top: 0.125rem solid var(--white);
  border-right: 0.125rem solid var(--white);
  transform: rotate(45deg);
}

button.learn-more .button-text {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.75r 0;
  margin: 0 0 0 1.85rem;
  color: var(--black);
  font-weight: 700;
  line-height: 1.6;
  text-align: center;
  text-transform: uppercase;
  transition: all 0.45s cubic-bezier(0.65,0,.076,1);
  
}

button:hover .circle {
  width: 100%;
}

button:hover .circle .icon.arrow {
  background: var(--white);
  transform: translate(1rem, 0);
}

button:hover .button-text {
  color: var(--white);
  text-decoration: none;
}


*::before,
*::after {
  box-sizing: border-box;
}

.button-text{
    padding-top: 30px;
}

.learn-more{
    position: relative;
    margin-left: 35em;
}

</style>