<template>
  <section class="section-padding bg-white">
    <div class="container-custom">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Get an Instant Price Estimate</h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Get a rough idea of costs before posting your job. Our calculator uses real market data.
        </p>
      </div>

      <div class="max-w-4xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-8">
          <!-- Calculator Form -->
          <div class="bg-gray-50 rounded-2xl p-6 lg:p-8">
            <h3 class="text-2xl font-bold text-gray-900 mb-6">Service Details</h3>
            
            <!-- Service Type -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-gray-700 mb-2">Service Type</label>
              <select 
                v-model="selectedService" 
                @change="updateEstimate"
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select a service</option>
                <option v-for="service in services" :key="service.id" :value="service.id">
                  {{ service.name }}
                </option>
              </select>
            </div>

            <!-- Property Size -->
            <div class="mb-6" v-if="selectedService">
              <label class="block text-sm font-semibold text-gray-700 mb-2">Property Size</label>
              <div class="grid grid-cols-2 gap-3">
                <button 
                  v-for="size in propertySizes" 
                  :key="size.id"
                  @click="selectedSize = size.id; updateEstimate()"
                  class="p-3 border rounded-lg text-center transition-all"
                  :class="selectedSize === size.id ? 'border-primary bg-primary text-white' : 'border-gray-300 hover:border-primary'"
                >
                  <div class="font-semibold">{{ size.name }}</div>
                  <div class="text-sm opacity-75">{{ size.description }}</div>
                </button>
              </div>
            </div>

            <!-- Urgency -->
            <div class="mb-6" v-if="selectedService && selectedSize">
              <label class="block text-sm font-semibold text-gray-700 mb-2">When do you need this done?</label>
              <div class="space-y-2">
                <label v-for="urgency in urgencyOptions" :key="urgency.id" class="flex items-center">
                  <input 
                    type="radio" 
                    :value="urgency.id" 
                    v-model="selectedUrgency"
                    @change="updateEstimate"
                    class="mr-3 text-primary focus:ring-primary"
                  >
                  <span class="flex-1">{{ urgency.name }}</span>
                  <span class="text-sm text-gray-500">{{ urgency.multiplier }}x</span>
                </label>
              </div>
            </div>

            <!-- Additional Options -->
            <div class="mb-6" v-if="selectedService && selectedSize && selectedUrgency">
              <label class="block text-sm font-semibold text-gray-700 mb-2">Additional Requirements</label>
              <div class="space-y-2">
                <label v-for="addon in availableAddons" :key="addon.id" class="flex items-center">
                  <input 
                    type="checkbox" 
                    :value="addon.id"
                    v-model="selectedAddons"
                    @change="updateEstimate"
                    class="mr-3 text-primary focus:ring-primary"
                  >
                  <span class="flex-1">{{ addon.name }}</span>
                  <span class="text-sm text-gray-500">+KSh {{ addon.price }}</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Price Estimate -->
          <div class="lg:sticky lg:top-8">
            <div class="bg-primary rounded-2xl p-6 lg:p-8 text-white">
              <h3 class="text-2xl font-bold mb-6">Estimated Cost</h3>
              
              <div v-if="!selectedService" class="text-center py-8">
                <svg class="w-16 h-16 mx-auto mb-4 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"></path>
                </svg>
                <p class="opacity-75">Select service details to see estimate</p>
              </div>

              <div v-else>
                <!-- Price Breakdown -->
                <div class="space-y-4 mb-6">
                  <div class="flex justify-between">
                    <span>Base Service</span>
                    <span>KSh {{ basePrice.toLocaleString() }}</span>
                  </div>
                  <div v-if="sizeMultiplier > 1" class="flex justify-between">
                    <span>Size Adjustment</span>
                    <span>{{ sizeMultiplier }}x</span>
                  </div>
                  <div v-if="urgencyMultiplier > 1" class="flex justify-between">
                    <span>Urgency Fee</span>
                    <span>{{ urgencyMultiplier }}x</span>
                  </div>
                  <div v-if="addonPrice > 0" class="flex justify-between">
                    <span>Additional Services</span>
                    <span>KSh {{ addonPrice.toLocaleString() }}</span>
                  </div>
                </div>

                <div class="border-t border-white border-opacity-30 pt-4 mb-6">
                  <div class="flex justify-between items-center text-2xl font-bold">
                    <span>Total Estimate</span>
                    <span>KSh {{ totalEstimate.toLocaleString() }}</span>
                  </div>
                  <p class="text-sm opacity-75 mt-2">
                    Range: KSh {{ Math.floor(totalEstimate * 0.8).toLocaleString() }} - 
                    KSh {{ Math.floor(totalEstimate * 1.2).toLocaleString() }}
                  </p>
                </div>

                <button 
                  @click="postJob"
                  class="w-full bg-white text-primary font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Post This Job
                </button>

                <div class="text-center mt-4">
                  <p class="text-sm opacity-75">
                    💡 This is an estimate. Final prices may vary based on specific requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

