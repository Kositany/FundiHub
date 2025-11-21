<template>
  <nav class="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md fixed w-full z-50 top-0 transition-all duration-300" :class="{ 'shadow-xl bg-white/98 dark:bg-gray-900/98': isScrolled }">
    <div class="container-custom">
      <div class="flex justify-between items-center py-4">
        <!-- Logo -->
        <div class="flex items-center space-x-2" ref="logo">
          <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110">
            <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
          </div>
          <span class="text-2xl font-bold text-gray-900 dark:text-white">FundiHub</span>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8" ref="navLinks">
          <a href="#how-it-works" class="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors relative group">
            How it Works
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#services" class="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors relative group">
            Services
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#testimonials" class="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors relative group">
            Testimonials
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a href="#contact" class="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors relative group">
            Contact
            <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
          </a>
          
          <!-- Dark Mode Toggle -->
          <button 
            @click="toggleDarkMode"
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
            :title="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <svg v-if="!isDarkMode" class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
            <svg v-else class="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
          </button>

          <router-link 
            to="/login" 
            class="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
          >
            Sign In
          </router-link>
          
          <router-link 
            to="/register" 
            class="btn-primary text-sm" 
            ref="ctaButton"
          >
            Get Started
          </router-link>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center space-x-3">
          <!-- Mobile Dark Mode Toggle -->
          <button 
            @click="toggleDarkMode"
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
          >
            <svg v-if="!isDarkMode" class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
            <svg v-else class="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
          </button>
          
          <button 
            class="p-2 text-gray-700 dark:text-gray-300"
            @click="toggleMobileMenu"
            aria-label="Toggle menu"
          >
            <svg class="w-6 h-6 transition-transform duration-300" :class="{ 'rotate-90': mobileMenuOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div 
        v-show="mobileMenuOpen" 
        class="md:hidden py-4 border-t border-gray-200 dark:border-gray-700"
        ref="mobileMenu"
      >
        <div class="flex flex-col space-y-4">
          <a href="#how-it-works" class="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors py-2" @click="closeMobileMenu">How it Works</a>
          <a href="#services" class="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors py-2" @click="closeMobileMenu">Services</a>
          <a href="#testimonials" class="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors py-2" @click="closeMobileMenu">Testimonials</a>
          <a href="#contact" class="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors py-2" @click="closeMobileMenu">Contact</a>
          <router-link to="/register" class="btn-primary w-full mt-4" @click="closeMobileMenu">Get Started</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useToast } from 'vue-toastification'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Composables
const router = useRouter()
const toast = useToast()

// Refs
const mobileMenuOpen = ref(false)
const isScrolled = ref(false)
const logo = ref(null)
const navLinks = ref(null)
const ctaButton = ref(null)
const mobileMenu = ref(null)

// Dark mode injection
const darkMode = inject('darkMode')
const isDarkMode = darkMode?.isDark
const toggleDarkMode = () => {
  try {
    if (darkMode?.toggleDark) {
      darkMode.toggleDark()
    } else {
      console.warn('Dark mode toggle function not available')
      toast.error('Dark mode toggle is not available')
    }
  } catch (error) {
    console.error('Error toggling dark mode:', error)
    toast.error('Failed to toggle dark mode')
  }
}

// Methods
const toggleMobileMenu = () => {
  try {
    mobileMenuOpen.value = !mobileMenuOpen.value
    
    if (mobileMenuOpen.value) {
      // Animate mobile menu opening
      gsap.fromTo(mobileMenu.value, 
        { opacity: 0, y: -20 }, 
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      )
    }
  } catch (error) {
    console.error('Error toggling mobile menu:', error)
  }
}

const closeMobileMenu = () => {
  try {
    mobileMenuOpen.value = false
  } catch (error) {
    console.error('Error closing mobile menu:', error)
  }
}

const handleScroll = () => {
  try {
    isScrolled.value = window.scrollY > 10
  } catch (error) {
    console.error('Error handling scroll:', error)
  }
}

// Lifecycle hooks
onMounted(() => {
  try {
    // Initial animations
    gsap.fromTo(logo.value, 
      { opacity: 0, x: -30 }, 
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
    )
    
    gsap.fromTo(navLinks.value?.children || [], 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.3, ease: "power2.out" }
    )
    
    gsap.fromTo(ctaButton.value, 
      { opacity: 0, scale: 0.8 }, 
      { opacity: 1, scale: 1, duration: 0.6, delay: 0.6, ease: "back.out(1.7)" }
    )

    window.addEventListener('scroll', handleScroll)
  } catch (error) {
    console.error('Error in navigation mount:', error)
  }
})

onUnmounted(() => {
  try {
    window.removeEventListener('scroll', handleScroll)
  } catch (error) {
    console.error('Error in navigation unmount:', error)
  }
})
</script>
