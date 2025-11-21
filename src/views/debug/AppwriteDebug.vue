<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Appwrite Connection Debugger
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          Test your Appwrite connection and debug authentication issues
        </p>
        <router-link to="/" class="text-primary hover:text-primary-dark text-sm">
          ← Back to Home
        </router-link>
      </div>

      <AppwriteTest />
    </div>
  </div>
</template>

<script setup>
import AppwriteTest from '@/components/debug/AppwriteTest.vue'
</script>
