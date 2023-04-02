<script setup>
import { storeToRefs } from 'pinia';
import { useProfileStore } from '@/stores';
import { useRoute } from 'vue-router'

const route = useRoute()
const profileStore = useProfileStore();
const { userCardValue } = storeToRefs(profileStore);
profileStore.setUserProfile(route.params.id);


</script>



<template>

    <div class="container-profile-">
        <td>
            {{ userCardValue }}
        </td>
        
        <!-- <UserCard :nom=userCardValue.userProfile[0].pseudo :techno=userCardValue.userProfile[1] :avatar=userCardValue.userProfile[0].avatar  />  -->
    </div>


</template>

<style>

</style>