<script setup>
defineProps({
    labelText: { type: String },
    placeholder: { type: String },
    required: { type: Boolean, default: false },
    type: {
        type: String,
        required: true,
        default: "text",
        validator(value) {
            return ["email", "text", "password"].includes(value);
        },
    },
});
defineOptions({
    inheritAttrs: false,
});
const model = defineModel({ required: true });
</script>
<template>
    <div>
        <label
            v-if="labelText"
            class="block text-sm font-medium text-slate-700"
        >
            {{ labelText }}
        </label>
        <input
            v-model="model"
            :type="type"
            :placeholder="placeholder"
            class="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-800 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
            :required="required"
            v-bind="$attrs"
        />
    </div>
</template>
