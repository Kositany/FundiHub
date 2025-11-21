<template>
  <div class="scroll-progress-container" v-show="showProgress">
    <!-- Circular Progress Indicator -->
    <div class="scroll-progress-circle" @click="scrollToTop">
      <svg class="progress-ring" width="60" height="60">
        <circle
          class="progress-ring-background"
          cx="30"
          cy="30"
          r="26"
          fill="transparent"
          stroke="rgba(102, 126, 234, 0.2)"
          stroke-width="4"
        />
        <circle
          class="progress-ring-progress"
          cx="30"
          cy="30"
          r="26"
          fill="transparent"
          stroke="url(#gradient)"
          stroke-width="4"
          stroke-linecap="round"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="strokeDashoffset"
          transform="rotate(-90 30 30)"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#667eea"/>
            <stop offset="100%" style="stop-color:#764ba2"/>
          </linearGradient>
        </defs>
      </svg>
      
      <!-- Progress Percentage -->
      <div class="progress-percentage">
        {{ Math.round(scrollProgress) }}%
      </div>
      
      <!-- Arrow Icon -->
      <div class="progress-arrow" :class="{ 'rotate-180': scrollProgress > 95 }">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
        </svg>
      </div>
    </div>

    <!-- Linear Progress Bar (Top of Screen) -->
    <div class="linear-progress-bar">
      <div 
        class="linear-progress-fill"
        :style="{ width: scrollProgress + '%' }"
      ></div>
    </div>

    <!-- Reading Time Indicator -->
    <div class="reading-time-indicator" v-show="showReadingTime">
      <div class="reading-time-content">
        <span class="reading-time-text">{{ readingTimeRemaining }} min left</span>
        <div class="reading-time-bar">
          <div 
            class="reading-time-fill"
            :style="{ width: readingProgress + '%' }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const scrollProgress = ref(0)
const showProgress = ref(false)
const showReadingTime = ref(false)
const totalReadingTime = ref(5) // 5 minutes estimated reading time
const readingStartTime = ref(null)

const props = defineProps({
  threshold: {
    type: Number,
    default: 10 // Show progress after 10% scroll
  },
  smoothScroll: {
    type: Boolean,
    default: true
  }
})

// Calculate circle circumference for SVG progress
const radius = 26
const circumference = computed(() => 2 * Math.PI * radius)

// Calculate stroke dash offset for progress circle
const strokeDashoffset = computed(() => {
  const progress = scrollProgress.value / 100
  return circumference.value - (progress * circumference.value)
})

// Calculate reading progress
const readingProgress = computed(() => {
  if (!readingStartTime.value) return 0
  const elapsed = (Date.now() - readingStartTime.value) / 1000 / 60 // minutes
  return Math.min((elapsed / totalReadingTime.value) * 100, 100)
})

// Calculate remaining reading time
const readingTimeRemaining = computed(() => {
  const remaining = totalReadingTime.value - (readingProgress.value / 100 * totalReadingTime.value)
  return Math.max(Math.ceil(remaining), 0)
})

// Scroll event handler
function handleScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight
  const progress = (scrollTop / documentHeight) * 100

  scrollProgress.value = Math.min(progress, 100)
  showProgress.value = progress > props.threshold
  
  // Show reading time when user has scrolled a bit
  if (progress > 5 && !readingStartTime.value) {
    readingStartTime.value = Date.now()
    showReadingTime.value = true
  }
}

// Smooth scroll to top
function scrollToTop() {
  if (props.smoothScroll) {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: 0, autoKill: true },
      ease: "power2.inOut"
    })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  // Add click animation
  gsap.to('.scroll-progress-circle', {
    scale: 0.95,
    duration: 0.1,
    yoyo: true,
    repeat: 1
  })
}

// Throttle scroll events for performance
let scrollTimeout = null
function throttledScroll() {
  if (scrollTimeout) return
  
  scrollTimeout = setTimeout(() => {
    handleScroll()
    scrollTimeout = null
  }, 16) // ~60fps
}

onMounted(() => {
  // Initial scroll position
  handleScroll()
  
  // Add scroll listener
  window.addEventListener('scroll', throttledScroll, { passive: true })
  
  // Animate in the progress indicator
  gsap.set('.scroll-progress-container', { opacity: 0, scale: 0.8 })
  gsap.to('.scroll-progress-container', {
    opacity: 1,
    scale: 1,
    duration: 0.5,
    ease: "back.out(1.7)",
    delay: 1
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', throttledScroll)
  if (scrollTimeout) {
    clearTimeout(scrollTimeout)
  }
})
</script>

<style scoped>
.scroll-progress-container {
  position: fixed;
  z-index: 1000;
  pointer-events: none;
}

/* Circular Progress Indicator */
.scroll-progress-circle {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  cursor: pointer;
  pointer-events: auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 50%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.scroll-progress-circle:hover {
  transform: scale(1.1);
  box-shadow: 0 12px 40px rgba(102, 126, 234, 0.3);
}

.scroll-progress-circle:active {
  transform: scale(0.95);
}

.progress-ring {
  position: absolute;
  top: 0;
  left: 0;
  transform: rotate(-90deg);
}

.progress-ring-progress {
  transition: stroke-dashoffset 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-percentage {
  position: absolute;
  font-size: 10px;
  font-weight: 600;
  color: #667eea;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.scroll-progress-circle:hover .progress-percentage {
  opacity: 1;
}

.progress-arrow {
  position: absolute;
  color: #667eea;
  transition: all 0.3s ease;
}

.progress-arrow.rotate-180 {
  transform: rotate(180deg);
}

.scroll-progress-circle:hover .progress-arrow {
  opacity: 0;
}

/* Linear Progress Bar */
.linear-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 1001;
}

.linear-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 200% 100%;
  animation: gradientMove 3s ease infinite;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes gradientMove {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* Reading Time Indicator */
.reading-time-indicator {
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: auto;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  opacity: 0;
  animation: slideDown 0.5s ease forwards;
  animation-delay: 0.5s;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

.reading-time-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.reading-time-bar {
  width: 60px;
  height: 3px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
}

.reading-time-fill {
  height: 100%;
  background: linear-gradient(90deg, #4facfe, #00f2fe);
  border-radius: 2px;
  transition: width 0.3s ease;
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .scroll-progress-circle {
    background: rgba(17, 24, 39, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .linear-progress-bar {
    background: rgba(0, 0, 0, 0.2);
  }
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .scroll-progress-circle {
    bottom: 1rem;
    right: 1rem;
    width: 50px;
    height: 50px;
  }
  
  .progress-ring {
    width: 50px;
    height: 50px;
  }
  
  .progress-ring circle {
    r: 21;
    cx: 25;
    cy: 25;
  }
  
  .progress-arrow svg {
    width: 16px;
    height: 16px;
  }
  
  .reading-time-indicator {
    font-size: 0.7rem;
    padding: 0.4rem 0.8rem;
  }
  
  .reading-time-bar {
    width: 40px;
  }
}

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  .scroll-progress-circle,
  .linear-progress-fill,
  .reading-time-fill,
  .progress-ring-progress {
    transition: none;
  }
  
  .linear-progress-fill {
    animation: none;
    background: #667eea;
  }
  
  .reading-time-indicator {
    animation: none;
    opacity: 1;
  }
}
</style>