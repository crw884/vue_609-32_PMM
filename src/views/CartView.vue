<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { useAuthStore } from "@/stores/auth";
import { useOrdersStore } from "@/stores/orders";
import CartProduct from "@/components/cards/CartProduct.vue";
import VInput from "@/components/form/VInput.vue";
import RadioCard from "@/components/form/RadioCard.vue";

const router = useRouter();
const cartStore = useCartStore();
const authStore = useAuthStore();
const ordersStore = useOrdersStore();

const deliveryMethod = ref("pickup");
const address = reactive({ city: "", street: "", apartment: "", comment: "" });
const validationError = ref("");
const isSubmitting = ref(false);

const validateForm = () => {
    validationError.value = "";
    if (deliveryMethod.value === "courier") {
        if (!address.city.trim() || !address.street.trim()) {
            validationError.value = "Пожалуйста, укажите город и улицу для доставки курьером";
            return false;
        }
    }
    return true;
};

const processOrderCreation = async () => {
    if (!validateForm()) return;
    isSubmitting.value = true;
    try {
        const deliveryDetails = {
            delivery: {
                method: deliveryMethod.value,
                methodLabel: deliveryMethod.value === "pickup" ? "Самовывоз из магазина" : "Доставка курьером",
                fullAddress:
                    deliveryMethod.value === "courier"
                        ? `${address.city}, ${address.street}${address.apartment ? ", кв. " + address.apartment : ""}${address.comment ? " (" + address.comment + ")" : ""}`
                        : "Пункт самовывоза",
            },
        };
        const createdOrder = await ordersStore.createOrder(deliveryDetails);
        cartStore.clearCart();
        router.push({ name: "orders" });
    } catch (err) {
        validationError.value = err.message;
    } finally {
        isSubmitting.value = false;
    }
};

const handleOrderClick = () => {
    if (!validateForm()) return;
    if (authStore.isAuthenticated) {
        processOrderCreation();
    } else {
        authStore.activeModal = "register";
    }
};
</script>

<template>
    <main class="pt-6 sm:pt-10">
        <h1 class="text-3xl sm:text-[40px] font-bold mb-5">Корзина</h1>
        <div v-if="cartStore.items.length === 0" class="flex flex-col items-start gap-3">
            <p class="text-slate-600">Корзина пуста 🛒</p>
            <RouterLink to="/" class="underline text-red-500 hover:text-red-600 transition">Перейти к покупкам</RouterLink>
        </div>
        <div v-else class="flex flex-col lg:flex-row gap-5 items-start">
            <div class="flex flex-col gap-4 sm:gap-5 w-full lg:flex-2">
                <cart-product v-for="item in cartStore.items" :key="item.id" :product="item" />
            </div>
            <div class="p-4 sm:p-5 bg-slate-100 rounded-3xl sm:rounded-4xl flex flex-col gap-4 w-full lg:flex-1 lg:sticky lg:top-5">
                <h2 class="text-lg font-bold text-slate-800">Способ получения</h2>
                <div class="grid grid-cols-1 gap-3 sm:gap-4">
                    <radio-card labelText="Самовывоз из магазина" description="Бесплатно, сегодня" v-model="deliveryMethod" value="pickup" />
                    <radio-card labelText="Доставка курьером" description="По указанному адресу" v-model="deliveryMethod" value="courier" />
                </div>
                <div v-if="deliveryMethod === 'courier'" class="space-y-4 border-t border-slate-200 pt-4">
                    <div class="grid grid-cols-1 gap-4">
                        <v-input labelText="Город" placeholder="Например, Сыктывкар" v-model="address.city" />
                        <v-input labelText="Улица и дом" placeholder="ул. Ленина, д. 10" v-model="address.street" />
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <v-input labelText="Квартира / Офис" placeholder="кв. 42" v-model="address.apartment" />
                        <v-input labelText="Комментарий курьеру" placeholder="Код домофона, подъезд" v-model="address.comment" />
                    </div>
                </div>
                <p v-if="validationError" class="text-xs text-red-600">{{ validationError }}</p>
                <button
                    @click="handleOrderClick"
                    :disabled="isSubmitting"
                    class="p-4 bg-red-500 rounded-2xl text-white font-medium cursor-pointer hover:bg-red-400 disabled:bg-red-200 transition"
                >
                    {{ isSubmitting ? "Оформление..." : "Оформить заказ" }}
                </button>
                <div class="flex justify-between items-end border-t border-slate-200 pt-4">
                    <div>
                        <h4 class="text-md font-bold">Итого:</h4>
                        <p class="text-sm text-slate-600">Товаров ({{ cartStore.totalItems }})</p>
                    </div>
                    <b class="text-xl">{{ cartStore.totalPrice.toLocaleString("ru-RU") }} ₽</b>
                </div>
            </div>
        </div>
    </main>
</template>
