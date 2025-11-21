<template>
  <div class="particle-system" ref="particleContainer"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const particleContainer = ref(null)
let particles = []
let animationId = null

const props = defineProps({
  particleCount: {
    type: Number,
    default: 100
  },
  colors: {
    type: Array,
    default: () => ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe']
  },
  size: {
    type: Object,
    default: () => ({ min: 2, max: 6 })
  },
  speed: {
    type: Object,
    default: () => ({ min: 0.5, max: 2 })
  },
  interactive: {
    type: Boolean,
    default: true
  }
})

class Particle {
  constructor(container, colors, size, speed) {
    this.container = container
    this.element = document.createElement('div')
    this.element.className = 'particle-dot'
    
    // Random properties
    this.x = Math.random() * window.innerWidth
    this.y = window.innerHeight + Math.random() * 100
    this.size = size.min + Math.random() * (size.max - size.min)
    this.speed = speed.min + Math.random() * (speed.max - speed.min)
    this.color = colors[Math.floor(Math.random() * colors.length)]
    this.opacity = 0.3 + Math.random() * 0.7
    this.rotation = Math.random() * 360
    this.rotationSpeed = (Math.random() - 0.5) * 2
    
    // Floating movement
    this.floatAmplitude = 20 + Math.random() * 30
    this.floatSpeed = 0.02 + Math.random() * 0.02
    this.floatOffset = Math.random() * Math.PI * 2
    
    this.setupElement()
    this.container.appendChild(this.element)
  }
  
  setupElement() {
    this.element.style.cssText = `
      position: absolute;
      width: ${this.size}px;
      height: ${this.size}px;
      background: ${this.color};
      border-radius: 50%;
      pointer-events: none;
      opacity: ${this.opacity};
      transform: translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg);
      box-shadow: 0 0 ${this.size * 2}px ${this.color}40;
      transition: all 0.3s ease;
    `
  }
  
  update(mouseX = 0, mouseY = 0, mouseInfluence = false) {
    // Move upward
    this.y -= this.speed
    
    // Floating motion
    this.x += Math.sin(Date.now() * this.floatSpeed + this.floatOffset) * 0.5
    
    // Rotation
    this.rotation += this.rotationSpeed
    
    // Mouse interaction
    if (mouseInfluence) {
      const dx = mouseX - this.x
      const dy = mouseY - this.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      const maxDistance = 150
      
      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance
        this.x -= dx * force * 0.02
        this.y -= dy * force * 0.02
        this.opacity = Math.min(1, this.opacity + force * 0.3)
        this.size = Math.min(this.size * 2, this.size + force * 3)
      } else {
        this.opacity = Math.max(0.3, this.opacity - 0.01)
        this.size = Math.max(this.size * 0.5, this.size - 0.1)
      }
    }
    
    // Apply transform
    this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg) scale(${this.size / (this.size * 0.8)})`
    this.element.style.opacity = this.opacity
    
    // Reset when particle goes off screen
    if (this.y < -50) {
      this.y = window.innerHeight + Math.random() * 100
      this.x = Math.random() * window.innerWidth
      this.opacity = 0.3 + Math.random() * 0.7
    }
    
    // Keep particles within bounds
    if (this.x < -50) this.x = window.innerWidth + 50
    if (this.x > window.innerWidth + 50) this.x = -50
  }
  
  destroy() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element)
    }
  }
}

let mouseX = 0
let mouseY = 0
let isMouseActive = false

function handleMouseMove(e) {
  mouseX = e.clientX
  mouseY = e.clientY
  isMouseActive = true
  
  // Reset mouse influence after delay
  clearTimeout(handleMouseMove.timeout)
  handleMouseMove.timeout = setTimeout(() => {
    isMouseActive = false
  }, 2000)
}

function animate() {
  particles.forEach(particle => {
    particle.update(mouseX, mouseY, props.interactive && isMouseActive)
  })
  
  animationId = requestAnimationFrame(animate)
}

function createParticles() {
  if (!particleContainer.value) return
  
  for (let i = 0; i < props.particleCount; i++) {
    particles.push(new Particle(
      particleContainer.value,
      props.colors,
      props.size,
      props.speed
    ))
  }
}

function destroyParticles() {
  particles.forEach(particle => particle.destroy())
  particles = []
}

onMounted(() => {
  createParticles()
  animate()
  
  if (props.interactive) {
    window.addEventListener('mousemove', handleMouseMove)
  }
  
  // Handle window resize
  window.addEventListener('resize', () => {
    destroyParticles()
    setTimeout(createParticles, 100)
  })
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  
  destroyParticles()
  
  if (props.interactive) {
    window.removeEventListener('mousemove', handleMouseMove)
  }
  
  window.removeEventListener('resize', createParticles)
})
</script>

<style scoped>
.particle-system {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.particle-dot {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

/* Reduce particles on mobile */
@media (max-width: 768px) {
  .particle-system {
    display: none;
  }
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .particle-system {
    display: none;
  }
}
</style>