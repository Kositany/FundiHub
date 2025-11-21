<template>
  <DashboardLayout>
    <div class="space-y-6">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Earnings</h1>
            <p class="text-gray-600">Track your income, payments, and financial performance</p>
          </div>
          <div class="flex space-x-3">
            <button @click="exportEarnings" class="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
              <span class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <span>Export Report</span>
              </span>
            </button>
            <button @click="requestPayment" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              <span class="flex items-center space-x-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
                <span>Request Payment</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Earnings Overview -->
      <div class="grid md:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-green-100 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Total Earnings</p>
              <p class="text-2xl font-semibold text-gray-900">KES {{ formatMoney(earningsStats.totalEarnings) }}</p>
              <p class="text-sm text-green-600">+15.3% from last month</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-blue-100 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">This Month</p>
              <p class="text-2xl font-semibold text-gray-900">KES {{ formatMoney(earningsStats.monthlyEarnings) }}</p>
              <p class="text-sm text-blue-600">{{ earningsStats.monthlyJobs }} jobs completed</p>
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
              <p class="text-sm font-medium text-gray-600">Pending Payments</p>
              <p class="text-2xl font-semibold text-gray-900">KES {{ formatMoney(earningsStats.pendingPayments) }}</p>
              <p class="text-sm text-yellow-600">{{ earningsStats.pendingJobs }} jobs pending</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 bg-purple-100 rounded-lg">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Avg Per Job</p>
              <p class="text-2xl font-semibold text-gray-900">KES {{ formatMoney(earningsStats.averagePerJob) }}</p>
              <p class="text-sm text-purple-600">{{ earningsStats.totalJobs }} total jobs</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid lg:grid-cols-2 gap-6">
        <!-- Earnings Trend -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-semibold text-gray-900">Earnings Trend</h3>
            <select v-model="earningsChartPeriod" class="border border-gray-300 rounded-md px-3 py-1 text-sm">
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last 3 Months</option>
              <option value="year">Last Year</option>
            </select>
          </div>
          <div class="h-64 flex items-end justify-between space-x-2">
            <div v-for="(data, index) in earningsChartData" :key="index" class="flex-1 flex flex-col items-center">
              <div 
                :style="{ height: `${(data.amount / Math.max(...earningsChartData.map(d => d.amount))) * 200}px` }"
                class="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer"
                :title="`${data.label}: KES ${formatMoney(data.amount)}`"
              ></div>
              <span class="text-xs text-gray-600 mt-2">{{ data.label }}</span>
            </div>
          </div>
        </div>

        <!-- Payment Methods -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Payment Methods</h3>
          <div class="space-y-4">
            <div v-for="method in paymentMethods" :key="method.id" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div class="flex items-center space-x-3">
                <div :class="method.color" class="p-2 rounded-lg">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path v-if="method.type === 'bank'" d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"></path>
                    <path v-else-if="method.type === 'mobile'" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                    <path v-else d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ method.name }}</p>
                  <p class="text-sm text-gray-600">{{ method.details }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-semibold text-gray-900">KES {{ formatMoney(method.totalReceived) }}</p>
                <span :class="method.status === 'active' ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100'" class="inline-flex px-2 py-1 text-xs rounded-full">
                  {{ method.status }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Transactions -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            <div class="flex space-x-3">
              <select v-model="transactionFilter" class="border border-gray-300 rounded-md px-3 py-1 text-sm">
                <option value="all">All Transactions</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
              <input 
                v-model="transactionSearch"
                type="text"
                placeholder="Search transactions..."
                class="border border-gray-300 rounded-md px-3 py-1 text-sm w-64"
              >
            </div>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="transaction in filteredTransactions" :key="transaction.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <img :src="transaction.client.avatar" :alt="transaction.client.name" class="w-8 h-8 rounded-full">
                    <div class="ml-3">
                      <p class="text-sm font-medium text-gray-900">{{ transaction.client.name }}</p>
                      <p class="text-sm text-gray-500">{{ transaction.client.email }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <p class="text-sm text-gray-900">{{ transaction.project }}</p>
                  <p class="text-sm text-gray-500">{{ transaction.description }}</p>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <p class="text-sm font-semibold text-gray-900">KES {{ formatMoney(transaction.amount) }}</p>
                  <p v-if="transaction.commission" class="text-xs text-gray-500">Commission: {{ transaction.commission }}%</p>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {{ transaction.paymentMethod }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClass(transaction.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                    {{ transaction.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(transaction.date) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button @click="viewTransaction(transaction)" class="text-blue-600 hover:text-blue-900 mr-3">View</button>
                  <button v-if="transaction.status === 'pending'" @click="followUpPayment(transaction)" class="text-yellow-600 hover:text-yellow-900">Follow Up</button>
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
import { ref, computed } from 'vue'
import DashboardLayout from '@/components/navigation/DashboardLayout.vue'

// State
const earningsChartPeriod = ref('month')
const transactionFilter = ref('all')
const transactionSearch = ref('')

const earningsStats = ref({
  totalEarnings: 485750,
  monthlyEarnings: 125800,
  pendingPayments: 45200,
  averagePerJob: 15800,
  monthlyJobs: 8,
  pendingJobs: 3,
  totalJobs: 31
})

const earningsChartData = ref([
  { label: 'Mon', amount: 12500 },
  { label: 'Tue', amount: 18200 },
  { label: 'Wed', amount: 8900 },
  { label: 'Thu', amount: 22100 },
  { label: 'Fri', amount: 15600 },
  { label: 'Sat', amount: 28400 },
  { label: 'Sun', amount: 19300 }
])

const paymentMethods = ref([
  {
    id: 1,
    name: 'M-Pesa',
    type: 'mobile',
    details: '254712345678',
    totalReceived: 320500,
    status: 'active',
    color: 'bg-green-500'
  },
  {
    id: 2,
    name: 'Bank Transfer',
    type: 'bank',
    details: 'Equity Bank - ****4532',
    totalReceived: 165250,
    status: 'active',
    color: 'bg-blue-500'
  },
  {
    id: 3,
    name: 'PayPal',
    type: 'digital',
    details: 'john.doe@email.com',
    totalReceived: 0,
    status: 'inactive',
    color: 'bg-gray-500'
  }
])

const transactions = ref([
  {
    id: 1,
    client: {
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b120?w=100'
    },
    project: 'Kitchen Plumbing Installation',
    description: 'Complete kitchen pipe installation and faucet setup',
    amount: 25000,
    commission: 10,
    paymentMethod: 'M-Pesa',
    status: 'completed',
    date: '2024-02-20T10:30:00'
  },
  {
    id: 2,
    client: {
      name: 'Michael Davis',
      email: 'michael.d@email.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100'
    },
    project: 'Emergency Pipe Repair',
    description: 'Urgent bathroom pipe leak repair',
    amount: 15000,
    commission: 10,
    paymentMethod: 'Bank Transfer',
    status: 'completed',
    date: '2024-02-19T16:45:00'
  },
  {
    id: 3,
    client: {
      name: 'Jennifer Wilson',
      email: 'jennifer.w@email.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
    },
    project: 'Water Heater Installation',
    description: 'New water heater installation with warranty',
    amount: 35000,
    commission: 10,
    paymentMethod: 'M-Pesa',
    status: 'pending',
    date: '2024-02-18T14:20:00'
  },
  {
    id: 4,
    client: {
      name: 'Robert Brown',
      email: 'robert.b@email.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    },
    project: 'Drain Cleaning Service',
    description: 'Professional drain cleaning and maintenance',
    amount: 8500,
    commission: 10,
    paymentMethod: 'M-Pesa',
    status: 'completed',
    date: '2024-02-17T09:15:00'
  },
  {
    id: 5,
    client: {
      name: 'Lisa Garcia',
      email: 'lisa.g@email.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b120?w=100'
    },
    project: 'Toilet Installation',
    description: 'New toilet installation and plumbing',
    amount: 18000,
    commission: 10,
    paymentMethod: 'Bank Transfer',
    status: 'pending',
    date: '2024-02-16T11:30:00'
  }
])

// Computed
const filteredTransactions = computed(() => {
  let filtered = transactions.value

  if (transactionFilter.value !== 'all') {
    filtered = filtered.filter(t => t.status === transactionFilter.value)
  }

  if (transactionSearch.value) {
    const query = transactionSearch.value.toLowerCase()
    filtered = filtered.filter(t => 
      t.client.name.toLowerCase().includes(query) ||
      t.project.toLowerCase().includes(query) ||
      t.paymentMethod.toLowerCase().includes(query)
    )
  }

  return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
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
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    failed: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const exportEarnings = () => {
  console.log('Exporting earnings report...')
}

const requestPayment = () => {
  console.log('Opening payment request modal...')
}

const viewTransaction = (transaction) => {
  console.log('Viewing transaction:', transaction.id)
}

const followUpPayment = (transaction) => {
  console.log('Following up on payment for:', transaction.id)
}
</script>
