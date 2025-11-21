<template>
  <DashboardLayout>
    <div class="px-4 sm:px-6 lg:px-8 py-8">
      <!-- Business Welcome Header -->
      <div class="mb-8">
        <div class="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white relative overflow-hidden">
          <div class="absolute inset-0 bg-black/10"></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="relative">
                  <img
                    :src="authStore.user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(businessInfo.businessName)}&background=8b5cf6&color=fff&size=80`"
                    :alt="businessInfo.businessName"
                    class="h-20 w-20 rounded-full border-4 border-white/30 shadow-lg"
                  />
                  <div v-if="businessInfo.verified" class="absolute -bottom-1 -right-1">
                    <CheckBadgeIcon class="h-8 w-8 text-green-400 bg-white rounded-full p-1" />
                  </div>
                </div>
                <div>
                  <h1 class="text-3xl font-bold">{{ businessInfo.businessName }}</h1>
                  <p class="text-purple-100 mt-2 text-lg">{{ businessInfo.businessType }} • {{ businessInfo.industry }}</p>
                  <div class="flex items-center mt-3 space-x-4">
                    <button
                      @click="showBusinessModal = true"
                      class="text-sm text-purple-100 hover:text-white underline flex items-center transition-colors"
                    >
                      <BuildingOfficeIcon class="h-4 w-4 mr-1" />
                      Business Settings
                    </button>
                    <span class="text-purple-200 text-sm">•</span>
                    <span class="text-purple-100 text-sm">Member since {{ formatDate(businessInfo.createdAt) }}</span>
                  </div>
                </div>
              </div>
              <div class="hidden lg:block">
                <div class="bg-white/20 rounded-full p-4 backdrop-blur-sm">
                  <BuildingOffice2Icon class="h-10 w-10" />
                </div>
              </div>
            </div>
            
            <!-- Business Stats Overview -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div class="text-3xl font-bold">{{ businessStats.totalProjects }}</div>
                <div class="text-sm text-purple-100 mt-1">Total Projects</div>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div class="text-3xl font-bold">{{ businessStats.activeClients }}</div>
                <div class="text-sm text-purple-100 mt-1">Active Clients</div>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div class="text-3xl font-bold">{{ businessStats.teamMembers }}</div>
                <div class="text-sm text-purple-100 mt-1">Team Members</div>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div class="text-3xl font-bold">${{ formatCurrency(businessStats.revenue) }}</div>
                <div class="text-sm text-purple-100 mt-1">Monthly Revenue</div>
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
            @click="createProject"
            class="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600"
          >
            <FolderPlusIcon class="h-8 w-8 text-purple-600 mb-3" />
            <span class="text-sm font-medium text-gray-900 dark:text-white">Create Project</span>
          </button>
          
          <button
            @click="addTeamMember"
            class="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600"
          >
            <UserPlusIcon class="h-8 w-8 text-purple-600 mb-3" />
            <span class="text-sm font-medium text-gray-900 dark:text-white">Add Team Member</span>
          </button>
          
          <button
            @click="viewReports"
            class="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600"
          >
            <ChartBarIcon class="h-8 w-8 text-purple-600 mb-3" />
            <span class="text-sm font-medium text-gray-900 dark:text-white">View Reports</span>
          </button>
          
          <button
            @click="businessSettings"
            class="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600"
          >
            <CogIcon class="h-8 w-8 text-purple-600 mb-3" />
            <span class="text-sm font-medium text-gray-900 dark:text-white">Settings</span>
          </button>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Active Projects -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Active Projects</h3>
                <router-link
                  to="/projects"
                  class="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                >
                  View All
                </router-link>
              </div>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div
                  v-for="project in activeProjects"
                  :key="project.id"
                  class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                      <FolderIcon class="h-10 w-10 text-purple-600" />
                    </div>
                    <div>
                      <h4 class="text-sm font-medium text-gray-900 dark:text-white">{{ project.name }}</h4>
                      <p class="text-sm text-gray-500 dark:text-gray-400">{{ project.client }}</p>
                      <div class="flex items-center mt-1">
                        <div class="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                          <div
                            class="bg-purple-600 h-2 rounded-full"
                            :style="{ width: `${project.progress}%` }"
                          ></div>
                        </div>
                        <span class="ml-2 text-xs text-gray-500 dark:text-gray-400">{{ project.progress }}%</span>
                      </div>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ formatCurrency(project.value) }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Due {{ formatDate(project.dueDate) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Financial Overview -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Financial Overview</h3>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-2 gap-6">
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">This Month</p>
                  <p class="text-2xl font-bold text-gray-900 dark:text-white">${{ formatCurrency(financialData.thisMonth) }}</p>
                  <p class="text-sm text-green-600 mt-1">+{{ financialData.monthlyGrowth }}% from last month</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500 dark:text-gray-400">This Year</p>
                  <p class="text-2xl font-bold text-gray-900 dark:text-white">${{ formatCurrency(financialData.thisYear) }}</p>
                  <p class="text-sm text-green-600 mt-1">+{{ financialData.yearlyGrowth }}% from last year</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-8">
          <!-- Team Management -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div class="p-6 border-b border-gray-200 dark:border-gray-700">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Team Members</h3>
                <button
                  @click="addTeamMember"
                  class="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
                >
                  Add Member
                </button>
              </div>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <div
                  v-for="member in teamMembers"
                  :key="member.id"
                  class="flex items-center space-x-3"
                >
                  <img
                    :src="member.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=8b5cf6&color=fff&size=40`"
                    :alt="member.name"
                    class="h-10 w-10 rounded-full"
                  />
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ member.name }}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">{{ member.role }}</p>
                  </div>
                  <div class="flex-shrink-0">
                    <span
                      :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        member.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      ]"
                    >
                      {{ member.status }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                    <div class="h-8 w-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                      <component :is="activity.icon" class="h-4 w-4 text-purple-600 dark:text-purple-400" />
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
        </div>
      </div>

      <!-- Business Analytics -->
      <div class="mt-8">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div class="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Business Analytics</h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="text-center">
                <div class="text-3xl font-bold text-purple-600">{{ analyticsData.projectCompletionRate }}%</div>
                <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">Project Completion Rate</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-green-600">{{ analyticsData.clientSatisfaction }}%</div>
                <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">Client Satisfaction</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-blue-600">{{ analyticsData.averageProjectValue }}</div>
                <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">Avg Project Value</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modals -->
      <div v-if="showBusinessModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
          <h3 class="text-lg font-semibold mb-4">Business Settings</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-4">Business settings panel coming soon...</p>
          <button @click="showBusinessModal = false" class="bg-primary text-white px-4 py-2 rounded-lg">
            Close
          </button>
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useNotifications } from '@/composables/useNotifications'
import DashboardLayout from '@/components/navigation/DashboardLayout.vue'
import {
  BuildingOfficeIcon,
  BuildingOffice2Icon,
  FolderIcon,
  FolderPlusIcon,
  UserPlusIcon,
  ChartBarIcon,
  CogIcon,
  CheckBadgeIcon,
  ClockIcon,
  UserIcon,
  DocumentTextIcon
} from '@heroicons/vue/24/outline'

