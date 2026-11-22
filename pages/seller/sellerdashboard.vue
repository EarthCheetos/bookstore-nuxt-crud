<template>
    <div class="min-h-screen bg-zinc-600">
        <div class="bg-zinc-800">
            <div class="flex flex-col">
                <p class="text-white text-5xl p-5 font-bold">Seller's dashboard</p>
                <button class="absolute mt-7 font-bold text-red-800 ml-260 text-2xl" @click="logout">Logout</button>
            </div>
        </div>
        <div class="flex justify-center">
            <p class="text-white text-2xl mt-2 font-bold">Add a new book</p>
        </div>
        <div class="flex justify-center mt-5">
            <div class="flex flex-col">
                <div class="bg-white w-100 rounded-md flex justify-center p-5">
                    <form class="flex flex-col" @submit.prevent="addBook">
                        <Label class="">Add a book cover</Label>
                        <input class="fileselector p-2" type="file" accept="image/*"
                            @change="bookcover = $event.target.files[0]" required />
                        <label>Name a title</label>
                        <input class="my-1 p-1" v-model="bookname" type="text" placeholder="Book's title" required />
                        <label>Select book's tag</label>
                        <select class="w-fit" v-model="tag">
                            <option value="" disabled>Select a tag</option>
                            <option v-for="t in tags" :key="t.tag_id" :value="t.tag_id">{{ t.tag }}</option>
                        </select>
                        <button class="mt-3 bg-zinc-600 text-white rounded-md p-1 hover:bg-zinc-700" type="submit">Add
                            book</button>
                    </form>
                </div>
                <div class="flex flex-row justify-center mt-5">
                    <div class="bg-white rounded-md h-fit p-5" v-for="b in books" :key="b.book_id">
                        <img :src="b.book_cover ? `http://192.168.88.165:5000/images/${b.book_cover}` : '/images/expie.jpg'"
                            class="w-16 h-fit object-cover" alt="">
                        <p class="font-bold">{{ b.book_name }}</p>
                        <p class="font-bold">By: {{ b.username }}</p>
                        <p class="font-bold">{{ b.tag }}</p>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { createApi } from '~/services/api';
const api = createApi();
export default {
    data() {
        return {
            bookcover: null,
            username: '',
            bookname: '',
            tag: '',
            tags: [],
            books: []
        }
    },
    mounted() {
        this.fetchTags();
        this.fetchBooks();

        const token = localStorage.getItem('token');

        if (token) {
            this.username = JSON.parse(atob(token.split('.')[1])).username;
        }
    },
    methods: {
        async fetchBooks() {
            try {
                const res = await api.get('/api/customer/books/');
                console.log(res.data);
                this.books = res.data.data;
            } catch (err) {
                console.error(err.response?.data?.message);
                alert(err.message);
            } finally {
                this.loading = false;
            }
        },
        async fetchTags() {
            try {
                const res = await api.get('/api/auther/tag');
                this.tags = res.data.data;
            } catch (err) {
                console.error(err);
            }
        },
        async addBook() {
            try {
                const form = new FormData();

                form.append('file', this.bookcover);
                form.append('book_name', this.bookname);
                form.append('book_price', 0);
                form.append('tag', this.tag);

                const res = await api.post('/api/auther/book/', form);

                alert('Success!');
                await this.fetchBooks();

                this.bookcover = null;
                this.bookname = '';
                this.tag = '';

            } catch (err) {
                console.error(err.response?.data);
                alert(err.response?.data?.message || err.message);
            }
        },
        async logout() {
            if (confirm('Logout?')) {
                localStorage.removeItem('token');
                navigateTo('/');
            } else {
                return;
            }
        }
    }
}
</script>

<style scoped>
.fileselector {
    border-width: 0.2px;
    border-radius: 5px;
}

input {
    border-width: 0.2px;
    border-radius: 5px;
    border-color: grey;
}

select {
    border-width: 0.2px;
    border-radius: 5px;
}

button {
    transition: 120ms;
    cursor: pointer;
}
</style>