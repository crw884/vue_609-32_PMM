<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import BaseModal from "./BaseModal.vue";
import VInput from "../form/VInput.vue";

defineProps({ isOpen: Boolean });
const emit = defineEmits(["close", "switch-to-login"]);

const authStore = useAuthStore();

const fullName = ref("");
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
        await authStore.register(fullName.value, email.value, password.value);
        fullName.value = "";
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
            <h2 class="text-2xl font-bold text-slate-800">Создать аккаунт</h2>
            <p class="mt-1 text-sm text-slate-500">
                Заполните данные для быстрой регистрации
            </p>
        </div>
        <form
            @submit.prevent="onSubmit"
            class="space-y-4"
        >
            <v-input labelText="Имя" v-model="fullName" type="text" placeholder="Ваше Имя" required></v-input>
            <v-input labelText="Email" v-model="email" type="email" placeholder="user@test.com" required></v-input>
            <v-input labelText="Пароль" v-model="password" type="password" placeholder="Минимум 6 символов" minlength="6" required></v-input>
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
                {{ isLoading ? "Создание аккаунта..." : "Зарегистрироваться" }}
            </button>
        </form>
        <p class="mt-6 text-center text-sm text-slate-500">
            Уже есть аккаунт?
            <button
                type="button"
                @click="$emit('switch-to-login')"
                class="font-semibold text-red-500 hover:text-red-400 cursor-pointer hover:underline"
            >
                Войти
            </button>
        </p>
    </BaseModal>
</template>
