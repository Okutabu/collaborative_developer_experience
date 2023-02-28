<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useUsersStore, useAlertStore } from '@/stores';
import { router } from '@/router';

const usersStore = useUsersStore();
const alertStore = useAlertStore();
const route = useRoute();
const id = route.params.id;

let title = 'Add User';
let user = null;
if (id) {
    // edit mode
    title = 'Edit User';
    ({ user } = storeToRefs(usersStore));
    usersStore.getById(id);
}

const schema = Yup.object().shape({
    surname: Yup.string()
        .required('First Name is required'),
    name: Yup.string()
        .required('Last Name is required'),
    mail: Yup.string()
        .required('Mail is required')
        .email('Mail must be a valid email'),
    idSTOW: Yup.string()
        .required('ID STOW is required')
});

async function onSubmit(values) {
    try {
        let message;
        if (user) {
            await usersStore.update(user.value.id, values)
            message = 'User updated';
        } else {
            await usersStore.register(values, {acceptTerms: true});
            message = 'User added';
        }
        await router.push('/users');
        alertStore.success(message);
    } catch (error) {
        alertStore.error(error);
    }
}
</script>

<template>
    <h1>{{title}}</h1>
    <template v-if="!(user?.loading || user?.error)">
        <Form @submit="onSubmit" :validation-schema="schema" :initial-values="user" v-slot="{ errors, isSubmitting }">
            <div class="form-row">
                <div class="form-group col">
                    <label>First Name</label>
                    <Field name="surname" type="text" class="form-control" :class="{ 'is-invalid': errors.surname }" />
                    <div class="invalid-feedback">{{ errors.surname }}</div>
                </div>
                <div class="form-group col">
                    <label>Last Name</label>
                    <Field name="name" type="text" class="form-control" :class="{ 'is-invalid': errors.name }" />
                    <div class="invalid-feedback">{{ errors.name }}</div>
                </div>
            </div>
            <div class="form-row ">
                <div class="form-group col">
                    <label>Email</label>
                    <Field name="mail" type="mail" class="form-control" :class="{ 'is-invalid': errors.mail }" />
                    <div class="invalid-feedback">{{ errors.mail }}</div>
                </div>
                <div class="form-group col">
                    <label>Id Stack Overflow</label>
                    <Field name="idSTOW" type="integer" class="form-control" :class="{ 'is-invalid': errors.idSTOW }" />
                    <div class="invalid-feedback">{{ errors.idSTOW }}</div>
                </div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" :disabled="isSubmitting">
                    <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                    Save
                </button>
                <router-link to="/admin/users" class="btn btn-link">Cancel</router-link>
            </div>
        </Form>
    </template>
    <template v-if="user?.loading">
        <div class="text-center m-5">
            <span class="spinner-border spinner-border-lg align-center"></span>
        </div>
    </template>
    <template v-if="user?.error">
        <div class="text-center m-5">
            <div class="text-danger">Error loading user: {{user.error}}</div>
        </div>
    </template>
</template>
