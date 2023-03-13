<script>
import { defineProps } from 'vue'


export default {
    name: 'Header',
    props: {
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        espace: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        }
    }
}
</script>


<template>
    <div class="header">
        <div class="container-welcome-message">
                <h2> Bienvenue sur votre espace {{ espace }}</h2>
                <p class="text-muted">{{ message }}</p>
        </div>
            <div class="container-action-bar">
                <div class="container-bell">
                    <!-- <b-icon icon="bell-fill" class="border rounded p-2"></b-icon> -->
                </div>
                <div class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">{{ surname }} {{ name }}</a>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">Mes favoris</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                </div>
            </div>
    </div>
</template>

<style scoped>

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: rgb(248, 249, 250);
    width: 100%;
}

.container-welcome-message {
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 2em;
}

.container-action-bar{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 20%;
}

.nav-item {
    margin-right: 3em;
}

.dropdown-toggle{
    color: black;
    font-weight: bold;
}

</style>