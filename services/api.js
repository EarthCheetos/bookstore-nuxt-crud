import axios from 'axios';

export function createApi(baseURL = 'http://192.168.20.20:5000'){
    const api = axios.create({
        baseURL,
        headers:{
        }
    });

    api.interceptors.request.use((request)=>{
        const token = localStorage.getItem('token');

        if(token){
            request.headers.Authorization = `Bearer ${token}`
        }
        return request;
    });
    return api;
}