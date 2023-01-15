<script>
export default {


    props: ['data'],
    setup(props) {
        const propsname = props.data.name
        return { propsname }}
}
</script>

<template>

    <div class="container_user_card">
        <div class="container_user_info">
            <div class="user_description">
                <p>{{ data }}</p>
                <p>age</p>
                <p>description</p>
            </div>
        </div>
        <div class="user_stats">
            <p>stats</p>
        <div> <Chart /> </div>
        </div>
    </div>

</template>

<style scoped>


.container_user_info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50%;
}

.container_user_card img{
    width: 100px;
    height: 100px;
}

.container_user_info {
    padding: 0;
    margin: 0;
    align-items: center;
    display: flex;
    justify-content: space-around;
}

.container_user_card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 10px;
    width: 500px;
    height: 600px;
    box-shadow: 0 0 10px 0 rgba(151, 144, 144, 0.2);
    margin-top: 20px;
    
}

</style>