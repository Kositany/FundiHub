<template>
  <DashboardLayout>
    <div class="px-4 sm:px-6 lg:px-8 py-8">
      <!-- Welcome Header -->
      <div class="mb-8">
        <div class="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-6 text-white">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <img
                :src="authStore.user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(authStore.user?.name || 'Fundi')}&background=10b981&color=fff&size=64`"
                :alt="authStore.user?.name"
                class="h-16 w-16 rounded-full border-3 border-white/30"
              />
              <div>
                <h1 class="text-2xl font-bold">Welcome back, {{ authStore.user?.name }}!</h1>
                <p class="text-green-100 mt-1">Ready to help more customers with your expertise?</p>
                <button
                  @click="showProfileModal = true"
                  class="mt-2 text-sm text-green-100 hover:text-white underline flex items-center"
                >
                  <UserIcon class="h-4 w-4 mr-1" />
                  Customize Profile
                </button>
              </div>
            </div>
            <div class="hidden sm:block">
              <div class="bg-white/20 rounded-full p-3">
                <WrenchScrewdriverIcon class="h-8 w-8" />
              </div>
            </div>
          </div>
          
          <!-- Quick Stats -->
          <div class="grid grid-cols-4 gap-4 mt-6">
            <div class="text-center">
              <div class="text-2xl font-bold">{{ stats.totalBookings }}</div>
              <div class="text-sm text-green-100">Total Jobs</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold">{{ stats.activeBookings }}</div>
              <div class="text-sm text-green-100">Active</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold">{{ stats.rating }}</div>
              <div class="text-sm text-green-100">Rating</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold">KSH {{ stats.monthlyEarnings.toLocaleString() }}</div>
              <div class="text-sm text-green-100">This Month</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile Completion Card -->
      <div class="mb-8">
        <ProfileCompletionCard @customize="showProfileModal = true" />
      </div>

      <!-- Quick Actions -->
      <div class="mb-8">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <router-link
            v-for="action in quickActions"
            :key="action.name"
            :to="action.href"
            class="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary hover:shadow-lg transition-all group"
          >
            <div class="flex flex-col items-center text-center">
              <div class="p-3 bg-gray-100 dark:bg-gray-700 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                <component :is="action.icon" class="h-6 w-6" />
              </div>
              <h3 class="mt-3 text-sm font-medium text-gray-900 dark:text-white">{{ action.name }}</h3>
              <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">{{ action.description }}</p>
            </div>
          </router-link>
          <button
            @click="showPostJobModal = true"
            class="bg-gradient-to-r from-primary to-red-600 text-white p-6 rounded-xl hover:shadow-lg transition-all group"
          >
            <div class="flex flex-col items-center text-center">
              <div class="p-3 bg-white/20 rounded-full">
                <PlusIcon class="h-6 w-6" />
              </div>
              <h3 class="mt-3 text-sm font-medium">Post Service</h3>
              <p class="mt-1 text-xs opacity-90">Offer your skills</p>
            </div>
          </button>
        </div>
      </div>

      <!-- Today's Schedule -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Today's Schedule</h2>
          <router-link to="/fundi/bookings" class="text-primary hover:text-primary-dark text-sm font-medium">
            View all bookings
          </router-link>
        </div>

        <div v-if="todayBookings.length === 0" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
          <CalendarIcon class="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No bookings today</h3>
          <p class="text-gray-500 dark:text-gray-400 mb-4">You have a free day! Consider updating your profile or portfolio.</p>
          <router-link to="/fundi/profile" class="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
            <UserIcon class="h-4 w-4 mr-2" />
            Update Profile
          </router-link>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="booking in todayBookings"
            :key="booking.id"
            class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <img :src="booking.client.avatar" :alt="booking.client.name" class="h-12 w-12 rounded-full" />
                <div>
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">{{ booking.client.name }}</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ booking.service }}</p>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <span :class="[
                  'px-3 py-1 rounded-full text-xs font-medium',
                  booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  booking.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                ]">
                  {{ booking.status.replace('-', ' ') }}
                </span>
                <button class="text-primary hover:text-primary-dark">
                  <ChatBubbleLeftRightIcon class="h-5 w-5" />
                </button>
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div class="flex items-center">
                <ClockIcon class="h-4 w-4 mr-1" />
                {{ booking.time }} ({{ booking.duration }} hours)
              </div>
              <div class="flex items-center">
                <MapPinIcon class="h-4 w-4 mr-1" />
                {{ booking.location }}
              </div>
              <div class="flex items-center">
                <CurrencyDollarIcon class="h-4 w-4 mr-1" />
                KSH {{ booking.payment }}
              </div>
            </div>
            <div class="mt-4 flex space-x-2">
              <button v-if="booking.status === 'pending'" @click="acceptBooking(booking.id)" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm">
                Accept
              </button>
              <button v-if="booking.status === 'confirmed'" @click="startJob(booking.id)" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                Start Job
              </button>
              <button v-if="booking.status === 'in-progress'" @click="completeJob(booking.id)" class="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm">
                Mark Complete
              </button>
              <button @click="contactClient(booking.client.id)" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm">
                Contact Client
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Overview -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Earnings Chart -->
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Earnings</h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500 dark:text-gray-400">This Month</span>
              <span class="text-lg font-bold text-gray-900 dark:text-white">KSH {{ stats.monthlyEarnings.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500 dark:text-gray-400">Last Month</span>
              <span class="text-lg font-bold text-gray-900 dark:text-white">KSH {{ stats.lastMonthEarnings.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500 dark:text-gray-400">Growth</span>
              <span :class="[
                'text-lg font-bold',
                stats.growthPercentage >= 0 ? 'text-green-600' : 'text-red-600'
              ]">
                {{ stats.growthPercentage >= 0 ? '+' : '' }}{{ stats.growthPercentage }}%
              </span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-primary h-2 rounded-full" :style="`width: ${(stats.monthlyEarnings / 100000) * 100}%`"></div>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400">Progress towards KSH 100,000 monthly goal</p>
          </div>
        </div>

        <!-- Recent Reviews -->
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Recent Reviews</h3>
            <router-link to="/fundi/reviews" class="text-primary hover:text-primary-dark text-sm font-medium">
              View all
            </router-link>
          </div>
          
          <div v-if="recentReviews.length === 0" class="text-center py-8">
            <StarIcon class="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p class="text-gray-500 dark:text-gray-400">No reviews yet</p>
          </div>
          
          <div v-else class="space-y-4">
            <div
              v-for="review in recentReviews"
              :key="review.id"
              class="border-b border-gray-200 dark:border-gray-700 last:border-b-0 pb-4 last:pb-0"
            >
              <div class="flex items-start justify-between mb-2">
                <div class="flex items-center space-x-3">
                  <img :src="review.client.avatar" :alt="review.client.name" class="h-8 w-8 rounded-full" />
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ review.client.name }}</p>
                    <div class="flex items-center">
                      <div class="flex">
                        <StarIcon
                          v-for="star in 5"
                          :key="star"
                          :class="[
                            'h-4 w-4',
                            star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'
                          ]"
                        />
                      </div>
                      <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">{{ review.rating }}/5</span>
                    </div>
                  </div>
                </div>
                <span class="text-xs text-gray-500 dark:text-gray-400">{{ formatTimeAgo(review.date) }}</span>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ review.comment }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Pending Requests -->
      <div>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Pending Requests</h2>
          <span v-if="pendingRequests.length > 0" class="text-sm text-gray-500 dark:text-gray-400">
            {{ pendingRequests.length }} new request{{ pendingRequests.length !== 1 ? 's' : '' }}
          </span>
        </div>

        <div v-if="pendingRequests.length === 0" class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
          <ClipboardDocumentListIcon class="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No pending requests</h3>
          <p class="text-gray-500 dark:text-gray-400">All caught up! New booking requests will appear here.</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="request in pendingRequests"
            :key="request.id"
            class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex items-center space-x-3">
                <img :src="request.client.avatar" :alt="request.client.name" class="h-12 w-12 rounded-full" />
                <div>
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">{{ request.client.name }}</h3>
                  <p class="text-sm text-gray-500 dark:text-gray-400">{{ request.service }}</p>
                </div>
              </div>
              <span class="text-xs text-gray-500 dark:text-gray-400">{{ formatTimeAgo(request.requestDate) }}</span>
            </div>

            <div class="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
              <div class="flex items-center">
                <CalendarIcon class="h-4 w-4 mr-2" />
                {{ formatDate(request.preferredDate) }} at {{ request.preferredTime }}
              </div>
              <div class="flex items-center">
                <MapPinIcon class="h-4 w-4 mr-2" />
                {{ request.location }}
              </div>
              <div class="flex items-center">
                <CurrencyDollarIcon class="h-4 w-4 mr-2" />
                KSH {{ request.budget }} budget
              </div>
            </div>

            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{{ request.description }}</p>

            <div class="flex space-x-2">
              <button @click="acceptRequest(request.id)" class="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm">
                Accept
              </button>
              <button @click="declineRequest(request.id)" class="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm">
                Decline
              </button>
              <button @click="sendQuote(request.id)" class="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm">
                Send Quote
              </button>
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

    <!-- Post Job Modal -->
    <PostJobModal
      v-if="showPostJobModal"
      @close="showPostJobModal = false"
      @submit="handleJobPost"
    />

    <!-- Notifications Panel -->
    <NotificationsPanel
      v-if="showNotifications"
      @close="showNotifications = false"
      :notifications="notifications"
    />
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from 'vue-toastification'
import DashboardLayout from '@/components/navigation/DashboardLayout.vue'
import ProfileCustomizationModal from '@/components/profile/ProfileCustomizationModal.vue'
import ProfileCompletionCard from '@/components/profile/ProfileCompletionCard.vue'
import PostJobModal from '@/components/jobs/PostJobModal.vue'
import NotificationsPanel from '@/components/notifications/NotificationsPanel.vue'
import {
  WrenchScrewdriverIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  MapPinIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserIcon,
  ClipboardDocumentListIcon,
  BriefcaseIcon,
  ChartBarIcon,
  CogIcon,
  PlusIcon,
} from '@heroicons/vue/24/outline'

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

