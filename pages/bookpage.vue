<template>
    <navbar />
    <div class="min-h-screen bg-zinc-600">
        <div class="bg-zinc-600 p-3">
        </div>
        <div class="flex justify-center">
            <div class="bg-white w-150 rounded-md">
                <p class="text-2xl p-5">Books</p>
                <div class="relative    flex flex-row mx-5 p-5" v-for="book in books" :key="book.id">
                    <div class="bg-zinc-200 p-3 rounded-md">
                        <span>📖</span>
                    </div>
                    <div class="relative mx-5">
                        <p class="font-bold">{{ book.title }}</p>
                        <p>{{ book.author }}</p>
                    </div>
                    <p class="absolute font-bold ml-50 text-green-600">{{ book.price }}</p>
                    <button class="bg-zinc-200 p-2 rounded-md absolute ml-110 mt-2 hover:bg-zinc-300">View →</button>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
import navbar from './navbar.vue';
export default {
    components: {
        navbar
    },
    data() {
        return {
            books: [
                { id: '1', title: '1984', price: '199 THB', author: 'George Orwell' },
                { id: '2', title: 'Beastars', price: '129 THB', author: 'Paru Itagaki' }
            ]
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