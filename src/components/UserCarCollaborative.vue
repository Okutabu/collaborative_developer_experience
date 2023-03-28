<template>
    <div class="user-card">
      <img :src="user.users[0][0].avatar" alt="User Avatar" class="user-avatar">
      <div class="user-details">
        <h2 class="user-name">{{ user.users[0][0].pseudo }}</h2>
        <p class="user-role">{{ type }}</p>
        <div class="user-skill">
            <p>Skill : {{ user.users[0][1][0].techno }}</p>
        </div>
        <div class="user-actions">
          <button class="btn btn-primary" @click="sendMessage">Send Message</button>
          <button class="btn btn-secondary" @click="viewProfile">View Profile</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserCard',
    props: {
      user: {
        type: Object,
        required: true
      },
      type: {
        type: String,
        required: true
      }
    },
    methods: {
      sendMessage() {
        // TODO: Implement send message functionality
      },
      viewProfile() {
        // TODO: Implement view profile functionality
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
    background-color: #f7f7f7;
    border: 1px solid #d1d1d1;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .user-avatar {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 50%;
    margin-right: 16px;
  }
  
  .user-details {
    flex: 1;
  }
  
  .user-name {
    margin: 0;
    font-size: 24px;
    font-weight: 500;
    color: #333;
  }
  
  .user-role {
    margin: 0;
    font-size: 18px;
    font-weight: 400;
    color: #666;
  }
  
  .user-skill {
    
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
    background-color: rgb(87, 176, 192);
    color: #fff;
    margin-right: 8px;
  }

  .btn-primary:hover {
    background-color: rgb(234, 51, 75);
  }
  
</style>






