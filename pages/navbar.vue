<template>
    <div class="bg-zinc-800 w-full p-5 flex flex-row">
        <h1 class="relative text-white text-5xl font-bold">Bookstore</h1>
        <button class="absolute text-white ml-200 mt-2 text-2xl" @click="home">Home</button>
        <button class="absolute text-white ml-230 mt-2 text-2xl" @click="cart">Cart</button>
        <button class="absolute text-red-800 ml-260 mt-2 text-2xl" @click="logout">Logout</button>
    </div>
</template>

<script>
    export default {
        data(){
            return
        },
        methods:{
            async home(){
                navigateTo('/bookpage');
            },
            async cart(){
                navigateTo('/cart');
            },
            async logout(){
                if (confirm('Logout?')){
                    localStorage.removeItem('token');
                    navigateTo('/');
                }else{
                    return;
                }
            }
        }
    }
</script>

<style scoped>
button{
    cursor: pointer;
}
</style>