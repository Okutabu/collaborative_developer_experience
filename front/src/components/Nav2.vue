<script setup>
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
</script>

<template>
    
    <!-- if the url start with /admin render the div bellow -->
    <Transition name="collapse">
    <div v-if="$route.path.startsWith('/admin')">
        <nav v-show="authStore.user" class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="navbar-brand">
                <!-- <img src="../assets/Logo-Positive-Thinking-Company.png" alt="logo" width="300" height="200"> -->
            </div>
            <div class="container-fluid">
                <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav flex-column">
                    <li class="nav-item">
                        <RouterLink to="/admin/list" class="nav-item nav-link"><i class="bi bi-chevron-double-right"></i>&nbsp; Home</RouterLink>
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
        <nav v-show="authStore.user" class="navbar navbar-expand-lg navbar-light bg-dark" >
            <div class="navbar-brand">
                <!-- <img src="../assets/Logo-Positive-Thinking-Company.png" alt="logo" width="300" height="200"> -->
            </div>
            <div class="container-fluid">
                <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav flex-column">
                    <li class="nav-item">
                        <RouterLink to="/overview" class="nav-item nav-link text-light"><i class="fa fa-user text-light"></i>&nbsp; Home</RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/statistics" class="nav-item nav-link text-light"><i class="fa fa-unlock"></i> &nbsp; Statistiques</RouterLink>
                    </li>
                    <!-- <li class="nav-item">
                        <RouterLink to="/admin" class="nav-item nav-link"><i class="fa fa-unlock"></i> &nbsp; Admin</RouterLink>
                    </li> -->
                    <!-- <li class="nav-item">
                        <RouterLink to="/message" class="nav-item nav-link"><i class="fa fa-solid fa-envelope"></i>&nbsp; Message</RouterLink>
                    </li> -->
                    <li class="nav-item end-of-nav">
                        <button @click="authStore.logout()" class="btn btn-link nav-item nav-link text-light"><i class="fa fa-sign-out" style="font-size:24px"></i> Logout</button>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    </div>
    </Transition>
    <button @click="isOpen = !isOpen">Toggle</button>
</template>

<style scoped>

.navbar{
    background-color: ;
    width: 300px;
    display: flex;
    flex-direction: column;
    height: 100%;
}
.navbar-nav {
  width: 100%;
  height: 100%;
}

.navbar-nav li{
    margin-bottom: 15px;
}

.end-of-nav {
    margin-top: 100%;
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
  padding-left: 50px;
}

.nav-link:hover {
    padding-left: 25px;

}
.nav-item{
    animation: reveal 1s cubic-bezier(.17,.67,.4,1.02);
    text-align: left;
    color: #fff;
    margin-left: 5%;
}
.navbar-brand {
    margin-bottom: 100px;
    animation: reveal 1s ease-in-out;
}

@keyframes reveal{
    0%{
        opacity: 0;
        transform: translateY(100px);
    }
    100%{
        opacity: 1;
        transform: translateY(0px);
    }
}

@keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

</style>
    
        