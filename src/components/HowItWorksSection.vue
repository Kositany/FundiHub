<template>
  <section id="how-it-works" class="section-padding bg-white">
    <div class="container-custom">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">How It Works</h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Get the help you need in three simple steps
        </p>
      </div>

      <!-- Steps Grid -->
      <div class="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div 
          v-for="(step, index) in steps" 
          :key="index"
          class="text-center group animate-slide-up"
          :style="{ animationDelay: `${index * 0.2}s` }"
        >
          <!-- Step Icon -->
          <div class="relative mb-8">
            <div class="w-20 h-20 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto group-hover:bg-opacity-20 transition-all duration-300">
              <div v-html="step.icon" class="w-10 h-10 text-primary"></div>
            </div>
            <!-- Step Number -->
            <div class="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
              {{ index + 1 }}
            </div>
          </div>

          <!-- Step Content -->
          <h3 class="text-2xl font-bold text-gray-900 mb-4">{{ step.title }}</h3>
          <p class="text-gray-600 leading-relaxed">{{ step.description }}</p>
        </div>
      </div>

      <!-- Process Flow Arrows (Desktop) -->
      <div class="hidden md:flex justify-center items-center mt-12 space-x-8">
        <div class="flex items-center space-x-4">
          <div class="text-primary">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </div>
          <div class="text-primary">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center mt-16">
        <button @click="handleStartProject" class="btn-primary text-lg">
          Start Your Project
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

const steps = ref([
  {
    title: 'Post Your Job',
    description: 'Describe your project in detail. Upload photos and specify your requirements, timeline, and budget.',
    icon: `<svg fill="currentColor" viewBox="0 0 20 20">
      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
      <path fill-rule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h4a2 2 0 002-2V3a2 2 0 012 2v6.5a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 014 11.5V5z" clip-rule="evenodd"></path>
    </svg>`
  },
  {
    title: 'Compare Quotes',
    description: 'Receive instant quotes from verified fundis. Compare prices, ratings, and reviews to make the best choice.',
    icon: `<svg fill="currentColor" viewBox="0 0 20 20">
      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
    </svg>`
  },
  {
    title: 'Hire a Trusted Fundi',
    description: 'Select your preferred professional and get started. Track progress and make secure payments through our platform.',
    icon: `<svg fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
    </svg>`
  }
])

// Button handlers
const handleStartProject = async () => {
  try {
    await router.push('/auth/register')
    toast.success('Ready to start your project? Create your account!')
  } catch (error) {
    console.error('Error navigating to register:', error)
    toast.error('Failed to navigate to registration page')
  }
}
</script>
