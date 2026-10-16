import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
    const items = ref([])

    // Геттеры для общей суммы и количества
    const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))
    const totalPrice = computed(() => items.value.reduce((sum, item) => sum + (item.price * item.quantity), 0))

    // Действия
    const addToCart = (product) => {
        const existing = items.value.find(item => item.id === product.id)
        if (existing) {
            existing.quantity++
        } else {
            items.value.push({ ...product, quantity: 1 })
        }
    }

    const removeFromCart = (productId) => {
        items.value = items.value.filter(item => item.id !== productId)
    }

    const updateQuantity = (productId, amount) => {
        const item = items.value.find(item => item.id === productId)
        if (item) {
            item.quantity += amount
            if (item.quantity <= 0) {
                removeFromCart(productId)
            }
        }
    }

    const clearCart = () => {
        items.value = []
    }

    const isAdded = (productId) => {
        return items.value.some(p => p.id === productId)
    }

    return { items, totalItems, totalPrice, addToCart, removeFromCart, updateQuantity, clearCart, isAdded }
}, {
    persist: true
})
