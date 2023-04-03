<template>
    <div class="user-card">
      <img :src="user.users[0][0].avatar" alt="User Avatar" class="user-avatar">
      <div class="user-details">
        <h2 class="user-name">{{ user.users[0][0].pseudo }}</h2>
        <div class="user-skill">
            <p><i class="fa fa-graduation-cap "></i> {{ user.users[0][1][0].techno }}</p>
        </div>
        <div class="user-actions">
          <button class="btn btn-primary" @click="sendMessage"> <i class="fa fa-paper-plane-o"></i>&nbsp; Message</button>
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
    background-color: aliceblue;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 2px 2px 4px rgba(59, 110, 204, 0.3);
  }

  .user-card:hover {
    box-shadow: 4px 4px 8px rgba(59, 110, 204, 0.3);
    transform: translateX(-2%);
    transform: translateY(-2%);
    transition: all 0.2s ease-in-out;

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
  
</style>






