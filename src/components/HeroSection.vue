<template>
  <section class="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 pt-16 pb-16 md:pt-20 md:pb-24 transition-colors duration-300">
    <div class="container-custom">
      <div class="text-center">
        <!-- Main Headline -->
        <h1 ref="headline" class="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          Find trusted fundis,<br>
          <span class="text-primary gradient-text">get instant quotes</span>
        </h1>
        
        <!-- Subtext -->
        <p ref="subtext" class="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Connect with verified professionals for all your home and business needs. 
          <span class="font-semibold text-gray-800 dark:text-gray-200">Affordable, reliable, and fast.</span>
        </p>
        
        <!-- CTA Buttons -->
        <div ref="ctaButtons" class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            @click="handleGetStarted"
            class="btn-primary w-full sm:w-auto text-lg hover-lift pulse-cta"
          >
            Get Started
            <svg class="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
          </button>
          <button 
            @click="handleHowItWorks"
            class="btn-secondary w-full sm:w-auto text-lg hover-lift"
          >
            How it Works
          </button>
        </div>
        
        <!-- Trust Indicators -->
        <div ref="trustIndicators" class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-70">
          <div class="text-center animate-on-scroll">
            <div class="text-3xl font-bold text-primary counter" data-target="500">0</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Verified Fundis</div>
          </div>
          <div class="text-center animate-on-scroll">
            <div class="text-3xl font-bold text-primary counter" data-target="1000">0</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Jobs Completed</div>
          </div>
          <div class="text-center animate-on-scroll">
            <div class="text-3xl font-bold text-primary">4.8★</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
          </div>
          <div class="text-center animate-on-scroll">
            <div class="text-3xl font-bold text-primary">24/7</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Support</div>
          </div>
        </div>
      </div>
      
      <!-- Hero Image/Illustration -->
      <div ref="heroImage" class="mt-16">
        <div class="bg-gray-100 dark:bg-gray-800 rounded-2xl h-64 md:h-96 flex items-center justify-center relative overflow-hidden transition-colors duration-300">
          <!-- Placeholder for hero image -->
          <div class="text-center text-gray-400 dark:text-gray-500">
            <svg class="w-24 h-24 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
            <p class="text-lg">Professional Services at Your Fingertips</p>
          </div>
          
          <!-- Floating cards for visual interest -->
          <div ref="floatingCard1" class="absolute top-4 left-4 bg-white dark:bg-gray-700 p-2 rounded-lg shadow-lg text-xs backdrop-blur-sm">
            <div class="flex items-center space-x-2">
              <div class="w-6 h-6 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                <svg class="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <span class="text-primary font-semibold">Electrician</span>
            </div>
          </div>
          
          <div ref="floatingCard2" class="absolute top-4 right-4 bg-white dark:bg-gray-700 p-2 rounded-lg shadow-lg text-xs backdrop-blur-sm">
            <div class="flex items-center space-x-2">
              <div class="w-6 h-6 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                <svg class="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                </svg>
              </div>
              <span class="text-primary font-semibold">Carpenter</span>
            </div>
          </div>
          
          <div ref="floatingCard3" class="absolute bottom-4 left-4 bg-white dark:bg-gray-700 p-2 rounded-lg shadow-lg text-xs backdrop-blur-sm">
            <div class="flex items-center space-x-2">
              <div class="w-6 h-6 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                <svg class="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zM3 15a1 1 0 011-1h4a1 1 0 011 1v1a1 1 0 11-2 0v-1H5v1a1 1 0 11-2 0v-1z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <span class="text-primary font-semibold">Painter</span>
            </div>
          </div>
          
          <div ref="floatingCard4" class="absolute bottom-4 right-4 bg-white dark:bg-gray-700 p-2 rounded-lg shadow-lg text-xs backdrop-blur-sm">
            <div class="flex items-center space-x-2">
              <div class="w-6 h-6 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                <svg class="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                </svg>
              </div>
              <span class="text-primary font-semibold">Plumber</span>
            </div>
          </div>
          
          <div ref="floatingCard5" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 p-2 rounded-lg shadow-lg text-xs backdrop-blur-sm">
            <div class="flex items-center space-x-2">
              <div class="w-6 h-6 bg-primary bg-opacity-10 rounded-full flex items-center justify-center">
                <svg class="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                </svg>
              </div>
              <span class="text-primary font-semibold">Cleaner</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { useToast } from 'vue-toastification'

gsap.registerPlugin(TextPlugin)

// Composables
const router = useRouter()
const toast = useToast()

// Refs
const headline = ref(null)
const subtext = ref(null)
const ctaButtons = ref(null)
const trustIndicators = ref(null)
const heroImage = ref(null)
const floatingCard1 = ref(null)
const floatingCard2 = ref(null)
const floatingCard3 = ref(null)
const floatingCard4 = ref(null)
const floatingCard5 = ref(null)

// Button handlers
const handleGetStarted = async () => {
  try {
    await router.push('/auth/register')
  } catch (error) {
    console.error('Error navigating to register:', error)
    toast.error('Failed to navigate to registration page')
  }
}

const handleHowItWorks = () => {
  try {
    // Smooth scroll to how-it-works section
    const element = document.querySelector('#how-it-works')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } else {
      console.warn('How it works section not found')
      toast.info('How it works section will be available soon')
    }
  } catch (error) {
    console.error('Error scrolling to how it works:', error)
    toast.error('Failed to navigate to how it works section')
  }
}

// Counter animation
const animateCounters = () => {
  try {
    const counters = document.querySelectorAll('.counter')
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'))
      gsap.to(counter, {
        innerHTML: target,
        duration: 2,
        ease: "power2.out",
        snap: { innerHTML: 1 },
        delay: 1
      })
    })
  } catch (error) {
    console.error('Error animating counters:', error)
  }
}

// Lifecycle hooks
onMounted(() => {
  try {
    // Main hero animation timeline
    const tl = gsap.timeline()

    // Animate headline with typewriter effect
    tl.fromTo(headline.value,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
    .fromTo(subtext.value,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(ctaButtons.value,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )
    .fromTo(trustIndicators.value,
      { opacity: 0, y: 20 },
      { opacity: 0.7, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.2"
    )
    .fromTo(heroImage.value,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" },
      "-=0.4"
    )

    // Animate floating cards with stagger
    const floatingCards = [floatingCard1, floatingCard2, floatingCard3, floatingCard4, floatingCard5]
    
    floatingCards.forEach((card, index) => {
      // Initial entrance animation
      gsap.fromTo(card.value,
        { opacity: 0, scale: 0, rotation: -180 },
        { 
          opacity: 1, 
          scale: 1, 
          rotation: 0, 
          duration: 0.8, 
          delay: 2 + (index * 0.2), 
          ease: "back.out(1.7)" 
        }
      )

      // Continuous floating animation
      gsap.to(card.value, {
        y: -10,
        duration: 2 + Math.random(),
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 2
      })

      // Subtle rotation
      gsap.to(card.value, {
        rotation: 5,
        duration: 3 + Math.random(),
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: Math.random()
      })

      // Scale on hover
      card.value.addEventListener('mouseenter', () => {
        gsap.to(card.value, {
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out"
        })
      })

      card.value.addEventListener('mouseleave', () => {
        gsap.to(card.value, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        })
      })
    })

    // Animate counters
    setTimeout(animateCounters, 1500)

    // Add parallax effect to hero image
    gsap.to(heroImage.value, {
      y: -30,
      scrollTrigger: {
        trigger: heroImage.value,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    })
  } catch (error) {
    console.error('Error in hero section mount:', error)
  }
})
</script>
