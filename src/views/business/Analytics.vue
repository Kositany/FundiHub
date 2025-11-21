<template>
  <DashboardLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Analytics</h1>
            <p class="text-gray-600">Monitor your business performance and insights</p>
          </div>
          <div class="flex space-x-3">
            <select v-model="dateRange" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 3 months</option>
              <option value="365">Last year</option>
            </select>
            <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
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

      <!-- KPI Cards -->
      <div class="grid md:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Revenue</p>
              <p class="text-2xl font-semibold text-gray-900">${{ analytics.revenue.total.toLocaleString() }}</p>
              <div class="flex items-center mt-2">
                <span :class="analytics.revenue.growth >= 0 ? 'text-green-600' : 'text-red-600'" class="text-sm font-medium">
                  {{ analytics.revenue.growth >= 0 ? '+' : '' }}{{ analytics.revenue.growth }}%
                </span>
                <span class="text-gray-500 text-sm ml-1">vs last period</span>
              </div>
            </div>
            <div class="p-3 bg-green-100 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Active Projects</p>
              <p class="text-2xl font-semibold text-gray-900">{{ analytics.projects.active }}</p>
              <div class="flex items-center mt-2">
                <span :class="analytics.projects.growth >= 0 ? 'text-green-600' : 'text-red-600'" class="text-sm font-medium">
                  {{ analytics.projects.growth >= 0 ? '+' : '' }}{{ analytics.projects.growth }}%
                </span>
                <span class="text-gray-500 text-sm ml-1">vs last period</span>
              </div>
            </div>
            <div class="p-3 bg-blue-100 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Total Fundis</p>
              <p class="text-2xl font-semibold text-gray-900">{{ analytics.fundis.total }}</p>
              <div class="flex items-center mt-2">
                <span :class="analytics.fundis.growth >= 0 ? 'text-green-600' : 'text-red-600'" class="text-sm font-medium">
                  {{ analytics.fundis.growth >= 0 ? '+' : '' }}{{ analytics.fundis.growth }}%
                </span>
                <span class="text-gray-500 text-sm ml-1">vs last period</span>
              </div>
            </div>
            <div class="p-3 bg-purple-100 rounded-lg">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Avg Rating</p>
              <p class="text-2xl font-semibold text-gray-900">{{ analytics.rating.average }}</p>
              <div class="flex items-center mt-2">
                <div class="flex items-center">
                  <svg v-for="i in 5" :key="i" :class="i <= Math.floor(analytics.rating.average) ? 'text-yellow-400' : 'text-gray-300'" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div class="p-3 bg-yellow-100 rounded-lg">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="grid lg:grid-cols-2 gap-6">
        <!-- Revenue Chart -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Revenue Trend</h3>
            <select v-model="revenueChartType" class="px-3 py-1 border border-gray-300 rounded-md text-sm">
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
              <option value="daily">Daily</option>
            </select>
          </div>
          <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div class="text-center">
              <svg class="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              <p class="text-gray-500">Revenue Chart Placeholder</p>
              <p class="text-sm text-gray-400">Chart library integration required</p>
            </div>
          </div>
        </div>

        <!-- Project Status Distribution -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Project Status Distribution</h3>
          <div class="space-y-4">
            <div v-for="status in projectStatusData" :key="status.name" class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div :class="status.color" class="w-4 h-4 rounded-full"></div>
                <span class="text-sm font-medium text-gray-700">{{ status.name }}</span>
              </div>
              <div class="flex items-center space-x-2">
                <span class="text-sm text-gray-600">{{ status.count }}</span>
                <div class="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    :class="status.color"
                    class="h-2 rounded-full transition-all duration-300"
                    :style="{ width: (status.count / projectStatusData.reduce((sum, s) => sum + s.count, 0) * 100) + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Performance Metrics -->
      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Top Performing Fundis -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Top Performing Fundis</h3>
          <div class="space-y-4">
            <div v-for="(fundi, index) in topFundis" :key="fundi.id" class="flex items-center space-x-3">
              <div class="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold">
                {{ index + 1 }}
              </div>
              <img :src="fundi.avatar" :alt="fundi.name" class="w-10 h-10 rounded-full">
              <div class="flex-1">
                <p class="text-sm font-semibold text-gray-900">{{ fundi.name }}</p>
                <p class="text-xs text-gray-500">{{ fundi.skill }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-semibold text-gray-900">${{ fundi.earnings.toLocaleString() }}</p>
                <div class="flex items-center">
                  <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <span class="text-xs text-gray-600 ml-1">{{ fundi.rating }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activities -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div class="space-y-4">
            <div v-for="activity in recentActivities" :key="activity.id" class="flex items-start space-x-3">
              <div :class="activity.iconBg" class="p-2 rounded-lg">
                <svg class="w-4 h-4" :class="activity.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="activity.iconPath"></path>
                </svg>
              </div>
              <div class="flex-1">
                <p class="text-sm text-gray-900">{{ activity.description }}</p>
                <p class="text-xs text-gray-500">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Skills in Demand -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Skills in Demand</h3>
          <div class="space-y-3">
            <div v-for="skill in skillDemand" :key="skill.name" class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-700">{{ skill.name }}</span>
              <div class="flex items-center space-x-2">
                <div class="w-16 bg-gray-200 rounded-full h-2">
                  <div 
                    class="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    :style="{ width: skill.demand + '%' }"
                  ></div>
                </div>
                <span class="text-xs text-gray-600 w-8">{{ skill.demand }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Detailed Analytics Table -->
      <div class="bg-white rounded-lg shadow">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Project Performance Details</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fundi</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Efficiency</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="project in detailedProjects" :key="project.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ project.name }}</div>
                    <div class="text-sm text-gray-500">{{ project.category }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <img :src="project.fundi.avatar" :alt="project.fundi.name" class="w-8 h-8 rounded-full">
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-900">{{ project.fundi.name }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${{ project.budget.toLocaleString() }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        class="bg-blue-500 h-2 rounded-full"
                        :style="{ width: project.progress + '%' }"
                      ></div>
                    </div>
                    <span class="text-sm text-gray-600">{{ project.progress }}%</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="project.efficiency >= 90 ? 'text-green-600' : project.efficiency >= 70 ? 'text-yellow-600' : 'text-red-600'" class="text-sm font-medium">
                    {{ project.efficiency }}%
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getProjectStatusColor(project.status)" class="px-2 py-1 text-xs rounded-full">
                    {{ project.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref } from 'vue'
import DashboardLayout from '@/components/navigation/DashboardLayout.vue'

// State
const dateRange = ref('30')
const revenueChartType = ref('monthly')

const analytics = ref({
  revenue: {
    total: 485000,
    growth: 12.5
  },
  projects: {
    active: 24,
    growth: 8.3
  },
  fundis: {
    total: 156,
    growth: 15.2
  },
  rating: {
    average: 4.7
  }
})

const projectStatusData = ref([
  { name: 'In Progress', count: 12, color: 'bg-blue-500' },
  { name: 'Completed', count: 8, color: 'bg-green-500' },
  { name: 'Planning', count: 4, color: 'bg-yellow-500' },
  { name: 'On Hold', count: 2, color: 'bg-red-500' }
])

const topFundis = ref([
  {
    id: 1,
    name: 'John Kiprotich',
    skill: 'Plumber',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    earnings: 45000,
    rating: 4.9
  },
  {
    id: 2,
    name: 'Mary Wanjiku',
    skill: 'Electrician',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b120?w=100',
    earnings: 38000,
    rating: 4.8
  },
  {
    id: 3,
    name: 'Peter Mwangi',
    skill: 'Carpenter',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    earnings: 35000,
    rating: 4.7
  },
  {
    id: 4,
    name: 'Grace Akinyi',
    skill: 'Painter',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    earnings: 32000,
    rating: 4.6
  }
])

const recentActivities = ref([
  {
    id: 1,
    description: 'New project "Kitchen Renovation" was started',
    time: '2 hours ago',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    iconPath: 'M12 6v6m0 0v6m0-6h6m-6 0H6'
  },
  {
    id: 2,
    description: 'Payment of $5,000 received from TechCorp',
    time: '4 hours ago',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    iconPath: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
  },
  {
    id: 3,
    description: 'John Kiprotich completed bathroom installation',
    time: '6 hours ago',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    iconPath: 'M5 13l4 4L19 7'
  }
])

const skillDemand = ref([
  { name: 'Plumbing', demand: 85 },
  { name: 'Electrical', demand: 78 },
  { name: 'Carpentry', demand: 65 },
  { name: 'Painting', demand: 58 },
  { name: 'Roofing', demand: 52 },
  { name: 'Tiling', demand: 45 }
])

const detailedProjects = ref([
  {
    id: 1,
    name: 'Office Renovation',
    category: 'Commercial',
    budget: 85000,
    progress: 75,
    efficiency: 92,
    status: 'In Progress',
    fundi: {
      name: 'John Kiprotich',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
    }
  },
  {
    id: 2,
    name: 'Kitchen Remodel',
    category: 'Residential',
    budget: 35000,
    progress: 100,
    efficiency: 95,
    status: 'Completed',
    fundi: {
      name: 'Mary Wanjiku',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b120?w=100'
    }
  },
  {
    id: 3,
    name: 'Bathroom Installation',
    category: 'Residential',
    budget: 15000,
    progress: 45,
    efficiency: 88,
    status: 'In Progress',
    fundi: {
      name: 'Peter Mwangi',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    }
  }
])

// Methods
const getProjectStatusColor = (status) => {
  const colors = {
    'Planning': 'bg-yellow-100 text-yellow-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Completed': 'bg-green-100 text-green-800',
    'On Hold': 'bg-red-100 text-red-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}
</script>
