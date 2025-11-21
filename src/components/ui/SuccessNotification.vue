<template>
  <Transition
    name="success-notification"
    enter-active-class="duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-2"
  >
    <div
      v-if="show"
      class="fixed top-4 right-4 z-50 max-w-sm w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg border-l-4 border-green-500"
    >
      <div class="p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <!-- Success Icon -->
            <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-3 w-0 flex-1">
            <p class="text-sm font-medium text-gray-900 dark:text-white">
              {{ title }}
            </p>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">
              {{ message }}
            </p>
          </div>
          <div class="ml-4 flex-shrink-0 flex">
            <button
              @click="close"
              class="bg-white dark:bg-gray-800 rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <span class="sr-only">Close</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Account Created Successfully!'
  },
  message: {
    type: String,
    default: 'Your account has been created and you are now logged in. Welcome to FundiHub!'
  },
  duration: {
    type: Number,
    default: 5000
  },
  autoClose: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['close'])

const show = ref(false)

const close = () => {
  show.value = false
  emit('close')
}

onMounted(() => {
  show.value = true
  
  if (props.autoClose) {
    setTimeout(() => {
      close()
    }, props.duration)
  }
})
</script>

<style scoped>
.success-notification-enter-active,
.success-notification-leave-active {
  transition: all 0.3s ease;
}

.success-notification-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.success-notification-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
