<template>
  <section class="section-padding bg-gray-50">
    <div class="container-custom">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Got questions? We've got answers to help you get started with confidence.
        </p>
      </div>

      <!-- FAQ Items -->
      <div class="max-w-4xl mx-auto space-y-4">
        <div 
          v-for="(faq, index) in faqs" 
          :key="index"
          class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <button
            @click="toggleFaq(index)"
            class="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
          >
            <span class="font-semibold text-gray-900 text-lg">{{ faq.question }}</span>
            <svg 
              class="w-6 h-6 text-gray-500 transition-transform duration-300"
              :class="{ 'rotate-180': openFaq === index }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          
          <div 
            v-show="openFaq === index"
            class="px-6 pb-5 text-gray-600 leading-relaxed animate-slide-up"
          >
            {{ faq.answer }}
          </div>
        </div>
      </div>

      <!-- Contact CTA -->
      <div class="text-center mt-12">
        <p class="text-gray-600 mb-6">Still have questions?</p>
        <button @click="handleContactSupport" class="btn-primary">
          Contact Support
          <svg class="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

// Composables
const toast = useToast()

const openFaq = ref(null)

const faqs = ref([
  {
    question: "How does FundiHub verify its professionals?",
    answer: "All fundis undergo a comprehensive verification process including ID verification, skill assessment, background checks, and customer review analysis. We also require valid certifications for specialized trades like electrical and plumbing work."
  },
  {
    question: "How much does it cost to use FundiHub?",
    answer: "It's completely free to post jobs and receive quotes! Fundis pay a small service fee only when they successfully complete a job. You only pay the agreed amount directly to your chosen fundi."
  },
  {
    question: "How quickly can I get quotes?",
    answer: "Most jobs receive their first quote within 30 minutes during business hours. Complex projects may take a few hours as fundis need time to properly assess requirements and provide accurate estimates."
  },
  {
    question: "What if I'm not satisfied with the work?",
    answer: "We have a comprehensive dispute resolution process. If issues arise, contact our support team within 48 hours. We'll mediate between you and the fundi to ensure a fair resolution, including refunds when appropriate."
  },
  {
    question: "Can I hire the same fundi for future projects?",
    answer: "Absolutely! Once you find a fundi you trust, you can hire them directly for future projects. Many customers build long-term relationships with their preferred professionals."
  },
  {
    question: "What areas do you serve?",
    answer: "We currently serve Nairobi, Mombasa, Kisumu, Nakuru, and Eldoret, with plans to expand to more cities soon. Check our coverage map or contact us to see if we serve your area."
  },
  {
    question: "How do payments work?",
    answer: "You can pay fundis directly via M-Pesa, bank transfer, or cash upon completion. For larger projects, we recommend agreeing on a payment schedule with milestones to protect both parties."
  },
  {
    question: "What if a fundi doesn't show up?",
    answer: "This rarely happens with our verified professionals. If a fundi cancels or doesn't show up, we'll immediately help you find a replacement and may offer priority matching for the inconvenience."
  }
])

const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? null : index
}

const handleContactSupport = () => {
  try {
    // Open WhatsApp support
    const phoneNumber = '+254700000000' // Replace with actual support number
    const message = encodeURIComponent('Hi! I have a question about FundiHub and need support.')
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, '_blank')
    toast.success('Opening WhatsApp support chat!')
  } catch (error) {
    console.error('Error opening support:', error)
    toast.error('Failed to open support chat. Please try again.')
  }
}
</script>
