import { apiClient } from './http'

export const itemsApi = {
    getAll(params = {}) {
        return apiClient.get('/items', { params })
    }
}