// Composables
const router = useRouter()
const toast = useToast()

const selectedService = ref('')
const selectedSize = ref('')
const selectedUrgency = ref('')
const selectedAddons = ref([])

const services = ref([
  { id: 'plumbing', name: 'Plumbing Repairs', basePrice: 2500 },
  { id: 'electrical', name: 'Electrical Work', basePrice: 3000 },
  { id: 'painting', name: 'Painting', basePrice: 1500 },
  { id: 'carpentry', name: 'Carpentry', basePrice: 3500 },
  { id: 'cleaning', name: 'Deep Cleaning', basePrice: 2000 },
  { id: 'gardening', name: 'Gardening', basePrice: 1800 }
])

const propertySizes = ref([
  { id: 'small', name: 'Small', description: '1-2 rooms', multiplier: 1 },
  { id: 'medium', name: 'Medium', description: '3-4 rooms', multiplier: 1.5 },
  { id: 'large', name: 'Large', description: '5+ rooms', multiplier: 2.2 }
])

const urgencyOptions = ref([
  { id: 'flexible', name: 'Flexible (within 1 week)', multiplier: 1 },
  { id: 'normal', name: 'Normal (within 3 days)', multiplier: 1.1 },
  { id: 'urgent', name: 'Urgent (within 24 hours)', multiplier: 1.3 },
  { id: 'emergency', name: 'Emergency (within 4 hours)', multiplier: 1.6 }
])

const availableAddons = computed(() => {
  const serviceId = selectedService.value
  const addons = {
    plumbing: [
      { id: 'materials', name: 'Include materials', price: 1500 },
      { id: 'weekend', name: 'Weekend service', price: 800 }
    ],
    electrical: [
      { id: 'materials', name: 'Include materials', price: 2000 },
      { id: 'testing', name: 'Safety testing', price: 1200 }
    ],
    painting: [
      { id: 'materials', name: 'Include paint & materials', price: 3000 },
      { id: 'primer', name: 'Primer application', price: 800 }
    ],
    carpentry: [
      { id: 'materials', name: 'Include wood & materials', price: 4000 },
      { id: 'finishing', name: 'Premium finishing', price: 1500 }
    ],
    cleaning: [
      { id: 'supplies', name: 'Include cleaning supplies', price: 600 },
      { id: 'windows', name: 'Window cleaning', price: 1000 }
    ],
    gardening: [
      { id: 'tools', name: 'Include tools & equipment', price: 800 },
      { id: 'plants', name: 'New plants/seeds', price: 2500 }
    ]
  }
  return addons[serviceId] || []
})

const basePrice = computed(() => {
  const service = services.value.find(s => s.id === selectedService.value)
  return service ? service.basePrice : 0
})

const sizeMultiplier = computed(() => {
  const size = propertySizes.value.find(s => s.id === selectedSize.value)
  return size ? size.multiplier : 1
})

const urgencyMultiplier = computed(() => {
  const urgency = urgencyOptions.value.find(u => u.id === selectedUrgency.value)
  return urgency ? urgency.multiplier : 1
})

const addonPrice = computed(() => {
  return selectedAddons.value.reduce((total, addonId) => {
    const addon = availableAddons.value.find(a => a.id === addonId)
    return total + (addon ? addon.price : 0)
  }, 0)
})

const totalEstimate = computed(() => {
  return Math.floor((basePrice.value * sizeMultiplier.value * urgencyMultiplier.value) + addonPrice.value)
})

const updateEstimate = () => {
  // This function is called when any input changes
  // Could be used for analytics or real-time price updates
}

const postJob = async () => {
  try {
    if (!selectedService.value || !selectedSize.value || !selectedUrgency.value) {
      toast.warning('Please complete all service details to post this job')
      return
    }

    // In a real app, this would store the job details and redirect to registration/job posting
    const jobData = {
      service: selectedService.value,
      size: selectedSize.value,
      urgency: selectedUrgency.value,
      addons: selectedAddons.value,
      estimate: totalEstimate.value
    }
    
    console.log('Posting job with estimate:', jobData)
    toast.success(`Ready to post your ${services.value.find(s => s.id === selectedService.value)?.name} job for KSh ${totalEstimate.value.toLocaleString()}!`)
    
    // Navigate to registration with job data
    await router.push({
      path: '/auth/register',
      query: { 
        service: selectedService.value,
        estimate: totalEstimate.value 
      }
    })
  } catch (error) {
    console.error('Error posting job:', error)
    toast.error('Failed to post job. Please try again.')
  }
}
</script>
