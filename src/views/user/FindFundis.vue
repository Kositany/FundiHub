<template>
  <DashboardLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Find Fundis</h1>
            <p class="text-gray-600">Discover skilled professionals for your next project</p>
          </div>
          <div class="flex space-x-3">
            <button @click="showFilters = !showFilters" class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
              <span class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                </svg>
                <span>Filters</span>
              </span>
            </button>
            <button @click="saveSearch" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <span class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                </svg>
                <span>Save Search</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex space-x-4">
          <div class="flex-1">
            <input 
              v-model="searchQuery"
              type="text"
              placeholder="Search for services, skills, or specialties..."
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          <div class="flex space-x-3">
            <select v-model="selectedLocation" class="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Locations</option>
              <option value="nairobi-cbd">Nairobi CBD</option>
              <option value="westlands">Westlands</option>
              <option value="karen">Karen</option>
              <option value="kilimani">Kilimani</option>
              <option value="kileleshwa">Kileleshwa</option>
            </select>
            <button @click="searchFundis" class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Search
            </button>
          </div>
        </div>
      </div>

      <!-- Filters Panel -->
      <div v-if="showFilters" class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Filter Results</h3>
        <div class="grid md:grid-cols-4 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Service Category</label>
            <select v-model="filters.category" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Categories</option>
              <option value="plumbing">Plumbing</option>
              <option value="electrical">Electrical</option>
              <option value="carpentry">Carpentry</option>
              <option value="painting">Painting</option>
              <option value="roofing">Roofing</option>
              <option value="tiling">Tiling</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
            <select v-model="filters.experience" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Any Experience</option>
              <option value="1-2">1-2 years</option>
              <option value="3-5">3-5 years</option>
              <option value="6-10">6-10 years</option>
              <option value="10+">10+ years</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Price Range (KES/hour)</label>
            <select v-model="filters.priceRange" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Any Price</option>
              <option value="500-1000">500 - 1,000</option>
              <option value="1000-2000">1,000 - 2,000</option>
              <option value="2000-3000">2,000 - 3,000</option>
              <option value="3000+">3,000+</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <select v-model="filters.rating" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Any Rating</option>
              <option value="4.5+">4.5+ Stars</option>
              <option value="4.0+">4.0+ Stars</option>
              <option value="3.5+">3.5+ Stars</option>
            </select>
          </div>
        </div>
        <div class="mt-4 flex items-center space-x-4">
          <label class="flex items-center">
            <input v-model="filters.availableNow" type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
            <span class="ml-2 text-sm text-gray-700">Available Now</span>
          </label>
          <label class="flex items-center">
            <input v-model="filters.emergencyService" type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
            <span class="ml-2 text-sm text-gray-700">Emergency Service</span>
          </label>
          <label class="flex items-center">
            <input v-model="filters.verified" type="checkbox" class="rounded border-gray-300 text-blue-600 focus:ring-blue-500">
            <span class="ml-2 text-sm text-gray-700">Verified Only</span>
          </label>
        </div>
      </div>

      <!-- Results Section -->
      <div class="flex items-center justify-between bg-white rounded-lg shadow p-4">
        <div class="flex items-center space-x-4">
          <span class="text-gray-700">{{ filteredFundis.length }} fundis found</span>
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-500">Sort by:</span>
            <select v-model="sortBy" class="text-sm border border-gray-300 rounded px-2 py-1">
              <option value="relevance">Relevance</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="experience">Most Experienced</option>
              <option value="distance">Nearest</option>
            </select>
          </div>
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

      <!-- Fundis Grid -->
      <div v-if="viewMode === 'grid'" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="fundi in filteredFundis" :key="fundi.id" class="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
          <div class="relative">
            <img :src="fundi.avatar" :alt="fundi.name" class="w-full h-48 object-cover">
            <div class="absolute top-4 right-4">
              <button @click="toggleFavorite(fundi)" :class="fundi.isFavorite ? 'text-red-500' : 'text-white'" class="p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70">
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
                <button @click="viewProfile(fundi)" class="text-blue-600 hover:text-blue-800 text-sm font-medium">View Profile</button>
                <button @click="bookFundi(fundi)" class="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">Book Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Fundis List -->
      <div v-if="viewMode === 'list'" class="space-y-4">
        <div v-for="fundi in filteredFundis" :key="fundi.id" class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
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
                <button @click="toggleFavorite(fundi)" :class="fundi.isFavorite ? 'text-red-500' : 'text-gray-400'" class="p-2 hover:text-red-500">
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

      <!-- No Results -->
      <div v-if="filteredFundis.length === 0" class="bg-white rounded-lg shadow p-12 text-center">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No fundis found</h3>
        <p class="text-gray-500 mb-4">Try adjusting your search criteria or filters</p>
        <button @click="clearFilters" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Clear Filters</button>
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
const selectedLocation = ref('')
const showFilters = ref(false)
const viewMode = ref('grid')
const sortBy = ref('relevance')

