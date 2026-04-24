<template>
  <Teleport to="body">
    <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none" aria-live="polite">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto px-4 py-2.5 rounded-lg text-sm font-medium shadow-lg border"
          :class="{
            'bg-green-900/90 text-green-300 border-green-800': toast.type === 'success',
            'bg-red-900/90 text-red-300 border-red-800': toast.type === 'error',
            'bg-gray-800/90 text-gray-300 border-gray-700': toast.type === 'info',
          }"
        >
          {{ toast.message }}
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const { toasts } = useToast()
</script>

<style scoped>
.toast-enter-active {
  transition: all 0.3s ease;
}
.toast-leave-active {
  transition: all 0.2s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
