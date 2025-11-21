<template>
  <DashboardLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Portfolio</h1>
            <p class="text-gray-600">Showcase your best work and projects</p>
          </div>
          <div class="flex space-x-3">
            <button @click="showAddProject = true" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <span class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span>Add Project</span>
              </span>
            </button>
            <button class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
              <span class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                </svg>
                <span>Export Portfolio</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Portfolio Stats -->
      <div class="grid md:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Projects</p>
              <p class="text-2xl font-semibold text-gray-900">{{ portfolioStats.totalProjects }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-green-100 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Views</p>
              <p class="text-2xl font-semibold text-gray-900">{{ portfolioStats.totalViews }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-yellow-100 rounded-lg">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Likes</p>
              <p class="text-2xl font-semibold text-gray-900">{{ portfolioStats.totalLikes }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-purple-100 rounded-lg">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Inquiries</p>
              <p class="text-2xl font-semibold text-gray-900">{{ portfolioStats.inquiries }}</p>
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
          <select v-model="categoryFilter" class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Categories</option>
            <option value="plumbing">Plumbing</option>
            <option value="electrical">Electrical</option>
            <option value="carpentry">Carpentry</option>
            <option value="painting">Painting</option>
            <option value="tiling">Tiling</option>
            <option value="roofing">Roofing</option>
          </select>
          <select v-model="sortBy" class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="recent">Most Recent</option>
            <option value="popular">Most Popular</option>
            <option value="views">Most Viewed</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>

      <!-- Portfolio Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="project in filteredProjects" :key="project.id" class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
          <!-- Project Image -->
          <div class="relative">
            <img :src="project.images[0]" :alt="project.title" class="w-full h-48 object-cover rounded-t-lg">
            <div class="absolute top-3 right-3">
              <button @click="toggleFavorite(project)" class="p-2 bg-white rounded-full shadow-md hover:shadow-lg">
                <svg :class="project.isFavorite ? 'text-red-500' : 'text-gray-400'" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
            <div class="absolute top-3 left-3">
              <span :class="getCategoryColor(project.category)" class="px-2 py-1 text-xs rounded-full">
                {{ project.category }}
              </span>
            </div>
            <div v-if="project.images.length > 1" class="absolute bottom-3 right-3">
              <span class="px-2 py-1 bg-black bg-opacity-50 text-white text-xs rounded-full">
                +{{ project.images.length - 1 }} photos
              </span>
            </div>
          </div>

          <!-- Project Info -->
          <div class="p-6">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-lg font-semibold text-gray-900">{{ project.title }}</h3>
              <div class="flex items-center space-x-1">
                <button @click="editProject(project)" class="text-gray-400 hover:text-gray-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                  </svg>
                </button>
                <button @click="deleteProject(project)" class="text-gray-400 hover:text-red-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            <p class="text-gray-600 text-sm mb-3">{{ project.description }}</p>
            
            <div class="flex items-center justify-between text-sm text-gray-500 mb-3">
              <span>{{ formatDate(project.completedDate) }}</span>
              <span>${{ project.budget.toLocaleString() }}</span>
            </div>

            <!-- Skills Used -->
            <div class="flex flex-wrap gap-1 mb-3">
              <span 
                v-for="skill in project.skills.slice(0, 3)" 
                :key="skill"
                class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
              >
                {{ skill }}
              </span>
              <span v-if="project.skills.length > 3" class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{{ project.skills.length - 3 }}
              </span>
            </div>

            <!-- Stats -->
            <div class="flex items-center justify-between pt-3 border-t border-gray-200">
              <div class="flex items-center space-x-4 text-sm text-gray-500">
                <span class="flex items-center space-x-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  <span>{{ project.views }}</span>
                </span>
                <span class="flex items-center space-x-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                  <span>{{ project.likes }}</span>
                </span>
              </div>
              <button @click="viewProject(project)" class="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Project Modal -->
    <div v-if="showAddProject" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold">Add New Project</h2>
          <button @click="showAddProject = false" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form @submit.prevent="addProject" class="space-y-4">
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
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select v-model="newProject.category" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Category</option>
                <option value="plumbing">Plumbing</option>
                <option value="electrical">Electrical</option>
                <option value="carpentry">Carpentry</option>
                <option value="painting">Painting</option>
                <option value="tiling">Tiling</option>
                <option value="roofing">Roofing</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Budget</label>
              <input 
                v-model.number="newProject.budget"
                type="number"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Completion Date</label>
            <input 
              v-model="newProject.completedDate"
              type="date"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Skills Used</label>
            <input 
              v-model="newProject.skillsInput"
              type="text"
              placeholder="Enter skills separated by commas"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Project Images</label>
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p class="text-gray-500 mb-2">Click to upload or drag and drop</p>
              <p class="text-xs text-gray-400">PNG, JPG, GIF up to 10MB each</p>
              <input type="file" multiple accept="image/*" class="hidden">
            </div>
          </div>

          <div class="flex justify-end space-x-3">
            <button type="button" @click="showAddProject = false" class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Add Project
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
const categoryFilter = ref('')
const sortBy = ref('recent')
const showAddProject = ref(false)

const portfolioStats = ref({
  totalProjects: 24,
  totalViews: 3250,
  totalLikes: 487,
  inquiries: 52
})

const newProject = ref({
  title: '',
  description: '',
  category: '',
  budget: 0,
  completedDate: '',
  skillsInput: ''
})

// Sample portfolio data
const projects = ref([
  {
    id: 1,
    title: 'Modern Kitchen Renovation',
    description: 'Complete kitchen renovation including plumbing, electrical, and cabinet installation.',
    category: 'plumbing',
    budget: 8500,
    completedDate: '2024-01-15',
    skills: ['Plumbing', 'Installation', 'Renovation'],
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
      'https://images.unsplash.com/photo-1556909045-f0c7c8e4e4e0?w=400'
    ],
    views: 247,
    likes: 34,
    isFavorite: false
  },
  {
    id: 2,
    title: 'Bathroom Plumbing Installation',
    description: 'New bathroom setup with modern fixtures and efficient plumbing system.',
    category: 'plumbing',
    budget: 4200,
    completedDate: '2024-01-08',
    skills: ['Plumbing', 'Bathroom Installation', 'Pipe Fitting'],
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400'
    ],
    views: 189,
    likes: 28,
    isFavorite: true
  },
  {
    id: 3,
    title: 'Office Building Water System',
    description: 'Large-scale commercial plumbing project for a 5-story office building.',
    category: 'plumbing',
    budget: 25000,
    completedDate: '2023-12-20',
    skills: ['Commercial Plumbing', 'Water Systems', 'Project Management'],
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400',
      'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=400'
    ],
    views: 412,
    likes: 67,
    isFavorite: false
  },
  {
    id: 4,
    title: 'Emergency Pipe Repair',
    description: 'Quick response emergency repair for burst pipes in residential complex.',
    category: 'plumbing',
    budget: 1200,
    completedDate: '2024-01-25',
    skills: ['Emergency Repair', 'Pipe Repair', 'Quick Response'],
    images: [
      'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400'
    ],
    views: 156,
    likes: 19,
    isFavorite: false
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

  if (categoryFilter.value) {
    filtered = filtered.filter(project => project.category === categoryFilter.value)
  }

  // Sort projects
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'popular':
        return b.likes - a.likes
      case 'views':
        return b.views - a.views
      case 'alphabetical':
        return a.title.localeCompare(b.title)
      default: // recent
        return new Date(b.completedDate) - new Date(a.completedDate)
    }
  })

  return filtered
})

