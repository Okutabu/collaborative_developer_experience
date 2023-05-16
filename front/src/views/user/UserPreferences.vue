<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useUsersStore, useAlertStore } from '@/stores';
import { router } from '@/router';

import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const isOpen = ref(false);


const temp = localStorage.getItem('user')
const userJson = JSON.parse(temp);


const schema = Yup.object().shape({
    surname: Yup.string()
        .required(t('yup-first-name')),
    name: Yup.string()
        .required(t('yup-last-name')),
    mail: Yup.string()
        .required(t('yup-mail'))
        .email(t('yup-valid-mail')),
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
    try {

        // Ajouter une propriété
        values.idSTOW = userJson.user.idSTOW; 
        
        await usersStore.updateUser(values);
        // await router.push('/overview');
        // location.reload();

    } catch (error) { 
        alertStore.error(error);
    }
}

</script>


<template>
  <div class="container-user-preferences">
    <h2 class="titre">
      {{ t('pref-user') }}
    </h2>
    <div class="card container-form">
      <h4 class="card-header">
        {{ t('pref-informations') }}
      </h4>
      <div class="card-body">
        <Form
          v-slot="{ errors, isSubmitting }"
          :validation-schema="schema"
          @submit="onSubmit"
        >
          <div class="form-group">
            <label>{{ t('mail') }}</label>
            <Field
              name="mail"
              type="mail"
              class="form-control"
              :class="{ 'is-invalid': errors.mail }"
              :value="userJson.user.mail"
            />
            <div class="invalid-feedback">
              {{ errors.mail }}
            </div>
          </div>
          <div class="form-group">
            <label>{{ t('first-name') }}</label>
            <Field
              name="surname"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.firstName }"
              :value="userJson.user.surname"
            />
            <div class="invalid-feedback">
              {{ errors.firstName }}
            </div>
          </div>
          <div class="form-group">
            <label>{{ t('last-name') }}</label>
            <Field
              name="name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.lastName }"
              :value="userJson.user.name"
            />
            <div class="invalid-feedback">
              {{ errors.lastName }}
            </div>
          </div>
          <div class="form-group">
            <label>{{ t('idStow') }}</label>
            <Field
              name="newIDSTOW"
              type="integer"
              class="form-control"
              :class="{ 'is-invalid': errors.idSTOW }"
              :value="userJson.user.idSTOW"
            />
            <div class="invalid-feedback">
              {{ errors.idSTOW }}
            </div>
          </div>
          <div class="form-group">
            <button
              class="btn btn-primary btn-modify"
              :disabled="isSubmitting"
              @click="onSubmit"
            >
              <span
                v-show="isSubmitting"
                class="spinner-border spinner-border-sm mr-1"
              />
              {{ t('pref-change') }}
            </button>

            <button
              class="btn btn-primary btn-delete"
              :disabled="isSubmitting"
              @click="isOpen = true"
            >
              {{ t('pref-delete') }}
            </button>

            <div
              v-if="isOpen"
              class="disclaimer"
            >
              <h2>{{ t('pref-disclaimer') }}</h2>
              <p>{{ t('pref-disclaimer-details') }}</p>
              <button
                id="unsubscribe"
                class="btn1"
                :disabled="isSubmitting"
                @click="onDelete"
              >
                <span
                  v-show="isSubmitting"
                  class="spinner-border spinner-border-sm mr-1"
                />
                {{ t('pref-delete') }}
              </button>
              <button
                id="cancel"
                class="btn1 btn-light"
                @click="isOpen = false"
              >
                {{ t('cancel') }}
              </button>

              <br>
              <br>

              <div class="emoji shocked">
                <figure class="face">
                  <span class="eyes">
                    <span class="eye" />
                    <span class="eye" />
                  </span>
                  <span class="mouth" />
                </figure>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<style scoped>

.container-user-preferences{
    animation: reveal 1s cubic-bezier(.17,.67,.4,1.02); 
}
.root{
    position: relative;
}

.disclaimer{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    align-items: center;
    background-color: #fff;
    box-sizing: border-box;
    text-align: center;
    border-radius: 10px;
}

.disclaimer > div {
    background-color: #fff;
    padding: 50px;
    border-radius: 10px;
}

.btn1 {
  background-color: #ed4040;
  text-decoration: none;
  padding: 15px 20px;
  margin : 30px 10px;
  font-weight: bold;
  border-radius: 10px;
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
  margin : 30px 35%;
  width: 120px;
  height: 120px;
}

.face {
  width: 100px;
  height: 100px;
  position: relative;
  margin: 0 15px 30px 0;
  border-radius: 50%;
  background: #ed4040;
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
  background: #361d03;
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
  background: #361d03;
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
  background: #361d03;
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


.container-form{
    margin: auto;
}

.titre{
    text-align: center;
    margin-top: 50px;
    margin-bottom: 50px;
}

</style>