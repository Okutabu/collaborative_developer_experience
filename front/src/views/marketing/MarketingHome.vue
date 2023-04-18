<script setup>

import { useAdminStore } from '@/stores';
import { storeToRefs } from 'pinia';

import CalendarHeatmap from '@/components/CalendarHeatmap.vue';
import { data } from '../../data';

var endDate = new Date('2023-03-27');
var orientation= 'horizontal';

const adminStore = useAdminStore();
const { stats, InteractionDates } = storeToRefs(adminStore);
adminStore.getStats();
adminStore.getInteractionDates();

</script>

<template>

    <div class="container-stats">
        <div class="container-month-review">
            nombre de question posées

            nombre de question repondues
        </div>
        <div class="container-trimestre-review">
            <div class="container-heatmap">
                    <p class="text">Taux de contributions des developpeurs</p>
                <calendar-heatmap class="heatmap-component" :values="InteractionDates" :end-date="endDate" :style="{'max-width': orientation === 'vertical' ? '145px' :  '800px'}" :round="2" :vertical="orientation === 'vertical'"/>
            
            </div>
        </div>
        <div class="container-global-review">
            nombre d'utilisateur actifs (donuts)

            nuage des techno utilisées
        </div>
    </div>

</template>

<style>

</style>