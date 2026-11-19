<template>
    <div class="min-h-screen bg-zinc-800 p-5">
        <div class="flex justify-center">
            <h1 class="text-5xl text-white font-bold mb-5">Register</h1>
        </div>
        <div class="flex justify-center">
            <div class="bg-white w-100 rounded-md p-5">
                <form class="flex flex-col" @submit.prevent="submitRegister">
                    <label class="text-2xl">Username</label>
                    <input class="mb-2" v-model="username" type="text" placeholder="Username">
                    <label class="text-2xl">Password</label>
                    <input class="mb-2" v-model="password" type="password" placeholder="Password">
                    <label class="text-2xl">Email</label>
                    <input class="mb-2" v-model="email" type="text" placeholder="Email">
                    <button class="bg-zinc-600 hover:bg-zinc-700 p-1 rounded-md text-white">Register</button>
                    <NuxtLink class="mt-2 hover:text-zinc-600" to="/">Login to an existing account</NuxtLink>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { createApi } from '~/services/api';
const api = createApi();
    export default {
        data(){
            return{
                username:'',
                password:'',
                email:'',
                role: 3
            }
        },
        methods:{
            async submitRegister(){
                try {
                    const res = await api.post('/api/auth/register',{
                        username: this.username,
                        password: this.password,
                        email: this.email,
                        role: this.role
                    });

                    console.log(res.data);
                    alert('success!');
                    await navigateTo('/');
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