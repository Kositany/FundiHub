<template>
  <DashboardLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Bookings</h1>
            <p class="text-gray-600">Manage your job bookings and schedule</p>
          </div>
          <div class="flex space-x-3">
            <button @click="refreshBookings" class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
              <span class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
                <span>Refresh</span>
              </span>
            </button>
            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <span class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span>Calendar View</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Booking Stats -->
      <div class="grid md:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Bookings</p>
              <p class="text-2xl font-semibold text-gray-900">{{ bookingStats.total }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-yellow-100 rounded-lg">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Pending</p>
              <p class="text-2xl font-semibold text-gray-900">{{ bookingStats.pending }}</p>
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
              <p class="text-sm font-medium text-gray-600">Active</p>
              <p class="text-2xl font-semibold text-gray-900">{{ bookingStats.active }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-purple-100 rounded-lg">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">This Month</p>
              <p class="text-2xl font-semibold text-gray-900">${{ bookingStats.monthlyEarnings.toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div class="grid md:grid-cols-4 gap-4">
          <button @click="updateAvailability" class="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <div class="text-center">
              <svg class="w-8 h-8 text-blue-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <p class="text-sm font-medium text-blue-600">Update Availability</p>
            </div>
          </button>
          <button @click="viewCalendar" class="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <div class="text-center">
              <svg class="w-8 h-8 text-green-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              <p class="text-sm font-medium text-green-600">View Calendar</p>
            </div>
          </button>
          <button @click="managePricing" class="p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
            <div class="text-center">
              <svg class="w-8 h-8 text-yellow-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
              <p class="text-sm font-medium text-yellow-600">Manage Pricing</p>
            </div>
          </button>
          <button @click="viewReviews" class="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <div class="text-center">
              <svg class="w-8 h-8 text-purple-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>
              <p class="text-sm font-medium text-purple-600">View Reviews</p>
            </div>
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center space-x-4">
          <div class="flex-1">
            <input 
              v-model="searchQuery"
              type="text"
              placeholder="Search bookings..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          <select v-model="statusFilter" class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select v-model="dateFilter" class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Dates</option>
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="this-week">This Week</option>
            <option value="next-week">Next Week</option>
          </select>
        </div>
      </div>

      <!-- Bookings List -->
      <div class="space-y-4">
        <div v-for="booking in filteredBookings" :key="booking.id" class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
          <div class="p-6">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-3">
                  <h3 class="text-lg font-semibold text-gray-900">{{ booking.title }}</h3>
                  <span :class="getStatusColor(booking.status)" class="px-2 py-1 text-xs rounded-full">
                    {{ booking.status.charAt(0).toUpperCase() + booking.status.slice(1) }}
                  </span>
                  <span v-if="booking.urgent" class="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                    Urgent
                  </span>
                </div>
                
                <p class="text-gray-600 mb-4">{{ booking.description }}</p>
                
                <!-- Client Information -->
                <div class="flex items-center space-x-4 mb-4">
                  <div class="flex items-center space-x-2">
                    <img :src="booking.client.avatar" :alt="booking.client.name" class="w-8 h-8 rounded-full">
                    <div>
                      <p class="text-sm font-semibold text-gray-900">{{ booking.client.name }}</p>
                      <p class="text-xs text-gray-500">{{ booking.client.email }}</p>
                    </div>
                  </div>
                  <div class="text-sm text-gray-600">
                    <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    {{ booking.client.phone }}
                  </div>
                </div>

                <!-- Booking Details -->
                <div class="grid md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span class="text-gray-500">Date & Time:</span>
                    <div class="font-semibold">{{ formatDateTime(booking.dateTime) }}</div>
                  </div>
                  <div>
                    <span class="text-gray-500">Duration:</span>
                    <div class="font-semibold">{{ booking.duration }}</div>
                  </div>
                  <div>
                    <span class="text-gray-500">Payment:</span>
                    <div class="font-semibold">${{ booking.payment.toLocaleString() }}</div>
                  </div>
                  <div>
                    <span class="text-gray-500">Location:</span>
                    <div class="font-semibold">{{ booking.location }}</div>
                  </div>
                </div>

                <!-- Skills Required -->
                <div v-if="booking.skills.length > 0" class="mt-4">
                  <span class="text-sm text-gray-600 mb-2 block">Skills Required:</span>
                  <div class="flex flex-wrap gap-2">
                    <span v-for="skill in booking.skills" :key="skill" class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {{ skill }}
                    </span>
                  </div>
                </div>

                <!-- Progress for Active Bookings -->
                <div v-if="booking.status === 'in-progress'" class="mt-4">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-sm text-gray-600">Progress</span>
                    <span class="text-sm text-gray-600">{{ booking.progress }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      class="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      :style="{ width: booking.progress + '%' }"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex flex-col space-y-2 ml-6">
                <button v-if="booking.status === 'pending'" @click="acceptBooking(booking)" class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm">
                  Accept
                </button>
                <button v-if="booking.status === 'pending'" @click="declineBooking(booking)" class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm">
                  Decline
                </button>
                <button v-if="booking.status === 'confirmed'" @click="startWork(booking)" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
                  Start Work
                </button>
                <button v-if="booking.status === 'in-progress'" @click="updateProgress(booking)" class="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 text-sm">
                  Update Progress
                </button>
                <button v-if="booking.status === 'in-progress'" @click="completeWork(booking)" class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm">
                  Complete
                </button>
                <button @click="contactClient(booking)" class="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 text-sm">
                  Contact Client
                </button>
                <button @click="viewDetails(booking)" class="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 text-sm">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import DashboardLayout from '@/components/navigation/DashboardLayout.vue'

// State
const searchQuery = ref('')
const statusFilter = ref('')
const dateFilter = ref('')

const bookingStats = ref({
  total: 47,
  pending: 8,
  active: 3,
  monthlyEarnings: 12500
})

// Sample bookings data
const bookings = ref([
  {
    id: 1,
    title: 'Kitchen Plumbing Installation',
    description: 'Install new kitchen sink plumbing, replace old pipes, and connect dishwasher lines.',
    status: 'pending',
    urgent: true,
    dateTime: '2024-02-20T09:00:00',
    duration: '4 hours',
    payment: 350,
    location: 'Westlands, Nairobi',
    progress: 0,
    skills: ['Plumbing', 'Installation'],
    client: {
      name: 'Sarah Johnson',
      email: 'sarah@email.com',
      phone: '+254 711 123 456',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b120?w=100'
    }
  },
  {
    id: 2,
    title: 'Bathroom Tile Repair',
    description: 'Replace broken tiles in master bathroom and re-grout the entire area.',
    status: 'in-progress',
    urgent: false,
    dateTime: '2024-02-19T14:00:00',
    duration: '6 hours',
    payment: 280,
    location: 'Karen, Nairobi',
    progress: 65,
    skills: ['Tiling', 'Grouting'],
    client: {
      name: 'Michael Davis',
      email: 'michael@email.com',
      phone: '+254 722 654 321',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
    }
  },
  {
    id: 3,
    title: 'Office Electrical Wiring',
    description: 'Install additional power outlets and upgrade lighting system in office space.',
    status: 'confirmed',
    urgent: false,
    dateTime: '2024-02-22T08:00:00',
    duration: '8 hours',
    payment: 750,
    location: 'CBD, Nairobi',
    progress: 0,
    skills: ['Electrical', 'Wiring', 'Lighting'],
    client: {
      name: 'TechStart Solutions',
      email: 'admin@techstart.co.ke',
      phone: '+254 733 987 654',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100'
    }
  },
  {
    id: 4,
    title: 'Garden Deck Construction',
    description: 'Build a wooden deck in the backyard garden area with proper foundations.',
    status: 'completed',
    urgent: false,
    dateTime: '2024-02-15T07:00:00',
    duration: '2 days',
    payment: 1200,
    location: 'Runda, Nairobi',
    progress: 100,
    skills: ['Carpentry', 'Construction'],
    client: {
      name: 'James Kimani',
      email: 'james@email.com',
      phone: '+254 712 345 789',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    }
  }
])

// Computed
const filteredBookings = computed(() => {
  let filtered = bookings.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(booking => 
      booking.title.toLowerCase().includes(query) ||
      booking.description.toLowerCase().includes(query) ||
      booking.client.name.toLowerCase().includes(query)
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(booking => booking.status === statusFilter.value)
  }

  return filtered
})

// Methods
const getStatusColor = (status) => {
  const colors = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'confirmed': 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-green-100 text-green-800',
    'completed': 'bg-gray-100 text-gray-800',
    'cancelled': 'bg-red-100 text-red-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

const formatDateTime = (dateTime) => {
  const date = new Date(dateTime)
  return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

const refreshBookings = () => {
  console.log('Refreshing bookings...')
}

const updateAvailability = () => {
  console.log('Updating availability...')
}

const viewCalendar = () => {
  console.log('Opening calendar view...')
}

const managePricing = () => {
  console.log('Opening pricing management...')
}

const viewReviews = () => {
  console.log('Opening reviews...')
}

const acceptBooking = (booking) => {
  booking.status = 'confirmed'
  console.log('Accepting booking:', booking.title)
}

const declineBooking = (booking) => {
  booking.status = 'cancelled'
  console.log('Declining booking:', booking.title)
}

const startWork = (booking) => {
  booking.status = 'in-progress'
  booking.progress = 10
  console.log('Starting work on:', booking.title)
}

const updateProgress = (booking) => {
  console.log('Updating progress for:', booking.title)
}

const completeWork = (booking) => {
  booking.status = 'completed'
  booking.progress = 100
  console.log('Completing work on:', booking.title)
}

const contactClient = (booking) => {
  console.log('Contacting client for:', booking.title)
}

const viewDetails = (booking) => {
  console.log('Viewing details for:', booking.title)
}
</script>
