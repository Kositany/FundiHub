<template>
  <DashboardLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Contracts</h1>
            <p class="text-gray-600">Manage all your project contracts and agreements</p>
          </div>
          <div class="flex space-x-3">
            <button @click="showCreateContract = true" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <span class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span>New Contract</span>
              </span>
            </button>
            <button class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              <span class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                </svg>
                <span>Import</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Contract Stats -->
      <div class="grid md:grid-cols-5 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Contracts</p>
              <p class="text-2xl font-semibold text-gray-900">{{ contractStats.total }}</p>
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
              <p class="text-sm font-medium text-gray-600">Active</p>
              <p class="text-2xl font-semibold text-gray-900">{{ contractStats.active }}</p>
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
              <p class="text-sm font-medium text-gray-600">Pending</p>
              <p class="text-2xl font-semibold text-gray-900">{{ contractStats.pending }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-red-100 rounded-lg">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.664-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Expiring Soon</p>
              <p class="text-2xl font-semibold text-gray-900">{{ contractStats.expiringSoon }}</p>
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
              <p class="text-sm font-medium text-gray-600">Total Value</p>
              <p class="text-2xl font-semibold text-gray-900">${{ contractStats.totalValue.toLocaleString() }}</p>
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
              placeholder="Search contracts..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          <select v-model="statusFilter" class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="terminated">Terminated</option>
          </select>
          <select v-model="typeFilter" class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Types</option>
            <option value="service">Service Agreement</option>
            <option value="construction">Construction Contract</option>
            <option value="maintenance">Maintenance Contract</option>
            <option value="supply">Supply Contract</option>
          </select>
          <input 
            v-model="dateFilter"
            type="date"
            class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
      </div>

      <!-- Contracts List -->
      <div class="space-y-4">
        <div v-for="contract in filteredContracts" :key="contract.id" class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
          <div class="p-6">
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <h3 class="text-lg font-semibold text-gray-900">{{ contract.title }}</h3>
                  <span :class="getStatusColor(contract.status)" class="px-2 py-1 text-xs rounded-full">
                    {{ contract.status.charAt(0).toUpperCase() + contract.status.slice(1) }}
                  </span>
                  <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {{ contract.type }}
                  </span>
                </div>
                
                <p class="text-gray-600 mb-4">{{ contract.description }}</p>
                
                <div class="grid md:grid-cols-6 gap-4 text-sm">
                  <div>
                    <span class="text-gray-500">Contract Value:</span>
                    <div class="font-semibold">${{ contract.value.toLocaleString() }}</div>
                  </div>
                  <div>
                    <span class="text-gray-500">Start Date:</span>
                    <div class="font-semibold">{{ formatDate(contract.startDate) }}</div>
                  </div>
                  <div>
                    <span class="text-gray-500">End Date:</span>
                    <div class="font-semibold">{{ formatDate(contract.endDate) }}</div>
                  </div>
                  <div>
                    <span class="text-gray-500">Duration:</span>
                    <div class="font-semibold">{{ contract.duration }}</div>
                  </div>
                  <div>
                    <span class="text-gray-500">Payment Terms:</span>
                    <div class="font-semibold">{{ contract.paymentTerms }}</div>
                  </div>
                  <div>
                    <span class="text-gray-500">Completion:</span>
                    <div class="font-semibold">{{ contract.completion }}%</div>
                  </div>
                </div>

                <!-- Progress Bar for Active Contracts -->
                <div v-if="contract.status === 'active'" class="mt-4">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-sm text-gray-600">Contract Progress</span>
                    <span class="text-sm text-gray-600">{{ contract.completion }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      class="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      :style="{ width: contract.completion + '%' }"
                    ></div>
                  </div>
                </div>

                <!-- Parties Involved -->
                <div class="mt-4">
                  <span class="text-sm text-gray-600 mb-2 block">Parties:</span>
                  <div class="flex items-center space-x-4">
                    <div class="flex items-center space-x-2">
                      <img :src="contract.client.avatar" :alt="contract.client.name" class="w-8 h-8 rounded-full">
                      <div>
                        <div class="text-sm font-semibold">{{ contract.client.name }}</div>
                        <div class="text-xs text-gray-500">Client</div>
                      </div>
                    </div>
                    <div class="text-gray-400">↔</div>
                    <div class="flex items-center space-x-2">
                      <img :src="contract.contractor.avatar" :alt="contract.contractor.name" class="w-8 h-8 rounded-full">
                      <div>
                        <div class="text-sm font-semibold">{{ contract.contractor.name }}</div>
                        <div class="text-xs text-gray-500">Contractor</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Key Milestones -->
                <div v-if="contract.milestones.length > 0" class="mt-4">
                  <span class="text-sm text-gray-600 mb-2 block">Key Milestones:</span>
                  <div class="space-y-1">
                    <div v-for="milestone in contract.milestones.slice(0, 2)" :key="milestone.id" class="flex items-center justify-between text-sm">
                      <span>{{ milestone.title }}</span>
                      <span :class="milestone.completed ? 'text-green-600' : 'text-gray-500'">
                        {{ milestone.completed ? '✓ Completed' : formatDate(milestone.dueDate) }}
                      </span>
                    </div>
                    <button v-if="contract.milestones.length > 2" @click="viewMilestones(contract)" class="text-blue-600 hover:text-blue-700 text-sm">
                      View all {{ contract.milestones.length }} milestones
                    </button>
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex flex-col space-y-2 ml-6">
                <button @click="viewContract(contract)" class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm">
                  View Details
                </button>
                <button v-if="contract.status === 'draft'" @click="editContract(contract)" class="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 text-sm">
                  Edit
                </button>
                <button @click="downloadContract(contract)" class="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 text-sm">
                  Download
                </button>
                <button v-if="contract.status === 'pending'" @click="signContract(contract)" class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm">
                  Sign
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Contract Modal -->
    <div v-if="showCreateContract" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold">Create New Contract</h2>
          <button @click="showCreateContract = false" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form @submit.prevent="createContract" class="space-y-6">
          <!-- Basic Information -->
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Contract Title</label>
              <input 
                v-model="newContract.title"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Contract Type</label>
              <select v-model="newContract.type" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Type</option>
                <option value="service">Service Agreement</option>
                <option value="construction">Construction Contract</option>
                <option value="maintenance">Maintenance Contract</option>
                <option value="supply">Supply Contract</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              v-model="newContract.description"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <!-- Contract Details -->
          <div class="grid md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Contract Value ($)</label>
              <input 
                v-model.number="newContract.value"
                type="number"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input 
                v-model="newContract.startDate"
                type="date"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input 
                v-model="newContract.endDate"
                type="date"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
              <select v-model="newContract.paymentTerms" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Terms</option>
                <option value="Net 30">Net 30</option>
                <option value="Net 60">Net 60</option>
                <option value="Milestone">Milestone Based</option>
                <option value="Upfront">50% Upfront</option>
              </select>
            </div>
          </div>

          <div class="flex justify-end space-x-3">
            <button type="button" @click="showCreateContract = false" class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Create Contract
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
const typeFilter = ref('')
const dateFilter = ref('')
const showCreateContract = ref(false)

const contractStats = ref({
  total: 45,
  active: 12,
  pending: 8,
  expiringSoon: 3,
  totalValue: 2850000
})

const newContract = ref({
  title: '',
  type: '',
  description: '',
  value: 0,
  startDate: '',
  endDate: '',
  paymentTerms: ''
})

// Sample contracts data
const contracts = ref([
  {
    id: 1,
    title: 'Office Building Renovation Contract',
    description: 'Complete renovation of 5th floor office space including all utilities and finishes.',
    status: 'active',
    type: 'construction',
    value: 185000,
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    duration: '5.5 months',
    paymentTerms: 'Milestone',
    completion: 65,
    client: {
      name: 'TechCorp Ltd',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100'
    },
    contractor: {
      name: 'BuildRight Construction',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
    },
    milestones: [
      { id: 1, title: 'Demolition Complete', completed: true, dueDate: '2024-02-01' },
      { id: 2, title: 'Electrical Installation', completed: true, dueDate: '2024-03-15' },
      { id: 3, title: 'Plumbing Installation', completed: false, dueDate: '2024-04-01' },
      { id: 4, title: 'Final Inspection', completed: false, dueDate: '2024-06-25' }
    ]
  },
  {
    id: 2,
    title: 'Annual Maintenance Service Agreement',
    description: 'Comprehensive maintenance services for all building systems including HVAC, electrical, and plumbing.',
    status: 'pending',
    type: 'maintenance',
    value: 45000,
    startDate: '2024-03-01',
    endDate: '2025-02-28',
    duration: '12 months',
    paymentTerms: 'Net 30',
    completion: 0,
    client: {
      name: 'Metro Shopping Center',
      avatar: 'https://images.unsplash.com/photo-1554774853-719586f82d77?w=100'
    },
    contractor: {
      name: 'ServicePro Maintenance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    },
    milestones: [
      { id: 1, title: 'Contract Signing', completed: false, dueDate: '2024-02-25' },
      { id: 2, title: 'Initial Inspection', completed: false, dueDate: '2024-03-05' }
    ]
  },
  {
    id: 3,
    title: 'Restaurant Kitchen Equipment Supply',
    description: 'Supply and installation of commercial kitchen equipment for new restaurant location.',
    status: 'completed',
    type: 'supply',
    value: 85000,
    startDate: '2023-11-01',
    endDate: '2023-12-15',
    duration: '1.5 months',
    paymentTerms: '50% Upfront',
    completion: 100,
    client: {
      name: 'Gourmet Bistro',
      avatar: 'https://images.unsplash.com/photo-1577308856961-8e0ec50d0c5b?w=100'
    },
    contractor: {
      name: 'Kitchen Solutions Inc',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b120?w=100'
    },
    milestones: [
      { id: 1, title: 'Equipment Delivery', completed: true, dueDate: '2023-11-15' },
      { id: 2, title: 'Installation Complete', completed: true, dueDate: '2023-12-10' },
      { id: 3, title: 'Final Testing', completed: true, dueDate: '2023-12-15' }
    ]
  }
])

// Computed
const filteredContracts = computed(() => {
  let filtered = contracts.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(contract => 
      contract.title.toLowerCase().includes(query) ||
      contract.description.toLowerCase().includes(query) ||
      contract.client.name.toLowerCase().includes(query)
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(contract => contract.status === statusFilter.value)
  }

  if (typeFilter.value) {
    filtered = filtered.filter(contract => contract.type === typeFilter.value)
  }

  return filtered
})

// Methods
const getStatusColor = (status) => {
  const colors = {
    'draft': 'bg-gray-100 text-gray-800',
    'pending': 'bg-yellow-100 text-yellow-800',
    'active': 'bg-green-100 text-green-800',
    'completed': 'bg-blue-100 text-blue-800',
    'terminated': 'bg-red-100 text-red-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

const viewContract = (contract) => {
  console.log('Viewing contract:', contract.title)
}

const editContract = (contract) => {
  console.log('Editing contract:', contract.title)
}

const downloadContract = (contract) => {
  console.log('Downloading contract:', contract.title)
}

const signContract = (contract) => {
  console.log('Signing contract:', contract.title)
}

const viewMilestones = (contract) => {
  console.log('Viewing milestones for:', contract.title)
}

const createContract = () => {
  console.log('Creating contract:', newContract.value)
  showCreateContract.value = false
  
  // Reset form
  newContract.value = {
    title: '',
    type: '',
    description: '',
    value: 0,
    startDate: '',
    endDate: '',
    paymentTerms: ''
  }
}
</script>
