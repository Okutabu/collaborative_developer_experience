<script setup>

import { useAdminStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import CalendarHeatmap from '@/components/CalendarHeatmap.vue';

const { t } = useI18n();

var endDate = new Date('2023-03-27');
var orientation= 'horizontal';

const adminStore = useAdminStore();
const { stats, InteractionDates } = storeToRefs(adminStore);

</script>

<template>
  <div class="container-title">
    <h1>{{ t('marketing-title') }}<br><span>{{ t('marketing-CDE') }}</span></h1>   
  </div>
  <div class="container-stats">
    <div class="stats-container">
      <div class="stat-container">
        <div class="stat-circle">
          <p class="stat-value">
            {{ stats.nbInteractions - stats.nbAnswers }}
          </p>
        </div>
        <p class="stat-p">
          {{ t('marketing-last-month') }}{{ stats.nbInteractions - stats.nbAnswers }}{{ t('marketing-nbQuestion') }}
        </p>
      </div>
      <div class="stat-container">
        <div class="stat-circle">
          <p class="stat-value">
            {{ stats.nbAnswers }}
          </p>
        </div>
        <p class="stat-p">
          {{ t('marketing-last-month') }}{{ stats.nbAnswers }}{{ t('marketing-nbAnswer') }}
        </p>
      </div>
    </div>
    <div class="container-trimestre-review">
      <p class="title-heatmap">
        {{ t('marketing-collab') }}
      </p>
      <div class="container-heatmap">
        <calendar-heatmap
          class="heatmap-component"
          :values="InteractionDates"
          :end-date="endDate"
          :style="{'max-width': orientation === 'vertical' ? '145px' : '800px'}"
          :round="2"
          :vertical="orientation === 'vertical'"
        />
      </div>
    </div>
    <div class="container-global-review">
      <div class="container-active-user">
        <div class="stat-circle circle-rouge">
          <p class="stat-value">
            {{ stats.nbActiveUsers }}
          </p>
        </div>
        <p class="stat-label">
          {{ t('marketing-active-user') }}
        </p>
      </div>
            
      <div class="container-top-tags">
        <p class="title-techno-cloud">
          {{ t('marketing-topTags') }}
        </p>
        <div class="container-techno-cloud">
          <div
            v-for="stat in stats.topTags"
            :key="stat"
          >
            <div class="stat-circle-tag">
              <p class="stat-value">
                {{ stat.nbInteractions }}
              </p>
            </div>
            <p class="stat-label">
              {{ stat.tag }}
            </p>
          </div>  
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-title {
    display: flex;
    justify-content: center;
}

.container-title h1 {
    font-size: 45px;
    font-weight: bold;
    text-align: center;
    margin-top: 80px;
}

.container-title h1 span {
    color: #25B3C3;
}

.container-stats {
    margin: 20px;
    margin-right: 5%;
}
.stats-container {
    margin-top: 50px;
    display: flex;
    justify-content: space-around;

}

.stat-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.stat-circle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #25B3C3;
  margin-right: 10px;
}

.stat-circle-tag {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #FF0044;
  margin-right: 10px;
}

.circle-rouge {
    background-color: #FF0044;
}

.stat-value {
  font-size: 36px;
  font-weight: bold;
  margin-top: 15px;
}

.stat-label {
  font-size: 18px;
  color: #666;
  margin-top: 10px;
  text-align: center;
}


.container-trimestre-review {
    margin-left: 25%;
    margin-top: 100px;
    margin-right: 25%;
}

.container-global-review {
    display: flex;
    justify-content: space-around;
    margin-top: 50px;
    padding:0 10%;
    height: 500px;
    width: 100%;
}

.container-active-user {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 30%;
}

.stat-p {
    width: 40%;
    text-align: center;
    margin-top: 20px;
}

.container-top-tags {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
}
.container-techno-cloud{
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    text-align: center;
}

.title-heatmap, .title-techno-cloud {
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 40px;

}



</style>