<template>
  <section id="services" class="section-padding bg-gray-50">
    <div class="container-custom">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Popular Services</h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Find skilled professionals for all your home and business needs
        </p>
      </div>

      <!-- Categories Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div 
          v-for="(category, index) in categories" 
          :key="index"
          class="card p-6 text-center cursor-pointer group animate-scale-in"
          :style="{ animationDelay: `${index * 0.1}s` }"
          @click="selectCategory(category)"
        >
          <!-- Category Icon -->
          <div class="w-16 h-16 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-opacity-20 transition-all duration-300">
            <div v-html="category.icon" class="w-8 h-8 text-primary"></div>
          </div>

          <!-- Category Info -->
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ category.name }}</h3>
          <p class="text-sm text-gray-600 mb-4">{{ category.description }}</p>
          
          <!-- Stats -->
          <div class="text-xs text-gray-500">
            <span class="font-semibold">{{ category.providers }}+</span> providers
          </div>
        </div>
      </div>

      <!-- View All Button -->
      <div class="text-center mt-12">
        <button @click="handleViewAllServices" class="btn-secondary text-lg">
          View All Services
          <svg class="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

// Composables
const router = useRouter()
const toast = useToast()

const categories = ref([
  {
    name: 'Plumbing',
    description: 'Repairs, installations, and maintenance',
    providers: 85,
    icon: `<svg fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"></path>
    </svg>`
  },
  {
    name: 'Electrical',
    description: 'Wiring, installations, and repairs',
    providers: 72,
    icon: `<svg fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"></path>
    </svg>`
  },
  {
    name: 'Carpentry',
    description: 'Custom furniture and woodwork',
    providers: 95,
    icon: `<svg fill="currentColor" viewBox="0 0 20 20">
      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
    </svg>`
  },
  {
    name: 'Painting',
    description: 'Interior and exterior painting',
    providers: 68,
    icon: `<svg fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zM3 15a1 1 0 011-1h4a1 1 0 011 1v1a1 1 0 11-2 0v-1H5v1a1 1 0 11-2 0v-1z" clip-rule="evenodd"></path>
    </svg>`
  },
  {
    name: 'Cleaning',
    description: 'Professional cleaning services',
    providers: 120,
    icon: `<svg fill="currentColor" viewBox="0 0 20 20">
      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
    </svg>`
  },
  {
    name: 'Gardening',
    description: 'Landscaping and garden maintenance',
    providers: 54,
    icon: `<svg fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"></path>
    </svg>`
  },
  {
    name: 'HVAC',
    description: 'Heating and cooling systems',
    providers: 45,
    icon: `<svg fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path>
    </svg>`
  },
  {
    name: 'Security',
    description: 'Installation and maintenance',
    providers: 38,
    icon: `<svg fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
    </svg>`
  }
])

const selectCategory = async (category) => {
  try {
    console.log('Selected category:', category.name)
    toast.success(`Interested in ${category.name}? Let's find you the perfect fundi!`)
    
    // Navigate to registration with category preselected
    await router.push({
      path: '/auth/register',
      query: { 
        service: category.name.toLowerCase(),
        category: category.name 
      }
    })
  } catch (error) {
    console.error('Error selecting category:', error)
    toast.error('Failed to navigate to category. Please try again.')
  }
}

const handleViewAllServices = async () => {
  try {
    await router.push('/auth/register')
    toast.success('Ready to explore all our services?')
  } catch (error) {
    console.error('Error navigating to services:', error)
    toast.error('Failed to navigate to services page')
  }
}
</script>