// Stores and composables
const router = useRouter()
const authStore = useAuthStore()
const { showSuccess, showError } = useNotifications()

// Reactive state
const showBusinessModal = ref(false)

// Business Info
const businessInfo = ref({
  businessName: authStore.user?.businessName || 'Your Business',
  businessType: 'Technology Company',
  industry: 'Software Development',
  verified: true,
  createdAt: '2024-01-15T00:00:00Z'
})

// Business Statistics
const businessStats = ref({
  totalProjects: 24,
  activeClients: 8,
  teamMembers: 12,
  revenue: 45000
})

// Active Projects
const activeProjects = ref([
  {
    id: 1,
    name: 'Mobile App Development',
    client: 'TechCorp Inc.',
    progress: 75,
    value: 15000,
    dueDate: '2024-12-30T00:00:00Z'
  },
  {
    id: 2,
    name: 'Website Redesign',
    client: 'Creative Agency',
    progress: 45,
    value: 8000,
    dueDate: '2024-11-15T00:00:00Z'
  },
  {
    id: 3,
    name: 'E-commerce Platform',
    client: 'Retail Solutions',
    progress: 60,
    value: 22000,
    dueDate: '2024-12-20T00:00:00Z'
  }
])

// Financial Data
const financialData = ref({
  thisMonth: 12500,
  monthlyGrowth: 15,
  thisYear: 180000,
  yearlyGrowth: 28
})

// Team Members
const teamMembers = ref([
  {
    id: 1,
    name: 'John Smith',
    role: 'Lead Developer',
    status: 'active',
    avatar: null
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Designer',
    status: 'active',
    avatar: null
  },
  {
    id: 3,
    name: 'Mike Wilson',
    role: 'Project Manager',
    status: 'active',
    avatar: null
  },
  {
    id: 4,
    name: 'Lisa Brown',
    role: 'Developer',
    status: 'inactive',
    avatar: null
  }
])

// Recent Activity
const recentActivity = ref([
  {
    id: 1,
    title: 'Project milestone completed',
    description: 'Mobile App Development - Phase 2 completed',
    timestamp: new Date().toISOString(),
    icon: FolderIcon
  },
  {
    id: 2,
    title: 'New team member added',
    description: 'Lisa Brown joined as Developer',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    icon: UserIcon
  },
  {
    id: 3,
    title: 'Client payment received',
    description: '$8,000 payment from Creative Agency',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    icon: DocumentTextIcon
  },
  {
    id: 4,
    title: 'Project deadline reminder',
    description: 'Website Redesign due in 3 days',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    icon: ClockIcon
  }
])

// Analytics Data
const analyticsData = ref({
  projectCompletionRate: 92,
  clientSatisfaction: 98,
  averageProjectValue: '$12.5K'
})

// Computed properties
const formattedStats = computed(() => ({
  totalProjects: businessStats.value.totalProjects.toLocaleString(),
  activeClients: businessStats.value.activeClients.toLocaleString(),
  teamMembers: businessStats.value.teamMembers.toLocaleString(),
  revenue: businessStats.value.revenue.toLocaleString()
}))

// Methods
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount).replace('$', '')
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const createProject = () => {
  showSuccess('Create Project', 'Redirecting to project creation...')
  router.push('/projects/create')
}

const addTeamMember = () => {
  showSuccess('Add Team Member', 'Team member invitation feature coming soon!')
}

const viewReports = () => {
  showSuccess('View Reports', 'Redirecting to reports dashboard...')
  router.push('/reports')
}

const businessSettings = () => {
  showBusinessModal.value = true
}

onMounted(() => {
  console.log('🏢 Business dashboard loaded for:', businessInfo.value.businessName)
})
</script>
