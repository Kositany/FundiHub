<template>
  <transition name="loader-fade">
    <div v-if="isLoading" class="page-loader" :class="{ 'loader-hiding': isHiding }">
      <!-- Background -->
      <div class="loader-background"></div>
      
      <!-- Main Loader Container -->
      <div class="loader-container">
        <!-- Logo Animation -->
        <div class="loader-logo">
          <div class="logo-text">
            <span class="logo-letter" v-for="(letter, index) in logoLetters" :key="index" :style="{ animationDelay: index * 0.1 + 's' }">
              {{ letter }}
            </span>
          </div>
          <div class="logo-subtitle">Find trusted fundis, get instant quotes</div>
        </div>
        
        <!-- Morphing Shape Loader -->
        <div class="morphing-loader">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
          <div class="shape shape-4"></div>
        </div>
        
        <!-- Progress Bar -->
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progress + '%' }"></div>
          </div>
          <div class="progress-text">
            <span class="progress-percentage">{{ Math.round(progress) }}%</span>
            <span class="progress-status">{{ currentStatus }}</span>
          </div>
        </div>
        
        <!-- Floating Elements -->
        <div class="floating-elements">
          <div class="floating-element" v-for="n in 6" :key="n" :style="getFloatingStyle(n)"></div>
        </div>
      </div>
      
      <!-- Particle Burst Effect -->
      <div class="particle-burst" ref="particleBurst"></div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  duration: {
    type: Number,
    default: 3000 // 3 seconds
  },
  stages: {
    type: Array,
    default: () => [
      'Connecting to FundiHub...',
      'Loading your dashboard...',
      'Finding nearby fundis...',
      'Preparing your experience...',
      'Almost ready!'
    ]
  }
})

const emit = defineEmits(['loaded'])

const isLoading = ref(true)
const isHiding = ref(false)
const progress = ref(0)
const currentStageIndex = ref(0)
const logoLetters = 'FUNDIHUB'.split('')

const currentStatus = computed(() => {
  return props.stages[currentStageIndex.value] || 'Loading...'
})

// Generate random floating element styles
function getFloatingStyle(index) {
  const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe']
  const size = Math.random() * 20 + 10
  const left = Math.random() * 100
  const top = Math.random() * 100
  const duration = Math.random() * 3 + 2
  const delay = Math.random() * 2
  
  return {
    width: size + 'px',
    height: size + 'px',
    left: left + '%',
    top: top + '%',
    backgroundColor: colors[index % colors.length],
    animationDuration: duration + 's',
    animationDelay: delay + 's'
  }
}

