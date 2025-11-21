<template>
  <DashboardLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">My Favorites</h1>
            <p class="text-gray-600">Your saved fundis and preferred service providers</p>
          </div>
          <div class="flex space-x-3">
            <button @click="clearAllFavorites" class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
              <span class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                <span>Clear All</span>
              </span>
            </button>
            <router-link to="/user/find-fundis" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <span class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <span>Find More Fundis</span>
              </span>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Favorites Stats -->
      <div class="grid md:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-red-100 rounded-lg">
              <svg class="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Favorites</p>
              <p class="text-2xl font-semibold text-gray-900">{{ favorites.length }}</p>
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
              <p class="text-sm font-medium text-gray-600">Available Now</p>
              <p class="text-2xl font-semibold text-gray-900">{{ availableFavorites }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Booked Before</p>
              <p class="text-2xl font-semibold text-gray-900">{{ bookedBefore }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-yellow-100 rounded-lg">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Avg Rating</p>
              <p class="text-2xl font-semibold text-gray-900">{{ averageRating }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter and Search -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <input 
              v-model="searchQuery"
              type="text"
              placeholder="Search favorites..."
              class="w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            <select v-model="categoryFilter" class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Categories</option>
              <option value="plumbing">Plumbing</option>
              <option value="electrical">Electrical</option>
              <option value="carpentry">Carpentry</option>
              <option value="painting">Painting</option>
              <option value="roofing">Roofing</option>
              <option value="tiling">Tiling</option>
            </select>
            <select v-model="availabilityFilter" class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Availability</option>
              <option value="available">Available Now</option>
              <option value="busy">Busy</option>
            </select>
          </div>
          <div class="flex items-center space-x-2">
            <button @click="viewMode = 'grid'" :class="viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'" class="p-2 rounded">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
            </button>
            <button @click="viewMode = 'list'" :class="viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'" class="p-2 rounded">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Favorites Grid -->
      <div v-if="viewMode === 'grid'" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="fundi in filteredFavorites" :key="fundi.id" class="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
          <div class="relative">
            <img :src="fundi.avatar" :alt="fundi.name" class="w-full h-48 object-cover">
            <div class="absolute top-4 right-4">
              <button @click="removeFavorite(fundi)" class="p-2 rounded-full bg-red-500 text-white hover:bg-red-600">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
            <div v-if="fundi.available" class="absolute top-4 left-4">
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                Available Now
              </span>
            </div>
            <div v-if="fundi.hasWorkedWith" class="absolute bottom-4 left-4">
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                Worked Together
              </span>
            </div>
          </div>
          <div class="p-6">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-lg font-semibold text-gray-900">{{ fundi.name }}</h3>
              <div class="flex items-center space-x-1">
                <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span class="text-sm text-gray-600">{{ fundi.rating }} ({{ fundi.reviews }})</span>
              </div>
            </div>
            <p class="text-sm text-gray-600 mb-2">{{ fundi.specialty }}</p>
            <p class="text-sm text-gray-500 mb-4">{{ fundi.experience }} • {{ fundi.location }}</p>
            <div class="flex items-center justify-between">
              <span class="text-lg font-semibold text-blue-600">KES {{ fundi.hourlyRate }}/hr</span>
              <div class="flex space-x-2">
                <button @click="viewProfile(fundi)" class="text-blue-600 hover:text-blue-800 text-sm font-medium">View</button>
                <button @click="bookFundi(fundi)" class="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">Book</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Favorites List -->
      <div v-if="viewMode === 'list'" class="space-y-4">
        <div v-for="fundi in filteredFavorites" :key="fundi.id" class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center space-x-6">
            <div class="relative">
              <img :src="fundi.avatar" :alt="fundi.name" class="w-20 h-20 rounded-lg object-cover">
              <div v-if="fundi.available" class="absolute -top-1 -right-1">
                <span class="inline-flex w-3 h-3 bg-green-400 rounded-full"></span>
              </div>
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-xl font-semibold text-gray-900">{{ fundi.name }}</h3>
                <button @click="removeFavorite(fundi)" class="p-2 text-red-500 hover:text-red-700">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
                  </svg>
                </button>
              </div>
              <p class="text-gray-600 mb-2">{{ fundi.specialty }}</p>
              <p class="text-sm text-gray-500 mb-3">{{ fundi.experience }} • {{ fundi.location }}</p>
              <div class="flex items-center space-x-6 mb-3">
                <div class="flex items-center space-x-1">
                  <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <span class="text-sm text-gray-600">{{ fundi.rating }} ({{ fundi.reviews }} reviews)</span>
                </div>
                <span class="text-lg font-semibold text-blue-600">KES {{ fundi.hourlyRate }}/hr</span>
                <div v-if="fundi.available" class="flex items-center space-x-1 text-green-600">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="text-sm font-medium">Available Now</span>
                </div>
                <div v-if="fundi.hasWorkedWith" class="flex items-center space-x-1 text-blue-600">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span class="text-sm font-medium">Worked Together</span>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <button @click="viewProfile(fundi)" class="text-blue-600 hover:text-blue-800 font-medium">View Profile</button>
                <button @click="contactFundi(fundi)" class="text-gray-600 hover:text-gray-800 font-medium">Contact</button>
                <button @click="bookFundi(fundi)" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Book Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Favorites -->
      <div v-if="filteredFavorites.length === 0" class="bg-white rounded-lg shadow p-12 text-center">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No favorites found</h3>
        <p class="text-gray-500 mb-4">You haven't saved any fundis yet or no favorites match your search criteria</p>
        <router-link to="/user/find-fundis" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Find Fundis to Favorite
        </router-link>
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
const categoryFilter = ref('')
const availabilityFilter = ref('')
const viewMode = ref('grid')

// Sample favorites data
const favorites = ref([
  {
    id: 1,
    name: 'John Mwangi',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    specialty: 'Licensed Plumber & Water Systems Expert',
    experience: '8 years experience',
    location: 'Westlands, Nairobi',
    rating: 4.9,
    reviews: 127,
    hourlyRate: 1500,
    available: true,
    verified: true,
    category: 'plumbing',
    hasWorkedWith: true,
    addedDate: '2024-02-15'
  },
  {
    id: 2,
    name: 'Peter Kiprotich',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    specialty: 'Master Electrician & Solar Installer',
    experience: '12 years experience',
    location: 'Karen, Nairobi',
    rating: 4.8,
    reviews: 203,
    hourlyRate: 2000,
    available: false,
    verified: true,
    category: 'electrical',
    hasWorkedWith: true,
    addedDate: '2024-02-10'
  },
  {
    id: 3,
    name: 'David Ochieng',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    specialty: 'Custom Carpentry & Furniture Making',
    experience: '6 years experience',
    location: 'Kilimani, Nairobi',
    rating: 4.7,
    reviews: 89,
    hourlyRate: 1200,
    available: true,
    verified: true,
    category: 'carpentry',
    hasWorkedWith: false,
    addedDate: '2024-02-08'
  },
  {
    id: 4,
    name: 'Joseph Mutua',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    specialty: 'Tile Installation & Bathroom Renovation',
    experience: '7 years experience',
    location: 'Westlands, Nairobi',
    rating: 4.8,
    reviews: 134,
    hourlyRate: 1300,
    available: true,
    verified: true,
    category: 'tiling',
    hasWorkedWith: true,
    addedDate: '2024-02-05'
  }
])

// Computed
const filteredFavorites = computed(() => {
  let filtered = favorites.value

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(fundi => 
      fundi.name.toLowerCase().includes(query) ||
      fundi.specialty.toLowerCase().includes(query)
    )
  }

  // Apply category filter
  if (categoryFilter.value) {
    filtered = filtered.filter(fundi => fundi.category === categoryFilter.value)
  }

  // Apply availability filter
  if (availabilityFilter.value === 'available') {
    filtered = filtered.filter(fundi => fundi.available)
  } else if (availabilityFilter.value === 'busy') {
    filtered = filtered.filter(fundi => !fundi.available)
  }

  return filtered.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate))
})

const availableFavorites = computed(() => {
  return favorites.value.filter(fundi => fundi.available).length
})

const bookedBefore = computed(() => {
  return favorites.value.filter(fundi => fundi.hasWorkedWith).length
})

const averageRating = computed(() => {
  if (favorites.value.length === 0) return 0
  const sum = favorites.value.reduce((acc, fundi) => acc + fundi.rating, 0)
  return (sum / favorites.value.length).toFixed(1)
})

// Methods
const removeFavorite = (fundi) => {
  const index = favorites.value.findIndex(f => f.id === fundi.id)
  if (index > -1) {
    favorites.value.splice(index, 1)
  }
}

const clearAllFavorites = () => {
  if (confirm('Are you sure you want to remove all favorites?')) {
    favorites.value = []
  }
}

const viewProfile = (fundi) => {
  router.push(`/fundi/${fundi.id}`)
}

const contactFundi = (fundi) => {
  console.log('Contacting fundi:', fundi.name)
}

const bookFundi = (fundi) => {
  router.push(`/book/${fundi.id}`)
}
</script>
