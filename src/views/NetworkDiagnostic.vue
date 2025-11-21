<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Network Diagnostic Tool</h1>
          <p class="text-gray-600">Check your device's connectivity to Fundi Hub services</p>
        </div>

        <!-- Device Information -->
        <div class="bg-blue-50 rounded-lg p-4 mb-6">
          <h2 class="text-lg font-semibold text-blue-800 mb-3">Device Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><strong>User Agent:</strong> {{ deviceInfo.userAgent }}</div>
            <div><strong>Platform:</strong> {{ deviceInfo.platform }}</div>
            <div><strong>Screen Size:</strong> {{ deviceInfo.screenSize }}</div>
            <div><strong>Connection Type:</strong> {{ deviceInfo.connection }}</div>
            <div><strong>Current Time:</strong> {{ new Date().toLocaleString() }}</div>
            <div><strong>Current URL:</strong> {{ window.location.href }}</div>
          </div>
        </div>

        <!-- Network Tests -->
        <div class="space-y-4">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Connectivity Tests</h2>
          
          <!-- Basic Server Test -->
          <div class="border rounded-lg p-4">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-medium">Development Server Connection</h3>
              <div class="flex items-center space-x-2">
                <div 
                  :class="[
                    'w-3 h-3 rounded-full',
                    tests.server.status === 'testing' ? 'bg-yellow-400 animate-pulse' :
                    tests.server.status === 'success' ? 'bg-green-400' : 'bg-red-400'
                  ]"
                ></div>
                <span class="text-sm text-gray-600">{{ tests.server.status }}</span>
              </div>
            </div>
            <p class="text-sm text-gray-600 mb-3">Testing connection to development server</p>
            <button 
              @click="testServer"
              :disabled="tests.server.status === 'testing'"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Test Server
            </button>
            <div v-if="tests.server.result" class="mt-3 p-3 bg-gray-100 rounded text-sm">
              <pre>{{ tests.server.result }}</pre>
            </div>
          </div>

          <!-- Appwrite API Test -->
          <div class="border rounded-lg p-4">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-medium">Appwrite API Connection</h3>
              <div class="flex items-center space-x-2">
                <div 
                  :class="[
                    'w-3 h-3 rounded-full',
                    tests.appwrite.status === 'testing' ? 'bg-yellow-400 animate-pulse' :
                    tests.appwrite.status === 'success' ? 'bg-green-400' : 'bg-red-400'
                  ]"
                ></div>
                <span class="text-sm text-gray-600">{{ tests.appwrite.status }}</span>
              </div>
            </div>
            <p class="text-sm text-gray-600 mb-3">Testing connection to Appwrite backend services</p>
            <button 
              @click="testAppwrite"
              :disabled="tests.appwrite.status === 'testing'"
              class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
            >
              Test Appwrite
            </button>
            <div v-if="tests.appwrite.result" class="mt-3 p-3 bg-gray-100 rounded text-sm">
              <pre>{{ tests.appwrite.result }}</pre>
            </div>
          </div>

          <!-- DNS Resolution Test -->
          <div class="border rounded-lg p-4">
            <div class="flex items-center justify-between mb-2">
              <h3 class="font-medium">DNS Resolution Test</h3>
              <div class="flex items-center space-x-2">
                <div 
                  :class="[
                    'w-3 h-3 rounded-full',
                    tests.dns.status === 'testing' ? 'bg-yellow-400 animate-pulse' :
                    tests.dns.status === 'success' ? 'bg-green-400' : 'bg-red-400'
                  ]"
                ></div>
                <span class="text-sm text-gray-600">{{ tests.dns.status }}</span>
              </div>
            </div>
            <p class="text-sm text-gray-600 mb-3">Testing DNS resolution for external services</p>
            <button 
              @click="testDNS"
              :disabled="tests.dns.status === 'testing'"
              class="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
            >
              Test DNS
            </button>
            <div v-if="tests.dns.result" class="mt-3 p-3 bg-gray-100 rounded text-sm">
              <pre>{{ tests.dns.result }}</pre>
            </div>
          </div>

          <!-- Run All Tests -->
          <div class="text-center pt-4">
            <button 
              @click="runAllTests"
              :disabled="isAnyTestRunning"
              class="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              Run All Tests
            </button>
          </div>
        </div>

        <!-- Results Summary -->
        <div v-if="showSummary" class="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 class="font-semibold mb-3">Diagnostic Summary</h3>
          <div class="space-y-2 text-sm">
            <div class="flex items-center space-x-2">
              <div :class="[
                'w-2 h-2 rounded-full',
                allTestsPassed ? 'bg-green-400' : 'bg-red-400'
              ]"></div>
              <span v-if="allTestsPassed" class="text-green-800">All systems operational</span>
              <span v-else class="text-red-800">Issues detected - please check failed tests above</span>
            </div>
            <div class="text-gray-600">
              Completed at: {{ new Date().toLocaleString() }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { account, client } from '@/lib/appwrite'

const tests = ref({
  server: { status: 'pending', result: null },
  appwrite: { status: 'pending', result: null },
  dns: { status: 'pending', result: null }
})

const deviceInfo = ref({
  userAgent: navigator.userAgent,
  platform: navigator.platform,
  screenSize: `${screen.width}x${screen.height}`,
  connection: navigator.connection?.effectiveType || 'unknown'
})

const isAnyTestRunning = computed(() => {
  return Object.values(tests.value).some(test => test.status === 'testing')
})

const allTestsPassed = computed(() => {
  return Object.values(tests.value).every(test => test.status === 'success')
})

const showSummary = computed(() => {
  return Object.values(tests.value).every(test => test.status !== 'pending')
})

const testServer = async () => {
  tests.value.server.status = 'testing'
  tests.value.server.result = null
  
  try {
    const response = await fetch(window.location.origin, {
      method: 'GET',
      cache: 'no-cache'
    })
    
    if (response.ok) {
      tests.value.server.status = 'success'
      tests.value.server.result = `✅ Server responding\nStatus: ${response.status}\nHeaders: ${response.headers.get('server') || 'Vite dev server'}`
    } else {
      throw new Error(`HTTP ${response.status}`)
    }
  } catch (error) {
    tests.value.server.status = 'failed'
    tests.value.server.result = `❌ Server connection failed\nError: ${error.message}`
  }
}

const testAppwrite = async () => {
  tests.value.appwrite.status = 'testing'
  tests.value.appwrite.result = null
  
  try {
    // Test basic health endpoint
    const health = await client.call('GET', '/health')
    
    // Test account service
    try {
      await account.get()
      tests.value.appwrite.status = 'success'
      tests.value.appwrite.result = `✅ Appwrite services operational\nHealth: ${health.status || 'OK'}\nAccount service: Available`
    } catch (authError) {
      // Not logged in is okay for this test
      if (authError.code === 401) {
        tests.value.appwrite.status = 'success'
        tests.value.appwrite.result = `✅ Appwrite services operational\nHealth: ${health.status || 'OK'}\nAccount service: Available (not authenticated)`
      } else {
        throw authError
      }
    }
  } catch (error) {
    tests.value.appwrite.status = 'failed'
    tests.value.appwrite.result = `❌ Appwrite connection failed\nError: ${error.message}\nCode: ${error.code || 'unknown'}`
  }
}

const testDNS = async () => {
  tests.value.dns.status = 'testing'
  tests.value.dns.result = null
  
  try {
    const testUrls = [
      'https://cloud.appwrite.io',
      'https://cdn.jsdelivr.net',
      'https://fonts.googleapis.com'
    ]
    
    const results = await Promise.allSettled(
      testUrls.map(url => 
        fetch(url, { 
          method: 'HEAD', 
          mode: 'no-cors',
          cache: 'no-cache'
        }).then(() => ({ url, status: 'reachable' }))
      )
    )
    
    const successful = results.filter(r => r.status === 'fulfilled').length
    const failed = results.length - successful
    
    if (successful > failed) {
      tests.value.dns.status = 'success'
      tests.value.dns.result = `✅ DNS resolution working\nReachable: ${successful}/${results.length} services\nExternal connectivity: Good`
    } else {
      tests.value.dns.status = 'failed'
      tests.value.dns.result = `⚠️ DNS issues detected\nReachable: ${successful}/${results.length} services\nPlease check your internet connection`
    }
  } catch (error) {
    tests.value.dns.status = 'failed'
    tests.value.dns.result = `❌ DNS test failed\nError: ${error.message}`
  }
}

const runAllTests = async () => {
  await testServer()
  await testAppwrite()
  await testDNS()
}

// Auto-run tests on mobile devices
onMounted(() => {
  if (navigator.userAgent.includes('Mobile')) {
    setTimeout(runAllTests, 1000)
  }
})
</script>
