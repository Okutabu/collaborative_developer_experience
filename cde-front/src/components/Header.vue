<script>

</script>

<template>
    <div class="container_header">
        <div class="container_header_welcome">
            <p>Bienvenue sur votre espace de collaboration</p>
        </div>
        <div class="container_header_user">
            <div class="container_header_user_info">
                <div class="user_description">
                    <p>Alexandre Desbos</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.container_header {
    height: auto;
    width: 100%;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
}

.container_header_user {
    height: 100%;
    width: 300px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.container_header_user_info {
    height: 100%;
    width: auto;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
}


</style>