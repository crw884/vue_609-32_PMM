<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import BaseModal from "./BaseModal.vue";
import VInput from "../form/VInput.vue";

defineProps({ isOpen: Boolean });
const emit = defineEmits(["close", "switch-to-register"]);

const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const error = ref("");
const isLoading = ref(false);

const handleClose = () => {
    error.value = "";
    emit("close");
};

const onSubmit = async () => {
    isLoading.value = true;
    error.value = "";
    try {
        await authStore.login(email.value, password.value);
        email.value = "";
        password.value = "";
        handleClose();
    } catch (err) {
        error.value = err.message;
    } finally {
        isLoading.value = false;
    }
};
</script>
<template>
    <BaseModal
        :isOpen="isOpen"
        @close="handleClose"
    >
        <div class="mb-6 text-center">
            <h2 class="text-2xl font-bold text-slate-800">С возвращением</h2>
            <p class="mt-1 text-sm text-slate-500">
                Войдите в свой аккаунт для продолжения
            </p>
        </div>
        <form
            @submit.prevent="onSubmit"
            class="space-y-4"
        >
            <v-input labelText="Email" v-model="email" type="email" required placeholder="user@test.com"></v-input>
            <v-input labelText="Пароль" v-model="password" type="password" required placeholder="********"></v-input>
            <div
                v-if="error"
                class="rounded-lg bg-red-50 p-3 text-sm text-red-600"
            >
                {{ error }}
            </div>
            <button
                type="submit"
                :disabled="isLoading"
                class="w-full rounded-xl bg-red-500 py-3 font-semibold text-white shadow-sm transition cursor-pointer hover:bg-red-400 disabled:cursor-not-allowed disabled:bg-red-400"
            >
                {{ isLoading ? "Вход..." : "Войти" }}
            </button>
        </form>
        <p class="mt-6 text-center text-sm text-slate-500">
            Нет аккаунта?
            <button
                type="button"
                @click="$emit('switch-to-register')"
                class="font-semibold text-red-500 cursor-pointer hover:text-red-400 hover:underline"
            >
                Зарегистрироваться
            </button>
        </p>
    </BaseModal>
</template>
