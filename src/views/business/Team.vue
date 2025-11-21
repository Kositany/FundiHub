<template>
  <DashboardLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Team Management</h1>
            <p class="text-gray-600">Manage your team members and their roles</p>
          </div>
          <div class="flex space-x-3">
            <button @click="showInviteModal = true" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <span class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                </svg>
                <span>Invite Member</span>
              </span>
            </button>
            <button @click="showCreateTeam = true" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              <span class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span>Create Team</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Team Overview -->
      <div class="grid md:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Members</p>
              <p class="text-2xl font-semibold text-gray-900">{{ teamStats.totalMembers }}</p>
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
              <p class="text-sm font-medium text-gray-600">Active Now</p>
              <p class="text-2xl font-semibold text-gray-900">{{ teamStats.activeNow }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-yellow-100 rounded-lg">
              <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Departments</p>
              <p class="text-2xl font-semibold text-gray-900">{{ teamStats.departments }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-2 bg-purple-100 rounded-lg">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Projects Active</p>
              <p class="text-2xl font-semibold text-gray-900">{{ teamStats.activeProjects }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters and Search -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center space-x-4">
          <div class="flex-1">
            <input 
              v-model="searchQuery"
              type="text"
              placeholder="Search team members..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          <select v-model="departmentFilter" class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Departments</option>
            <option value="construction">Construction</option>
            <option value="electrical">Electrical</option>
            <option value="plumbing">Plumbing</option>
            <option value="management">Management</option>
          </select>
          <select v-model="roleFilter" class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="supervisor">Supervisor</option>
            <option value="worker">Worker</option>
          </select>
          <select v-model="statusFilter" class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="on-leave">On Leave</option>
          </select>
        </div>
      </div>

      <!-- Team Members Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="member in filteredMembers" :key="member.id" class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
          <div class="p-6">
            <!-- Member Header -->
            <div class="flex items-center space-x-4 mb-4">
              <div class="relative">
                <img :src="member.avatar" :alt="member.name" class="w-16 h-16 rounded-full object-cover">
                <div 
                  :class="member.isOnline ? 'bg-green-400' : 'bg-gray-400'"
                  class="absolute -bottom-1 -right-1 w-4 h-4 border-2 border-white rounded-full"
                ></div>
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900">{{ member.name }}</h3>
                <p class="text-sm text-gray-600">{{ member.position }}</p>
                <div class="flex items-center space-x-2 mt-1">
                  <span :class="getRoleColor(member.role)" class="px-2 py-1 text-xs rounded-full">
                    {{ member.role }}
                  </span>
                  <span :class="getStatusColor(member.status)" class="px-2 py-1 text-xs rounded-full">
                    {{ member.status }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Member Details -->
            <div class="space-y-3 mb-4">
              <div class="flex items-center text-sm text-gray-600">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                {{ member.email }}
              </div>
              <div class="flex items-center text-sm text-gray-600">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                {{ member.phone }}
              </div>
              <div class="flex items-center text-sm text-gray-600">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                {{ member.department }}
              </div>
            </div>

            <!-- Skills -->
            <div class="mb-4">
              <span class="text-sm text-gray-600 mb-2 block">Skills:</span>
              <div class="flex flex-wrap gap-1">
                <span v-for="skill in member.skills.slice(0, 3)" :key="skill" class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {{ skill }}
                </span>
                <span v-if="member.skills.length > 3" class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{{ member.skills.length - 3 }}
                </span>
              </div>
            </div>

            <!-- Performance Stats -->
            <div class="grid grid-cols-3 gap-2 mb-4 text-center">
              <div class="bg-gray-50 rounded p-2">
                <div class="text-sm font-semibold text-gray-900">{{ member.completedTasks }}</div>
                <div class="text-xs text-gray-600">Tasks</div>
              </div>
              <div class="bg-gray-50 rounded p-2">
                <div class="text-sm font-semibold text-gray-900">{{ member.rating }}/5</div>
                <div class="text-xs text-gray-600">Rating</div>
              </div>
              <div class="bg-gray-50 rounded p-2">
                <div class="text-sm font-semibold text-gray-900">{{ member.experience }}y</div>
                <div class="text-xs text-gray-600">Exp.</div>
              </div>
            </div>

            <!-- Current Projects -->
            <div class="mb-4">
              <span class="text-sm text-gray-600 mb-2 block">Current Projects:</span>
              <div class="space-y-1">
                <div v-for="project in member.currentProjects.slice(0, 2)" :key="project" class="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                  {{ project }}
                </div>
                <div v-if="member.currentProjects.length > 2" class="text-xs text-gray-500">
                  +{{ member.currentProjects.length - 2 }} more
                </div>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex space-x-2">
              <button @click="viewMember(member)" class="flex-1 bg-blue-600 text-white py-2 px-3 rounded-md hover:bg-blue-700 text-sm">
                View Profile
              </button>
              <button @click="editMember(member)" class="bg-gray-100 text-gray-700 py-2 px-3 rounded-md hover:bg-gray-200 text-sm">
                Edit
              </button>
              <button @click="contactMember(member)" class="bg-gray-100 text-gray-700 py-2 px-3 rounded-md hover:bg-gray-200 text-sm">
                Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Invite Member Modal -->
    <div v-if="showInviteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold">Invite Team Member</h2>
          <button @click="showInviteModal = false" class="text-gray-500 hover:text-gray-700">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form @submit.prevent="inviteMember" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              v-model="inviteForm.email"
              type="email"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select v-model="inviteForm.role" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="supervisor">Supervisor</option>
              <option value="worker">Worker</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select v-model="inviteForm.department" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select Department</option>
              <option value="construction">Construction</option>
              <option value="electrical">Electrical</option>
              <option value="plumbing">Plumbing</option>
              <option value="management">Management</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
            <textarea 
              v-model="inviteForm.message"
              rows="3"
              placeholder="Add a personal message to the invitation..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div class="flex justify-end space-x-3">
            <button type="button" @click="showInviteModal = false" class="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Send Invitation
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
const departmentFilter = ref('')
const roleFilter = ref('')
const statusFilter = ref('')
const showInviteModal = ref(false)
const showCreateTeam = ref(false)

const teamStats = ref({
  totalMembers: 28,
  activeNow: 12,
  departments: 4,
  activeProjects: 8
})

const inviteForm = ref({
  email: '',
  role: '',
  department: '',
  message: ''
})

// Sample team members data
const teamMembers = ref([
  {
    id: 1,
    name: 'John Mwangi',
    position: 'Senior Plumber',
    email: 'john.mwangi@company.com',
    phone: '+254 712 345 678',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    role: 'supervisor',
    department: 'plumbing',
    status: 'active',
    isOnline: true,
    skills: ['Plumbing', 'Pipe Installation', 'Drainage', 'Water Systems'],
    completedTasks: 156,
    rating: 4.8,
    experience: 8,
    currentProjects: ['Office Renovation', 'Hotel Plumbing', 'Mall Maintenance']
  },
  {
    id: 2,
    name: 'Grace Wanjiku',
    position: 'Electrical Engineer',
    email: 'grace.wanjiku@company.com',
    phone: '+254 723 456 789',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b120?w=150',
    role: 'manager',
    department: 'electrical',
    status: 'active',
    isOnline: false,
    skills: ['Electrical Design', 'Solar Systems', 'Safety Compliance', 'Project Management'],
    completedTasks: 203,
    rating: 4.9,
    experience: 12,
    currentProjects: ['Warehouse Construction', 'Solar Installation']
  },
  {
    id: 3,
    name: 'David Kiprotich',
    position: 'Construction Supervisor',
    email: 'david.kiprotich@company.com',
    phone: '+254 734 567 890',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    role: 'supervisor',
    department: 'construction',
    status: 'on-leave',
    isOnline: false,
    skills: ['Site Management', 'Quality Control', 'Safety Management', 'Team Leadership'],
    completedTasks: 128,
    rating: 4.6,
    experience: 10,
    currentProjects: ['Mall Construction']
  },
  {
    id: 4,
    name: 'Sarah Akinyi',
    position: 'Project Manager',
    email: 'sarah.akinyi@company.com',
    phone: '+254 745 678 901',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    role: 'admin',
    department: 'management',
    status: 'active',
    isOnline: true,
    skills: ['Project Planning', 'Budget Management', 'Client Relations', 'Risk Assessment'],
    completedTasks: 89,
    rating: 4.7,
    experience: 6,
    currentProjects: ['Office Renovation', 'Warehouse Construction', 'Restaurant Upgrade']
  }
])

// Computed
const filteredMembers = computed(() => {
  let filtered = teamMembers.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(member => 
      member.name.toLowerCase().includes(query) ||
      member.position.toLowerCase().includes(query) ||
      member.email.toLowerCase().includes(query)
    )
  }

  if (departmentFilter.value) {
    filtered = filtered.filter(member => member.department === departmentFilter.value)
  }

  if (roleFilter.value) {
    filtered = filtered.filter(member => member.role === roleFilter.value)
  }

  if (statusFilter.value) {
    filtered = filtered.filter(member => member.status === statusFilter.value)
  }

  return filtered
})

// Methods
const getRoleColor = (role) => {
  const colors = {
    'admin': 'bg-red-100 text-red-800',
    'manager': 'bg-purple-100 text-purple-800',
    'supervisor': 'bg-blue-100 text-blue-800',
    'worker': 'bg-green-100 text-green-800'
  }
  return colors[role] || 'bg-gray-100 text-gray-800'
}

const getStatusColor = (status) => {
  const colors = {
    'active': 'bg-green-100 text-green-800',
    'inactive': 'bg-gray-100 text-gray-800',
    'on-leave': 'bg-yellow-100 text-yellow-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

const viewMember = (member) => {
  console.log('Viewing member:', member.name)
}

const editMember = (member) => {
  console.log('Editing member:', member.name)
}

const contactMember = (member) => {
  console.log('Contacting member:', member.name)
}

const inviteMember = () => {
  console.log('Inviting member:', inviteForm.value)
  showInviteModal.value = false
  
  // Reset form
  inviteForm.value = {
    email: '',
    role: '',
    department: '',
    message: ''
  }
}
</script>
