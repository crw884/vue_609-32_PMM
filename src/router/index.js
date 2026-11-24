import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import CatalogView from '../views/CatalogView.vue'
import CartView from '../views/CartView.vue'
import FavoritesView from '../views/FavoritesView.vue'
import OrdersView from '../views/OrdersView.vue'

const routes = [
    {
        path: '/',
        name: 'catalog',
        component: CatalogView
    },
    {
        path: '/cart',
        name: 'cart',
        component: CartView
    },
    {
        path: '/favorites',
        name: 'favorites',
        component: FavoritesView
    },
    {
        path: '/orders',
        name: 'orders',
        component: OrdersView,
        meta: { requiresAuth: true }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return { name: 'catalog' }
    }
})

export default router
