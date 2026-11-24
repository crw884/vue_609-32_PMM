<script setup>
import { onMounted, onUnmounted } from "vue";

const props = defineProps({
    isOpen: { type: Boolean, required: true },
});

const emit = defineEmits(["close"]);

const handleKeydown = (e) => {
    if (e.key === "Escape" && props.isOpen) {
        emit("close");
    }
};

onMounted(() => window.addEventListener("keydown", handleKeydown));
onUnmounted(() => window.removeEventListener("keydown", handleKeydown));
</script>

<template>
    <Teleport to="body">
        <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div
                v-if="isOpen"
                class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
                @click.self="$emit('close')"
            >
                <div
                    class="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
                >
                    <button
                        type="button"
                        @click="$emit('close')"
                        class="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                        aria-label="Закрыть окно"
                    >
                        <svg
                            class="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    <slot />
                </div>
            </div>
        </Transition>
    </Teleport>
</template>
