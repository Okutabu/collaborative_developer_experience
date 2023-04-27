<script setup>
import { Form, Field, useSubmitForm } from 'vee-validate';
import * as Yup from 'yup';
import { useUsersStore, useAlertStore, useAuthStore } from '@/stores';
import { router } from '@/router';

import { ref } from 'vue';
const isOpen = ref(false);
console.log(isOpen);


const temp = localStorage.getItem('user')
const userJson = JSON.parse(temp);


const schema = Yup.object().shape({
    surname: Yup.string()
        .required('First Name is required'),
    name: Yup.string()
        .required('Last Name is required'),
    mail: Yup.string()
        .required('Mail is required')
        .email('Mail must be a valid email'),
    newIDSTOW: Yup.string()
        .required('ID STOW is required')
});

async function onDelete() {
    const usersStore = useUsersStore();
    const alertStore = useAlertStore();
    try {
        await usersStore.deleteUser(userJson.user.idSTOW);
        localStorage.removeItem('user');
        await router.push('/account/login');
        location.reload();
        
    } catch (error) { 
        alertStore.error(error);
    }
}

async function onSubmit(values) {
    const usersStore = useUsersStore();
    const alertStore = useAlertStore();
    const authStore = useAuthStore();
    try {

        // Ajouter une propriété
        values.idSTOW = userJson.user.idSTOW; 
        
        await usersStore.updateUser(values);
        //await router.push('/overview');

    } catch (error) { 
        alertStore.error(error);
    }
}

console.log(userJson)
</script>


<template>
    <h2>Préférences de l'utilisateur</h2>
    <div class="card container-form">
        <h4 class="card-header">Mes informations</h4>
        <div class="card-body">
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
                <div class="form-group">
                    <label>Email</label>
                    <Field name="mail" type="mail" class="form-control" :class="{ 'is-invalid': errors.mail }" :value=userJson.user.mail />
                    <div class="invalid-feedback">{{ errors.mail }}</div>
                </div>
                <div class="form-group">
                    <label>First Name</label>
                    <Field name="surname" type="text" class="form-control" :class="{ 'is-invalid': errors.firstName }" :value=userJson.user.surname />
                    <div class="invalid-feedback">{{ errors.firstName }}</div>
                </div>
                <div class="form-group">
                    <label>Last Name</label>
                    <Field name="name" type="text" class="form-control" :class="{ 'is-invalid': errors.lastName }" :value=userJson.user.name />
                    <div class="invalid-feedback">{{ errors.lastName }}</div>
                </div>
                <div class="form-group">
                    <label>Id Stack Overflow</label>
                    <Field name="newIDSTOW" type="integer" class="form-control" :class="{ 'is-invalid': errors.idSTOW }" :value=userJson.user.idSTOW />
                    <div class="invalid-feedback">{{ errors.idSTOW }}</div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-modify" @click="onSubmit" :disabled="isSubmitting">
                        <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                        Modifier les informations
                    </button>

                    <!-- <button class="btn btn-primary btn-delete" @click="onDelete" :disabled="isSubmitting">
                        <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                        Supprimer le compte
                    </button> -->
                    <button @click="isOpen = true" class="btn btn-primary btn-delete" :disabled="isSubmitting">
                        Supprimer mon compte
                    </button>
                    
                    <!-- <div class="modal" v-if="isOpen">
                        <div>
                            <h2>Oh my lord !</h2>
                            <p>Attention à vous la team</p>
                            <button @click="isOpen = false">Close</button>
                        </div>
                    </div> -->

                    <div class="disclaimer" v-if="isOpen">
                        <h2>Oh! You want to unsubscribe?</h2>
                        <p>We hate goodbyes, But if you change yor mind, we'll always be here with something fun to share.</p>
                        <!-- <a href="" class="btn1" id="unsubscribe">Unsubscribe</a> -->
                        <button class="btn1" id="unsubscribe" @click="onDelete" :disabled="isSubmitting">
                        <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                            Supprimer le compte
                        </button>
                        <!-- <a href="" class="btn1 btn-light" id="cancel">Cancel</a> -->
                        <button @click="isOpen = false" class="btn1 btn-light" id="cancel">
                             Cancel
                        </button>

                        <br>
                        <br>

                        <div class="emoji shocked">
                            <figure class="face">
                                <span class="eyes">
                                    <span class="eye"></span>
                                    <span class="eye"></span>
                                </span>
                                    <span class="mouth">
                                </span>
                            </figure>
	                    </div>
	                </div>

                </div>
            </Form>
        </div>
    </div>
