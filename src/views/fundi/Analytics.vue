<template>
  <DashboardLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Analytics</h1>
            <p class="text-gray-600">Track your performance, growth, and business insights</p>
          </div>
          <div class="flex space-x-3">
            <select v-model="analyticsTimeframe" class="border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last 3 Months</option>
              <option value="year">Last Year</option>
            </select>
            <button @click="exportReport" class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
              <span class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span>Export Report</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Key Metrics -->
      <div class="grid md:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Profile Views</p>
              <p class="text-2xl font-semibold text-gray-900">{{ analyticsData.profileViews }}</p>
              <p class="text-sm text-blue-600">+{{ analyticsData.profileViewsGrowth }}% vs last period</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-green-100 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p class="text-2xl font-semibold text-gray-900">{{ analyticsData.conversionRate }}%</p>
              <p class="text-sm text-green-600">+{{ analyticsData.conversionGrowth }}% improvement</p>
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
              <p class="text-2xl font-semibold text-gray-900">{{ analyticsData.averageRating }}</p>
              <p class="text-sm text-yellow-600">{{ analyticsData.totalReviews }} reviews</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-purple-100 rounded-lg">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Response Time</p>
              <p class="text-2xl font-semibold text-gray-900">{{ analyticsData.responseTime }}</p>
              <p class="text-sm text-purple-600">{{ analyticsData.responseImprovement }}% faster</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid lg:grid-cols-2 gap-6">
        <!-- Bookings Trend -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Bookings Trend</h3>
          <div class="h-64 flex items-end justify-between space-x-2">
            <div v-for="(data, index) in bookingsTrendData" :key="index" class="flex-1 flex flex-col items-center">
              <div 
                :style="{ height: `${(data.bookings / Math.max(...bookingsTrendData.map(d => d.bookings))) * 200}px` }"
                class="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer"
                :title="`${data.period}: ${data.bookings} bookings`"
              ></div>
              <span class="text-xs text-gray-600 mt-2">{{ data.period }}</span>
            </div>
          </div>
        </div>

        <!-- Service Performance -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Service Performance</h3>
          <div class="space-y-4">
            <div v-for="service in servicePerformance" :key="service.name" class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: service.color }"></div>
                <span class="text-sm font-medium text-gray-900">{{ service.name }}</span>
              </div>
              <div class="flex items-center space-x-4">
                <span class="text-sm text-gray-600">{{ service.bookings }} bookings</span>
                <div class="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    class="h-2 rounded-full"
                    :style="{ 
                      width: `${(service.bookings / Math.max(...servicePerformance.map(s => s.bookings))) * 100}%`,
                      backgroundColor: service.color 
                    }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Revenue Analysis -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">Revenue Analysis</h3>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="space-y-4">
            <h4 class="font-medium text-gray-900">Monthly Revenue</h4>
            <div class="h-32 flex items-end justify-between space-x-1">
              <div v-for="(month, index) in revenueData" :key="index" class="flex-1 flex flex-col items-center">
                <div 
                  :style="{ height: `${(month.revenue / Math.max(...revenueData.map(m => m.revenue))) * 100}px` }"
                  class="w-full bg-green-500 rounded-t"
                  :title="`${month.month}: KES ${formatMoney(month.revenue)}`"
                ></div>
                <span class="text-xs text-gray-600 mt-1">{{ month.month.substr(0, 3) }}</span>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h4 class="font-medium text-gray-900">Revenue Sources</h4>
            <div class="space-y-3">
              <div v-for="source in revenueSources" :key="source.name" class="flex items-center justify-between">
                <span class="text-sm text-gray-600">{{ source.name }}</span>
                <div class="flex items-center space-x-2">
                  <span class="text-sm font-medium">{{ source.percentage }}%</span>
                  <div class="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      class="bg-blue-500 h-2 rounded-full"
                      :style="{ width: `${source.percentage}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h4 class="font-medium text-gray-900">Growth Metrics</h4>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Monthly Growth</span>
                <span class="text-sm font-medium text-green-600">+{{ growthMetrics.monthlyGrowth }}%</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Client Retention</span>
                <span class="text-sm font-medium text-blue-600">{{ growthMetrics.clientRetention }}%</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Repeat Business</span>
                <span class="text-sm font-medium text-purple-600">{{ growthMetrics.repeatBusiness }}%</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">Referral Rate</span>
                <span class="text-sm font-medium text-yellow-600">{{ growthMetrics.referralRate }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Insights -->
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">Performance Insights</h3>
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h4 class="font-medium text-gray-900 mb-4">Top Performing Hours</h4>
            <div class="space-y-3">
              <div v-for="hour in topHours" :key="hour.time" class="flex items-center justify-between">
                <span class="text-sm text-gray-600">{{ hour.time }}</span>
                <div class="flex items-center space-x-2">
                  <span class="text-sm font-medium">{{ hour.bookings }} bookings</span>
                  <div class="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      class="bg-orange-500 h-2 rounded-full"
                      :style="{ width: `${(hour.bookings / Math.max(...topHours.map(h => h.bookings))) * 100}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 class="font-medium text-gray-900 mb-4">Client Feedback Trends</h4>
            <div class="space-y-3">
              <div v-for="feedback in feedbackTrends" :key="feedback.category" class="flex items-center justify-between">
                <span class="text-sm text-gray-600">{{ feedback.category }}</span>
                <div class="flex items-center space-x-2">
                  <span class="text-sm font-medium">{{ feedback.score }}/5</span>
                  <div class="flex space-x-1">
                    <div v-for="i in 5" :key="i" class="w-2 h-2 rounded-full" :class="i <= feedback.score ? 'bg-yellow-400' : 'bg-gray-200'"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref } from 'vue'
