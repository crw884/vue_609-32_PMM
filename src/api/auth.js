import { apiClient } from './http'

export const authApi = {
    login(email, password) {
        return apiClient.post('/auth', { email, password })
    },

    register(fullName, email, password) {
        return apiClient.post('/register', { fullName, email, password })
    },

    getMe() {
        return apiClient.get('/auth_me')
    }
}

