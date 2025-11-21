import { ref } from 'vue'

// Global notification state
const notifications = ref([])

export const useNotifications = () => {
  const showNotification = (notification) => {
    const id = Date.now()
    const newNotification = {
      id,
      type: 'success',
      title: 'Success',
      message: '',
      duration: 5000,
      autoClose: true,
      ...notification
    }
    
    notifications.value.push(newNotification)
    
    if (newNotification.autoClose) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.duration)
    }
    
    return id
  }
  
  const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }
  
  const clearAll = () => {
    notifications.value = []
  }
  
  // Convenience methods for different types
  const showSuccess = (title, message, options = {}) => {
    return showNotification({
      type: 'success',
      title,
      message,
      ...options
    })
  }
  
  const showError = (title, message, options = {}) => {
    return showNotification({
      type: 'error',
      title,
      message,
      autoClose: false,
      ...options
    })
  }
  
  const showWarning = (title, message, options = {}) => {
    return showNotification({
      type: 'warning',
      title,
      message,
      ...options
    })
  }
  
  const showInfo = (title, message, options = {}) => {
    return showNotification({
      type: 'info',
      title,
      message,
      ...options
    })
  }
  
  return {
    notifications,
    showNotification,
    removeNotification,
    clearAll,
    showSuccess,
    showError,
    showWarning,
    showInfo
  }
}
