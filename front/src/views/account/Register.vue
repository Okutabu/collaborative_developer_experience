<script setup>
import { Form, Field, useSubmitForm } from 'vee-validate';
import * as Yup from 'yup';

import { useUsersStore, useAlertStore } from '@/stores';
import { router } from '@/router';

const schema = Yup.object().shape({
    surname: Yup.string()
        .required('First Name is required'),
    name: Yup.string()
        .required('Last Name is required'),
    mail: Yup.string()
        .required('Mail is required')
        .email('Mail must be a valid email'),
    idSTOW: Yup.string()
        .required('ID STOW is required'),
    acceptTerms: Yup.bool()
                .required('Accept Ts & Cs is required')
});

async function onSubmit(values) {
    const usersStore = useUsersStore();
    const alertStore = useAlertStore();
    try {
        await usersStore.register(values);
        await router.push('/account/login');
        alertStore.success('Registration successful');
    } catch (error) { 
        alertStore.error(error);
    }
}
</script>


<template>
    <div class="card container-form">
        <h4 class="card-header">Register</h4>
        <div class="card-body">
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
                <div class="form-group">
                    <label>Email</label>
                    <Field name="mail" type="mail" class="form-control" :class="{ 'is-invalid': errors.mail }" />
                    <div class="invalid-feedback">{{ errors.mail }}</div>
                </div>
                <div class="form-group">
                    <label>First Name</label>
                    <Field name="surname" type="text" class="form-control" :class="{ 'is-invalid': errors.firstName }" />
                    <div class="invalid-feedback">{{ errors.firstName }}</div>
                </div>
                <div class="form-group">
                    <label>Last Name</label>
                    <Field name="name" type="text" class="form-control" :class="{ 'is-invalid': errors.lastName }" />
                    <div class="invalid-feedback">{{ errors.lastName }}</div>
                </div>
                <div class="form-group">
                    <label>Id Stack Overflow</label>
                    <Field name="idSTOW" type="integer" class="form-control" :class="{ 'is-invalid': errors.idSTOW }" />
                    <div class="invalid-feedback">{{ errors.idSTOW }}</div>
                </div>
                <div class="form-group form-check">
                    <Field name="acceptTerms" type="checkbox" id="acceptTerms" :value="true" class="form-check-input" :class="{ 'is-invalid': errors.acceptTerms }" />
                    <label for="acceptTerms" class="form-check-label">Accept Terms & Conditions*</label>
                    <p class ="h6"><small>J'accepte que mes données StackOverflow soient utilisées par la plateforme. Celles-ci seront utilisées uniquement par des algorithmes de recommandation et ne seront pas partagées avec des tiers.
                    </small></p>
                    <div class="invalid-feedback">{{errors.acceptTerms}}</div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-register" :disabled="isSubmitting">
                        <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                        Register
                    </button>
                    <router-link to="login" class="btn btn-link btn-cancel">Cancel</router-link>
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

</style>