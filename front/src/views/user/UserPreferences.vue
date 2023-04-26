<script setup>
import { Form, Field, useSubmitForm } from 'vee-validate';
import * as Yup from 'yup';
import { useUsersStore, useAlertStore } from '@/stores';
import { router } from '@/router';



const temp = localStorage.getItem('user')
const userJson = JSON.parse(temp)


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

async function onDelete() {
    const usersStore = useUsersStore();
    const alertStore = useAlertStore();
    console.log("bro wtf")
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
        console.log("onSubmit")
        console.log(values)
    } catch (error) { 
        alertStore.error(error);
    }
}

</script>


<template>
    <h2>Préférences de l'utilisateur</h2>
    {{ userJson.user }}
    <div class="card container-form">
        <h4 class="card-header">Register</h4>
        <div class="card-body">
            <Form :validation-schema="schema" v-slot="{ errors, isSubmitting }">
                <div class="form-group">
                    <label>Email</label>
                    <Field name="mail" type="mail" class="form-control" :class="{ 'is-invalid': errors.mail }" :value=userJson.user.mail />
                    <div class="invalid-feedback">{{ errors.mail }}</div>
                </div>
                <div class="form-group">
                    <label>First Name</label>
                    <Field name="surname" type="text" class="form-control" :class="{ 'is-invalid': errors.firstName }" :value=userJson.user.name />
                    <div class="invalid-feedback">{{ errors.firstName }}</div>
                </div>
                <div class="form-group">
                    <label>Last Name</label>
                    <Field name="name" type="text" class="form-control" :class="{ 'is-invalid': errors.lastName }" :value=userJson.user.surname />
                    <div class="invalid-feedback">{{ errors.lastName }}</div>
                </div>
                <div class="form-group">
                    <label>Id Stack Overflow</label>
                    <Field name="idSTOW" type="integer" class="form-control" :class="{ 'is-invalid': errors.idSTOW }" :value=userJson.user.idSTOW />
                    <div class="invalid-feedback">{{ errors.idSTOW }}</div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-modify" @click="onSubmit" :disabled="isSubmitting">
                        <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                        Modifier les informations
                    </button>
                    <button class="btn btn-primary btn-delete" @click="onDelete" :disabled="isSubmitting">
                        <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                        Supprimer le compte
                    </button>

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