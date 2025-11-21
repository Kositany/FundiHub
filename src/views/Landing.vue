<template>
  <div class="landing-page">
    <!-- Parallax Background Elements -->
    <div class="parallax-bg fixed inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900 -z-10"></div>
    <div class="parallax-bg fixed inset-0 bg-gradient-to-tl from-transparent via-blue-100/20 to-purple-100/20 dark:from-transparent dark:via-blue-900/20 dark:to-purple-900/20 -z-10"></div>
    
    <!-- Interactive Particle System -->
    <ParticleSystem 
      :particle-count="80" 
      :colors="['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe']"
      :interactive="true"
    />
    
    <!-- Landing Page Content -->
    <Navigation class="navbar" />
    <EmergencyBanner />
    
    <!-- Hero Section with Award-winning Animations -->
    <section class="hero-section relative overflow-hidden min-h-screen flex items-center">
      <div class="container-custom relative z-10">
        <div class="text-center">
          <h1 class="hero-title text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span class="reveal-text neon-glow">Find trusted fundis,</span><br>
            <span class="reveal-text gradient-text">get instant quotes</span>
          </h1>
          
          <p class="hero-subtitle text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            <span class="reveal-text">Connect with verified professionals for all your home and business needs.</span>
            <span class="reveal-text font-semibold text-gray-800 dark:text-gray-200">Affordable, reliable, and fast.</span>
          </p>
          
          <div class="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button class="magnetic-btn ripple-btn bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-full text-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              Get Started Now
              <svg class="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </button>
            <button class="magnetic-btn border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-bold py-4 px-8 rounded-full text-lg transform transition-all duration-300 hover:bg-blue-600 hover:text-white">
              Watch Demo
            </button>
          </div>
        </div>
      </div>
      
      <!-- Animated Background Elements -->
      <div class="floating-element absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full"></div>
      <div class="floating-element absolute top-40 right-20 w-16 h-16 bg-purple-500/10 rounded-full" style="animation-delay: 1s;"></div>
      <div class="floating-element absolute bottom-40 left-20 w-24 h-24 bg-pink-500/10 rounded-full" style="animation-delay: 2s;"></div>
    </section>
    
    <!-- Statistics Section with Counter Animation -->
    <section class="stats-section py-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <div class="container-custom">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center feature-card">
            <div class="stat-number text-4xl font-bold text-blue-600 mb-2" data-value="1500">0</div>
            <div class="text-gray-600 dark:text-gray-400">Verified Fundis</div>
          </div>
          <div class="text-center feature-card">
            <div class="stat-number text-4xl font-bold text-purple-600 mb-2" data-value="5000">0</div>
            <div class="text-gray-600 dark:text-gray-400">Jobs Completed</div>
          </div>
          <div class="text-center feature-card">
            <div class="text-4xl font-bold text-green-600 mb-2">4.9★</div>
            <div class="text-gray-600 dark:text-gray-400">Average Rating</div>
          </div>
          <div class="text-center feature-card">
            <div class="text-4xl font-bold text-red-600 mb-2">24/7</div>
            <div class="text-gray-600 dark:text-gray-400">Support</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Appwrite Test Component (development only) -->
    <section class="py-12 bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm" v-if="isDevelopment">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white reveal-text">Appwrite Integration Test</h2>
          <p class="text-gray-600 dark:text-gray-400 reveal-text">Testing backend connection</p>
        </div>
        <div class="flex justify-center">
          <AppwriteTest />
        </div>
      </div>
    </section>
    
    <!-- Enhanced Sections with Animation Classes -->
    <LiveStatsSection class="features-section" />
    <HowItWorksSection class="services-grid" />
    <PriceCalculator class="tilt-card" />
    <CategoriesSection />
    <TestimonialsSection class="testimonials-section" />
    <FaqSection />
    <CtaBanner class="magnetic-btn" />
    <Footer />
    <FloatingActionButton class="pulse" />
    
    <!-- Interactive Scroll Progress -->
    <ScrollProgress :threshold="5" :smooth-scroll="true" />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, computed } from 'vue'

// Import existing landing page components
import Navigation from '@/components/Navigation.vue'
import EmergencyBanner from '@/components/EmergencyBanner.vue'
import LiveStatsSection from '@/components/LiveStatsSection.vue'
import HowItWorksSection from '@/components/HowItWorksSection.vue'
import PriceCalculator from '@/components/PriceCalculator.vue'
import CategoriesSection from '@/components/CategoriesSection.vue'
import TestimonialsSection from '@/components/TestimonialsSection.vue'
import FaqSection from '@/components/FaqSection.vue'
import CtaBanner from '@/components/CtaBanner.vue'
import Footer from '@/components/Footer.vue'
import FloatingActionButton from '@/components/FloatingActionButton.vue'
import AppwriteTest from '@/components/AppwriteTest.vue'
import ParticleSystem from '@/components/ParticleSystem.vue'
import ScrollProgress from '@/components/ScrollProgress.vue'

// Import advanced animations
import { 
  initializeScrollAnimations,
  initializeHoverAnimations,
  refreshScrollTrigger,
  killAllAnimations
} from '@/utils/animations'

// Check if we're in development mode
const isDevelopment = computed(() => import.meta.env.DEV)

// Create floating particles
function createFloatingParticles() {
  // Particle system is now handled by ParticleSystem component
  console.log('✨ Using ParticleSystem component for interactive particles')
}

onMounted(() => {
  console.log('🎬 Initializing award-winning landing page animations...')
  
  // Create floating particles
  createFloatingParticles()
  
  // Initialize scroll-triggered animations with a slight delay to ensure DOM is ready
  setTimeout(() => {
    initializeScrollAnimations()
    initializeHoverAnimations()
    refreshScrollTrigger()
  }, 100)

  console.log('✨ Landing page animations ready!')
})

onUnmounted(() => {
  // Clean up animations when component is destroyed
  killAllAnimations()
})
</script>

<style scoped>
.landing-page {
  width: 100%;
  overflow-x: hidden;
  position: relative;
}

/* Enhanced gradient text */
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Enhanced hero section */
.hero-section {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  position: relative;
}

/* Custom neon glow for hero title */
.neon-glow {
  text-shadow: 
    0 0 10px rgba(102, 126, 234, 0.5),
    0 0 20px rgba(102, 126, 234, 0.3),
    0 0 30px rgba(102, 126, 234, 0.2);
}

/* Floating particles container */
.floating-particles {
  pointer-events: none;
  overflow: hidden;
}

/* Custom magnetic button enhancements */
.magnetic-btn {
  position: relative;
  overflow: hidden;
}

.magnetic-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s;
}

.magnetic-btn:hover::before {
  left: 100%;
}

/* Stats section enhancement */
.stats-section {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* Backdrop blur support */
.backdrop-blur-sm {
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem !important;
  }
  
  .floating-element {
    display: none;
  }
  
  .neon-glow {
    text-shadow: none;
  }
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  .hero-section {
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
  }
}
</style>
