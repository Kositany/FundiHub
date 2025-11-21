<template>
  <DashboardLayout>
    <div class="px-4 sm:px-6 lg:px-8 py-8">
      <!-- Welcome Header -->
      <div class="mb-8">
        <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden">
          <div class="absolute inset-0 bg-black/10"></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <img
                  :src="authStore.user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(authStore.user?.name || 'User')}&background=3b82f6&color=fff&size=80`"
                  :alt="authStore.user?.name"
                  class="h-20 w-20 rounded-full border-4 border-white/30 shadow-lg"
                />
                <div>
                  <h1 class="text-3xl font-bold">Welcome back, {{ authStore.user?.name }}!</h1>
                  <p class="text-blue-100 mt-2 text-lg">Ready to find the perfect fundi for your next project?</p>
                  <div class="flex items-center mt-3">
                    <div class="bg-white/20 rounded-full px-3 py-1 text-sm">
                      Profile {{ profileCompletion }}% complete
                    </div>
                    <button
                      @click="showProfileModal = true"
                      class="ml-3 text-sm text-blue-100 hover:text-white underline"
                    >
                      Complete Profile
                    </button>
                  </div>
                </div>
              </div>
              <div class="hidden lg:block">
                <div class="bg-white/20 rounded-full p-4 backdrop-blur-sm">
                  <UserIcon class="h-10 w-10" />
                </div>
              </div>
            </div>
            
            <!-- User Stats Overview -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div class="text-3xl font-bold">{{ userStats.totalBookings }}</div>
                <div class="text-sm text-blue-100 mt-1">Total Bookings</div>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div class="text-3xl font-bold">{{ userStats.activeProjects }}</div>
                <div class="text-sm text-blue-100 mt-1">Active Projects</div>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div class="text-3xl font-bold">{{ userStats.savedFundis }}</div>
                <div class="text-sm text-blue-100 mt-1">Saved Fundis</div>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div class="text-3xl font-bold">{{ userStats.totalReviews }}</div>
                <div class="text-sm text-blue-100 mt-1">Reviews Given</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            @click="findFundis"
            class="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
          >
            <MagnifyingGlassIcon class="h-8 w-8 text-blue-600 mb-3" />
            <span class="text-sm font-medium text-gray-900 dark:text-white">Find Fundis</span>
          </button>
          
          <button
            @click="viewBookings"
            class="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
          >
            <CalendarIcon class="h-8 w-8 text-blue-600 mb-3" />
            <span class="text-sm font-medium text-gray-900 dark:text-white">View All Bookings</span>
          </button>
          
          <button
            @click="emergencyRequest"
            class="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-600"
          >
            <ExclamationTriangleIcon class="h-8 w-8 text-red-600 mb-3" />
            <span class="text-sm font-medium text-gray-900 dark:text-white">Emergency Request</span>
          </button>
          
          <button
            @click="viewProfile"
            class="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
          >
            <UserCircleIcon class="h-8 w-8 text-blue-600 mb-3" />
            <span class="text-sm font-medium text-gray-900 dark:text-white">View Profile</span>
          </button>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Current Bookings -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Current Bookings</h3>
                <router-link
                  to="/bookings"
                  class="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  View All
                </router-link>
              </div>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div
                  v-for="booking in currentBookings"
                  :key="booking.id"
                  class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                      <img
                        :src="booking.fundiAvatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(booking.fundiName)}&background=3b82f6&color=fff&size=40`"
                        :alt="booking.fundiName"
                        class="h-10 w-10 rounded-full"
                      />
                    </div>
                    <div>
                      <h4 class="text-sm font-medium text-gray-900 dark:text-white">{{ booking.service }}</h4>
                      <p class="text-sm text-gray-500 dark:text-gray-400">{{ booking.fundiName }}</p>
                      <p class="text-xs text-gray-400 dark:text-gray-500">{{ formatDate(booking.scheduledDate) }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <span
                      :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      ]"
                    >
                      {{ booking.status }}
                    </span>
                    <p class="text-sm font-medium text-gray-900 dark:text-white mt-1">{{ formatCurrency(booking.price) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recommended Fundis -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Recommended Fundis</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Based on your previous bookings and location</p>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  v-for="fundi in recommendedFundis"
                  :key="fundi.id"
                  class="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                  @click="viewFundiProfile(fundi.id)"
                >
                  <img
                    :src="fundi.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(fundi.name)}&background=10b981&color=fff&size=48`"
                    :alt="fundi.name"
                    class="h-12 w-12 rounded-full"
                  />
                  <div class="flex-1">
                    <h4 class="text-sm font-medium text-gray-900 dark:text-white">{{ fundi.name }}</h4>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ fundi.specialization }}</p>
                    <div class="flex items-center mt-1">
                      <StarIcon class="h-4 w-4 text-yellow-400 fill-current" />
                      <span class="text-sm text-gray-600 dark:text-gray-300 ml-1">{{ fundi.rating }}</span>
                      <span class="text-sm text-gray-400 dark:text-gray-500 ml-2">{{ fundi.location }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-8">
          <!-- Recent Activity -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div
                  v-for="activity in recentActivity"
                  :key="activity.id"
                  class="flex items-start space-x-3"
                >
                  <div class="flex-shrink-0">
                    <div class="h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <component :is="activity.icon" class="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div class="flex-1">
                    <p class="text-sm text-gray-900 dark:text-white">{{ activity.title }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ activity.description }}</p>
                    <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">{{ formatDate(activity.timestamp) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Saved Searches -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Saved Searches</h3>
            </div>
            <div class="p-6">
              <div class="space-y-3">
                <div
                  v-for="search in savedSearches"
                  :key="search.id"
                  class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                  @click="executeSearch(search)"
                >
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ search.name }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ search.criteria }}</p>
                  </div>
                  <ChevronRightIcon class="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Spending Analytics -->
      <div class="mt-8">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Spending Analytics</h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="text-center">
                <div class="text-3xl font-bold text-blue-600">{{ formatCurrency(spendingData.thisMonth) }}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">This Month</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-green-600">{{ formatCurrency(spendingData.average) }}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">Monthly Average</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-purple-600">{{ spendingData.topCategory }}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">Top Category</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile Customization Modal -->
      <ProfileCustomizationModal
        :is-open="showProfileModal"
        @close="showProfileModal = false"
      />
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useNotifications } from '@/composables/useNotifications'
import DashboardLayout from '@/components/navigation/DashboardLayout.vue'
import ProfileCompletionCard from '@/components/profile/ProfileCompletionCard.vue'
import ProfileCustomizationModal from '@/components/profile/ProfileCustomizationModal.vue'
import {
  UserIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  ExclamationTriangleIcon,
  UserCircleIcon,
  StarIcon,
  ChevronRightIcon,
  ClockIcon,
  CheckCircleIcon,
  HeartIcon
} from '@heroicons/vue/24/outline'

