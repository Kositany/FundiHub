<template>
  <button
    :disabled="disabled || loading"
    :class="[
      baseClasses,
      sizeClasses,
      variantClasses,
      {
        'opacity-50 cursor-not-allowed': disabled,
        'cursor-wait': loading
      }
    ]"
    @click="handleClick"
  >
    <!-- Loading Spinner -->
    <div
      v-if="loading"
      class="flex items-center justify-center"
    >
      <svg class="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>{{ loadingText }}</span>
    </div>

    <!-- Normal Content -->
    <div v-else class="flex items-center justify-center">
      <component v-if="icon" :is="icon" :class="iconClasses" />
      <span v-if="$slots.default"><slot /></span>
      <span v-else-if="text">{{ text }}</span>
    </div>
  </button>
</template>

<script setup>
import { computed } from 'vue'

// Props
const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger', 'success', 'outline'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  },
  loading: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loadingText: {
    type: String,
    default: 'Loading...'
  },
  text: {
    type: String,
    default: ''
  },
  icon: {
    type: [String, Object],
    default: null
  },
  fullWidth: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['click'])

// Computed Classes
const baseClasses = computed(() => [
  'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    'w-full': props.fullWidth
  }
])

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-3 py-1.5 text-sm'
    case 'md':
      return 'px-4 py-2 text-sm'
    case 'lg':
      return 'px-6 py-3 text-base'
    case 'xl':
      return 'px-8 py-4 text-lg'
    default:
      return 'px-4 py-2 text-sm'
  }
})

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-primary text-white hover:bg-primary-dark focus:ring-primary shadow-sm hover:shadow-md'
    case 'secondary':
      return 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
    case 'danger':
      return 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-sm hover:shadow-md'
    case 'success':
      return 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 shadow-sm hover:shadow-md'
    case 'outline':
      return 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary bg-transparent'
    default:
      return 'bg-primary text-white hover:bg-primary-dark focus:ring-primary shadow-sm hover:shadow-md'
  }
})

const iconClasses = computed(() => {
  const baseIconClasses = 'flex-shrink-0'
  const sizeIconClasses = props.size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'
  const spacingClasses = (props.text || props.$slots.default) ? 'mr-2' : ''
  
  return `${baseIconClasses} ${sizeIconClasses} ${spacingClasses}`
})

// Methods
const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>
