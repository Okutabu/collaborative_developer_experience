<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';

import { useAuthStore } from '@/stores';
import { useRecoStore } from '@/stores';

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
    <div class="card m-3">
        <h4 class="card-header">Login</h4>
        <div class="card-body">
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
                <div class="form-group">
                    <label>ID STOW</label>
                    <Field name="idSTOW" type="text" class="form-control" :class="{ 'is-invalid': errors.idSTOW }" />
                    <div class="invalid-feedback">{{ errors.idSTOW }}</div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary" :disabled="isSubmitting">
                        <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                        Login
                    </button>
                    <router-link to="register" class="btn btn-link">Register</router-link>
                </div>
            </Form>
        </div>
    </div>
</template>