// State
const showProfileModal = ref(false)
const showPostJobModal = ref(false)
const showNotifications = ref(false)

// Reactive data
const notifications = ref([
  {
    id: 1,
    message: 'New booking request from Sarah Mwangi',
    type: 'booking',
    time: '10 minutes ago'
  },
  {
    id: 2,
    message: 'Payment received - KSh 6,000',
    type: 'payment',
    time: '2 hours ago'
  }
])

// Reactive data
const stats = ref({
  totalBookings: 47,
  activeBookings: 3,
  rating: 4.8,
  monthlyEarnings: 75000,
  lastMonthEarnings: 68000,
  growthPercentage: 10.3
})

const quickActions = ref([
  {
    name: 'View Bookings',
    description: 'Manage your schedule',
    icon: CalendarIcon,
    href: '/fundi/bookings'
  },
  {
    name: 'Update Portfolio',
    description: 'Showcase your work',
    icon: BriefcaseIcon,
    href: '/fundi/portfolio'
  },
  {
    name: 'View Messages',
    description: 'Chat with clients',
    icon: ChatBubbleLeftRightIcon,
    href: '/fundi/messages'
  },
  {
    name: 'Analytics',
    description: 'Track performance',
    icon: ChartBarIcon,
    href: '/fundi/analytics'
  }
])

