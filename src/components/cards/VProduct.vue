<script setup>
// ПОМЕНЯТЬ SVG НАДО
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
        class="p-5 bg-slate-100 rounded-xl flex flex-col justify-between gap-2"
    >
        <div>
            <img
                :src="product.imageUrl"
                alt=""
                class="mb-4"
            />
            <h3 class="text-xl font-semibold">
                {{ product.title }}
            </h3>
        </div>
        <div class="flex items-center justify-between gap-2">
            <div>
                <p class="text-slate-500">Цена</p>
                <b class="text-xl">
                    {{ product.price.toLocaleString("ru-RU") }} ₽
                </b>
            </div>
            <div class="flex items-center gap-3">
                <button
                    @click="favoritesStore.toggleFavorite(product)"
                    class="rounded-4xl shadow p-3 cursor-pointer hover:scale-110 transition"
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
                    @click="
            cartStore.isAdded(product.id)
              ? cartStore.removeFromCart(product.id)
              : cartStore.addToCart(product)
          "
                    class="rounded-4xl shadow p-3 cursor-pointer hover:scale-110 transition"
                    :class="[
            cartStore.isAdded(product.id)
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
                            v-show="cartStore.isAdded(product.id)"
                            d="M18 5.31667C15.225 5.04167 12.4333 4.9 9.65 4.9C8.4 4.9 6.35 4.98333 4.7 5.15L3.5 5.31667M7.58333 4.475L7.76667 3.38333C7.9 2.59167 8 2 9.41667 2H11.5833C13 2 13.1 2.59167 13.2333 3.38333L13.4167 4.475M15.2917 10.9417L15.0833 12.1667C15.0167 12.6 14.95 13.2333 14.95 13.2333C14.8833 14.05 14.3167 14.5333 13.4917 14.5333H7.49167C6.66667 14.5333 6.1 14.05 6.03333 13.2333C5.91667 12.3167 5.8 11.3583 5.7 10.45M5.96667 5.98333C5.91667 6.35833 5.875 6.74167 5.85 7.11667M17.5167 7.91667L16.8 17.3167C16.725 18.3 15.925 19.0333 14.9417 19.0333H6.14167C5.15833 19.0333 4.35833 18.3 4.28333 17.3167L3.575 7.91667"
                            stroke="white"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            v-show="!cartStore.isAdded(product.id)"
                            d="M4.16666 5.83333H15.6583C15.8912 5.83334 16.1214 5.88214 16.3343 5.97678C16.5472 6.07142 16.7379 6.20991 16.8934 6.38333C17.0489 6.55676 17.1657 6.76105 17.2362 6.98258C17.3068 7.20411 17.3294 7.43783 17.3026 7.66833L16.4887 14.5883C16.4086 15.2701 16.0801 15.8996 15.5613 16.3667C15.0425 16.8338 14.3655 17.0894 13.6641 17.0917H6.16666C5.46534 17.0894 4.78837 16.8338 4.26956 16.3667C3.75074 15.8996 3.42217 15.2701 3.34216 14.5883L2.52832 7.66833C2.50154 7.43783 2.52414 7.20411 2.59468 6.98258C2.66522 6.76105 2.78203 6.55676 2.93749 6.38333C3.09296 6.20991 3.28366 6.07142 3.49658 5.97678C3.70951 5.88214 3.93979 5.83334 4.17249 5.83333H4.16666Z"
                            stroke="#263141"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>