import DashboardLayout from '@/components/navigation/DashboardLayout.vue'

// State
const analyticsTimeframe = ref('month')

const analyticsData = ref({
  profileViews: 2847,
  profileViewsGrowth: 18.5,
  conversionRate: 24.8,
  conversionGrowth: 5.2,
  averageRating: 4.8,
  totalReviews: 127,
  responseTime: '2.5h',
  responseImprovement: 23
})

const bookingsTrendData = ref([
  { period: 'Week 1', bookings: 8 },
  { period: 'Week 2', bookings: 12 },
  { period: 'Week 3', bookings: 15 },
  { period: 'Week 4', bookings: 18 },
  { period: 'Week 5', bookings: 14 },
  { period: 'Week 6', bookings: 21 },
  { period: 'Week 7', bookings: 25 }
])

const servicePerformance = ref([
  { name: 'Pipe Installation', bookings: 45, color: '#3B82F6' },
  { name: 'Emergency Repairs', bookings: 38, color: '#EF4444' },
  { name: 'Drain Cleaning', bookings: 32, color: '#10B981' },
  { name: 'Water Heater Service', bookings: 28, color: '#F59E0B' },
  { name: 'Bathroom Renovation', bookings: 22, color: '#8B5CF6' }
])

const revenueData = ref([
  { month: 'January', revenue: 95000 },
  { month: 'February', revenue: 125000 },
  { month: 'March', revenue: 115000 },
  { month: 'April', revenue: 140000 },
  { month: 'May', revenue: 165000 },
  { month: 'June', revenue: 185000 }
])

const revenueSources = ref([
  { name: 'Direct Bookings', percentage: 65 },
  { name: 'Platform Referrals', percentage: 25 },
  { name: 'Repeat Clients', percentage: 10 }
])

const growthMetrics = ref({
  monthlyGrowth: 15.3,
  clientRetention: 87,
  repeatBusiness: 42,
  referralRate: 28
})

const topHours = ref([
  { time: '8:00 AM - 10:00 AM', bookings: 24 },
  { time: '10:00 AM - 12:00 PM', bookings: 31 },
  { time: '2:00 PM - 4:00 PM', bookings: 28 },
  { time: '4:00 PM - 6:00 PM', bookings: 22 },
  { time: '6:00 PM - 8:00 PM', bookings: 18 }
])

const feedbackTrends = ref([
  { category: 'Quality of Work', score: 4.9 },
  { category: 'Timeliness', score: 4.7 },
  { category: 'Communication', score: 4.8 },
  { category: 'Professionalism', score: 4.9 },
  { category: 'Value for Money', score: 4.6 }
])

// Methods
const formatMoney = (amount) => {
  return new Intl.NumberFormat('en-KE').format(amount)
}

const exportReport = () => {
  console.log('Exporting analytics report...')
}
</script>