// Stores and composables
const router = useRouter()
const authStore = useAuthStore()
const { showSuccess, showError } = useNotifications()

// Reactive state
const showProfileModal = ref(false)

// User Statistics
const userStats = ref({
  totalBookings: 12,
  activeProjects: 3,
  savedFundis: 8,
  totalReviews: 7
})

// Current Bookings
const currentBookings = ref([
  {
    id: 1,
    service: 'Plumbing Repair',
    fundiName: 'John Mwangi',
    fundiAvatar: null,
    scheduledDate: '2024-08-28T10:00:00Z',
    status: 'confirmed',
    price: 2500
  },
  {
    id: 2,
    service: 'House Painting',
    fundiName: 'Grace Wanjiku',
    fundiAvatar: null,
    scheduledDate: '2024-08-30T08:00:00Z',
    status: 'pending',
    price: 15000
  },
  {
    id: 3,
    service: 'Garden Maintenance',
    fundiName: 'Peter Kamau',
    fundiAvatar: null,
    scheduledDate: '2024-09-02T14:00:00Z',
    status: 'in-progress',
    price: 3000
  }
])

// Recommended Fundis
const recommendedFundis = ref([
  {
    id: 1,
    name: 'Samuel Kiprotich',
    specialization: 'Electrical Work',
    rating: 4.8,
    location: 'Westlands',
    avatar: null
  },
  {
    id: 2,
    name: 'Mary Nyong\'o',
    specialization: 'House Cleaning',
    rating: 4.9,
    location: 'Karen',
    avatar: null
  },
  {
    id: 3,
    name: 'David Otieno',
    specialization: 'Carpentry',
    rating: 4.7,
    location: 'Kilimani',
    avatar: null
  },
  {
    id: 4,
    name: 'Jane Wambui',
    specialization: 'Catering',
    rating: 4.6,
    location: 'Lavington',
    avatar: null
  }
])

// Recent Activity
const recentActivity = ref([
  {
    id: 1,
    title: 'Booking confirmed',
    description: 'Your plumbing repair with John Mwangi is confirmed',
    timestamp: new Date().toISOString(),
    icon: CheckCircleIcon
  },
  {
    id: 2,
    title: 'Review submitted',
    description: 'You reviewed Grace Wanjiku\'s painting service',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    icon: StarIcon
  },
  {
    id: 3,
    title: 'Fundi saved',
    description: 'You saved Samuel Kiprotich to your favorites',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    icon: HeartIcon
  },
  {
    id: 4,
    title: 'Payment completed',
    description: 'Payment of KSh 2,500 for cleaning service',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    icon: CheckCircleIcon
  }
])

// Saved Searches
const savedSearches = ref([
  {
    id: 1,
    name: 'Plumbers in Westlands',
    criteria: 'Plumbing • Westlands • KSh 2,000-5,000'
  },
  {
    id: 2,
    name: 'Weekend Cleaners',
    criteria: 'Cleaning • Any location • Weekends'
  },
  {
    id: 3,
    name: 'Emergency Electricians',
    criteria: 'Electrical • 24/7 • Emergency'
  }
])

// Spending Data
const spendingData = ref({
  thisMonth: 8500,
  average: 6200,
  topCategory: 'Cleaning'
})

// Computed properties
const profileCompletion = computed(() => {
  let completion = 30 // Base completion
  if (authStore.user?.phone) completion += 20
  if (authStore.user?.location) completion += 25
  if (authStore.user?.preferences) completion += 25
  return Math.min(completion, 100)
})

// Methods
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0
  }).format(amount)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const findFundis = () => {
  router.push('/feed')
}

const viewBookings = () => {
  router.push('/bookings')
}

const emergencyRequest = () => {
  showSuccess('Emergency Request', 'Connecting you with available fundis...')
  router.push('/emergency-request')
}

const viewProfile = () => {
  router.push('/profile')
}

const viewFundiProfile = (fundiId) => {
  router.push(`/fundi/${fundiId}`)
}

const executeSearch = (search) => {
  showSuccess('Executing Search', `Loading results for "${search.name}"...`)
  router.push(`/feed?search=${encodeURIComponent(search.criteria)}`)
}

onMounted(() => {
  console.log('🏠 User dashboard loaded for:', authStore.user?.name)
})
</script>