</template>

<style scoped>
.root{
    position: relative;
}

.disclaimer{
    position: absolute;
    top:0;
    left:0;
    /* style video */
    /* background-color: rgba(0, 0, 0, 0.4); */
    width: 100%;
    height: 100%;
    /* display: flex;
    justify-content: center; */
    align-items: center;

    /* style internet*/
    /* max-width: 500px; */
    /* height: auto; */
    /* margin: 50px auto;
    padding: 60px;
    padding-bottom: 20px; */
    background-color: #fff;
    box-sizing: border-box;
    text-align: center;
    border-radius: 10px;
    /* box-shadow: 0px 15px 15px -12px rgba(0,0,0,0.09); */
}

.disclaimer > div {
    background-color: #fff;
    padding: 50px;
    border-radius: 10px;
}

.btn1 {
  background-color: #F2DD68;
  text-decoration: none;
  padding: 15px 20px;
  font-weight: bold;
  border-radius: 50px;
  color: #fff;
}

.btn-light {
  background-color: #eee;
  color: #222;
}

.btn1:hover{
  opacity: 0.8;
}

h2 {
  margin: 0;
  padding: 0;
  color: #444;
}

p {
  margin-top: 10px;
  line-height: 24px;
  margin-bottom: 40px;
  color: #888;
}

/*------ Main Emoji Styling ------*/

.emoji {
  box-sizing: border-box;
  margin: 30px auto 20px;
  width: 120px;
  height: 120px;
}

.face {
  width: 100px;
  height: 100px;
  position: relative;
  margin: 0 15px 30px 0;
  border-radius: 50%;
  background: #F2DD68;
  transition: 1s;
}

.face:after {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: -8px;
  left: -8px;
  border-radius: 50%;
  box-shadow: 8px 8px 0 0 rgba(0, 0, 0, 0.07);
}

.eye {
  position: absolute;
  width: 14px;
  height: 14px;
  top: 30px;
  left: 18px;
  z-index: 1;
  border-radius: 50%;
  background: #995710;
}

.eye:last-child {
  left: auto;
  right: 18px;
}

.emoji .eyed {
  animation-name: blink;
  animation-iteration-count: infinite;
  animation-duration: 3s;
}

@keyframes blink {
  10% {
    height: 10px;
    top: 32px;
  }
  20% {
    height: 0.5px;
    top: 37px;
  }
  50% {
    height: 10px;
    top: 32px;
  }
}

.mouth {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  z-index: 1;
  width: 70px;
  height: 34px;
  margin: 0 auto;
  border-radius: 0 0 70px 70px;
  overflow: hidden;
  background: #995710;
  transition: 0.3s;
}

.mouth:before,
.mouth:after {
  content: '';
  position: absolute;
  display: block;
}


/*------ Shocked Emoji Styling ------*/

.shocked .mouth {
  width: 25px;
  height: 25px;
  border-radius: 50%;
}


#cancel:hover ~ .emoji .mouth{
  top: 55px;
  z-index: 1;
  width: 50px;
  height: 25px;
  margin: 0 auto;
  border-radius: 0 0 70px 70px;
  overflow: hidden;
  background: #995710;
}

#unsubscribe:hover ~ .emoji .mouth{
  width: 50px;
  height: 5px;
  top: 60px;
  border-radius: 50px;
}

/* ------------------------------------------------------------------- */
.card{
    border-radius: 15px;
    border: 1px solid #92b8da;
}

.card-header{
    border-radius: 15px 15px 0 0;
    background-color: #bdd0fb;
    border-bottom: 1px solid #92b8da;
}

.btn-register{
    background-color:#4347e9;
    border: none;
}

.btn-login:hover{
    border: none;
    transform: scale(1.1);
    transition: all 0.3s ease-in-out;
}

.container-form{
    width: 50%;
}

.btn-cancel{
    color: #7099fc;
}

.form-control{
    border: 1px solid #92b8da;
}

.btn-delete:hover{
    border: none;
    transform: scale(1.1);
    transition: all 0.3s ease-in-out;
    background-color: #e94343;
}

.btn-modify:hover{
    border: none;
    transform: scale(1.1);
    transition: all 0.3s ease-in-out;
    background-color: #27afea;
}


</style>