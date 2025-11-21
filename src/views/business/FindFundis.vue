<template>
  <DashboardLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Find Fundis</h1>
            <p class="text-gray-600">Discover skilled professionals for your projects</p>
          </div>
          <div class="flex space-x-3">
            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <span class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span>Post Job</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="grid md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Search Fundis</label>
            <input 
              v-model="searchQuery"
              type="text"
              placeholder="Search by name, skill, or location..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select v-model="selectedCategory" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Categories</option>
              <option value="plumbing">Plumbing</option>
              <option value="electrical">Electrical</option>
              <option value="carpentry">Carpentry</option>
              <option value="painting">Painting</option>
              <option value="masonry">Masonry</option>
              <option value="roofing">Roofing</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input 
              v-model="locationFilter"
              type="text"
              placeholder="Enter location..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
            <select v-model="budgetRange" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Any Budget</option>
              <option value="0-1000">$0 - $1,000</option>
              <option value="1000-5000">$1,000 - $5,000</option>
              <option value="5000-10000">$5,000 - $10,000</option>
              <option value="10000+">$10,000+</option>
            </select>
          </div>
        </div>
        
        <div class="mt-4 flex flex-wrap gap-2">
          <span class="text-sm text-gray-600">Quick filters:</span>
          <button 
            v-for="filter in quickFilters" 
            :key="filter"
            @click="applyQuickFilter(filter)"
            class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200"
          >
            {{ filter }}
          </button>
        </div>
      </div>

      <!-- Fundis Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="fundi in filteredFundis" :key="fundi.id" class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
          <div class="p-6">
            <!-- Fundi Header -->
            <div class="flex items-center space-x-4 mb-4">
              <div class="relative">
                <img :src="fundi.avatar" :alt="fundi.name" class="w-16 h-16 rounded-full object-cover">
                <div v-if="fundi.isOnline" class="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full"></div>
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900">{{ fundi.name }}</h3>
                <p class="text-sm text-gray-600">{{ fundi.specialization }}</p>
                <div class="flex items-center space-x-1 mt-1">
                  <div class="flex text-yellow-400">
                    <svg v-for="i in 5" :key="i" class="w-3 h-3" :class="i <= fundi.rating ? 'fill-current' : 'fill-gray-300'" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <span class="text-xs text-gray-500">({{ fundi.reviewCount }})</span>
                </div>
              </div>
            </div>

            <!-- Skills -->
            <div class="mb-4">
              <div class="flex flex-wrap gap-1">
                <span v-for="skill in fundi.skills.slice(0, 3)" :key="skill" class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {{ skill }}
                </span>
                <span v-if="fundi.skills.length > 3" class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{{ fundi.skills.length - 3 }} more
                </span>
              </div>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-2 mb-4 text-center">
              <div class="bg-gray-50 rounded p-2">
                <div class="text-sm font-semibold text-gray-900">${{ fundi.hourlyRate }}</div>
                <div class="text-xs text-gray-600">per hour</div>
              </div>
              <div class="bg-gray-50 rounded p-2">
                <div class="text-sm font-semibold text-gray-900">{{ fundi.completedJobs }}</div>
                <div class="text-xs text-gray-600">jobs done</div>
              </div>
              <div class="bg-gray-50 rounded p-2">
                <div class="text-sm font-semibold text-gray-900">{{ fundi.responseTime }}</div>
                <div class="text-xs text-gray-600">response</div>
              </div>
            </div>

            <!-- Location & Availability -->
            <div class="flex items-center justify-between text-sm text-gray-600 mb-4">
              <span class="flex items-center space-x-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span>{{ fundi.location }}</span>
              </span>
              <span :class="fundi.available ? 'text-green-600' : 'text-red-600'">
                {{ fundi.available ? 'Available' : 'Busy' }}
              </span>
            </div>

            <!-- Actions -->
            <div class="flex space-x-2">
              <button @click="viewProfile(fundi)" class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm">
                View Profile
              </button>
              <button @click="sendMessage(fundi)" class="bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 text-sm">
                Message
              </button>
              <button @click="toggleFavorite(fundi)" class="bg-gray-100 text-gray-700 py-2 px-2 rounded-md hover:bg-gray-200">
                <svg class="w-4 h-4" :class="fundi.isFavorite ? 'fill-red-500 text-red-500' : 'fill-none'" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More -->
      <div v-if="hasMore" class="text-center">
        <button @click="loadMore" :disabled="loading" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50">
          {{ loading ? 'Loading...' : 'Load More Fundis' }}
        </button>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import DashboardLayout from '@/components/navigation/DashboardLayout.vue'

