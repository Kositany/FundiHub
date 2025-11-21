<template>
  <DashboardLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Reviews & Ratings</h1>
            <p class="text-gray-600">Manage your reviews and provide feedback to fundis</p>
          </div>
          <div class="flex space-x-3">
            <button @click="exportReviews" class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
              Export Reviews
            </button>
            <button @click="writeReview" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Write Review
            </button>
          </div>
        </div>
      </div>

      <!-- Review Stats -->
      <div class="grid md:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-yellow-100 rounded-lg">
              <svg class="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Average Rating Given</p>
              <p class="text-2xl font-semibold text-gray-900">{{ reviewStats.averageRating }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
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
              <p class="text-sm font-medium text-gray-600">Reviews This Month</p>
              <p class="text-2xl font-semibold text-gray-900">{{ reviewStats.thisMonth }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-purple-100 rounded-lg">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4zM9 6v10h6V6H9z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Pending Reviews</p>
              <p class="text-2xl font-semibold text-gray-900">{{ reviewStats.pending }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters and Search -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <input 
              v-model="searchQuery"
              type="text"
              placeholder="Search reviews by fundi name or service..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          <div class="flex space-x-2">
            <select v-model="ratingFilter" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
            <select v-model="statusFilter" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Status</option>
              <option value="published">Published</option>
              <option value="pending">Pending</option>
              <option value="draft">Draft</option>
            </select>
            <select v-model="sortBy" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="date">Sort by Date</option>
              <option value="rating">Sort by Rating</option>
              <option value="fundi">Sort by Fundi</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Reviews List -->
      <div class="space-y-4">
        <div v-for="review in filteredReviews" :key="review.id" class="bg-white rounded-lg shadow p-6">
          <div class="flex items-start justify-between">
            <div class="flex space-x-4 flex-1">
              <img :src="review.fundi.avatar" :alt="review.fundi.name" class="w-12 h-12 rounded-full">
              <div class="flex-1">
                <div class="flex items-center justify-between mb-2">
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">{{ review.fundi.name }}</h3>
                    <p class="text-sm text-gray-600">{{ review.service }} • {{ formatDate(review.date) }}</p>
                  </div>
                  <div class="flex items-center space-x-2">
                    <div class="flex items-center">
                      <div v-for="i in 5" :key="i" class="w-4 h-4">
                        <svg v-if="i <= review.rating" class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                        <svg v-else class="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                      </div>
                    </div>
                    <span class="text-sm text-gray-500">({{ review.rating }}/5)</span>
                  </div>
                </div>
                
                <div class="mb-3">
                  <p class="text-gray-700 leading-relaxed">{{ review.comment }}</p>
                </div>

                <div v-if="review.photos && review.photos.length > 0" class="mb-3">
                  <div class="flex space-x-2">
                    <img v-for="photo in review.photos" :key="photo" :src="photo" class="w-16 h-16 rounded-lg object-cover cursor-pointer hover:opacity-75" @click="viewPhoto(photo)">
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-4">
                    <span :class="getStatusColor(review.status)" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {{ review.status.charAt(0).toUpperCase() + review.status.slice(1) }}
                    </span>
                    <div class="flex items-center space-x-4 text-sm text-gray-500">
                      <span class="flex items-center space-x-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>{{ review.timeSpent }}</span>
                      </span>
                      <span class="flex items-center space-x-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                        </svg>
                        <span>KES {{ review.amount.toLocaleString() }}</span>
                      </span>
                    </div>
                  </div>
                  <div class="flex space-x-2">
                    <button @click="editReview(review)" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Edit
                    </button>
                    <button @click="deleteReview(review.id)" class="text-red-600 hover:text-red-800 text-sm font-medium">
                      Delete
                    </button>
                    <button @click="shareReview(review)" class="text-gray-600 hover:text-gray-800 text-sm font-medium">
                      Share
                    </button>
                  </div>
                </div>

                <!-- Fundi Response -->
                <div v-if="review.fundiResponse" class="mt-4 pl-4 border-l-4 border-blue-200 bg-blue-50 p-3 rounded-r-lg">
                  <div class="flex items-center space-x-2 mb-2">
                    <img :src="review.fundi.avatar" :alt="review.fundi.name" class="w-6 h-6 rounded-full">
                    <span class="text-sm font-medium text-gray-900">{{ review.fundi.name }} responded:</span>
                    <span class="text-xs text-gray-500">{{ formatDate(review.fundiResponse.date) }}</span>
                  </div>
                  <p class="text-sm text-gray-700">{{ review.fundiResponse.message }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredReviews.length === 0" class="bg-white rounded-lg shadow p-12 text-center">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
        <p class="text-gray-500 mb-4">You haven't written any reviews yet, or no reviews match your current filters.</p>
        <button @click="writeReview" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
          Write Your First Review
        </button>
      </div>

      <!-- Pagination -->
      <div v-if="filteredReviews.length > 0" class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing {{ ((currentPage - 1) * itemsPerPage) + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredReviews.length) }} of {{ filteredReviews.length }} reviews
          </div>
          <div class="flex space-x-2">
            <button @click="previousPage" :disabled="currentPage === 1" class="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
              Previous
            </button>
            <button v-for="page in visiblePages" :key="page" @click="goToPage(page)" :class="page === currentPage ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'" class="px-3 py-1 border border-gray-300 rounded-md">
              {{ page }}
            </button>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import DashboardLayout from '@/components/navigation/DashboardLayout.vue'

// State
const router = useRouter()
const searchQuery = ref('')
const ratingFilter = ref('')
const statusFilter = ref('')
const sortBy = ref('date')
const currentPage = ref(1)
const itemsPerPage = ref(10)

const reviewStats = ref({
  averageRating: 4.6,
  totalReviews: 24,
  thisMonth: 5,
  pending: 2
})

// Sample reviews data
const reviews = ref([
  {
    id: 1,
    fundi: {
      name: 'John Mwangi',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
    },
    service: 'Kitchen Plumbing Installation',
    rating: 5,
    comment: 'John did an excellent job with my kitchen plumbing. He was professional, arrived on time, and completed the work efficiently. The quality is outstanding and he cleaned up after himself. Highly recommended!',
    date: '2024-02-15',
    timeSpent: '6 hours',
    amount: 25000,
    status: 'published',
    photos: [
      'https://images.unsplash.com/photo-1584622781584-8e2e3ab9058d?w=200',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200'
    ],
    fundiResponse: {
      message: 'Thank you so much for the kind review! It was a pleasure working on your kitchen. Please don\'t hesitate to reach out if you need any future plumbing services.',
      date: '2024-02-16'
    }
  },
  {
    id: 2,
    fundi: {
      name: 'Peter Kiprotich',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    },
    service: 'Electrical Wiring Repair',
    rating: 4,
    comment: 'Peter resolved my electrical issues quickly and safely. He explained what was wrong and how he fixed it. The only minor issue was that he arrived slightly late, but the work quality was excellent.',
    date: '2024-02-10',
    timeSpent: '3 hours',
    amount: 15000,
    status: 'published',
    photos: [],
    fundiResponse: {
      message: 'I apologize for the slight delay - there was unexpected traffic. Thank you for understanding and for the positive feedback!',
      date: '2024-02-11'
    }
  },
  {
    id: 3,
    fundi: {
      name: 'David Ochieng',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
    },
    service: 'Custom Furniture Making',
    rating: 5,
    comment: 'David created a beautiful custom bookshelf for my home office. The craftsmanship is exceptional and he paid attention to every detail. Worth every penny!',
    date: '2024-02-05',
    timeSpent: '2 days',
    amount: 45000,
    status: 'published',
    photos: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200'
    ],
    fundiResponse: null
  },
  {
    id: 4,
    fundi: {
      name: 'Sarah Wanjiku',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100'
    },
    service: 'House Cleaning Service',
    rating: 3,
    comment: 'Sarah did a decent job cleaning my house. Some areas could have been cleaned more thoroughly, but overall it was acceptable. I might give her another chance to improve.',
    date: '2024-01-28',
    timeSpent: '4 hours',
    amount: 8000,
    status: 'published',
    photos: [],
    fundiResponse: {
      message: 'Thank you for the feedback. I take note of your concerns and will ensure to be more thorough in future cleanings. I appreciate the opportunity to improve.',
      date: '2024-01-29'
    }
  },
  {
    id: 5,
    fundi: {
      name: 'Michael Otieno',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
    },
    service: 'Garden Landscaping',
    rating: 5,
    comment: 'Michael transformed my garden completely! The design is beautiful and he used quality plants. His team was professional and finished on time.',
    date: '2024-01-20',
    timeSpent: '3 days',
    amount: 35000,
    status: 'pending',
    photos: [
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200',
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=200'
    ],
    fundiResponse: null
  }
])

// Computed
const filteredReviews = computed(() => {
  let filtered = reviews.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(review => 
      review.fundi.name.toLowerCase().includes(query) ||
      review.service.toLowerCase().includes(query) ||
      review.comment.toLowerCase().includes(query)
    )
  }

  if (ratingFilter.value) {
    filtered = filtered.filter(review => review.rating === parseInt(ratingFilter.value))
  }

  if (statusFilter.value) {
    filtered = filtered.filter(review => review.status === statusFilter.value)
  }

  // Sort
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'rating':
        return b.rating - a.rating
      case 'fundi':
        return a.fundi.name.localeCompare(b.fundi.name)
      case 'date':
      default:
        return new Date(b.date) - new Date(a.date)
    }
  })

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredReviews.value.length / itemsPerPage.value))

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, start + 4)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

const paginatedReviews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredReviews.value.slice(start, end)
})

// Methods
const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getStatusColor = (status) => {
  switch (status) {
    case 'published':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'draft':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const writeReview = () => {
  console.log('Opening write review modal...')
}

const editReview = (review) => {
  console.log('Editing review:', review.id)
}

const deleteReview = (reviewId) => {
  if (confirm('Are you sure you want to delete this review?')) {
    reviews.value = reviews.value.filter(r => r.id !== reviewId)
  }
}

const shareReview = (review) => {
  console.log('Sharing review:', review.id)
}

const viewPhoto = (photo) => {
  console.log('Viewing photo:', photo)
}

const exportReviews = () => {
  console.log('Exporting reviews...')
}

// Pagination methods
const goToPage = (page) => {
  currentPage.value = page
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
</script>
