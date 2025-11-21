<template>
  <div class="fixed inset-y-0 right-0 w-96 bg-white dark:bg-gray-800 shadow-xl z-50 transform transition-transform">
    <div class="p-6 border-b border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Notifications</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>
    </div>
    
    <div class="overflow-y-auto h-full pb-20">
      <div v-if="notifications.length === 0" class="p-6 text-center">
        <BellIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p class="text-gray-500 dark:text-gray-400">No notifications yet</p>
      </div>
      
      <div v-else class="p-6 space-y-4">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
        >
          <div class="flex items-start space-x-3">
            <div :class="[
              'w-8 h-8 rounded-full flex items-center justify-center',
              notification.type === 'quote' ? 'bg-blue-100 dark:bg-blue-900' :
              notification.type === 'completion' ? 'bg-green-100 dark:bg-green-900' :
              'bg-yellow-100 dark:bg-yellow-900'
            ]">
              <ChatBubbleLeftRightIcon v-if="notification.type === 'quote'" class="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <CheckCircleIcon v-else-if="notification.type === 'completion'" class="w-4 h-4 text-green-600 dark:text-green-400" />
              <ExclamationTriangleIcon v-else class="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div class="flex-1">
              <p class="text-sm text-gray-900 dark:text-white">{{ notification.message }}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ notification.time }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  XMarkIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'

defineProps({
  notifications: {
    type: Array,
    default: () => []
  }
})

defineEmits(['close'])
</script>
