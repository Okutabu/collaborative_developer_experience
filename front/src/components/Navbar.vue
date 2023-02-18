<script>

</script>

<template>

    <div class="container_navbar">
        <div class="container_navbar_logo">
            <img src="../assets/logo.svg" alt="" height="70" width="151.23">
        </div>
        <div class="container_navbar_actions">
            <div class="container_navbar_actions_item">
                <p>recommendation</p>
            </div>
            <div class="container_navbar_actions_item">
                <p>Profil</p>
            </div>
            <div class="container_navbar_actions_item">
                <p>Messages</p>
            </div>
            <div class="container_navbar_actions_item">
                <p>Deconnexion</p>
            </div>
        </div>
    </div>

</template>

<style scoped>


.container_navbar {
    height: auto;
    margin-top: 20px;
}

.container_navbar_logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}

.container_navbar_actions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    
}

.container_navbar_actions_item{
    border: solid black 1px;
    margin-top: 50px;
    text-align: center;
    padding: 10px;
    border-radius: 10px;
    width: 80%;
    margin-left: 10%;
}

.container_navbar_actions_item:hover{
    background-color: black;
    transition-duration: 0.5s;
    color: white;
}


</style>