import { ref } from 'vue'
import { useToast } from 'vue-toastification'

/**
 * Composable for managing button states and error handling
 */
export function useButtonState() {
  const loading = ref(false)
  const toast = useToast()

  /**
   * Wrapper for async button actions with loading states and error handling
   * @param {Function} action - The async action to execute
   * @param {Object} options - Configuration options
   * @param {string} options.loadingText - Text to show while loading
   * @param {string} options.successText - Text to show on success
   * @param {string} options.errorText - Text to show on error
   * @param {boolean} options.showToast - Whether to show toast notifications
   */
  const executeAction = async (action, options = {}) => {
    const {
      loadingText = 'Processing...',
      successText = 'Action completed successfully',
      errorText = 'Action failed',
      showToast = true
    } = options

    loading.value = true
    
    try {
      const result = await action()
      
      if (showToast && successText) {
        toast.success(successText)
      }
      
      return result
    } catch (error) {
      console.error('Button action failed:', error)
      
      if (showToast) {
        const message = error.message || errorText
        toast.error(message)
      }
      
      throw error
    } finally {
      loading.value = false
    }
  }

  /**
   * Wrapper for navigation actions with error handling
   * @param {Function} navigateAction - The navigation action (e.g., router.push)
   * @param {string} errorMessage - Custom error message
   */
  const executeNavigation = async (navigateAction, errorMessage = 'Navigation failed') => {
    try {
      await navigateAction()
    } catch (error) {
      console.error('Navigation error:', error)
      toast.error(errorMessage)
    }
  }

  /**
   * Safe form submission handler
   * @param {Function} submitAction - The form submission action
   * @param {Object} options - Configuration options
   */
  const executeFormSubmit = async (submitAction, options = {}) => {
    const {
      successText = 'Form submitted successfully',
      errorText = 'Form submission failed'
    } = options

    return executeAction(submitAction, {
      successText,
      errorText,
      showToast: true
    })
  }

  return {
    loading,
    executeAction,
    executeNavigation,
    executeFormSubmit
  }
}

/**
 * Debounce utility for button clicks
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 */
export function debounce(func, delay = 300) {
  let timeoutId
  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(this, args), delay)
  }
}

/**
 * Throttle utility for button clicks
 * @param {Function} func - Function to throttle
 * @param {number} limit - Limit in milliseconds
 */
export function throttle(func, limit = 1000) {
  let inThrottle
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}
