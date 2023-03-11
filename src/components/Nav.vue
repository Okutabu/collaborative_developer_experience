<script setup>
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
</script>

<template>
    <nav v-show="authStore.user" class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="navbar-brand">
            <img src="../assets/Logo-Positive-Thinking-Company.png" alt="logo" width="300" height="200">
        </div>
        <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav flex-column">
                <li class="nav-item">
                    <RouterLink to="/" class="nav-item nav-link"><i class="fa fa-user"></i>&nbsp; Home</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink to="/admin" class="nav-item nav-link"><i class="fa fa-unlock"></i> &nbsp; Admin</RouterLink>
                </li>
                <li class="nav-item">
                    <RouterLink to="/message" class="nav-item nav-link"><i class="fa fa-solid fa-envelope"></i>&nbsp; Message</RouterLink>
                </li>
                <li class="nav-item">
                    <button @click="authStore.logout()" class="btn btn-link nav-item nav-link"><i class="fa fa-sign-out" style="font-size:24px"></i> Logout</button>
                </li>
            </ul>
            </div>
        </div>
    </nav>


</template>

<style scoped>
.navbar{
    background-color: #ffffff;
    border-bottom: 1px solid #000000;
    width: 20%;
    display: flex;
    flex-direction: column;
}
.navbar-nav {
  width: 100%;
}

.navbar-nav li{
    margin-bottom: 30px;
}

.nav-link {
  color: #000000;
  padding: 1rem;
  font-size: 1.2rem;
  text-align: center;
  width: 100%;
  border-radius: 25px;
}

.navbar .nav-link.active {
  background-color: rgb(45, 45, 46);
  color: #ffffff;
}

.nav-link:hover {
  background-color: #e6e6e6;

}

.navbar-brand {
    margin-bottom: 100px;
}

.navbar-brand img {
    width: 100%;
    height: 100%;
}

</style>
    
        