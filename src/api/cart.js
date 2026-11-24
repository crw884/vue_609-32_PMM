import { apiClient } from './http'

export const cartApi = {
    async getByUser(userId) {
        const data = await apiClient.get('/cart', { params: { userId } })
        return data[0] || null
    },

    create(userId, items) {
        return apiClient.post('/cart', { userId, items })
    },

    update(serverId, items) {
        return apiClient.patch(`/cart/${serverId}`, { items })
    }
}