// Methods
const getCategoryColor = (category) => {
  const colors = {
    'plumbing': 'bg-blue-100 text-blue-800',
    'electrical': 'bg-yellow-100 text-yellow-800',
    'carpentry': 'bg-brown-100 text-brown-800',
    'painting': 'bg-purple-100 text-purple-800',
    'tiling': 'bg-green-100 text-green-800',
    'roofing': 'bg-red-100 text-red-800'
  }
  return colors[category] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

const toggleFavorite = (project) => {
  project.isFavorite = !project.isFavorite
}

const viewProject = (project) => {
  console.log('Viewing project:', project.title)
}

const editProject = (project) => {
  console.log('Editing project:', project.title)
}

const deleteProject = (project) => {
  if (confirm('Are you sure you want to delete this project?')) {
    projects.value = projects.value.filter(p => p.id !== project.id)
  }
}

const addProject = () => {
  const project = {
    ...newProject.value,
    id: Date.now(),
    skills: newProject.value.skillsInput.split(',').map(s => s.trim()).filter(s => s),
    images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400'], // Placeholder
    views: 0,
    likes: 0,
    isFavorite: false
  }
  
  projects.value.unshift(project)
  showAddProject.value = false
  
  // Reset form
  newProject.value = {
    title: '',
    description: '',
    category: '',
    budget: 0,
    completedDate: '',
    skillsInput: ''
  }
}
</script>
