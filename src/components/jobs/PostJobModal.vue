<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <div class="p-6 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Post a New Job</h2>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
        <!-- Job Title -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Job Title *
          </label>
          <input
            v-model="form.title"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
            placeholder="e.g., Kitchen Renovation, Plumbing Repair..."
          />
        </div>

        <!-- Category -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category *
          </label>
          <select
            v-model="form.category"
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select a category</option>
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical</option>
            <option value="carpentry">Carpentry</option>
            <option value="painting">Painting</option>
            <option value="tiling">Tiling</option>
            <option value="roofing">Roofing</option>
            <option value="landscaping">Landscaping</option>
            <option value="cleaning">Cleaning</option>
            <option value="other">Other</option>
          </select>
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Job Description *
          </label>
          <textarea
            v-model="form.description"
            rows="4"
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
            placeholder="Describe your project in detail..."
          ></textarea>
        </div>

        <!-- Location -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Location *
          </label>
          <input
            v-model="form.location"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
            placeholder="e.g., Nairobi, Karen"
          />
        </div>

        <!-- Budget -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Budget Type
            </label>
            <select
              v-model="form.budgetType"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
            >
              <option value="fixed">Fixed Price</option>
              <option value="hourly">Hourly Rate</option>
              <option value="negotiable">Negotiable</option>
            </select>
          </div>
          <div v-if="form.budgetType !== 'negotiable'">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Budget (KSh)
            </label>
            <input
              v-model="form.budget"
              type="number"
              min="0"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
              placeholder="Enter amount"
            />
          </div>
        </div>

        <!-- Timeline -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Expected Timeline
          </label>
          <select
            v-model="form.timeline"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white"
          >
            <option value="asap">ASAP</option>
            <option value="this_week">This Week</option>
            <option value="this_month">This Month</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>

        <!-- Preferred Contact Method -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Preferred Contact Method
          </label>
          <div class="space-y-2">
            <label class="flex items-center">
              <input
                v-model="form.contactMethods"
                type="checkbox"
                value="phone"
                class="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Phone Call</span>
            </label>
            <label class="flex items-center">
              <input
                v-model="form.contactMethods"
                type="checkbox"
                value="whatsapp"
                class="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">WhatsApp</span>
            </label>
            <label class="flex items-center">
              <input
                v-model="form.contactMethods"
                type="checkbox"
                value="app"
                class="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">In-App Messaging</span>
            </label>
          </div>
        </div>

        <!-- Submit Buttons -->
        <div class="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="px-6 py-2 bg-gradient-to-r from-primary to-red-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
          >
            {{ loading ? 'Posting...' : 'Post Job' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const emit = defineEmits(['close', 'submit'])

const loading = ref(false)

const form = reactive({
  title: '',
  category: '',
  description: '',
  location: '',
  budgetType: 'fixed',
  budget: '',
  timeline: 'flexible',
  contactMethods: ['app']
})

const handleSubmit = async () => {
  loading.value = true
  
  try {
    // Validate form
    if (!form.title || !form.category || !form.description || !form.location) {
      throw new Error('Please fill in all required fields')
    }

    // Emit the form data
    emit('submit', {
      ...form,
      id: Date.now(), // Temporary ID
      status: 'pending',
      createdAt: new Date(),
      quotesReceived: 0
    })
  } catch (error) {
    console.error('Error posting job:', error)
  } finally {
    loading.value = false
  }
}
</script>
