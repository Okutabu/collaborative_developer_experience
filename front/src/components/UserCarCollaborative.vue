<template>
  <div class="container-whole-card">
      <div class="user-card">
        <button class="user-button">
            <div class="user-avatar-container">
                <img :src="user[0].avatar" alt="User Avatar" class="user-avatar">
                <!-- ajoute un icon de telephone derrière l'image -->
                <i class="fa fa-phone" style="font-size:36px;color:white"></i>
            </div>
        </button>

        <div class="user-details">
          <h2 class="user-name">{{ user[0].pseudo }}</h2>
          <div class="user-skill">
              <p><i class="fa fa-graduation-cap "></i> {{ user[1][0].techno }}</p>
          </div>
          <div class="user-actions">
            <!-- affiche cette div si le props bouton a la valeur "help" -->
            <div v-if="bouton === 'contact'">
              <a :href="profilSTOW" target="_blank">
                <button class="btn btn-primary"><img src="../assets/stow-icon.png" alt="stow-icon" class="stow-icon" style="width: 30px;"> </button>
              </a>
            </div>
            <div v-else>
              <RouterLink :to="{path :`/help/${user[0].idSTOW}`}">
                <button class="btn btn-primary" @click="helpPage"> <i class="fa fa-handshake-o"></i>&nbsp; {{ bouton }} </button>
              </RouterLink>
            </div>
            <button class="btn btn-secondary">{{t('collabCard-detail')}}</button>
          </div>
        </div>
      </div>
  </div>

  </template>
  
  <script>

  import { RouterLink } from 'vue-router' 
  import { useI18n } from 'vue-i18n';

  export default {
    setup(){
            const { t } = useI18n();
            return { t };
    },
    name: 'UserCard',
    props: {
      user: {
        type: Object,
        required: true
      },
      type: {
        type: String,
        required: true
      },
      bouton: {
        type: String,
        required: true
      }
    },
    methods: {
      helpPage() {
        console.log("renvoie vers la page d'aide")
        console.log(this.user[0].idSTOW)
      }
    },
    computed: {
      profilSTOW() {
        return `https://stackoverflow.com/users/${this.user[0].idSTOW}`
      }
    }
  }
  
  </script>
  
  <style>
  

  .user-card {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    padding: 16px;
    /* box-shadow: 4px 4px 20px 20px rgba(207, 207, 207, 0.3); */
    height: 300px;

    /* place la balise <i> sur la basile <img> */
    
  }

  .user-card:hover {
    /* box-shadow: 4px 4px 8px rgba(59, 110, 204, 0.3); */
    transform: translateX(-2%);
    transform: translateY(-2%);
    transition: all 0.2s ease-in-out;

  }
  
  .user-avatar {
    position: relative;
    z-index: 1;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
}

  .user-avatar:hover {
    box-shadow: 4px 4px 8px rgba(59, 110, 204, 0.3);
    transform: translateX(-2%);
    transform: translateY(-2%);
    transition: all 0.2s ease-in-out;

    filter: brightness(30%);

  }
  .user-button {
    position: relative;
    display: inline-block;
}

  .user-avatar-container {
      position: relative;
      width: 80px;
      height: 80px;
  }

  .user-avatar {
      position: relative;
      z-index: 0;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
      filter: brightness(100%);
      transition: filter 0.2s ease-in-out;
  }

  .fa-phone {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      z-index: 2;
      opacity: 0;
      transition: opacity 0.2s ease-in-out;
      padding-top: 25px;
  }

  .user-avatar-container:hover .fa-phone {
      opacity: 1;
  }

  .user-avatar-container:hover .user-avatar {
      filter: brightness(30%);
  }

  .user-avatar:hover {
      box-shadow: 4px 4px 8px rgba(59, 110, 204, 0.3);
      transform: translate(-2%, -2%);
      transition: all 0.2s ease-in-out;
  }

  
  .user-details {
    flex: 1;
  }
  
  .user-name {
    margin: 0;
    font-size: 24px;
    font-weight: 500;
    color: #333;
    margin-bottom: 8px;
  }
  
  .user-role {
    margin: 0;
    font-size: 18px;
  }
  
  .skill {
    background-color: #eee;
    color: #333;
    font-size: 14px;
    font-weight: 400;
    border-radius: 16px;
    padding: 4px 8px;
    margin-right: 8px;
    margin-bottom: 8px;
  }

  .user-skill p {
    border: 1px solid #eee;
    border-radius: 16px;
    padding: 4px 8px;
    margin-bottom: 0;
    font-size: 12px;
  }
  
  .user-strength {
    margin-top: 8px;
    font-size: 14px;
    font-weight: 400;
    color: #666;
  }
  
  .user-actions {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 16px;
  }
  
  .btn {
    border: none;
    border-radius: 8px;
    padding: 8px 16px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  }
  
  .btn-primary {
    background-color: var(--primary);
    color: #fff;
    margin-right: 8px;
  }

  .btn-secondary{
    background-color: var(--primary);
  }

  .btn-primary:hover {
    background-color: var(--primary-hover);
  }

  .btn-secondary:hover {
    background-color: var(--primary-hover);
  }
  
  .container-whole-card {
    display: flex;
    align-items: center;
  }

  
  
</style>