// Create particle burst effect
function createParticleBurst() {
  const container = document.querySelector('.particle-burst')
  if (!container) return
  
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div')
    particle.className = 'burst-particle'
    
    const angle = (i / 50) * Math.PI * 2
    const velocity = Math.random() * 200 + 100
    const size = Math.random() * 6 + 2
    const color = ['#667eea', '#764ba2', '#f093fb', '#f5576c'][Math.floor(Math.random() * 4)]
    
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
    `
    
    container.appendChild(particle)
    
    // Animate particle
    gsap.to(particle, {
      x: Math.cos(angle) * velocity,
      y: Math.sin(angle) * velocity,
      opacity: 0,
      scale: 0,
      duration: 1.5,
      ease: "power2.out",
      onComplete: () => particle.remove()
    })
  }
}

// Simulate loading progress
function simulateLoading() {
  const stageTime = props.duration / props.stages.length
  let currentProgress = 0
  
  const progressInterval = setInterval(() => {
    // Smooth progress increment
    const increment = Math.random() * 3 + 1
    currentProgress = Math.min(currentProgress + increment, 100)
    progress.value = currentProgress
    
    // Update stage based on progress
    const newStageIndex = Math.floor((currentProgress / 100) * props.stages.length)
    if (newStageIndex !== currentStageIndex.value && newStageIndex < props.stages.length) {
      currentStageIndex.value = newStageIndex
    }
    
    // Complete loading
    if (currentProgress >= 100) {
      clearInterval(progressInterval)
      setTimeout(finishLoading, 500)
    }
  }, 50)
}

// Finish loading animation
function finishLoading() {
  isHiding.value = true
  
  // Create particle burst
  createParticleBurst()
  
  // Animate logo explosion
  gsap.to('.logo-letter', {
    scale: 1.5,
    rotation: 360,
    opacity: 0,
    duration: 0.8,
    stagger: 0.05,
    ease: "back.in(1.7)"
  })
  
  // Animate shapes explosion
  gsap.to('.shape', {
    scale: 3,
    opacity: 0,
    rotation: 720,
    duration: 1,
    stagger: 0.1,
    ease: "power2.in"
  })
  
  // Animate progress bar
  gsap.to('.progress-container', {
    y: -50,
    opacity: 0,
    duration: 0.5,
    ease: "power2.in"
  })
  
  // Final fade out
  setTimeout(() => {
    gsap.to('.page-loader', {
      opacity: 0,
      scale: 1.1,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        isLoading.value = false
        emit('loaded')
      }
    })
  }, 1000)
}

onMounted(() => {
  // Animate in the loader
  gsap.set('.loader-container', { opacity: 0, scale: 0.8 })
  gsap.set('.logo-letter', { opacity: 0, y: 50, rotation: -180 })
  gsap.set('.shape', { scale: 0, rotation: 0 })
  gsap.set('.progress-container', { opacity: 0, y: 30 })
  gsap.set('.floating-element', { opacity: 0, scale: 0 })
  
  const tl = gsap.timeline()
  
  tl.to('.loader-container', {
    opacity: 1,
    scale: 1,
    duration: 0.8,
    ease: "back.out(1.7)"
  })
  .to('.logo-letter', {
    opacity: 1,
    y: 0,
    rotation: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "back.out(1.7)"
  }, "-=0.4")
  .to('.shape', {
    scale: 1,
    duration: 0.8,
    stagger: 0.1,
    ease: "elastic.out(1, 0.5)"
  }, "-=0.6")
  .to('.progress-container', {
    opacity: 1,
    y: 0,
    duration: 0.5,
    ease: "power2.out"
  }, "-=0.4")
  .to('.floating-element', {
    opacity: 1,
    scale: 1,
    duration: 0.5,
    stagger: 0.1,
    ease: "back.out(1.7)"
  }, "-=0.3")
  
  // Start loading simulation after animation
  setTimeout(simulateLoading, 1000)
})

onUnmounted(() => {
  // Clean up any remaining particles
  const particles = document.querySelectorAll('.burst-particle')
  particles.forEach(particle => particle.remove())
})
</script>

<style scoped>
.page-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.loader-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 400% 400%;
  animation: gradientShift 6s ease infinite;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.loader-container {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 400px;
  padding: 2rem;
}

/* Logo Animation */
.loader-logo {
  margin-bottom: 3rem;
}

.logo-text {
  display: flex;
  justify-content: center;
  gap: 0.2rem;
  margin-bottom: 1rem;
}

.logo-letter {
  display: inline-block;
  font-size: 3rem;
  font-weight: 900;
  color: white;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  animation: letterPulse 2s ease-in-out infinite;
}

@keyframes letterPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.logo-subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  font-weight: 300;
  opacity: 0;
  animation: fadeInUp 1s ease forwards 1.5s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Morphing Shapes */
.morphing-loader {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 3rem;
}

.shape {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
}

.shape-1 {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  animation: morphShape1 2s ease-in-out infinite;
}

.shape-2 {
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  animation: morphShape2 2s ease-in-out infinite 0.5s;
}

.shape-3 {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  animation: morphShape3 2s ease-in-out infinite 1s;
}

.shape-4 {
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  animation: morphShape4 2s ease-in-out infinite 1.5s;
}

@keyframes morphShape1 {
  0%, 100% { 
    transform: translateX(-50%) scale(1);
    border-radius: 50%;
  }
  50% { 
    transform: translateX(-50%) scale(1.5);
    border-radius: 20%;
  }
}

@keyframes morphShape2 {
  0%, 100% { 
    transform: translateY(-50%) scale(1);
    border-radius: 50%;
  }
  50% { 
    transform: translateY(-50%) scale(1.5);
    border-radius: 20%;
  }
}

@keyframes morphShape3 {
  0%, 100% { 
    transform: translateX(-50%) scale(1);
    border-radius: 50%;
  }
  50% { 
    transform: translateX(-50%) scale(1.5);
    border-radius: 20%;
  }
}

@keyframes morphShape4 {
  0%, 100% { 
    transform: translateY(-50%) scale(1);
    border-radius: 50%;
  }
  50% { 
    transform: translateY(-50%) scale(1.5);
    border-radius: 20%;
  }
}

/* Progress Bar */
.progress-container {
  margin-bottom: 2rem;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #ffffff, #f0f8ff);
  border-radius: 2px;
  transition: width 0.3s ease;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

.progress-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 0.9rem;
}

.progress-percentage {
  font-weight: 600;
}

.progress-status {
  opacity: 0.8;
}

/* Floating Elements */
.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-element {
  position: absolute;
  border-radius: 50%;
  opacity: 0.6;
  animation: floatAround 4s ease-in-out infinite;
}

@keyframes floatAround {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-20px) rotate(90deg);
  }
  50% {
    transform: translateY(-40px) rotate(180deg);
  }
  75% {
    transform: translateY(-20px) rotate(270deg);
  }
}

/* Particle Burst */
.particle-burst {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

/* Transitions */
.loader-fade-enter-active,
.loader-fade-leave-active {
  transition: opacity 0.5s ease;
}

.loader-fade-enter-from,
.loader-fade-leave-to {
  opacity: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .loader-container {
    max-width: 300px;
    padding: 1.5rem;
  }
  
  .logo-letter {
    font-size: 2rem;
  }
  
  .logo-subtitle {
    font-size: 0.9rem;
  }
  
  .morphing-loader {
    width: 80px;
    height: 80px;
  }
  
  .shape {
    width: 16px;
    height: 16px;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .logo-letter,
  .shape,
  .floating-element {
    animation: none;
  }
  
  .loader-background {
    animation: none;
    background: #667eea;
  }
  
  .progress-fill {
    transition: none;
  }
}
</style>