const filters = ref({
  category: '',
  experience: '',
  priceRange: '',
  rating: '',
  availableNow: false,
  emergencyService: false,
  verified: false
})

// Sample fundis data
const fundis = ref([
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
    isFavorite: false
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
    isFavorite: true
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
    isFavorite: false
  },
  {
    id: 4,
    name: 'Samuel Njoroge',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200',
    specialty: 'Professional Painter & Decorator',
    experience: '5 years experience',
    location: 'Nairobi CBD',
    rating: 4.6,
    reviews: 156,
    hourlyRate: 800,
    available: true,
    verified: false,
    category: 'painting',
    isFavorite: false
  },
  {
    id: 5,
    name: 'Michael Wanjiku',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=200',
    specialty: 'Roofing Specialist & Waterproofing',
    experience: '10 years experience',
    location: 'Kileleshwa, Nairobi',
    rating: 4.9,
    reviews: 178,
    hourlyRate: 1800,
    available: false,
    verified: true,
    category: 'roofing',
    isFavorite: false
  },
  {
    id: 6,
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
    isFavorite: true
  }
])

// Computed
const filteredFundis = computed(() => {
  let filtered = fundis.value

  // Apply search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(fundi => 
      fundi.name.toLowerCase().includes(query) ||
      fundi.specialty.toLowerCase().includes(query)
    )
  }

  // Apply location filter
  if (selectedLocation.value) {
    filtered = filtered.filter(fundi => 
      fundi.location.toLowerCase().includes(selectedLocation.value.replace('-', ' '))
    )
  }

  // Apply filters
  if (filters.value.category) {
    filtered = filtered.filter(fundi => fundi.category === filters.value.category)
  }

  if (filters.value.experience) {
    // This would need more sophisticated matching in a real app
    filtered = filtered.filter(fundi => fundi.experience.includes(filters.value.experience))
  }

  if (filters.value.rating) {
    const minRating = parseFloat(filters.value.rating.replace('+', ''))
    filtered = filtered.filter(fundi => fundi.rating >= minRating)
  }

  if (filters.value.availableNow) {
    filtered = filtered.filter(fundi => fundi.available)
  }

  if (filters.value.verified) {
    filtered = filtered.filter(fundi => fundi.verified)
  }

  // Apply sorting
  switch (sortBy.value) {
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating)
      break
    case 'price-low':
      filtered.sort((a, b) => a.hourlyRate - b.hourlyRate)
      break
    case 'price-high':
      filtered.sort((a, b) => b.hourlyRate - a.hourlyRate)
      break
    case 'experience':
      filtered.sort((a, b) => {
        const aYears = parseInt(a.experience.match(/\d+/)[0])
        const bYears = parseInt(b.experience.match(/\d+/)[0])
        return bYears - aYears
      })
      break
    default:
      // Relevance - keep original order
      break
  }

  return filtered
})

// Methods
const searchFundis = () => {
  console.log('Searching fundis with query:', searchQuery.value)
}

const saveSearch = () => {
  console.log('Saving search criteria...')
}

const toggleFavorite = (fundi) => {
  fundi.isFavorite = !fundi.isFavorite
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

const clearFilters = () => {
  searchQuery.value = ''
  selectedLocation.value = ''
  filters.value = {
    category: '',
    experience: '',
    priceRange: '',
    rating: '',
    availableNow: false,
    emergencyService: false,
    verified: false
  }
}
</script>
