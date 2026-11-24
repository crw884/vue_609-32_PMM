<script setup>
import { onMounted, ref, computed, watch } from "vue";
import VProduct from "@/components/cards/VProduct.vue";
import SearchInput from "@/components/form/SearchInput.vue";
import SortSelect from "@/components/form/SortSelect.vue";
import ProductSkeletonLoader from "@/components/skeletons/ProductSkeletonLoader.vue";
import { itemsApi } from "@/api/items";
import { useFavoritesStore } from "@/stores/favorites";
import { useCartStore } from "@/stores/cart";

const showSkeletonLoader = ref(true);
const items = ref([]);
const favoritesStore = useFavoritesStore();
const cartStore = useCartStore();
const fetchItems = async () => {
    try {
        const data = await itemsApi.getAll();

        items.value = data.map((obj) => ({
            ...obj,
            isFavorite: favoritesStore.isFavorite(obj.id),
            isAdded: cartStore.items.some((item) => item.productId === obj.id),
        }));
    } catch (e) {
        console.error("Ошибка загрузки товаров:", e.message);
    }
};
onMounted(async () => {
    await fetchItems();
    showSkeletonLoader.value = false;
});

const searchQuery = ref("");
const sortOptions = [
    { value: "default", label: "По умолчанию" },
    { value: "price-asc", label: "Сначала дешевые" },
    { value: "price-desc", label: "Сначала дорогие" },
    { value: "name-asc", label: "Название (А-Я)" },
    { value: "name-desc", label: "Название (Я-А)" },
];

const sortBy = ref(localStorage.getItem("shop_sort_by") || "default");

watch(sortBy, (newValue) => {
    localStorage.setItem("shop_sort_by", newValue);
});

const filteredProducts = computed(() => {
    let result = [...items.value];
    console.log(searchQuery.value);

    if (searchQuery.value.trim() !== "") {
        const query = searchQuery.value.toLowerCase();
        result = result.filter((product) =>
            product.title.toLowerCase().includes(query),
        );
    }

    if (sortBy.value === "price-asc") {
        result.sort((a, b) => a.price - b.price);
    } else if (sortBy.value === "price-desc") {
        result.sort((a, b) => b.price - a.price);
    } else if (sortBy.value === "name-asc") {
        result.sort((a, b) =>
            a.title.localeCompare(b.title, ["ru", "en"], {
                sensitivity: "base",
            }),
        );
    } else if (sortBy.value === "name-desc") {
        result.sort((a, b) =>
            b.title.localeCompare(a.title, ["ru", "en"], {
                sensitivity: "base",
            }),
        );
    }

    return result;
});
</script>

<template>
    <main class="pt-10">
        <div class="flex justify-between">
            <h1 class="text-[40px] font-bold mb-5">Каталог</h1>
            <div class="flex items-center gap-3 mb-4">
                <search-input
                    v-model="searchQuery"
                    placeholder="Поиск по названию..."
                />
                <sort-select
                    v-model="sortBy"
                    :options="sortOptions"
                />
            </div>
        </div>
        <div class="grid grid-cols-5 gap-5">
            <template v-if="showSkeletonLoader">
                <product-skeleton-loader
                    v-for="value in 10"
                    :key="value"
                />
            </template>
            <template v-else>
                <v-product
                    v-for="item in filteredProducts"
                    :key="item.id"
                    :product="item"
                ></v-product>
                <p v-if="filteredProducts.length === 0">Товары не найдены</p>
            </template>
        </div>
    </main>
</template>