const todayBookings = ref([
  {
    id: 1,
    client: {
      name: 'Sarah Mwangi',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Mwangi&background=3b82f6&color=fff'
    },
    service: 'Electrical Installation',
    status: 'confirmed',
    time: '10:00 AM',
    duration: 3,
    location: 'Westlands, Nairobi',
    payment: 6000
  },
  {
    id: 2,
    client: {
      name: 'David Kimani',
      avatar: 'https://ui-avatars.com/api/?name=David+Kimani&background=10b981&color=fff'
    },
    service: 'Socket Repairs',
    status: 'in-progress',
    time: '2:00 PM',
    duration: 2,
    location: 'Karen, Nairobi',
    payment: 4000
  }
])

const recentReviews = ref([
  {
    id: 1,
    client: {
      name: 'Mary Njeri',
      avatar: 'https://ui-avatars.com/api/?name=Mary+Njeri&background=8b5cf6&color=fff'
    },
    rating: 5,
    comment: 'Excellent work! Very professional and completed the job on time. Highly recommended.',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    id: 2,
    client: {
      name: 'John Ochieng',
      avatar: 'https://ui-avatars.com/api/?name=John+Ochieng&background=f59e0b&color=fff'
    },
    rating: 4,
    comment: 'Good service and fair pricing. Would book again for future electrical work.',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  }
])

