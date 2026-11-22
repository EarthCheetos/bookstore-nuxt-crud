<template>
    <navbar />
    <div class="min-h-screen bg-zinc-600">
        <div class="bg-zinc-600 p-3">
        </div>
        <div class="flex justify-center">
            <div class="bg-white w-170 rounded-md">
                <p class="text-2xl p-5">Books</p>
                <p v-if="books.length === 0" class="p-5">
                    No books available.
                </p>
                <div class="relative flex flex-row mx-5 p-5" v-for="b in books" :key="b.book_id">
                    <div class="relative mx-5">
                        <div class="flex">
                            <img :src="b.book_cover ? `http://192.168.88.165:5000/images/${b.book_cover}` : '/images/expie.jpg'"
                                class="w-16 h-fit object-cover">
                            <p class="font-bold ml-4">{{ b.book_name }}</p>
                        </div>
                    </div>
                    <p class="absolute ml-25 mt-5">By: {{ b.username }}</p>
                    <p class="absolute font-bold ml-25 mt-10 text-red-600">{{ b.tag }}</p>
                    <button class="bg-zinc-200 p-2 rounded-md absolute ml-110 mt-2 hover:bg-zinc-300">View →</button>
                    <button v-if="!isFavorited(b.book_id)" @click="addFavorite(b.book_id)" class="ml-50 bg-yellow-200 hover:bg-yellow-300 p-2 rounded-md h-fit mt-2">Favorite</button>
                    <button v-else-if="isFavorited(b.book_id)" @click="removeFavorite(b.book_id)" class="ml-50 bg-yellow-300 hover:bg-yellow-200 p-2 rounded-md h-fit mt-2">Favorited</button>
                </div>
                
            </div>
        </div>
    </div>

</template>

<script>
import { createApi } from '~/services/api.js';
const api = createApi();
import navbar from './navbar.vue';
export default {
    components: {
        navbar
    },
    data() {
        return {
            books: [{ book_id: '101', book_name: 'casualties unknown', book_cover: '', tag: 'psychological horror', username: 'Orsoniks' }
            ],
            favorites: [],
            selectedTag: ''
        }
    },
    mounted() {
        this.fetchBook();
        this.fetchFavorite();
    },
    methods: {
        async fetchBook() {
            try {
                const res = await api.get('/api/customer/books');
                console.log(res.data);
                this.books = res.data.data;
            } catch (err) {
                console.error(err.response?.data?.message);
                alert(err.message);
            } finally {
                this.loading = false;
            }
        },
        async addFavorite(book_id) {
            try {
                const res = await api.post(`/api/customer/favorite/${book_id}`);
                console.log(res.data);
                alert('Favorited!');
                window.location.reload();
            } catch (err) {
                console.log(err.response?.status);
                console.log(err.response?.data);
                alert(err.message);
            }
        },
        async removeFavorite(book_id) {
            try {
                const res = await api.delete(`/api/customer/favorite/${book_id}`);
                console.log(res.data);
                alert('Removed from favorited!')
                window.location.reload();
            } catch (err) {
                console.log(err.response?.status);
                console.log(err.response?.data);
                alert(err.message);
            }
        },
        async fetchFavorite() {
            try {
                const res = await api.get(`/api/customer/favorite/`);
                this.favorites = res.data.data || [];
                console.log('My favorites:', this.favorites);
            } catch (err) {
                console.error(err);
            }
        },
        isFavorited(book_id){
            return this.favorites.some(f => f.book_id === book_id);
        }
    }
}
</script>

<style scoped>
button {
    transition: 120ms;
    cursor: pointer;
}
</style>