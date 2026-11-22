<template>
    <Navbaradmin />
    <div class="min-h-screen bg-zinc-600">
        <p class="text-5xl text-white p-5">Manage books</p>
        <div class="flex justify-center">
            <div class="bg-white rounded-md w-100 p-5">
                <div v-for="b in books" :key="b.book_id">
                    <form action="">
                        <img :src="`http://192.168.88.165:5000/images/${b.book_cover}`"
                            class="w-16 h-fit object-cover" />
                        <p>{{ b.book_name }}</p>
                        <p>{{ b.username }}</p>
                        <p>{{ b.tag }}</p>
                        <button class="bg-green-700 hover:bg-green-800 p-1 text-white my-2 rounded-md" v-if="b.book_status === 'inactive'" @click="activeBook(b)">Active</button>
                        <button class="bg-red-700 hover:bg-red-800 p-1 text-white my-2 rounded-md" v-else-if="b.book_status === 'active'" @click="inactiveBook(b)">Inactive</button>
                    </form>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
import { createApi } from '~/services/api.js';
const api = createApi();
import Navbaradmin from './navbaradmin.vue';
export default {
    components: {
        Navbaradmin
    },
    data() {
        return {
            bookcover: null,
            bookname: '',
            books: [],
            status: ['active', 'inactive']
        }
    },
    mounted() {
        this.fetchBooks();
    },
    methods: {
        async activeBook(b) {
            try {
                const res = await api.put(`/api/admin/active/${b.book_id}`);
                console.log(res.data);
                window.location.reload();
            } catch (err) {
                console.error(err);
            }
        },
        async inactiveBook(b) {
            try {
                const res = await api.put(`/api/admin/inactive/${b.book_id}`);
                console.log(res.data);
                window.location.reload();
            } catch (err) {
                console.error(err);
            }
        },
        async fetchBooks() {
            try {
                const res = await api.get('/api/admin/books');
                this.books = res.data.data;
            } catch (err) {
                console.error(err.response?.data?.message);
            }
        }
    }
}
</script>

<style scoped></style>