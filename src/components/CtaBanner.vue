<template>
  <section class="bg-primary section-padding text-white">
    <div class="container-custom text-center">
      <!-- CTA Content -->
      <div class="max-w-4xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Ready to get started?
        </h2>
        <p class="text-xl md:text-2xl mb-12 opacity-90 leading-relaxed">
          Join thousands of satisfied customers who found their perfect fundi on FundiHub. 
          <span class="font-semibold">It's free to get started!</span>
        </p>
        
        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            @click="handleJoinFundiHub" 
            class="bg-white text-primary hover:bg-gray-100 font-semibold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-lg"
          >
            Join FundiHub Today!
            <svg class="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </button>
          <button 
            @click="handleLearnMore" 
            class="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold py-4 px-10 rounded-full transition-all duration-300 w-full sm:w-auto text-lg"
          >
            Learn More
          </button>
        </div>

        <!-- Trust Indicators -->
        <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 opacity-80">
          <div class="flex items-center justify-center space-x-3">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-lg font-semibold">100% Verified Fundis</span>
          </div>
          <div class="flex items-center justify-center space-x-3">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"></path>
            </svg>
            <span class="text-lg font-semibold">Secure Payments</span>
          </div>
          <div class="flex items-center justify-center space-x-3">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-lg font-semibold">24/7 Support</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

// Composables
const router = useRouter()
const toast = useToast()

// Button handlers
const handleJoinFundiHub = async () => {
  try {
    await router.push('/auth/register')
    toast.success('Welcome to FundiHub registration!')
  } catch (error) {
    console.error('Error navigating to register:', error)
    toast.error('Failed to navigate to registration page')
  }
}

const handleLearnMore = () => {
  try {
    // Smooth scroll to how it works section
    const howItWorksSection = document.querySelector('#how-it-works')
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
      toast.info('Learn more about how FundiHub works!')
    } else {
      // Fallback: scroll to top if section not found
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  } catch (error) {
    console.error('Error scrolling to section:', error)
    toast.error('Failed to navigate to learn more section')
  }
}
</script>
