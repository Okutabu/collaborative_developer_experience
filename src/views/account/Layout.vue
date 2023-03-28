<template>
    <div class="container-account-routes">
        <div >
            <div class="container-display">
                <div class="container-image">
                    <img src="../../../public/images/login.png" alt="">
                </div>
                <div class="container-white-background">
                    <router-view></router-view>
                </div>
                
            </div>
        </div>
    </div>
</template>

<style>
.container-display{
    display: flex;
}

.container-image{
    display: flex;
    align-items: center;
}
.container-white-background{
    background-color: aliceblue;
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center ;

}

</style>