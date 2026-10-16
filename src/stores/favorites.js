import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
    const items = ref([])

    // Добавить или удалить из избранного (toggle)
    const toggleFavorite = (product) => {
        const index = items.value.findIndex(p => p.id === product.id)
        if (index === -1) {
            items.value.push(product)
        } else {
            items.value.splice(index, 1)
        }
    }

    const isFavorite = (productId) => {
        return items.value.some(p => p.id === productId)
    }

    return { items, toggleFavorite, isFavorite }
}, {
    persist: true
})
