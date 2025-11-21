<template>
  <section class="bg-gradient-to-r from-red-600 to-primary text-white py-6 relative overflow-hidden dark:from-red-700 dark:to-red-600 mt-20 border-b-2 border-red-500/20">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 opacity-10">
      <div ref="bg1" class="absolute top-0 left-0 w-32 h-32 bg-white rounded-full"></div>
      <div ref="bg2" class="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full"></div>
      <div ref="bg3" class="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
    </div>
    
    <!-- Emergency Alert Animation -->
    <div ref="alertStripe" class="absolute top-0 left-0 w-full h-1 bg-white opacity-50"></div>
    
    <div class="container-custom relative">
      <div class="flex flex-col md:flex-row items-center justify-between">
        <!-- Emergency Content -->
        <div class="flex items-center space-x-4 mb-4 md:mb-0" ref="emergencyContent">
          <!-- Enhanced Pulsing Icon -->
          <div class="relative" ref="emergencyIcon">
            <div class="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <!-- Multiple pulse rings with GSAP animation -->
            <div ref="pulseRing1" class="absolute inset-0 w-12 h-12 rounded-full border-2 border-white opacity-30"></div>
            <div ref="pulseRing2" class="absolute inset-0 w-12 h-12 rounded-full border-2 border-white opacity-20"></div>
            <div ref="pulseRing3" class="absolute inset-0 w-12 h-12 rounded-full border-2 border-white opacity-10"></div>
          </div>
          
          <div ref="emergencyText">
            <h3 class="text-xl md:text-2xl font-bold flex items-center">
              <span ref="emergencyEmoji" class="mr-2">🚨</span>
              Emergency Services Available
            </h3>
            <p class="text-white text-opacity-90">24/7 urgent repairs • Plumbing • Electrical • Security</p>
          </div>
        </div>

        <!-- Emergency CTA -->
        <div class="flex flex-col sm:flex-row gap-3" ref="emergencyCTA">
          <button 
            @click="callEmergency"
            ref="callButton"
            class="bg-white text-red-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center relative overflow-hidden"
          >
            <div ref="callButtonRipple" class="absolute inset-0 bg-red-100 rounded-full transform scale-0"></div>
            <svg class="w-5 h-5 mr-2 relative z-10" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
            </svg>
            <span class="relative z-10">Call Now</span>
          </button>
          <button 
            @click="requestEmergency"
            ref="requestButton"
            class="border-2 border-white text-white hover:bg-white hover:text-red-600 font-semibold py-3 px-6 rounded-full transition-all duration-300"
          >
            Request Emergency Help
          </button>
        </div>
      </div>

      <!-- Emergency Types with Stagger Animation -->
      <div class="mt-6 flex flex-wrap gap-2 justify-center md:justify-start" ref="emergencyServices">
        <span 
          v-for="(service, index) in emergencyServices" 
          :key="service"
          :ref="el => serviceItems[index] = el"
          class="bg-white bg-opacity-20 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm hover:bg-opacity-30 transition-all cursor-pointer"
        >
          {{ service }}
        </span>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

export default {
  name: 'EmergencyBanner',
  setup() {
    const emergencyServices = ref([
      'Burst Pipes',
      'Power Outages', 
      'Lock Changes',
      'Water Heater Issues',
      'Blocked Drains',
      'Electrical Faults',
      'Security Systems'
    ])

    // Refs for GSAP animations
    const emergencyIcon = ref(null)
    const pulseRing1 = ref(null)
    const pulseRing2 = ref(null)
    const pulseRing3 = ref(null)
    const emergencyEmoji = ref(null)
    const emergencyContent = ref(null)
    const emergencyText = ref(null)
    const emergencyCTA = ref(null)
    const callButton = ref(null)
    const requestButton = ref(null)
    const callButtonRipple = ref(null)
    const alertStripe = ref(null)
    const bg1 = ref(null)
    const bg2 = ref(null)
    const bg3 = ref(null)
    const serviceItems = ref([])

    let emergencyTimeline

    const callEmergency = () => {
      // Ripple effect on button click
      gsap.fromTo(callButtonRipple.value, 
        { scale: 0, opacity: 0.6 },
        { scale: 4, opacity: 0, duration: 0.6, ease: "power2.out" }
      )
      
      setTimeout(() => {
        window.open('tel:+254700000000', '_self')
      }, 300)
    }

    const requestEmergency = () => {
      // Button press animation
      gsap.to(requestButton.value, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      })
      
      console.log('Opening emergency request form...')
    }

    onMounted(() => {
      // Create main animation timeline
      emergencyTimeline = gsap.timeline()

      // Animate alert stripe
      gsap.to(alertStripe.value, {
        scaleX: 0,
        transformOrigin: "left",
        duration: 0.8,
        ease: "power2.out",
        repeat: -1,
        yoyo: true
      })

      // Animate background elements
      gsap.set([bg1.value, bg2.value, bg3.value], { scale: 0 })
      gsap.to([bg1.value, bg2.value, bg3.value], {
        scale: 1,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        stagger: 0.3
      })

      // Floating background animation
      gsap.to(bg1.value, {
        x: 30,
        y: 20,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true
      })
      
      gsap.to(bg2.value, {
        x: -20,
        y: -30,
        duration: 3,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1
      })

      // Emergency icon pulse rings
      gsap.to(pulseRing1.value, {
        scale: 2,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        repeat: -1
      })
      
      gsap.to(pulseRing2.value, {
        scale: 2.5,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        repeat: -1,
        delay: 0.5
      })
      
      gsap.to(pulseRing3.value, {
        scale: 3,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        repeat: -1,
        delay: 1
      })

      // Emergency emoji animation
      gsap.to(emergencyEmoji.value, {
        rotation: 10,
        duration: 0.3,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true
      })

      // Content entrance animation
      emergencyTimeline
        .fromTo(emergencyContent.value, 
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
        )
        .fromTo(emergencyCTA.value,
          { opacity: 0, x: 50 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        )
        .fromTo(serviceItems.value,
          { opacity: 0, y: 20, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.1, ease: "back.out(1.7)" },
          "-=0.2"
        )

      // Button hover animations
      callButton.value.addEventListener('mouseenter', () => {
        gsap.to(callButton.value, {
          scale: 1.05,
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          duration: 0.3,
          ease: "power2.out"
        })
      })

      callButton.value.addEventListener('mouseleave', () => {
        gsap.to(callButton.value, {
          scale: 1,
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          duration: 0.3,
          ease: "power2.out"
        })
      })
    })

    onUnmounted(() => {
      if (emergencyTimeline) {
        emergencyTimeline.kill()
      }
    })

    return {
      emergencyServices,
      callEmergency,
      requestEmergency,
      emergencyIcon,
      pulseRing1,
      pulseRing2,
      pulseRing3,
      emergencyEmoji,
      emergencyContent,
      emergencyText,
      emergencyCTA,
      callButton,
      requestButton,
      callButtonRipple,
      alertStripe,
      bg1,
      bg2,
      bg3,
      serviceItems
    }
  }
}
</script>
