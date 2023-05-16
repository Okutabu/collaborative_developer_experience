<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

import { useAdminStore } from '@/stores';
import { storeToRefs } from 'pinia';

import { useAuthStore } from '@/stores';
import { useRecoStore } from '@/stores';

import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const adminStore = useAdminStore();
adminStore.getStats();
adminStore.getInteractionDates();

const schema = Yup.object().shape({
    idSTOW: Yup.number().required('Cannot Log in without an ID')
});

async function onSubmit(values) {
    const authStore = useAuthStore();
    const {idSTOW} = values;
    await authStore.login(idSTOW);

    const usersStore = useRecoStore();
    await usersStore.getRecommandedUsers();
}
</script>

<template>
  <div class="card container-form">
    <h4 class="card-header">
      {{ t('login') }}
    </h4>
    <div class="card-body">
      <Form
        v-slot="{ errors, isSubmitting }"
        :validation-schema="schema"
        @submit="onSubmit"
      >
        <div class="form-group">
          <label>{{ t('idStow') }}</label>
          <Field
            name="idSTOW"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors.idSTOW }"
          />
          <div class="invalid-feedback">
            {{ errors.idSTOW }}
          </div>
        </div>
        <div class="form-group">
          <button
            class="btn btn-primary btn-login"
            :disabled="isSubmitting"
          >
            <span
              v-show="isSubmitting"
              class="spinner-border spinner-border-sm mr-1"
            />
            {{ t('login') }}
          </button>
          <router-link
            to="register"
            class="btn btn-link btn-register"
          >
            {{ t('register') }}
          </router-link>
        </div>
      </Form>
    </div>
  </div>
</template>

<style scoped>

.card{
    border-radius: 15px;
    border: 1px solid #92b8da;
}

.card-header{
    border-radius: 15px 15px 0 0;
    background-color: #bdd0fb;
    border-bottom: 1px solid #92b8da;
}

.btn-login{
    background-color:#4347e9;
    border: none;
}

.btn-login:hover{
    border: none;
    transform: scale(1.1);
    transition: all 0.3s ease-in-out;
}

.btn-register{
    color: #6c97fc;
    text-decoration: none;
}

.btn-register:hover{
    color: rgb(87, 176, 192);
    text-decoration: none;
    transform: scale(1.1);
    transition: all 0.3s ease-in-out;
}

.container-form{
    width: 50%;
}

.form-control{
    border: 1px solid #92b8da;
}

</style>
