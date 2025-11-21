<template>
  <DashboardLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">My Bookings</h1>
            <p class="text-gray-600">Manage your service bookings and appointments</p>
          </div>
          <div class="flex space-x-3">
            <button @click="exportBookings" class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
              <span class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span>Export</span>
              </span>
            </button>
            <router-link to="/feed" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <span class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span>New Booking</span>
              </span>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Booking Stats -->
      <div class="grid md:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
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
              <p class="text-sm font-medium text-gray-600">Completed</p>
              <p class="text-2xl font-semibold text-gray-900">{{ bookingStats.completed }}</p>
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
              <p class="text-sm font-medium text-gray-600">Total Spent</p>
              <p class="text-2xl font-semibold text-gray-900">KES {{ formatMoney(bookingStats.totalSpent) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter and Search -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-4">
            <input 
              v-model="searchQuery"
              type="text"
              placeholder="Search bookings..."
              class="w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            <select v-model="statusFilter" class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select v-model="dateFilter" class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Time</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">Last 3 Months</option>
            </select>
          </div>
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-500">{{ filteredBookings.length }} bookings</span>
          </div>
        </div>
      </div>

      <!-- Bookings List -->
      <div class="space-y-4">
        <div v-for="booking in filteredBookings" :key="booking.id" class="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-start justify-between">
            <div class="flex items-start space-x-4">
              <img :src="booking.fundi.avatar" :alt="booking.fundi.name" class="w-16 h-16 rounded-lg object-cover">
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <h3 class="text-lg font-semibold text-gray-900">{{ booking.service }}</h3>
                  <span :class="getStatusClass(booking.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                    {{ booking.status }}
                  </span>
                  <span v-if="booking.urgent" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                    Urgent
                  </span>
                </div>
                <p class="text-gray-600 mb-2">With {{ booking.fundi.name }}</p>
                <div class="flex items-center space-x-6 text-sm text-gray-500 mb-3">
                  <span class="flex items-center space-x-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span>{{ formatDate(booking.scheduledDate) }}</span>
                  </span>
                  <span class="flex items-center space-x-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>{{ booking.timeSlot }}</span>
                  </span>
                  <span class="flex items-center space-x-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span>{{ booking.location }}</span>
                  </span>
                </div>
                <p class="text-sm text-gray-600 mb-3">{{ booking.description }}</p>
                <div class="flex items-center justify-between">
                  <span class="text-lg font-semibold text-blue-600">KES {{ formatMoney(booking.amount) }}</span>
                  <div class="flex items-center space-x-3">
                    <button v-if="booking.status === 'pending'" @click="cancelBooking(booking)" class="text-red-600 hover:text-red-800 text-sm font-medium">
                      Cancel
                    </button>
                    <button v-if="booking.status === 'pending'" @click="modifyBooking(booking)" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Modify
                    </button>
                    <button v-if="booking.status === 'completed' && !booking.reviewed" @click="leaveReview(booking)" class="text-green-600 hover:text-green-800 text-sm font-medium">
                      Leave Review
                    </button>
                    <button @click="viewBookingDetails(booking)" class="bg-gray-100 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-200">
                      View Details
                    </button>
                    <button v-if="booking.status === 'completed'" @click="rebookService(booking)" class="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
                      Book Again
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Bookings -->
      <div v-if="filteredBookings.length === 0" class="bg-white rounded-lg shadow p-12 text-center">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
        <h3 class="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
        <p class="text-gray-500 mb-4">You haven't made any bookings yet or no bookings match your search criteria</p>
        <router-link to="/feed" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Find a Fundi
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
const statusFilter = ref('')
const dateFilter = ref('')

const bookingStats = ref({
  total: 12,
  pending: 2,
  completed: 8,
  totalSpent: 89500
})

// Sample bookings data
const bookings = ref([
  {
    id: 1,
    service: 'Kitchen Plumbing Installation',
    description: 'Complete kitchen pipe installation including new faucets and water lines',
    fundi: {
      name: 'John Mwangi',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
    },
    scheduledDate: '2024-02-25',
    timeSlot: '09:00 AM - 12:00 PM',
    location: 'Westlands, Nairobi',
    amount: 25000,
    status: 'confirmed',
    urgent: false,
    reviewed: false,
    createdAt: '2024-02-20T10:30:00'
  },
  {
    id: 2,
    service: 'Emergency Electrical Repair',
    description: 'Fix power outage in main panel and replace faulty switches',
    fundi: {
      name: 'Peter Kiprotich',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    },
    scheduledDate: '2024-02-22',
    timeSlot: '02:00 PM - 04:00 PM',
    location: 'Karen, Nairobi',
    amount: 8500,
    status: 'completed',
    urgent: true,
    reviewed: true,
    createdAt: '2024-02-21T14:20:00'
  },
  {
    id: 3,
    service: 'Bathroom Tile Installation',
    description: 'Install ceramic tiles in master bathroom with waterproofing',
    fundi: {
      name: 'Joseph Mutua',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
    },
    scheduledDate: '2024-02-28',
    timeSlot: '08:00 AM - 05:00 PM',
    location: 'Kilimani, Nairobi',
    amount: 35000,
    status: 'pending',
    urgent: false,
    reviewed: false,
    createdAt: '2024-02-19T16:45:00'
  },
  {
    id: 4,
    service: 'Living Room Painting',
    description: 'Paint living room and dining area with premium paint',
    fundi: {
      name: 'Samuel Njoroge',
      avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100'
    },
    scheduledDate: '2024-02-18',
    timeSlot: '10:00 AM - 04:00 PM',
    location: 'Nairobi CBD',
    amount: 12000,
    status: 'completed',
    urgent: false,
    reviewed: false,
    createdAt: '2024-02-15T09:30:00'
  },
  {
    id: 5,
    service: 'Roof Leak Repair',
    description: 'Repair roof leak and apply waterproofing treatment',
    fundi: {
      name: 'Michael Wanjiku',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100'
    },
    scheduledDate: '2024-02-24',
    timeSlot: '07:00 AM - 11:00 AM',
    location: 'Kileleshwa, Nairobi',
    amount: 18000,
    status: 'in-progress',
    urgent: false,
    reviewed: false,
    createdAt: '2024-02-16T11:15:00'
  }
])

// Computed
const filteredBookings = computed(() => {
  let filtered = bookings.value

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(booking => 
      booking.service.toLowerCase().includes(query) ||
      booking.fundi.name.toLowerCase().includes(query) ||
      booking.description.toLowerCase().includes(query)
    )
  }

  // Apply status filter
  if (statusFilter.value) {
    filtered = filtered.filter(booking => booking.status === statusFilter.value)
  }

  // Apply date filter
  if (dateFilter.value) {
    const now = new Date()
    const filterDate = new Date(now)
    
    switch (dateFilter.value) {
      case 'week':
        filterDate.setDate(now.getDate() - 7)
        break
      case 'month':
        filterDate.setMonth(now.getMonth() - 1)
        break
      case 'quarter':
        filterDate.setMonth(now.getMonth() - 3)
        break
    }
    
    filtered = filtered.filter(booking => new Date(booking.createdAt) >= filterDate)
  }

  return filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
})

// Methods
const formatMoney = (amount) => {
  return new Intl.NumberFormat('en-KE').format(amount)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-KE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getStatusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const cancelBooking = (booking) => {
  console.log('Cancelling booking:', booking.id)
}

const modifyBooking = (booking) => {
  console.log('Modifying booking:', booking.id)
}

const viewBookingDetails = (booking) => {
  console.log('Viewing booking details:', booking.id)
}

const leaveReview = (booking) => {
  console.log('Leaving review for booking:', booking.id)
}

const rebookService = (booking) => {
  router.push(`/book/${booking.fundi.id}`)
}

const exportBookings = () => {
  console.log('Exporting bookings...')
}
</script>
