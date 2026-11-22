<template>
    <div class="bg-zinc-800 w-full p-5 flex flex-row">
        <h1 class="relative text-white text-5xl font-bold">Bookstore admin</h1>
        <button class="absolute text-red-800 ml-260 mt-2 text-2xl" @click="logout">Logout</button>
    </div>
</template>

<script>
    export default {
        data(){
            return
        },
        methods:{
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