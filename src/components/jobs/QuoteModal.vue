<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Send Quote</h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <XMarkIcon class="w-6 h-6" />
        </button>
      </div>

      <form @submit.prevent="submitQuote">
        <div class="space-y-6">
          <!-- Client Information -->
          <div>
            <h4 class="text-md font-medium text-gray-900 dark:text-white mb-3">Client Information</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Client Name
                </label>
                <input
                  v-model="form.clientName"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Client's full name"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contact Method
                </label>
                <select
                  v-model="form.contactMethod"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select method</option>
                  <option value="phone">Phone Call</option>
                  <option value="email">Email</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="sms">SMS</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  v-model="form.phoneNumber"
                  type="tel"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="+254 700 000 000"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  v-model="form.email"
                  type="email"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="client@email.com"
                />
              </div>
            </div>
          </div>

          <!-- Job Details -->
          <div>
            <h4 class="text-md font-medium text-gray-900 dark:text-white mb-3">Job Details</h4>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Service Type
                </label>
                <select
                  v-model="form.serviceType"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select service</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="electrical">Electrical</option>
                  <option value="carpentry">Carpentry</option>
                  <option value="painting">Painting</option>
                  <option value="tiling">Tiling</option>
                  <option value="roofing">Roofing</option>
                  <option value="masonry">Masonry</option>
                  <option value="welding">Welding</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="gardening">Gardening</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Job Description
                </label>
                <textarea
                  v-model="form.description"
                  rows="4"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                  placeholder="Detailed description of the work to be done..."
                ></textarea>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    v-model="form.location"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="City, area or specific address"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Urgency
                  </label>
                  <select
                    v-model="form.urgency"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="low">Low - Within a week</option>
                    <option value="medium">Medium - Within 3 days</option>
                    <option value="high">High - Within 24 hours</option>
                    <option value="urgent">Urgent - ASAP</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- Quote Details -->
          <div>
            <h4 class="text-md font-medium text-gray-900 dark:text-white mb-3">Quote Details</h4>
            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Pricing Type
                  </label>
                  <select
                    v-model="form.pricingType"
                    required
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select pricing</option>
                    <option value="fixed">Fixed Price</option>
                    <option value="hourly">Hourly Rate</option>
                    <option value="negotiable">Negotiable</option>
                  </select>
                </div>
                <div v-if="form.pricingType && form.pricingType !== 'negotiable'">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {{ form.pricingType === 'fixed' ? 'Total Amount (KSh)' : 'Hourly Rate (KSh)' }}
                  </label>
                  <input
                    v-model.number="form.amount"
                    type="number"
                    min="0"
                    step="100"
                    required
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                    :placeholder="form.pricingType === 'fixed' ? '15000' : '500'"
                  />
                </div>
              </div>

              <div v-if="form.pricingType === 'hourly'">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Estimated Hours
                </label>
                <input
                  v-model.number="form.estimatedHours"
                  type="number"
                  min="1"
                  step="0.5"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="8"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Estimated Timeline
                </label>
                <select
                  v-model="form.timeline"
                  required
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select timeline</option>
                  <option value="same_day">Same Day</option>
                  <option value="1-2_days">1-2 Days</option>
                  <option value="3-5_days">3-5 Days</option>
                  <option value="1_week">1 Week</option>
                  <option value="2_weeks">2 Weeks</option>
                  <option value="1_month">1 Month</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Additional Notes
                </label>
                <textarea
                  v-model="form.notes"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                  placeholder="Materials included, payment terms, warranty information, etc."
                ></textarea>
              </div>

              <!-- Quote Summary -->
              <div v-if="quoteSummary" class="bg-primary/10 p-4 rounded-lg">
                <h5 class="font-medium text-gray-900 dark:text-white mb-2">Quote Summary</h5>
                <div class="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  <p><strong>Service:</strong> {{ form.serviceType }}</p>
                  <p v-if="form.pricingType === 'fixed'"><strong>Total Cost:</strong> KSh {{ form.amount?.toLocaleString() }}</p>
                  <p v-if="form.pricingType === 'hourly'">
                    <strong>Rate:</strong> KSh {{ form.amount?.toLocaleString() }}/hour
                    <span v-if="form.estimatedHours"> (Est. Total: KSh {{ (form.amount * form.estimatedHours)?.toLocaleString() }})</span>
                  </p>
                  <p v-if="form.pricingType === 'negotiable'"><strong>Pricing:</strong> Negotiable</p>
                  <p><strong>Timeline:</strong> {{ form.timeline?.replace('_', ' ') }}</p>
                </div>
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
            Send Quote
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const emit = defineEmits(['close', 'submit'])

const form = ref({
  clientName: '',
  contactMethod: 'phone',
  phoneNumber: '',
  email: '',
  serviceType: '',
  description: '',
  location: '',
  urgency: 'medium',
  pricingType: '',
  amount: null,
  estimatedHours: null,
  timeline: '',
  notes: ''
})

const isFormValid = computed(() => {
  const basicRequirements = form.value.clientName && 
                            form.value.phoneNumber && 
                            form.value.serviceType && 
                            form.value.description && 
                            form.value.location && 
                            form.value.pricingType && 
                            form.value.timeline

  const pricingValid = form.value.pricingType === 'negotiable' || 
                       (form.value.pricingType && form.value.amount > 0)

  return basicRequirements && pricingValid
})

const quoteSummary = computed(() => {
  return form.value.serviceType && form.value.pricingType && form.value.timeline
})

const submitQuote = () => {
  if (!isFormValid.value) return
  
  emit('submit', {
    ...form.value,
    quotedAt: new Date(),
    id: Date.now() // Temporary ID generation
  })
  
  // Reset form
  form.value = {
    clientName: '',
    contactMethod: 'phone',
    phoneNumber: '',
    email: '',
    serviceType: '',
    description: '',
    location: '',
    urgency: 'medium',
    pricingType: '',
    amount: null,
    estimatedHours: null,
    timeline: '',
    notes: ''
  }
}
</script>
