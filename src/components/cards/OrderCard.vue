<script setup>
defineProps({
    order: Object,
});
</script>
<template>
    <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div class="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-4 border-b border-slate-100 bg-slate-50/70 px-4 py-4 sm:px-6">
            <div class="flex flex-wrap items-center gap-4">
        <span class="text-lg font-bold text-slate-900">
          Заказ N{{ order.id }}
        </span>
                <span
                    class="rounded-full bg-red-100 px-3 py-0.5 text-xs font-semibold text-red-700"
                >
          {{ order.orderData.status }}
        </span>
            </div>
            <div class="text-sm text-slate-500">
                от {{ order.orderData.createdAt }}
            </div>
        </div>

        <div class="border-b border-slate-100 px-4 py-3 text-sm text-slate-600 sm:px-6">
      <span class="font-medium text-slate-800">
        {{ order.orderData.delivery?.methodLabel }}:
      </span>
            {{ order.orderData.delivery?.fullAddress }}
        </div>

        <div class="divide-y divide-slate-100 px-4 sm:px-6">
            <div
                v-for="item in order.orderData.items"
                :key="item.id"
                class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3.5"
            >
                <div class="flex items-center gap-3.5">
                    <img
                        :src="item.imageUrl"
                        :alt="item.title"
                        class="h-12 w-12 rounded-lg bg-slate-50 object-contain p-1"
                    />
                    <div>
                        <p class="font-medium text-slate-800">
                            {{ item.title }}
                        </p>
                        <p class="text-xs text-slate-500">
                            {{ item.quantity }} шт. x
                            {{ item.price.toLocaleString("ru-RU") }} ₽
                        </p>
                    </div>
                </div>
                <div class="font-semibold text-slate-900">
                    {{ (item.price * item.quantity).toLocaleString("ru-RU") }} ₽
                </div>
            </div>
        </div>
        <div class="flex items-center justify-between bg-slate-50/50 px-4 py-4 sm:px-6">
            <span class="text-sm font-medium text-slate-600">Итого</span>
            <span class="text-lg font-bold text-red-600">
        {{ order.orderData.totalPrice?.toLocaleString("ru-RU") }} ₽
      </span>
        </div>
    </div>
</template>
