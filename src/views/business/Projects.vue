<template>
  <DashboardLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Projects</h1>
            <p class="text-gray-600">Manage your construction and maintenance projects</p>
          </div>
          <div class="flex space-x-3">
            <button @click="showCreateProject = true" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <span class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span>New Project</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Project Stats -->
      <div class="grid md:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Projects</p>
              <p class="text-2xl font-semibold text-gray-900">{{ projectStats.total }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Completed</p>
              <p class="text-2xl font-semibold text-gray-900">{{ projectStats.completed }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-yellow-100 rounded-lg">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">In Progress</p>
              <p class="text-2xl font-semibold text-gray-900">{{ projectStats.inProgress }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-purple-100 rounded-lg">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Budget</p>
              <p class="text-2xl font-semibold text-gray-900">${{ projectStats.totalBudget.toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center space-x-4">
          <div class="flex-1">
            <input 
              v-model="searchQuery"
              type="text"
              placeholder="Search projects..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          <select v-model="statusFilter" class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Status</option>
            <option value="planning">Planning</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>
          <select v-model="categoryFilter" class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Categories</option>
            <option value="construction">Construction</option>
            <option value="renovation">Renovation</option>
            <option value="maintenance">Maintenance</option>
            <option value="repair">Repair</option>
          </select>
        </div>
      </div>

      <!-- Projects List -->
      <div class="space-y-4">
        <div v-for="project in filteredProjects" :key="project.id" class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
          <div class="p-6">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <h3 class="text-lg font-semibold text-gray-900">{{ project.title }}</h3>
                  <span :class="getStatusColor(project.status)" class="px-2 py-1 text-xs rounded-full">
                    {{ project.status.charAt(0).toUpperCase() + project.status.slice(1) }}
                  </span>
                  <span :class="getPriorityColor(project.priority)" class="px-2 py-1 text-xs rounded-full">
                    {{ project.priority }} Priority
                  </span>
                </div>
                
                <p class="text-gray-600 mb-4">{{ project.description }}</p>
                
                <div class="grid md:grid-cols-5 gap-4 text-sm">
                  <div>
                    <span class="text-gray-500">Budget:</span>
                    <div class="font-semibold">${{ project.budget.toLocaleString() }}</div>
                  </div>
                  <div>
                    <span class="text-gray-500">Start Date:</span>
                    <div class="font-semibold">{{ formatDate(project.startDate) }}</div>
                  </div>
                  <div>
                    <span class="text-gray-500">Deadline:</span>
                    <div class="font-semibold">{{ formatDate(project.deadline) }}</div>
                  </div>
                  <div>
                    <span class="text-gray-500">Team Size:</span>
                    <div class="font-semibold">{{ project.teamSize }} members</div>
                  </div>
                  <div>
                    <span class="text-gray-500">Progress:</span>
                    <div class="font-semibold">{{ project.progress }}%</div>
                  </div>
                </div>

                <!-- Progress Bar -->
                <div class="mt-4">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-sm text-gray-600">Project Progress</span>
                    <span class="text-sm text-gray-600">{{ project.progress }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      :class="getProgressColor(project.progress)"
                      class="h-2 rounded-full transition-all duration-300"
                      :style="{ width: project.progress + '%' }"
                    ></div>
                  </div>
                </div>

                <!-- Team Members -->
                <div class="mt-4">
                  <span class="text-sm text-gray-600 mb-2 block">Assigned Team:</span>
                  <div class="flex items-center space-x-2">
                    <div class="flex -space-x-2">
                      <img 
                        v-for="member in project.team.slice(0, 4)" 
                        :key="member.id"
                        :src="member.avatar" 
                        :alt="member.name"
                        class="w-8 h-8 rounded-full border-2 border-white"
                        :title="member.name"
                      >
                      <div v-if="project.team.length > 4" class="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-600">
                        +{{ project.team.length - 4 }}
                      </div>
                    </div>
                    <button @click="viewTeam(project)" class="text-blue-600 hover:text-blue-700 text-sm">
                      View All
                    </button>
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex flex-col space-y-2 ml-6">
                <button @click="viewProject(project)" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
                  View Details
                </button>
                <button @click="editProject(project)" class="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 text-sm">
                  Edit
                </button>
                <button @click="shareProject(project)" class="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 text-sm">
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Project Modal -->
    <div v-if="showCreateProject" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold">Create New Project</h2>
          <button @click="showCreateProject = false" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form @submit.prevent="createProject" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
            <input 
              v-model="newProject.title"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              v-model="newProject.description"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select v-model="newProject.category" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Category</option>
                <option value="construction">Construction</option>
                <option value="renovation">Renovation</option>
                <option value="maintenance">Maintenance</option>
                <option value="repair">Repair</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select v-model="newProject.priority" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div class="grid md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Budget ($)</label>
              <input 
                v-model.number="newProject.budget"
                type="number"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input 
                v-model="newProject.startDate"
                type="date"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
              <input 
                v-model="newProject.deadline"
                type="date"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
          </div>

          <div class="flex justify-end space-x-3">
            <button type="button" @click="showCreateProject = false" class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Create Project
            </button>
          </div>
        </form>
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
const categoryFilter = ref('')
const showCreateProject = ref(false)

const projectStats = ref({
  total: 24,
  completed: 18,
  inProgress: 4,
  totalBudget: 145000
})

const newProject = ref({
  title: '',
  description: '',
  category: '',
  priority: 'medium',
  budget: 0,
  startDate: '',
  deadline: ''
})

// Sample projects data
const projects = ref([
  {
    id: 1,
    title: 'Office Building Renovation',
    description: 'Complete renovation of the 5th floor office space including electrical, plumbing, and interior design.',
    status: 'in-progress',
    priority: 'high',
    category: 'renovation',
    budget: 75000,
    startDate: '2024-01-15',
    deadline: '2024-03-30',
    progress: 65,
    teamSize: 8,
    team: [
      { id: 1, name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
      { id: 2, name: 'Jane Smith', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b120?w=100' },
      { id: 3, name: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
      { id: 4, name: 'Sarah Wilson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
      { id: 5, name: 'Tom Brown', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' }
    ]
  },
  {
    id: 2,
    title: 'Warehouse Construction',
    description: 'New warehouse facility construction with modern storage systems and loading docks.',
    status: 'planning',
    priority: 'medium',
    category: 'construction',
    budget: 120000,
    startDate: '2024-02-01',
    deadline: '2024-08-15',
    progress: 15,
    teamSize: 12,
    team: [
      { id: 6, name: 'David Lee', avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100' },
      { id: 7, name: 'Emily Davis', avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100' },
      { id: 8, name: 'Chris Martin', avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=100' }
    ]
  },
  {
    id: 3,
    title: 'Restaurant Kitchen Upgrade',
    description: 'Kitchen equipment upgrade and ventilation system installation for downtown restaurant.',
    status: 'completed',
    priority: 'high',
    category: 'renovation',
    budget: 35000,
    startDate: '2023-11-01',
    deadline: '2023-12-15',
    progress: 100,
    teamSize: 5,
    team: [
      { id: 9, name: 'Alex Rodriguez', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100' },
      { id: 10, name: 'Lisa Chang', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100' }
    ]
  }
])

// Computed
const filteredProjects = computed(() => {
  let filtered = projects.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(project => 
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query)
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(project => project.status === statusFilter.value)
  }

  if (categoryFilter.value) {
    filtered = filtered.filter(project => project.category === categoryFilter.value)
  }

  return filtered
})

// Methods
const getStatusColor = (status) => {
  const colors = {
    'planning': 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    'completed': 'bg-green-100 text-green-800',
    'on-hold': 'bg-red-100 text-red-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

const getPriorityColor = (priority) => {
  const colors = {
    'low': 'bg-gray-100 text-gray-800',
    'medium': 'bg-blue-100 text-blue-800',
    'high': 'bg-orange-100 text-orange-800',
    'urgent': 'bg-red-100 text-red-800'
  }
  return colors[priority] || 'bg-gray-100 text-gray-800'
}

const getProgressColor = (progress) => {
  if (progress < 30) return 'bg-red-500'
  if (progress < 70) return 'bg-yellow-500'
  return 'bg-green-500'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

const viewProject = (project) => {
  console.log('Viewing project:', project.title)
}

const editProject = (project) => {
  console.log('Editing project:', project.title)
}

const shareProject = (project) => {
  console.log('Sharing project:', project.title)
}

const viewTeam = (project) => {
  console.log('Viewing team for:', project.title)
}

const createProject = () => {
  console.log('Creating project:', newProject.value)
  // Add project creation logic
  showCreateProject.value = false
  
  // Reset form
  newProject.value = {
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    budget: 0,
    startDate: '',
    deadline: ''
  }
}
</script>
