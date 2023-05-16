<script setup>

import { useAdminStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import CalendarHeatmap from '@/components/CalendarHeatmap.vue';

const { t } = useI18n();

var endDate    = new Date('2023-03-27');
var orientation= 'horizontal';


const adminStore = useAdminStore();
const { stats, InteractionDates } = storeToRefs(adminStore);
adminStore.getStats();
adminStore.getInteractionDates();

const user = localStorage.getItem('user')

        
</script>

<template>
    <div>
        <div class="container-table">
            <div class="container-heatmap">
                    <p class="text">{{ t('admin-stats-title') }}</p>
                <calendar-heatmap class="heatmap-component" :values="InteractionDates" :end-date="endDate" :style="{'max-width': orientation === 'vertical' ? '145px' :  '800px'}" :round="2"
                                :vertical="orientation === 'vertical'"/>
            
            </div>
                    
            <table class="table-body">
                <tr>
                    <td>{{t('admin-stats-nbTags')}}</td>
                    <td>{{ stats.nbTags }}</td>
                </tr>
                <tr>
                    <td>{{t('admin-stats-nbUsers')}}</td>
                    <td>{{ stats.nbUsers }}</td>
                </tr>
                <tr>
                    <td>{{t('admin-stats-tagsWithMostUsers')}}</td>   
                    <div v-for="tag in stats.topTags" class="container-tags">
                        <td>{{ tag.tag + " : " + tag.nbInteractions }}</td>
                    </div>
                </tr>
                <tr>
                    <td>{{t('admin-stats-nbInteractions')}}</td>
                    <td>{{ stats.nbInteractions }}</td>
                </tr>
                <tr>
                    <td>{{t('admin-stats-nbAnswers')}}</td>
                    <td>{{ stats.nbAnswers }}</td>
                </tr>
                <tr>
                    <td>{{t('admin-stats-nbActiveUsers')}}</td>
                    <td>{{  stats.nbActiveUsers }}</td>
                </tr>
                <tr>
                    <td>{{t('admin-stats-tagsWithMostInteractions')}}</td>
                    <div v-for="tag in stats.tagsWithMostUsers" class="container-tags">
                        <td>{{ tag.tag + " : " + tag.nbInteractions }}</td>
                    </div>
                </tr>
                <tr>
                    <td>{{t('admin-stats-collectorDates')}}</td>
                    <td>2023-01-02  to  2023-03-30</td>
                    
                </tr>
                <tr>
                    <td>{{t('admin-stats-nbNodes')}}</td>
                    <td>{{ stats.nbNodes }}</td>
                </tr>

                <tr>
                    <td>{{t('admin-stats-nbRelationships')}}</td>
                    <td>{{ stats.nbRelations}}</td>
                </tr>

            </table>
            
        </div>
        
    </div>


    

</template>

<style scoped>

.container-table {
    background-color: rgb(248, 249, 250);
    padding: 30px;
    height: 100%
}
.table-body td{
    width: 25%;
}

.table-body tr{ 
    height: 50px;
    border-bottom: 1px solid rgb(200, 200, 200);
    border-top: 1px solid rgb(200, 200, 200);
    text-align: center;
}

.container-tags {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.container-heatmap {
    margin-top: 20px;
    margin-bottom: 30px;
}

.heatmap-component {
    margin: 0 auto;
    width: 100%;
    height: 100%;
    max-width: 800;
    max-height: 800px;
}

.text {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
}

</style>