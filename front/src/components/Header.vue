<script>

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
    }
}





</script>


<template>
    
        <div class="header">
            <div class="container-welcome-message text-center">
                    <h2> Bienvenue sur votre espace de collaboration</h2>
                    <p class="text-muted">Nous utilisons des algorithmes de recommendations pour vous recommander des profils les plus pertinant possible</p>
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