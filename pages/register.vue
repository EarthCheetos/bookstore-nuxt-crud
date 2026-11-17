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
                    <input class="mb-2" v-model="username" type="text" placeholder="Username">
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
                password:''
            }
        },
        methods:{
            async submitRegister(){
                try {
                    const res = await api.post('/api/register',{
                        username: this.username,
                        password: this.password
                    });

                    console.log(res.data);
                }catch(err){
                    console.error(err.response?.data?.message);
                    alert(err.message);
                }
            }
        }
    }
</script>

<style scoped>

</style>