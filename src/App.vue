<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { useFavoritesStore } from "@/stores/favorites";
import LoginModal from "./components/modals/LoginModal.vue";
import RegisterModal from "./components/modals/RegisterModal.vue";

const authStore = useAuthStore();
const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();

onMounted(() => {
    authStore.checkAuth();
});
</script>

<template>
    <div class="flex flex-col min-h-dvh">
        <div class="mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 mb-25">
            <nav class="py-3 border-b border-b-slate-200">
                <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div class="flex items-center justify-between w-full lg:w-auto">
                        <div class="flex items-center gap-3">
                            <img src="/logo.svg" alt="" class="sm:h-8 h-24" />
                            <p class="text-sm sm:block">
                                Лучшие цены <br />
                                в интернет-магазинах
                            </p>
                        </div>
                    </div>
                    <ul class="flex flex-wrap lg:flex-nowrap items-center gap-x-4 gap-y-3 sm:gap-x-6 lg:gap-10">
                        <li>
                            <RouterLink :to="{ name: 'catalog' }" class="flex gap-2 sm:gap-3 items-center text-sm">
                <span class="p-2.5 sm:p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition">
                  <img src="/catalog-icon.svg" alt="" class="w-4 h-4 sm:w-5 sm:h-5" />
                </span>
                                <span class="hidden sm:inline">Каталог</span>
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink :to="{ name: 'cart' }" class="flex gap-2 sm:gap-3 items-center text-sm">
                <span class="p-2.5 sm:p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition">
                  <img src="/cart-icon.svg" alt="" class="w-4 h-4 sm:w-5 sm:h-5" />
                </span>
                                <span class="hidden sm:inline">Корзина ({{ cartStore.totalItems }})</span>
                            </RouterLink>
                        </li>
                        <li>
                            <RouterLink :to="{ name: 'favorites' }" class="flex gap-2 sm:gap-3 items-center text-sm">
                <span class="p-2.5 sm:p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition">
                  <img src="/like-outline.svg" alt="" class="w-4 h-4 sm:w-5 sm:h-5" />
                </span>
                                <span class="hidden sm:inline">Избранное ({{ favoritesStore.items.length }})</span>
                            </RouterLink>
                        </li>
                        <li v-if="authStore.isAuthenticated">
                            <RouterLink :to="{ name: 'orders' }" class="flex gap-2 sm:gap-3 items-center text-sm">
                <span class="p-2.5 sm:p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition">
                  <img src="/orders-icon.svg" alt="" class="w-4 h-4 sm:w-5 sm:h-5" />
                </span>
                                <span class="hidden sm:inline">Заказы</span>
                            </RouterLink>
                        </li>
                        <li class="flex items-center gap-2 sm:gap-3 w-full lg:w-auto mt-2 lg:mt-0 pt-2 lg:pt-0 border-t lg:border-none border-slate-100">
                            <template v-if="authStore.isAuthenticated">
                <span class="text-sm font-medium text-slate-700 truncate max-w-[120px] sm:max-w-none">
                  {{ authStore.user?.fullName }}
                </span>
                                <button @click="authStore.logout" class="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
                                    Выйти
                                </button>
                            </template>
                            <template v-else>
                                <button @click="authStore.activeModal = 'login'" class="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition cursor-pointer hover:bg-slate-100 flex-1 lg:flex-none">
                                    Войти
                                </button>
                                <button @click="authStore.activeModal = 'register'" class="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition cursor-pointer hover:bg-red-400 flex-1 lg:flex-none">
                                    Регистрация
                                </button>
                            </template>
                        </li>
                    </ul>
                </div>
            </nav>
            <RouterView />
            <LoginModal
                :isOpen="authStore.activeModal === 'login'"
                @close="authStore.activeModal = null"
                @switch-to-register="authStore.activeModal = 'register'"
            />
            <RegisterModal
                :isOpen="authStore.activeModal === 'register'"
                @close="authStore.activeModal = null"
                @switch-to-login="authStore.activeModal = 'login'"
            />
        </div>
        <footer class="p-6 bg-slate-100 mt-auto">
            <div class="text-center text-slate-500 text-sm sm:text-base">
                Copyright © 2026 Behoor, Inc. Все права защищены
            </div>
        </footer>
    </div>
</template>

<style scoped></style>
