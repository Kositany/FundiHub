<template>
  <section id="testimonials" class="section-padding bg-white">
    <div class="container-custom">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">What Our Customers Say</h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Real reviews from satisfied customers who found their perfect fundi
        </p>
      </div>

      <!-- Testimonials Carousel -->
      <div class="relative max-w-4xl mx-auto">
        <div class="overflow-hidden">
          <div 
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentTestimonial * 100}%)` }"
          >
            <div 
              v-for="(testimonial, index) in testimonials" 
              :key="index"
              class="w-full flex-shrink-0"
            >
              <div class="bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
                <!-- Quote Icon -->
                <div class="w-12 h-12 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg class="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zM3.293 7.707A1 1 0 014 7h12a1 1 0 01.707.293l2 2a1 1 0 010 1.414l-2 2A1 1 0 0116 13H4a1 1 0 01-.707-.293l-2-2a1 1 0 010-1.414l2-2z" clip-rule="evenodd"></path>
                  </svg>
                </div>

                <!-- Rating -->
                <div class="flex justify-center mb-6">
                  <div class="flex space-x-1">
                    <svg v-for="star in 5" :key="star" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                </div>

                <!-- Testimonial Text -->
                <blockquote class="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 italic">
                  "{{ testimonial.text }}"
                </blockquote>

                <!-- Customer Info -->
                <div class="flex items-center justify-center space-x-4">
                  <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                    {{ testimonial.name.charAt(0) }}
                  </div>
                  <div class="text-left">
                    <div class="font-semibold text-gray-900">{{ testimonial.name }}</div>
                    <div class="text-sm text-gray-600">{{ testimonial.location }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons -->
        <button 
          @click="previousTestimonial"
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
          :disabled="currentTestimonial === 0"
        >
          <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        <button 
          @click="nextTestimonial"
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
          :disabled="currentTestimonial === testimonials.length - 1"
        >
          <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>

        <!-- Dots Indicator -->
        <div class="flex justify-center mt-8 space-x-2">
          <button 
            v-for="(testimonial, index) in testimonials" 
            :key="index"
            @click="currentTestimonial = index"
            class="w-3 h-3 rounded-full transition-colors"
            :class="currentTestimonial === index ? 'bg-primary' : 'bg-gray-300'"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'

export default {
  name: 'TestimonialsSection',
  setup() {
    const currentTestimonial = ref(0)
    let autoSlideInterval = null

    const testimonials = ref([
      {
        text: "FundiHub made finding a reliable electrician so easy. The quotes were competitive and the work was done professionally. Highly recommend!",
        name: "Sarah Wanjiku",
        location: "Nairobi"
      },
      {
        text: "I needed urgent plumbing repairs and got three quotes within hours. The fundi I hired was punctual and fixed everything perfectly.",
        name: "David Kimani",
        location: "Mombasa"
      },
      {
        text: "The carpentry work on my kitchen cabinets exceeded my expectations. The platform made it easy to find skilled professionals.",
        name: "Grace Mutindi",
        location: "Kisumu"
      },
      {
        text: "Professional cleaning service that actually cares about quality. The team was thorough and respectful of our home.",
        name: "James Ochieng",
        location: "Eldoret"
      }
    ])

    const nextTestimonial = () => {
      if (currentTestimonial.value < testimonials.value.length - 1) {
        currentTestimonial.value++
      } else {
        currentTestimonial.value = 0
      }
    }

    const previousTestimonial = () => {
      if (currentTestimonial.value > 0) {
        currentTestimonial.value--
      } else {
        currentTestimonial.value = testimonials.value.length - 1
      }
    }

    const startAutoSlide = () => {
      autoSlideInterval = setInterval(() => {
        nextTestimonial()
      }, 5000)
    }

    const stopAutoSlide = () => {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval)
      }
    }

    onMounted(() => {
      startAutoSlide()
    })

    onUnmounted(() => {
      stopAutoSlide()
    })

    return {
      currentTestimonial,
      testimonials,
      nextTestimonial,
      previousTestimonial
    }
  }
}
</script>
