<template>
  <div class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo/Brand -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">FH</span>
            </div>
            <span class="text-xl font-bold text-gray-900 dark:text-white">FundiHub</span>
          </router-link>
        </div>

        <!-- User Info & Actions -->
        <div class="flex items-center space-x-4">
          <template v-if="authStore.isAuthenticated">
            <!-- User Info -->
            <div class="flex items-center space-x-3">
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900 dark:text-white">
                  {{ authStore.user?.name }}
                </p>
                <p class="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {{ authStore.user?.userType }} Account
                </p>
              </div>
              
              <!-- User Avatar -->
              <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span class="text-white text-sm font-medium">
                  {{ authStore.user?.name?.charAt(0).toUpperCase() }}
                </span>
              </div>
            </div>

            <!-- Logout Button -->
            <LogoutButton variant="secondary" redirect-to="/auth/login" />
          </template>

          <template v-else>
            <!-- Login/Register Links -->
            <div class="flex items-center space-x-3">
              <router-link 
                to="/auth/login" 
                class="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
              >
                Login
              </router-link>
              <router-link 
                to="/auth/register" 
                class="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
              >
                Sign Up
              </router-link>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import LogoutButton from '@/components/LogoutButton.vue'

const authStore = useAuthStore()
</script>
