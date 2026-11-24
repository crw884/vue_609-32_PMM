import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { cartApi } from '@/api/cart'
import { useAuthStore } from './auth'

export const useCartStore = defineStore('cart', () => {
    const items = ref([])
    const serverId = ref(null) // ID документа корзины на сервере
    let isSyncing = false // Защита от параллельных запросов при старте

    const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
    const totalPrice = computed(() => items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0))
    const isEmpty = computed(() => items.value.length === 0)


    const saveToServer = async () => {
        const authStore = useAuthStore()
        if (!authStore.isAuthenticated) return

        if (serverId.value) {
            await cartApi.update(serverId.value, items.value)
        } else {
            const created = await cartApi.create(authStore.user.id, items.value)
            serverId.value = created.id
        }
    }

    const addToCart = async (product) => {
        const existing = items.value.find(item => item.id === product.id)
        if (existing) {
            existing.quantity++
        } else {
            items.value.push({ ...product, quantity: 1 })
        }
        await saveToServer()
    }

    const updateQuantity = async (id, delta) => {
        const item = items.value.find(i => i.id === id)
        if (!item) return

        item.quantity += delta
        if (item.quantity <= 0) {
            items.value = items.value.filter(i => i.id !== id)
        }
        await saveToServer()
    }

    const removeFromCart = async (id) => {
        items.value = items.value.filter(i => i.id !== id)
        await saveToServer()
    }

    const syncWithServer = async () => {
        const authStore = useAuthStore()
        if (!authStore.isAuthenticated || isSyncing) return

        isSyncing = true
        try {
            const serverCart = await cartApi.getByUser(authStore.user.id)

            if (serverCart) {
                serverId.value = serverCart.id
                const merged = [...serverCart.items || []]
                for (const localItem of items.value) {
                    if (!merged.some(s => s.id === localItem.id)) {
                        merged.push(localItem)
                    }
                }
                items.value = merged
                await cartApi.update(serverId.value, items.value)
            } else {
                // Если на сервере корзины еще не было - создаем ее из локальной
                const created = await cartApi.create(authStore.user.id, items.value)
                serverId.value = created.id
            }
        } finally {
            isSyncing = false
        }
    }

    const clearCart = async (syncServer = false) => {
        items.value = []
        if (syncServer) {
            await saveToServer()
        } else {
            serverId.value = null
        }
    }

    const isAdded = (id) => items.value.some(item => item.id === id)

    return {
        items,
        totalItems,
        totalPrice,
        isEmpty,
        addToCart,
        updateQuantity,
        removeFromCart,
        syncWithServer,
        clearCart,
        isAdded
    }
}, {
    persist: { paths: ['items'] }
})
