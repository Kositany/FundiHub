<template>
  <DashboardLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Reviews & Ratings</h1>
            <p class="text-gray-600">Manage your client reviews and maintain your reputation</p>
          </div>
          <div class="flex space-x-3">
            <button @click="filterReviews('all')" :class="reviewFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'" class="px-4 py-2 rounded-lg hover:bg-blue-700">
              All Reviews
            </button>
            <button @click="filterReviews('pending')" :class="reviewFilter === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'" class="px-4 py-2 rounded-lg hover:bg-blue-700">
              Pending Response
            </button>
          </div>
        </div>
      </div>

      <!-- Rating Overview -->
      <div class="grid md:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-yellow-100 rounded-lg">
              <svg class="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Average Rating</p>
              <p class="text-2xl font-semibold text-gray-900">{{ reviewStats.averageRating }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Reviews</p>
              <p class="text-2xl font-semibold text-gray-900">{{ reviewStats.totalReviews }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-green-100 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Response Rate</p>
              <p class="text-2xl font-semibold text-gray-900">{{ reviewStats.responseRate }}%</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-purple-100 rounded-lg">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">This Month</p>
              <p class="text-2xl font-semibold text-gray-900">{{ reviewStats.monthlyReviews }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Rating Distribution -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
        <div class="space-y-3">
          <div v-for="rating in ratingDistribution" :key="rating.stars" class="flex items-center space-x-4">
            <div class="flex items-center space-x-1 w-20">
              <span class="text-sm font-medium text-gray-700">{{ rating.stars }}</span>
              <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
            <div class="flex-1 bg-gray-200 rounded-full h-3">
              <div 
                class="bg-yellow-400 h-3 rounded-full transition-all duration-300"
                :style="{ width: rating.percentage + '%' }"
              ></div>
            </div>
            <span class="text-sm text-gray-600 w-12">{{ rating.count }}</span>
            <span class="text-sm text-gray-500 w-12">{{ rating.percentage }}%</span>
          </div>
        </div>
      </div>

      <!-- Reviews List -->
      <div class="space-y-4">
        <div v-for="review in filteredReviews" :key="review.id" class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
          <div class="p-6">
            <div class="flex items-start justify-between">
              <div class="flex items-start space-x-4 flex-1">
                <!-- Client Avatar -->
                <img :src="review.client.avatar" :alt="review.client.name" class="w-12 h-12 rounded-full">
                
                <div class="flex-1">
                  <!-- Review Header -->
                  <div class="flex items-center justify-between mb-2">
                    <div>
                      <h3 class="text-lg font-semibold text-gray-900">{{ review.client.name }}</h3>
                      <p class="text-sm text-gray-500">{{ review.projectTitle }}</p>
                    </div>
                    <div class="text-right">
                      <div class="flex items-center space-x-1 mb-1">
                        <svg v-for="i in 5" :key="i" :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </div>
                      <p class="text-sm text-gray-500">{{ formatDate(review.date) }}</p>
                    </div>
                  </div>

                  <!-- Review Content -->
                  <div class="mb-4">
                    <p class="text-gray-700 mb-2">{{ review.comment }}</p>
                    
                    <!-- Review Categories -->
                    <div v-if="review.categories" class="grid md:grid-cols-3 gap-4 mt-3 p-3 bg-gray-50 rounded-lg">
                      <div v-for="category in review.categories" :key="category.name" class="text-center">
                        <p class="text-xs text-gray-500 mb-1">{{ category.name }}</p>
                        <div class="flex items-center justify-center space-x-1">
                          <svg v-for="i in 5" :key="i" :class="i <= category.rating ? 'text-yellow-400' : 'text-gray-300'" class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Your Response -->
                  <div v-if="review.response" class="bg-blue-50 rounded-lg p-4 mt-4">
                    <div class="flex items-start space-x-3">
                      <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" alt="Your Avatar" class="w-8 h-8 rounded-full">
                      <div class="flex-1">
                        <div class="flex items-center justify-between mb-1">
                          <p class="text-sm font-medium text-blue-900">Your Response</p>
                          <p class="text-xs text-blue-600">{{ formatDate(review.response.date) }}</p>
                        </div>
                        <p class="text-blue-800 text-sm">{{ review.response.message }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex flex-col space-y-2 ml-4">
                <button v-if="!review.response" @click="showResponseModal(review)" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
                  Respond
                </button>
                <button v-if="review.response" @click="editResponse(review)" class="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 text-sm">
                  Edit Response
                </button>
                <button @click="shareReview(review)" class="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 text-sm">
                  Share
                </button>
                <button v-if="review.canReport" @click="reportReview(review)" class="text-red-600 hover:text-red-700 text-sm">
                  Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Response Modal -->
    <div v-if="showResponse" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold">Respond to Review</h2>
          <button @click="showResponse = false" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="mb-4">
          <p class="text-sm text-gray-600 mb-2">Responding to {{ selectedReview?.client.name }}'s review:</p>
          <div class="bg-gray-50 rounded-lg p-3">
            <div class="flex items-center space-x-1 mb-1">
              <svg v-for="i in 5" :key="i" :class="i <= selectedReview?.rating ? 'text-yellow-400' : 'text-gray-300'" class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </div>
            <p class="text-sm text-gray-700">{{ selectedReview?.comment }}</p>
          </div>
        </div>

        <form @submit.prevent="submitResponse">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Your Response</label>
            <textarea 
              v-model="responseMessage"
              rows="4"
              required
              placeholder="Thank your client and address any concerns professionally..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div class="flex justify-end space-x-3">
            <button type="button" @click="showResponse = false" class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Send Response
            </button>
          </div>
        </form>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import DashboardLayout from '@/components/navigation/DashboardLayout.vue'

// State
const reviewFilter = ref('all')
const showResponse = ref(false)
const selectedReview = ref(null)
const responseMessage = ref('')

const reviewStats = ref({
  averageRating: 4.7,
  totalReviews: 89,
  responseRate: 94,
  monthlyReviews: 12
})

const ratingDistribution = ref([
  { stars: 5, count: 67, percentage: 75 },
  { stars: 4, count: 15, percentage: 17 },
  { stars: 3, count: 5, percentage: 6 },
  { stars: 2, count: 1, percentage: 1 },
  { stars: 1, count: 1, percentage: 1 }
])

// Sample reviews data
const reviews = ref([
  {
    id: 1,
    client: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b120?w=100'
    },
    projectTitle: 'Kitchen Plumbing Installation',
    rating: 5,
    comment: 'Excellent work! John was professional, punctual, and did a fantastic job with our kitchen plumbing. The quality of work exceeded our expectations and he cleaned up perfectly after the job. Highly recommended!',
    date: '2024-02-15',
    categories: [
      { name: 'Quality', rating: 5 },
      { name: 'Timeliness', rating: 5 },
      { name: 'Communication', rating: 4 }
    ],
    response: {
      message: 'Thank you so much for the kind words, Sarah! It was a pleasure working on your kitchen project. I take pride in delivering quality work and maintaining clean work spaces. Looking forward to helping with any future plumbing needs!',
      date: '2024-02-16'
    },
    canReport: false
  },
  {
    id: 2,
    client: {
      name: 'Michael Davis',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
    },
    projectTitle: 'Bathroom Pipe Repair',
    rating: 4,
    comment: 'Good service overall. John fixed our bathroom pipe issue quickly and the price was fair. Only minor issue was he arrived 30 minutes late, but he called ahead to let us know.',
    date: '2024-02-10',
    categories: [
      { name: 'Quality', rating: 5 },
      { name: 'Timeliness', rating: 3 },
      { name: 'Communication', rating: 4 }
    ],
    response: null,
    canReport: false
  },
  {
    id: 3,
    client: {
      name: 'Jennifer Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
    },
    projectTitle: 'Water Heater Installation',
    rating: 5,
    comment: 'Outstanding professional service! John installed our new water heater efficiently and explained everything clearly. His expertise and attention to detail are impressive. Will definitely hire again.',
    date: '2024-02-08',
    categories: [
      { name: 'Quality', rating: 5 },
      { name: 'Timeliness', rating: 5 },
      { name: 'Communication', rating: 5 }
    ],
    response: {
      message: 'Thank you, Jennifer! I really appreciate your feedback. Water heater installations require careful attention to safety and efficiency, so I am glad everything met your expectations. Please don\'t hesitate to reach out for any future plumbing needs!',
      date: '2024-02-09'
    },
    canReport: false
  }
])

// Computed
const filteredReviews = computed(() => {
  if (reviewFilter.value === 'pending') {
    return reviews.value.filter(review => !review.response)
  }
  return reviews.value
})

// Methods
const filterReviews = (type) => {
  reviewFilter.value = type
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

const showResponseModal = (review) => {
  selectedReview.value = review
  responseMessage.value = ''
  showResponse.value = true
}

const editResponse = (review) => {
  selectedReview.value = review
  responseMessage.value = review.response.message
  showResponse.value = true
}

const submitResponse = () => {
  if (selectedReview.value && responseMessage.value.trim()) {
    selectedReview.value.response = {
      message: responseMessage.value.trim(),
      date: new Date().toISOString().split('T')[0]
    }
    showResponse.value = false
    console.log('Response submitted for review:', selectedReview.value.id)
  }
}

const shareReview = (review) => {
  console.log('Sharing review:', review.id)
}

const reportReview = (review) => {
  console.log('Reporting review:', review.id)
}
</script>
