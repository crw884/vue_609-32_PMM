<script setup>
import VProduct from "@/components/VProduct.vue";
defineProps({
    items: Array,
})
</script>

<template>
    <div class="grid grid-cols-5 gap-5">
        <v-product
            v-for="item in items"
            :key="item.id"
            :imageUrl="item.imageUrl"
            :title="item.title"
            :price="item.price.toLocaleString('ru-RU')"
        ></v-product>
    </div>
</template>

<style scoped>

</style>
