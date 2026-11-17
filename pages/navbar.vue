<template>
    <div class="bg-zinc-800 w-full p-5 flex flex-row">
        <h1 class="relative text-white text-5xl">Bookstore</h1>
        <button class="absolute text-white ml-200 mt-2 text-2xl" @click="home">Home</button>
        <button class="absolute text-white ml-230 mt-2 text-2xl" @click="cart">Cart</button>
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
            }
        }
    }
</script>

<style scoped>
button{
    cursor: pointer;
}
</style>