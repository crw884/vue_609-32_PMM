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
        class="p-5 bg-slate-100 rounded-xl flex flex-col justify-between gap-2"
    >
        <div>
            <img
                :src="product.imageUrl"
                alt=""
                class="mb-4"
            />
            <h3 class="text-xl font-semibold">
                {{product.title}}
            </h3>
        </div>
        <div class="flex items-center justify-between gap-2">
            <div>
                <p class="text-slate-500">Цена:</p>
                <b class="text-xl">{{product.price.toLocaleString("ru-RU")}} ₽</b>
            </div>
            <div class="flex items-center gap-3">
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
                    @click="cartStore.isAdded(product.id) ? cartStore.removeFromCart(product.id) : cartStore.addToCart(product)"
                    class="rounded-4xl  shadow p-3 cursor-pointer hover:scale-110 transition"
                    :class="[
                        cartStore.isAdded(product.id)
                        ? 'bg-red-500'
                        : 'bg-white',
                    ]"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path v-show="cartStore.isAdded(product.id)" d="M18 5.31667C15.225 5.04167 12.4333 4.9 9.65 4.9C8 4.9 6.35 4.98333 4.7 5.15L3 5.31667M7.58333 4.475L7.76667 3.38333C7.9 2.59167 8 2 9.40833 2H11.5917C13 2 13.1083 2.625 13.2333 3.39167L13.4167 4.475M16.2083 7.95L15.6667 16.3417C15.575 17.65 15.5 18.6667 13.175 18.6667H7.825C5.5 18.6667 5.425 17.65 5.33333 16.3417L4.79167 7.95M9.10833 14.0833H11.8833M8.41667 10.75H12.5833" stroke="white" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                        <path v-show="!cartStore.isAdded(product.id)" d="M4.16666 5.83333H15.6583C15.8912 5.83334 16.1214 5.88214 16.3343 5.97659C16.5471 6.07103 16.7378 6.20903 16.894 6.38168C17.0503 6.55433 17.1686 6.7578 17.2414 6.97898C17.3142 7.20016 17.3398 7.43414 17.3167 7.66583L16.8167 12.6658C16.7755 13.0771 16.5831 13.4584 16.2766 13.7357C15.9702 14.0131 15.5716 14.1667 15.1583 14.1667H7.19999C6.81455 14.1668 6.44097 14.0334 6.14286 13.789C5.84475 13.5447 5.64054 13.2046 5.56499 12.8267L4.16666 5.83333ZM4.16666 5.83333L3.49166 3.13083C3.44651 2.95063 3.34245 2.79067 3.196 2.67638C3.04954 2.56209 2.8691 2.5 2.68332 2.5H1.66666M6.66666 17.5H8.33332M13.3333 17.5H15" stroke="#263141" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>


                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
