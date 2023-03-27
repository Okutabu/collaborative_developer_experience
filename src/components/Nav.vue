<script setup>
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
</script>

<template>
    <!-- if the url start with /admin render the div bellow -->
    <div v-if="$route.path.startsWith('/admin')">
        <nav v-show="authStore.user" class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="navbar-brand">
                <img src="../assets/Logo-Positive-Thinking-Company.png" alt="logo" width="300" height="200">
            </div>
            <div class="container-fluid">
                <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav flex-column">
                    <li class="nav-item">
                        <RouterLink to="/admin" class="nav-item nav-link"><i class="fa fa-user"></i>&nbsp; Home</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/admin/stats"    class="nav-item nav-link"><i class="fa fa-unlock"></i> &nbsp; statistiques</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/admin/collecteur" class="nav-item nav-link"><i class="fa fa-unlock"></i> &nbsp; Collecteur</RouterLink>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    </div>
    <div v-else>
        <nav v-show="authStore.user" class="navbar navbar-expand-lg navbar-light bg-light" >
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
                        <RouterLink to="/userStat" class="nav-item nav-link"><i class="fa fa-unlock"></i> &nbsp; Mes statistiques</RouterLink>
                    </li>
                    <!-- <li class="nav-item">
                        <RouterLink to="/admin" class="nav-item nav-link"><i class="fa fa-unlock"></i> &nbsp; Admin</RouterLink>
                    </li> -->
                    <!-- <li class="nav-item">
                        <RouterLink to="/message" class="nav-item nav-link"><i class="fa fa-solid fa-envelope"></i>&nbsp; Message</RouterLink>
                    </li> -->
                    <li class="nav-item">
                        <button @click="authStore.logout()" class="btn btn-link nav-item nav-link"><i class="fa fa-sign-out" style="font-size:24px"></i> Logout</button>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    </div>


</template>

<style scoped>

.navbar{
    background-color: #ffffff;
    width: 300px;
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
  background-color: #25b3c3;
  color: #ffffff;
}

.nav-link:hover {
  background-color: #e6e6e6;

}

.navbar-brand {
    margin-bottom: 100px;
}



</style>
    
        