<script setup>
import { useFavoritesStore } from "@/stores/favorites";
import VProduct from "@/components/cards/VProduct.vue";
const favoritesStore = useFavoritesStore();
</script>
<template>
    <main class="pt-6 sm:pt-10">
        <h1 class="text-3xl sm:text-[40px] font-bold mb-5">Избранное</h1>
        <div v-if="favoritesStore.items.length === 0" class="flex flex-col items-start gap-3">
            <p class="text-slate-600">В избранном пока ничего нет ♡</p>
            <RouterLink class="underline text-red-500 hover:text-red-600 transition" to="/">
                Перейти в каталог
            </RouterLink>
        </div>
        <div v-else class="grid grid-cols-1 min-[450px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
            <v-product v-for="item in favoritesStore.items" :key="item.id" :product="item"></v-product>
        </div>
    </main>
</template>