// State
const searchQuery = ref('')
const selectedCategory = ref('')
const locationFilter = ref('')
const budgetRange = ref('')
const loading = ref(false)
const hasMore = ref(true)

const quickFilters = ['Top Rated', 'Available Now', 'Verified', 'Near Me', 'New Fundis']

// Sample data
const fundis = ref([
  {
    id: 1,
    name: 'John Mwangi',
    specialization: 'Master Plumber',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    rating: 4.8,
    reviewCount: 127,
    skills: ['Plumbing', 'Pipe Installation', 'Drainage', 'Water Heating'],
    hourlyRate: 25,
    completedJobs: 89,
    responseTime: '2h',
    location: 'Nairobi, Kenya',
    available: true,
    isOnline: true,
    isFavorite: false
  },
  {
    id: 2,
    name: 'Grace Wanjiku',
    specialization: 'Electrical Contractor',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b120?w=150',
    rating: 4.9,
    reviewCount: 203,
    skills: ['Electrical Wiring', 'Solar Installation', 'Lighting', 'Safety Systems'],
    hourlyRate: 30,
    completedJobs: 156,
    responseTime: '1h',
    location: 'Kampala, Uganda',
    available: true,
    isOnline: false,
    isFavorite: true
  },
  {
    id: 3,
    name: 'David Kiprotich',
    specialization: 'Carpenter & Joiner',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    rating: 4.7,
    reviewCount: 95,
    skills: ['Custom Furniture', 'Cabinet Making', 'Woodwork', 'Repairs'],
    hourlyRate: 20,
    completedJobs: 73,
    responseTime: '4h',
    location: 'Mombasa, Kenya',
    available: false,
    isOnline: true,
    isFavorite: false
  }
])

// Computed
const filteredFundis = computed(() => {
  let filtered = fundis.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(fundi => 
      fundi.name.toLowerCase().includes(query) ||
      fundi.specialization.toLowerCase().includes(query) ||
      fundi.skills.some(skill => skill.toLowerCase().includes(query)) ||
      fundi.location.toLowerCase().includes(query)
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(fundi => 
      fundi.skills.some(skill => skill.toLowerCase().includes(selectedCategory.value.toLowerCase()))
    )
  }

  if (locationFilter.value) {
    filtered = filtered.filter(fundi => 
      fundi.location.toLowerCase().includes(locationFilter.value.toLowerCase())
    )
  }

  return filtered
})

// Methods
const viewProfile = (fundi) => {
  console.log('Viewing profile for:', fundi.name)
  // Navigate to fundi profile page
}

const sendMessage = (fundi) => {
  console.log('Sending message to:', fundi.name)
  // Open message composer
}

const toggleFavorite = (fundi) => {
  fundi.isFavorite = !fundi.isFavorite
  console.log('Toggled favorite for:', fundi.name)
}

const applyQuickFilter = (filter) => {
  console.log('Applied quick filter:', filter)
  // Apply specific filter logic
}

const loadMore = () => {
  loading.value = true
  // Simulate loading more fundis
  setTimeout(() => {
    loading.value = false
    hasMore.value = false
  }, 2000)
}

onMounted(() => {
  // Load initial data
})
</script>
