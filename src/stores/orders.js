import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ordersApi } from '@/api/orders'
import { useAuthStore } from './auth'
import { useCartStore } from './cart'

export const useOrdersStore = defineStore('orders', () => {
    const orders = ref([])
    const isLoading = ref(false)

    const fetchOrders = async () => {
        const authStore = useAuthStore()
        if (!authStore.isAuthenticated) return

        isLoading.value = true
        try {
            orders.value = await ordersApi.getByUser(authStore.user.id)
        } finally {
            isLoading.value = false
        }
    }

    const createOrder = async (data) => {
        const authStore = useAuthStore()
        const cartStore = useCartStore()

        if (!authStore.isAuthenticated) {
            throw new Error('Для оформления заказа необходимо войти в аккаунт')
        }

        const payload = {
            customerName: authStore.user.fullName,
            items: cartStore.items,
            totalPrice: cartStore.totalPrice,
            createdAt: new Date().toLocaleDateString('ru-RU'),
            status: 'В обработке',
            ...data,
        }

        const createdOrder = await ordersApi.create(authStore.user.id, payload)
        orders.value.unshift(createdOrder)

        // Очищаем корзину и локально, и на сервере
        await cartStore.clearCart(true)
    }

    return { orders, isLoading, fetchOrders, createOrder }
})
