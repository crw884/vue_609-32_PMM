import { apiClient } from './http'

export const favoritesApi = {
    async getByUser(userId) {
        const data = await apiClient.get('/favorites', { params: { userId } })
        return data[0] || null
    },

    create(userId, items) {
        return apiClient.post('/favorites', { userId, items })
    },

    update(serverId, items) {
        return apiClient.patch(`/favorites/${serverId}`, { items })
    }
}
