<template>
  <div class="fixed bottom-4 right-4 z-50">
    <button
      @click="openDebugPanel"
      class="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-colors"
      title="Open Debug Panel"
    >
      🔧
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const openDebugPanel = () => {
  router.push('/auth-debug')
}
</script>
