<script setup>
import { storeToRefs } from 'pinia';
import { useProfileStore } from '@/stores';
import { useRoute } from 'vue-router'
import UserCard from '../../components/UserCard.vue';
import UserCard2 from '../../components/UserCard2.vue';

const route = useRoute()
const profileStore = useProfileStore();
const { userCardValue } = storeToRefs(profileStore);
profileStore.setUserProfile(route.params.id);


</script>



<template>

    <div class="container-profile-">
        <div class="container-card"> <UserCard2 :nom=userCardValue.userProfile[0].pseudo :techno=userCardValue.userProfile[1] :avatar=userCardValue.userProfile[0].avatar  :reco=userCardValue.userProfile[1][0].techno :key=userCardValue :lastInteract=userCardValue.userProfile[0].lastInteraction /> </div>
    </div>

</template>

<style>
.container-profile- {
    display: flex;
    justify-content: center;
    height: 100vh;
    background-color: #f5f5f5;
}

.fa {
  cursor: pointer;
}

</style>