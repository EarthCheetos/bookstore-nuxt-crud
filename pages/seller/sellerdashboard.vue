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

            <div class="bg-white w-100 rounded-md flex justify-center p-5">
                <form class="flex flex-col" @submit.prevent="addBook">
                    <Label class="">Add a book cover</Label>
                    <input class="fileselector p-2" type="file" accept="image/*"
                        @change="bookcover = $event.target.files[0]" required />
                    <label>Name a title</label>
                    <input class="my-1 p-1" v-model="bookname" type="text" placeholder="Book's title" required />
                    <label>Name the author</label>
                    <input class="my-1 p-1" v-model="username" type="text" placeholder="Book's author" required />
                    <label>Select book's tag</label>
                    <select class="w-fit" v-model="tag">
                        <option value="" disabled>Select a tag</option>
                        <option v-for="t in tag" :key="t.tag_id" :value="t.tag_id">{{ t.tag }}</option>
                    </select>
                    <button class="mt-3 bg-zinc-600 text-white rounded-md p-1 hover:bg-zinc-700" type="submit">Add
                        book</button>
                </form>
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
            bookname: '',
            username: '',
            tag: '',
            tags: []
        }
    },
    mounted() {
        this.fetchTags();
    },
    methods: {
        async fetchTags() {
            try {
                const res = await api.get('/api/tag');
                this.tags = res.data.data;
            } catch (err) {
                console.error(err);
            }
        },
        async addBook() {
            try {
                const form = new FormData();
                form.append('bookcover', this.bookcover);
                form.append('bookname', this.bookname);
                form.append('username', this.username);
                form.append('tag_id', this.tag);
                const res = await api.post('/api/book', form);
                console.log(res.data.data)
                alert('Success!');
            } catch (err) {
                console.error(err.reponse?.data?.message);
                alert(err.message);
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