const pendingRequests = ref([
  {
    id: 1,
    client: {
      name: 'Grace Wanjiku',
      avatar: 'https://ui-avatars.com/api/?name=Grace+Wanjiku&background=ef4444&color=fff'
    },
    service: 'House Wiring',
    preferredDate: '2025-08-26',
    preferredTime: '9:00 AM',
    location: 'Kiambu, Kenya',
    budget: 15000,
    description: 'Need complete house wiring for a 3-bedroom house. The house is newly constructed and needs all electrical installations including outlets, switches, and lighting.',
    requestDate: new Date(Date.now() - 3 * 60 * 60 * 1000)
  },
  {
    id: 2,
    client: {
      name: 'Peter Mutua',
      avatar: 'https://ui-avatars.com/api/?name=Peter+Mutua&background=06b6d4&color=fff'
    },
    service: 'Fan Installation',
    preferredDate: '2025-08-27',
    preferredTime: '11:00 AM',
    location: 'Thika, Kenya',
    budget: 3000,
    description: 'Install 3 ceiling fans in bedrooms and living room. Fans are already purchased.',
    requestDate: new Date(Date.now() - 1 * 60 * 60 * 1000)
  }
])

// Methods
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const formatTimeAgo = (timestamp) => {
  const now = new Date()
  const diff = now - new Date(timestamp)
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  if (minutes > 0) return `${minutes}m ago`
  return 'Just now'
}

const acceptBooking = async (bookingId) => {
  try {
    const booking = todayBookings.value.find(b => b.id === bookingId)
    if (booking) {
      booking.status = 'confirmed'
      // TODO: Update booking status in database
      toast.success('Booking accepted successfully')
      console.log(`Accepted booking ${bookingId}`)
    }
  } catch (error) {
    console.error('Error accepting booking:', error)
    toast.error('Failed to accept booking')
  }
}

const startJob = async (bookingId) => {
  try {
    const booking = todayBookings.value.find(b => b.id === bookingId)
    if (booking) {
      booking.status = 'in-progress'
      // TODO: Update booking status in database
      toast.success('Job started successfully')
      console.log(`Started job ${bookingId}`)
    }
  } catch (error) {
    console.error('Error starting job:', error)
    toast.error('Failed to start job')
  }
}

const completeJob = async (bookingId) => {
  try {
    const booking = todayBookings.value.find(b => b.id === bookingId)
    if (booking) {
      booking.status = 'completed'
      // TODO: Update booking status in database
      toast.success('Job completed successfully')
      console.log(`Completed job ${bookingId}`)
    }
  } catch (error) {
    console.error('Error completing job:', error)
    toast.error('Failed to complete job')
  }
}

const contactClient = async (clientId) => {
  try {
    await router.push(`/fundi/messages?client=${clientId}`)
  } catch (error) {
    console.error('Error navigating to messages:', error)
    toast.error('Failed to open messages')
  }
}

const acceptRequest = (requestId) => {
  pendingRequests.value = pendingRequests.value.filter(r => r.id !== requestId)
  // Add to bookings
}

const declineRequest = (requestId) => {
  pendingRequests.value = pendingRequests.value.filter(r => r.id !== requestId)
}

const sendQuote = (requestId) => {
  router.push(`/fundi/quote/${requestId}`)
}

const handleJobPost = (jobData) => {
  console.log('Job posted:', jobData)
  toast.success('Service posted successfully!')
  showPostJobModal.value = false
  // TODO: Add job to database
}

onMounted(() => {
  // Load fundi dashboard data
  console.log('Fundi dashboard loaded')
})
</script>
