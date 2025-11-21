<template>
  <DashboardLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Messages</h1>
            <p class="text-gray-600">Chat with your fundis and manage conversations</p>
          </div>
          <div class="flex space-x-3">
            <button @click="markAllAsRead" class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
              <span class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Mark All Read</span>
              </span>
            </button>
            <button @click="composeMessage" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <span class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                <span>New Message</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Message Stats -->
      <div class="grid md:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Conversations</p>
              <p class="text-2xl font-semibold text-gray-900">{{ messageStats.totalConversations }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-green-100 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Unread Messages</p>
              <p class="text-2xl font-semibold text-gray-900">{{ messageStats.unreadMessages }}</p>
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
              <p class="text-sm font-medium text-gray-600">Avg Response Time</p>
              <p class="text-2xl font-semibold text-gray-900">{{ messageStats.avgResponseTime }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-purple-100 rounded-lg">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Active Fundis</p>
              <p class="text-2xl font-semibold text-gray-900">{{ messageStats.activeFundis }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Conversations List -->
        <div class="lg:col-span-1 bg-white rounded-lg shadow">
          <div class="p-4 border-b border-gray-200">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-900">Conversations</h3>
              <div class="flex space-x-2">
                <button @click="filterConversations('all')" :class="conversationFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'" class="px-3 py-1 text-xs rounded">
                  All
                </button>
                <button @click="filterConversations('unread')" :class="conversationFilter === 'unread' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'" class="px-3 py-1 text-xs rounded">
                  Unread
                </button>
              </div>
            </div>
            <input 
              v-model="searchQuery"
              type="text"
              placeholder="Search conversations..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
          </div>
          
          <div class="max-h-96 overflow-y-auto">
            <div 
              v-for="conversation in filteredConversations" 
              :key="conversation.id"
              @click="selectConversation(conversation)"
              :class="selectedConversation?.id === conversation.id ? 'bg-blue-50 border-r-4 border-blue-500' : 'hover:bg-gray-50'"
              class="p-4 border-b border-gray-200 cursor-pointer transition-colors"
            >
              <div class="flex items-start space-x-3">
                <div class="relative">
                  <img :src="conversation.fundi.avatar" :alt="conversation.fundi.name" class="w-10 h-10 rounded-full">
                  <div v-if="conversation.fundi.online" class="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="flex items-center justify-between">
                    <p class="text-sm font-medium text-gray-900 truncate">{{ conversation.fundi.name }}</p>
                    <p class="text-xs text-gray-500">{{ formatTime(conversation.lastMessage.timestamp) }}</p>
                  </div>
                  <p class="text-sm text-gray-600 truncate">{{ conversation.project || 'General Inquiry' }}</p>
                  <p class="text-xs text-gray-500 truncate">{{ conversation.lastMessage.content }}</p>
                  <div class="flex items-center justify-between mt-1">
                    <span v-if="conversation.unreadCount > 0" class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                      {{ conversation.unreadCount }} new
                    </span>
                    <span v-if="conversation.priority === 'urgent'" class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">
                      Urgent
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Chat Area -->
        <div class="lg:col-span-2 bg-white rounded-lg shadow flex flex-col h-96">
          <div v-if="selectedConversation" class="flex-1 flex flex-col">
            <!-- Chat Header -->
            <div class="p-4 border-b border-gray-200">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <img :src="selectedConversation.fundi.avatar" :alt="selectedConversation.fundi.name" class="w-10 h-10 rounded-full">
                  <div>
                    <h3 class="text-lg font-semibold text-gray-900">{{ selectedConversation.fundi.name }}</h3>
                    <p class="text-sm text-gray-600">{{ selectedConversation.fundi.specialty }}</p>
                  </div>
                </div>
                <div class="flex space-x-2">
                  <button @click="callFundi" class="p-2 text-gray-400 hover:text-gray-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </button>
                  <button @click="videoCall" class="p-2 text-gray-400 hover:text-gray-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                  </button>
                  <button @click="bookService" class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                    Book Service
                  </button>
                </div>
              </div>
            </div>

            <!-- Messages -->
            <div class="flex-1 overflow-y-auto p-4 space-y-4">
              <div v-for="message in selectedConversation.messages" :key="message.id" class="flex" :class="message.sender === 'me' ? 'justify-end' : 'justify-start'">
                <div class="max-w-xs lg:max-w-md">
                  <div :class="message.sender === 'me' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'" class="rounded-lg px-4 py-2">
                    <p class="text-sm">{{ message.content }}</p>
                    <div v-if="message.attachment" class="mt-2">
                      <div class="flex items-center space-x-2 p-2 bg-black bg-opacity-10 rounded">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                        </svg>
                        <span class="text-xs">{{ message.attachment.name }}</span>
                      </div>
                    </div>
                  </div>
                  <p class="text-xs text-gray-500 mt-1" :class="message.sender === 'me' ? 'text-right' : 'text-left'">
                    {{ formatTime(message.timestamp) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Message Input -->
            <div class="p-4 border-t border-gray-200">
              <form @submit.prevent="sendMessage" class="flex items-center space-x-3">
                <button type="button" @click="attachFile" class="p-2 text-gray-400 hover:text-gray-600">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                  </svg>
                </button>
                <input 
                  v-model="newMessage"
                  type="text"
                  placeholder="Type your message..."
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                <button type="submit" :disabled="!newMessage.trim()" class="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 disabled:opacity-50">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                </button>
              </form>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="flex-1 flex items-center justify-center">
            <div class="text-center">
              <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
              <h3 class="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
              <p class="text-gray-500">Choose a conversation from the list to start messaging</p>
            </div>
          </div>
        </div>
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
const conversationFilter = ref('all')
const selectedConversation = ref(null)
const newMessage = ref('')

const messageStats = ref({
  totalConversations: 8,
  unreadMessages: 3,
  avgResponseTime: '45m',
  activeFundis: 6
})

// Sample conversations data
const conversations = ref([
  {
    id: 1,
    fundi: {
      name: 'John Mwangi',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      specialty: 'Licensed Plumber',
      online: true
    },
    project: 'Kitchen Plumbing',
    unreadCount: 2,
    priority: 'normal',
    lastMessage: {
      content: 'I can start the installation tomorrow morning if that works for you.',
      timestamp: '2024-02-20T14:30:00',
      sender: 'fundi'
    },
    messages: [
      {
        id: 1,
        content: 'Hi John, I need help with kitchen plumbing installation. Can you provide a quote?',
        timestamp: '2024-02-20T10:00:00',
        sender: 'me'
      },
      {
        id: 2,
        content: 'Hello! I\'d be happy to help with your kitchen plumbing. Could you tell me more about what specific work you need done?',
        timestamp: '2024-02-20T10:15:00',
        sender: 'fundi'
      },
      {
        id: 3,
        content: 'I need to install new pipes under the sink and connect a new faucet. The current setup is quite old.',
        timestamp: '2024-02-20T10:30:00',
        sender: 'me'
      },
      {
        id: 4,
        content: 'Based on your description, this would cost around KES 25,000 including materials. Would you like me to come for an assessment?',
        timestamp: '2024-02-20T14:00:00',
        sender: 'fundi'
      },
      {
        id: 5,
        content: 'I can start the installation tomorrow morning if that works for you.',
        timestamp: '2024-02-20T14:30:00',
        sender: 'fundi'
      }
    ]
  },
  {
    id: 2,
    fundi: {
      name: 'Peter Kiprotich',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      specialty: 'Master Electrician',
      online: false
    },
    project: 'Electrical Repair',
    unreadCount: 0,
    priority: 'urgent',
    lastMessage: {
      content: 'The electrical work has been completed successfully. Everything is working perfectly now.',
      timestamp: '2024-02-19T16:45:00',
      sender: 'fundi'
    },
    messages: [
      {
        id: 1,
        content: 'I have an urgent electrical issue. My power keeps going out randomly.',
        timestamp: '2024-02-19T14:00:00',
        sender: 'me'
      },
      {
        id: 2,
        content: 'I can come right away to check this. Emergency electrical issues are dangerous and need immediate attention.',
        timestamp: '2024-02-19T14:05:00',
        sender: 'fundi'
      },
      {
        id: 3,
        content: 'The electrical work has been completed successfully. Everything is working perfectly now.',
        timestamp: '2024-02-19T16:45:00',
        sender: 'fundi'
      }
    ]
  },
  {
    id: 3,
    fundi: {
      name: 'David Ochieng',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      specialty: 'Custom Carpentry',
      online: true
    },
    project: 'Custom Furniture',
    unreadCount: 1,
    priority: 'normal',
    lastMessage: {
      content: 'I have some design ideas for your custom bookshelf. Would you like to see the sketches?',
      timestamp: '2024-02-18T11:20:00',
      sender: 'fundi'
    },
    messages: [
      {
        id: 1,
        content: 'I\'m interested in custom furniture for my home office. Specifically a bookshelf and desk.',
        timestamp: '2024-02-18T09:00:00',
        sender: 'me'
      },
      {
        id: 2,
        content: 'That sounds like a great project! I specialize in custom office furniture. What\'s your preferred wood type and style?',
        timestamp: '2024-02-18T09:30:00',
        sender: 'fundi'
      },
      {
        id: 3,
        content: 'I have some design ideas for your custom bookshelf. Would you like to see the sketches?',
        timestamp: '2024-02-18T11:20:00',
        sender: 'fundi'
      }
    ]
  }
])

// Computed
const filteredConversations = computed(() => {
  let filtered = conversations.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(conv => 
      conv.fundi.name.toLowerCase().includes(query) ||
      conv.project.toLowerCase().includes(query)
    )
  }

  if (conversationFilter.value === 'unread') {
    filtered = filtered.filter(conv => conv.unreadCount > 0)
  }

  return filtered.sort((a, b) => new Date(b.lastMessage.timestamp) - new Date(a.lastMessage.timestamp))
})

// Methods
const filterConversations = (type) => {
  conversationFilter.value = type
}

const selectConversation = (conversation) => {
  selectedConversation.value = conversation
  // Mark as read
  conversation.unreadCount = 0
}

const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffInHours = (now - date) / (1000 * 60 * 60)
  
  if (diffInHours < 1) {
    return 'Just now'
  } else if (diffInHours < 24) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } else {
    return date.toLocaleDateString()
  }
}

const sendMessage = () => {
  if (!newMessage.value.trim() || !selectedConversation.value) return

  const message = {
    id: Date.now(),
    content: newMessage.value.trim(),
    timestamp: new Date().toISOString(),
    sender: 'me'
  }

  selectedConversation.value.messages.push(message)
  selectedConversation.value.lastMessage = message
  newMessage.value = ''
}

const markAllAsRead = () => {
  conversations.value.forEach(conv => conv.unreadCount = 0)
}

const composeMessage = () => {
  console.log('Opening compose message modal...')
}

const callFundi = () => {
  console.log('Initiating call with:', selectedConversation.value?.fundi.name)
}

const videoCall = () => {
  console.log('Starting video call with:', selectedConversation.value?.fundi.name)
}

const bookService = () => {
  if (selectedConversation.value?.fundi) {
    router.push(`/book/${selectedConversation.value.fundi.id}`)
  }
}

const attachFile = () => {
  console.log('Opening file attachment...')
}

// Auto-select first conversation
if (conversations.value.length > 0) {
  selectedConversation.value = conversations.value[0]
}
</script>
