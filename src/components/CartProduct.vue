<script setup>
import { useFavoritesStore } from "@/stores/favorites";
import { useCartStore } from "@/stores/cart";

const favoritesStore = useFavoritesStore();
const cartStore = useCartStore();
defineProps({
    product: Object,
});
</script>

<template>
    <div
        class="p-5 bg-slate-100 rounded-4xl flex items-start justify-between gap-10"
    >
        <div class="flex gap-4 flex-1">
            <div class="w-30 h-30 overflow-hidden">
                <img
                    :src="product.imageUrl"
                    alt=""
                    class="w-full h-full object-cover"
                />
            </div>
            <div class="pt-2">
                <h3 class="text-xl font-semibold mb-3">
                    {{ product.title }}
                </h3>
                <div class="flex gap-3 items-center">
                    <button
                        @click="favoritesStore.toggleFavorite(product)"
                        class="rounded-4xl shadow p-3 cursor-pointer hover:scale-110 transition"
                        :class="[
                        favoritesStore.isFavorite(product.id)
                        ? 'bg-red-500'
                        : 'bg-white'
                    ]"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 21.65C11.69 21.65 11.39 21.61 11.14 21.52C7.32 20.21 1.25 15.56 1.25 8.69C1.25 5.19 4.08 2.35 7.56 2.35C9.25 2.35 10.83 3.01 12 4.19C13.17 3.01 14.75 2.35 16.44 2.35C19.92 2.35 22.75 5.2 22.75 8.69C22.75 15.57 16.68 20.21 12.86 21.52C12.61 21.61 12.31 21.65 12 21.65ZM7.56 3.85C4.91 3.85 2.75 6.02 2.75 8.69C2.75 15.52 9.32 19.32 11.63 20.11C11.81 20.17 12.2 20.17 12.38 20.11C14.68 19.32 21.26 15.53 21.26 8.69C21.26 6.02 19.1 3.85 16.45 3.85C14.93 3.85 13.52 4.56 12.61 5.79C12.33 6.17 11.69 6.17 11.41 5.79C10.48 4.55 9.08 3.85 7.56 3.85Z" fill="#263141"/>
                        </svg>
                    </button>
                    <button
                        @click="cartStore.removeFromCart(product.id)"
                        class="rounded-4xl bg-white shadow p-3 cursor-pointer hover:scale-110 transition"
                    >
                        <!-- Иконка trash-icon -->
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 5.31667C15.225 5.04167 12.4333 4.9 9.65 4.9C8 4.9 6.35 4.98333 4.7 5.15L3 5.31667M7.58333 4.475L7.76667 3.38333C7.9 2.59167 8 2 9.40833 2H11.5917C13 2 13.1083 2.625 13.2333 3.39167L13.4167 4.475M16.2083 7.95L15.6667 16.3417C15.575 17.65 15.5 18.6667 13.175 18.6667H7.825C5.5 18.6667 5.425 17.65 5.33333 16.3417L4.79167 7.95M9.10833 14.0833H11.8833M8.41667 10.75H12.5833" stroke="black" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <div class="pt-2">
            <b class="text-xl">{{ product.price.toLocaleString("ru-RU") }} ₽</b>
        </div>
        <div class="rounded-4xl bg-white p-1 flex items-center">
            <button
                class="cursor-pointer w-10 h-10 font-bold flex items-center justify-center rounded-4xl p-3 hover:bg-slate-200 transition"
                @click="cartStore.updateQuantity(product.id, -1)"
            >
                -
            </button>
            <span class="w-12 text-center">{{ product.quantity }}</span>
            <button
                class="cursor-pointer w-10 h-10 font-bold flex items-center justify-center rounded-4xl p-3 hover:bg-slate-200 transition"
                @click="cartStore.updateQuantity(product.id, 1)"
            >
                +
            </button>
        </div>
    </div>
</template>
