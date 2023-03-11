<script>
import { storeToRefs } from 'pinia';
import { ref } from 'vue'


const props = defineProps({
  name: String,
})



</script>


<template>
    <div v-if="user" class="header">
        <div class="container-welcome-message">
                <h2>Hey  {{ props.name }} ! Bienvenue sur votre espace de collaboration !</h2>
                <p class="text-muted"> Faites de nouvelles rencontres</p>
        </div>
        <div class="container-action-bar">
            <div class="container-bell">
                <!-- <b-icon icon="bell-fill" class="border rounded p-2"></b-icon> -->
            </div>
            <div class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">{{user.surname}} {{user.name}}</a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">Separated link</a>
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
    background-color: var(--cde-c-palette-dark-4);
    width: 100%;
}

.container-action-bar{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 20%;
}

</style>