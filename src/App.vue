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
    <body class="flex flex-col justify-between h-dvh">
    <div class="mx-auto w-[1440px] mb-25">
        <nav class="py-3 border-b border-b-slate-200">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <img
                        src="/logo.svg"
                        alt=""
                    />
                    <p class="text-sm">
                        Лучшие цены <br />
                        в интернет-магазинах
                    </p>
                </div>
                <ul class="flex items-center gap-10">
                    <li>
                        <RouterLink
                            :to="{ name: 'catalog' }"
                            class="flex gap-3 items-center"
                        >
                <span
                    class="p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition"
                >
                  <img
                      src="/catalog-icon.svg"
                      alt=""
                  />
                </span>
                            Каталог
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink
                            :to="{ name: 'cart' }"
                            class="flex gap-3 items-center"
                        >
                <span class="p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition">
                  <img src="/cart-icon.svg" alt="" />
                </span>
                            Корзина ({{ cartStore.totalItems }})
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink
                            :to="{ name: 'favorites' }"
                            class="flex gap-3 items-center"
                        >
                <span class="p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition">
                  <img src="/like-outline.svg" alt="" />
                </span>
                            Избранное ({{ favoritesStore.items.length }})
                        </RouterLink>
                    </li>
                    <li v-if="authStore.isAuthenticated">
                        <RouterLink
                            :to="{ name: 'orders' }"
                            class="flex gap-3 items-center"
                        >
                <span class="p-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition">
                  <img src="/orders-icon.svg" alt="" />
                </span> Заказы
                        </RouterLink>
                    </li>
                    <li class="flex items-center gap-3">
                        <template v-if="authStore.isAuthenticated">
                <span
                    class="text-sm font-medium text-slate-700"
                > {{ authStore.user?.fullName }} </span>
                            <button
                                @click="authStore.logout"
                                class="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                            >Выйти</button>
                        </template>
                        <template v-else>
                            <button
                                @click="authStore.activeModal = 'login'"
                                class="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-700 transition cursor-pointer hover:bg-slate-100"
                            >Войти</button>
                            <button
                                @click="authStore.activeModal = 'register'"
                                class="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition cursor-pointer hover:bg-red-400"
                            >Регистрация</button>
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
    <footer class="p-6 bg-slate-100">
        <div class="text-center text-slate-500">
            Copyright © 2026 Behoor, Inc. Все права защищены
        </div>
    </footer>
    </body>
</template>

<style scoped></style>
