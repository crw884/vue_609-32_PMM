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
        class="p-4 sm:p-5 bg-slate-100 rounded-xl flex flex-col justify-between gap-3"
    >
        <div>
            <img
                :src="product.imageUrl"
                alt=""
                class="mb-4 w-full aspect-square object-cover rounded-lg"
            />
            <h3 class="text-base sm:text-xl font-semibold line-clamp-2">
                {{ product.title }}
            </h3>
        </div>
        <div class="flex flex-col min-[400px]:flex-row items-start min-[400px]:items-center justify-between gap-3">
            <div>
                <p class="text-slate-500 text-base sm:text-sm">Цена</p>
                <b class="text-lg sm:text-xl whitespace-nowrap">
                    {{ product.price.toLocaleString("ru-RU") }} ₽
                </b>
            </div>
            <div class="flex items-center gap-2 sm:gap-3 w-full min-[400px]:w-auto justify-end">
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
                    @click="
            cartStore.isAdded(product.id)
              ? cartStore.removeFromCart(product.id)
              : cartStore.addToCart(product)
          "
                    class="rounded-4xl shadow p-2.5 sm:p-3 cursor-pointer hover:scale-110 transition"
                    :class="[
            cartStore.isAdded(product.id)
              ? 'bg-red-500'
              : 'bg-white',
          ]"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="1 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            v-show="cartStore.isAdded(product.id)"
                            d="M18 5.31667C15.225 5.04167 12.4333 4.9 9.65 4.9C8 4.9 6.35 4.98333 4.7 5.15L3 5.31667M7.58333 4.475L7.76667 3.38333C7.9 2.59167 8 2 9.40833 2H11.5917C13 2 13.1083 2.625 13.2333 3.39167L13.4167 4.475M16.2083 7.95L15.6667 16.3417C15.575 17.65 15.5 18.6667 13.175 18.6667H7.825C5.5 18.6667 5.425 17.65 5.33333 16.3417L4.79167 7.95M9.10833 14.0833H11.8833M8.41667 10.75H12.5833"
                            stroke="white"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            v-show="!cartStore.isAdded(product.id)"
                            d="M4.16666 5.83333H15.6583C15.8912 5.83334 16.1214 5.88214 16.3343 5.97659C16.5471 6.07103 16.7378 6.20903 16.894 6.38168C17.0503 6.55433 17.1686 6.7578 17.2414 6.97898C17.3142 7.20016 17.3398 7.43414 17.3167 7.66583L16.8167 12.6658C16.7755 13.0771 16.5831 13.4584 16.2766 13.7357C15.9702 14.0131 15.5716 14.1667 15.1583 14.1667H7.19999C6.81455 14.1668 6.44097 14.0334 6.14286 13.789C5.84475 13.5447 5.64054 13.2046 5.56499 12.8267L4.16666 5.83333ZM4.16666 5.83333L3.49166 3.13083C3.44651 2.95063 3.34245 2.79067 3.196 2.67638C3.04954 2.56209 2.8691 2.5 2.68332 2.5H1.66666M6.66666 17.5H8.33332M13.3333 17.5H15"
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
