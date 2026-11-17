<template>
    <div class="min-h-screen bg-zinc-800 p-5">
        <div class="flex justify-center">
            <h1 class="text-5xl text-white font-bold mb-5">Login</h1>
        </div>
        <div class="flex justify-center">
            <div class="bg-white w-100 rounded-md p-5">
                <form class="flex flex-col" @submit.prevent="submitLogin">
                    <label class="text-2xl">Username</label>
                    <input class="mb-2" v-model="username" type="text" placeholder="Username">
                    <label class="text-2xl">Password</label>
                    <input class="mb-2" v-model="username" type="text" placeholder="Username">
                    <button class="bg-zinc-600 hover:bg-zinc-700 p-1 rounded-md text-white">Login</button>
                    <NuxtLink class="mt-2 hover:text-zinc-600" to="/register">Make a new account</NuxtLink>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { createApi } from '../services/api';
const api = createApi();
    export default {
        data(){
            return{
                username:'',
                password:''
            }
        },
        methods:{
            async submitLogin(){
                try {
                    const res = await api.post('/api/login',{
                        username: this.username,
                        password: this.password
                    });

                    const token = res.data.Authorization;

                    if(!token){
                        alert('token not found!');
                        return;
                    }
                    localStorage.setItem('token', token);
                    const payload = JSON.parse(atob(token.split('.')[1]));

                    if(payload.role === 1){
                        await navigateTo('/admin/dashboard');
                    }else if(payload.role === 2 ){
                        await navigateTo('/seller/dashboard');
                    }else if(payload.role === 3){
                        await navigateTo('/bookpage');
                    }else{
                        localStorage.removeItem('token');
                        alert('Role not found!');
                        return;
                    }
                }catch(err){
                    console.error(err.response?.data?.message);
                    alert(err.message);
                }
            }
        }
    }
</script>

<style scoped>
input{
    border-width: 0.2px;
    border-radius: 5px;
    padding: 5px;
}
button{
    transition: 120ms;
    cursor: pointer;
}
</style>