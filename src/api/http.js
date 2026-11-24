// src/api/http.js
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

apiClient.interceptors.request.use((config) => {
    const authStore = useAuthStore()
    if (authStore.token) {
        config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
})

apiClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message = error.response?.data?.message || error.message || 'Ошибка соединения с сервером'
        return Promise.reject(new Error(message))
    }
)
