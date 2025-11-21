<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md mx-4">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Invite Team Member</h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>

      <form @submit.prevent="submitInvite">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="colleague@company.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Role
            </label>
            <select
              v-model="form.role"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="member">Team Member</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Department
            </label>
            <select
              v-model="form.department"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select department</option>
              <option value="operations">Operations</option>
              <option value="facilities">Facilities</option>
              <option value="it">Information Technology</option>
              <option value="hr">Human Resources</option>
              <option value="finance">Finance</option>
              <option value="general">General</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Message (Optional)
            </label>
            <textarea
              v-model="form.message"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
              placeholder="Welcome to our team! Looking forward to working with you."
            ></textarea>
          </div>

          <div class="bg-blue-50 dark:bg-blue-900 p-3 rounded-lg">
            <div class="flex items-start space-x-3">
              <InformationCircleIcon class="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div class="text-sm text-blue-700 dark:text-blue-300">
                <p class="font-medium">Team Member Permissions:</p>
                <ul class="mt-1 space-y-1 text-xs">
                  <li><strong>Admin:</strong> Full access including team management</li>
                  <li><strong>Manager:</strong> Project management and team oversight</li>
                  <li><strong>Member:</strong> View and update assigned projects</li>
                  <li><strong>Viewer:</strong> Read-only access to projects</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="flex space-x-3 mt-6">
          <button
            type="button"
            @click="$emit('close')"
            class="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="!isFormValid"
            class="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send Invitation
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { XMarkIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'

const emit = defineEmits(['close', 'submit'])

const form = ref({
  email: '',
  role: '',
  department: '',
  message: ''
})

const isFormValid = computed(() => {
  return form.value.email && form.value.role && form.value.department
})

const submitInvite = () => {
  if (!isFormValid.value) return
  
  emit('submit', {
    ...form.value,
    invitedAt: new Date()
  })
  
  // Reset form
  form.value = {
    email: '',
    role: '',
    department: '',
    message: ''
  }
}
</script>
