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
        class="p-4 sm:p-5 bg-slate-100 rounded-3xl sm:rounded-4xl flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-10"
    >
        <div class="flex gap-4 flex-1 w-full">
            <div class="w-24 h-24 sm:w-30 sm:h-30 shrink-0 overflow-hidden rounded-xl">
                <img
                    :src="product.imageUrl"
                    alt=""
                    class="w-full h-full object-cover"
                />
            </div>
            <div class="pt-1 sm:pt-2 flex-1">
                <h3 class="text-lg sm:text-xl font-semibold mb-3">
                    {{ product.title }}
                </h3>
                <div class="flex flex-wrap gap-3 items-center justify-between sm:justify-start">
                    <div class="flex gap-3 items-center">
                        <button
                            @click="favoritesStore.toggleFavorite(product)"
                            class="rounded-4xl shadow p-2.5 sm:p-3 cursor-pointer hover:scale-110 transition"
                            :class="[
                favoritesStore.isFavorite(product.id)
                  ? 'bg-red-500'
                  : 'bg-white',
              ]"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9.99999 18.0417C9.74166 18.0417 9.49166 18.0083 9.28332 17.9333C6.09999 16.8417 1.04166 12.9667 1.04166 7.41666C1.04166 4.55833 3.31666 2.29166 6.16666 2.29166C7.55832 2.29166 8.87499 2.85 9.99999 3.83333C11.125 2.85 12.4417 2.29166 13.8333 2.29166C16.6833 2.29166 18.9583 4.55833 18.9583 7.41666C18.9583 12.9667 13.9 16.8417 10.7167 17.9333C10.5083 18.0083 10.2583 18.0417 9.99999 18.0417ZM6.16666 3.54166C4.00832 3.54166 2.29166 5.25833 2.29166 7.41666C2.29166 12.525 7.19166 15.8583 9.69999 16.7333C9.82499 16.775 9.96666 16.775 10.0917 16.7333C12.5917 15.8583 17.5 12.5333 17.5 7.41666C17.5 5.25833 15.7833 3.54166 13.625 3.54166C12.375 3.54166 11.2 4.125 10.4417 5.14166C10.225 5.425 9.78332 5.425 9.56666 5.14166C8.8 4.125 7.63332 3.54166 6.16666 3.54166Z"
                                    :fill="
                  favoritesStore.isFavorite(product.id)
                    ? '#fff'
                    : '#263141'
                "
                                />
                            </svg>
                        </button>
                        <button
                            @click="cartStore.removeFromCart(product.id)"
                            class="rounded-4xl bg-white shadow p-2.5 sm:p-3 cursor-pointer hover:scale-110 transition"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M18 5.31667C15.225 5.04167 12.4333 4.9 9.65 4.9C8.4 4.9 6.35 4.98333 4.7 5.15L3.5 5.31667M7.58333 4.475L7.76667 3.38333C7.9 2.59167 8 2 9.41667 2H11.5833C13 2 13.1 2.59167 13.2333 3.38333L13.4167 4.475M15.2917 10.9417L15.0833 12.1667C15.0167 12.6 14.95 13.2333 14.95 13.2333C14.8833 14.05 14.3167 14.5333 13.4917 14.5333H7.49167C6.66667 14.5333 6.1 14.05 6.03333 13.2333C5.91667 12.3167 5.8 11.3583 5.7 10.45M5.96667 5.98333C5.91667 6.35833 5.875 6.74167 5.85 7.11667M17.5167 7.91667L16.8 17.3167C16.725 18.3 15.925 19.0333 14.9417 19.0333H6.14167C5.15833 19.0333 4.35833 18.3 4.28333 17.3167L3.575 7.91667"
                                    stroke="#263141"
                                    stroke-width="1.25"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                    <div class="sm:hidden">
                        <b class="text-lg">{{ product.price.toLocaleString("ru-RU") }} ₽</b>
                    </div>
                </div>
            </div>
        </div>
        <div class="hidden sm:block pt-2">
            <b class="text-xl">{{ product.price.toLocaleString("ru-RU") }} ₽</b>
        </div>
        <div class="rounded-4xl bg-white p-1 flex items-center w-full sm:w-auto justify-between sm:justify-start">
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
