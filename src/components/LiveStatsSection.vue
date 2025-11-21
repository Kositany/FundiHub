<template>
  <section class="section-padding bg-primary text-white">
    <div class="container-custom">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div 
          v-for="(stat, index) in stats" 
          :key="index"
          class="animate-scale-in"
          :style="{ animationDelay: `${index * 0.2}s` }"
        >
          <div class="text-4xl md:text-6xl font-bold mb-2">
            <span ref="counters">{{ animatedValues[index] }}</span>{{ stat.suffix }}
          </div>
          <div class="text-lg md:text-xl opacity-90">{{ stat.label }}</div>
          <div class="text-sm opacity-75 mt-1">{{ stat.description }}</div>
        </div>
      </div>
      
      <!-- Real-time indicator -->
      <div class="text-center mt-12">
        <div class="flex items-center justify-center space-x-2 opacity-75">
          <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span class="text-sm">Live data • Updated every minute</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'LiveStatsSection',
  setup() {
    const animatedValues = ref([0, 0, 0, 0])
    const intervals = ref([])

    const stats = ref([
      {
        target: 847,
        suffix: '+',
        label: 'Verified Fundis',
        description: 'Active professionals'
      },
      {
        target: 2340,
        suffix: '+',
        label: 'Jobs Completed',
        description: 'This month'
      },
      {
        target: 4.9,
        suffix: '★',
        label: 'Average Rating',
        description: 'Customer satisfaction'
      },
      {
        target: 15,
        suffix: 'min',
        label: 'Avg Response',
        description: 'First quote time'
      }
    ])

    const animateCounter = (index, target, duration = 2000) => {
      const start = Date.now()
      const startValue = animatedValues.value[index]
      
      const animate = () => {
        const elapsed = Date.now() - start
        const progress = Math.min(elapsed / duration, 1)
        
        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3)
        
        if (index === 2) {
          // Special handling for rating (decimal)
          animatedValues.value[index] = +(startValue + (target - startValue) * easeOut).toFixed(1)
        } else {
          animatedValues.value[index] = Math.floor(startValue + (target - startValue) * easeOut)
        }
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      
      animate()
    }

    const simulateRealTimeUpdates = () => {
      // Simulate small increments every 30 seconds
      const interval = setInterval(() => {
        stats.value.forEach((stat, index) => {
          if (index === 0) {
            // Occasionally add new fundis
            if (Math.random() > 0.7) {
              stat.target += 1
              animatedValues.value[index] = stat.target
            }
          } else if (index === 1) {
            // Jobs completed increase more frequently
            if (Math.random() > 0.5) {
              stat.target += Math.floor(Math.random() * 3) + 1
              animateCounter(index, stat.target, 1000)
            }
          }
        })
      }, 30000)
      
      intervals.value.push(interval)
    }

    onMounted(() => {
      // Initial animation
      stats.value.forEach((stat, index) => {
        setTimeout(() => {
          animateCounter(index, stat.target)
        }, index * 300)
      })

      // Start real-time updates after initial animation
      setTimeout(() => {
        simulateRealTimeUpdates()
      }, 3000)
    })

    onUnmounted(() => {
      intervals.value.forEach(interval => clearInterval(interval))
    })

    return {
      stats,
      animatedValues
    }
  }
}
</script>
