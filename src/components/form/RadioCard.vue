<script setup>
import { computed } from "vue";
const props = defineProps({
    labelText: { type: String },
    description: { type: String },
    value: { type: [String, Number, Boolean], required: true },
});
const model = defineModel({ required: true });

const isChecked = computed(() => model.value === props.value);
</script>
<template>
    <label
        class="flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition"
        :class="
      isChecked
        ? 'border-red-600 bg-red-50/40'
        : 'border-slate-200 hover:border-slate-300'
    "
    >
        <input
            type="radio"
            v-model="model"
            :value="value"
            class="mt-1 accent-red-600"
        />
        <div v-if="labelText || description">
            <div class="font-semibold text-slate-800">
                {{ labelText }}
            </div>
            <div class="text-sm text-slate-500">{{ description }}</div>
        </div>
    </label>
</template>
