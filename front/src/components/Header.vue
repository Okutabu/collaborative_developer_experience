<script>
import { defineProps } from 'vue'
import { useI18n } from 'vue-i18n';


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
            }
        },
        setup(){
            const { t } = useI18n();
            return { t };
        }
    };





</script>


<template>
  <div class="header">
    <div class="container-welcome-message text-center">
      <h2>{{ t('header-welcome') }}</h2>
      <p class="text-muted">
        {{ t('header-message') }}
      </p>
    </div>
  </div>
</template>

<style scoped>


.header {
    display: flex;
    align-items: center;
    width: 100%;
}


.container-welcome-message {
    height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
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