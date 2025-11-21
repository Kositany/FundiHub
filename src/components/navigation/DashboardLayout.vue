<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Desktop Sidebar -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div class="flex min-h-0 flex-1 flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <!-- Logo -->
        <div class="flex h-16 flex-shrink-0 items-center px-4 border-b border-gray-200 dark:border-gray-700">
          <img class="h-8 w-auto" src="/logo.svg" alt="FundiHub" />
          <span class="ml-2 text-xl font-bold text-gray-900 dark:text-white">FundiHub</span>
        </div>

        <!-- Navigation -->
        <div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <nav class="flex-1 space-y-1 px-2">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              :class="[
                $route.path === item.href
                  ? 'bg-primary text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white',
                'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors'
              ]"
            >
              <component
                :is="item.icon"
                :class="[
                  $route.path === item.href
                    ? 'text-white'
                    : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300',
                  'mr-3 flex-shrink-0 h-6 w-6'
                ]"
              />
              {{ item.name }}
              <span v-if="item.badge" class="ml-auto inline-block py-0.5 px-2 text-xs bg-red-100 text-red-800 rounded-full">
                {{ item.badge }}
              </span>
            </router-link>
          </nav>

          <!-- User Profile Section -->
          <div class="flex-shrink-0 flex border-t border-gray-200 dark:border-gray-700 p-4">
            <div class="flex items-center group w-full">
              <div class="flex-shrink-0">
                <img
                  class="inline-block h-10 w-10 rounded-full"
                  :src="authStore.user?.avatar || '/default-avatar.png'"
                  :alt="authStore.user?.name"
                />
              </div>
              <div class="ml-3 flex-1">
                <p class="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white">
                  {{ authStore.user?.name }}
                </p>
                <p class="text-xs font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                  {{ userTypeLabel }}
                </p>
              </div>
              <Menu as="div" class="relative">
                <MenuButton class="flex-shrink-0 w-full rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                  <EllipsisVerticalIcon class="h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                </MenuButton>
                <MenuItems class="absolute right-0 bottom-full mb-1 w-48 origin-bottom-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <MenuItem>
                    <router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Your Profile
                    </router-link>
                  </MenuItem>
                  <MenuItem>
                    <router-link to="/settings" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Settings
                    </router-link>
                  </MenuItem>
                  <MenuItem>
                    <button @click="handleLogout" class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                      Sign out
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-40 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>

        <div class="fixed inset-0 flex z-40">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col bg-white dark:bg-gray-800">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute top-0 right-0 -mr-12 pt-2">
                  <button type="button" class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="sidebarOpen = false">
                    <XMarkIcon class="h-6 w-6 text-white" />
                  </button>
                </div>
              </TransitionChild>
              
              <!-- Mobile Logo -->
              <div class="flex h-16 flex-shrink-0 items-center px-4 border-b border-gray-200 dark:border-gray-700">
                <img class="h-8 w-auto" src="/logo.svg" alt="FundiHub" />
                <span class="ml-2 text-xl font-bold text-gray-900 dark:text-white">FundiHub</span>
              </div>

              <!-- Mobile Navigation -->
              <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <nav class="space-y-1 px-2">
                  <router-link
                    v-for="item in navigation"
                    :key="item.name"
                    :to="item.href"
                    :class="[
                      $route.path === item.href
                        ? 'bg-primary text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white',
                      'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                    ]"
                    @click="sidebarOpen = false"
                  >
                    <component
                      :is="item.icon"
                      :class="[
                        $route.path === item.href
                          ? 'text-white'
                          : 'text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300',
                        'mr-4 flex-shrink-0 h-6 w-6'
                      ]"
                    />
                    {{ item.name }}
                    <span v-if="item.badge" class="ml-auto inline-block py-0.5 px-2 text-xs bg-red-100 text-red-800 rounded-full">
                      {{ item.badge }}
                    </span>
                  </router-link>
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
          <div class="flex-shrink-0 w-14" aria-hidden="true"></div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Main content -->
    <div class="lg:pl-64 flex flex-col flex-1">
      <!-- Top bar for mobile -->
      <div class="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white dark:bg-gray-800 shadow lg:hidden border-b border-gray-200 dark:border-gray-700">
        <button type="button" class="px-4 border-r border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary lg:hidden" @click="sidebarOpen = true">
          <Bars3Icon class="h-6 w-6" />
        </button>
        <div class="flex-1 px-4 flex justify-between items-center">
          <div class="flex-1">
            <h1 class="text-lg font-semibold text-gray-900 dark:text-white">{{ pageTitle }}</h1>
          </div>
          <div class="ml-4 flex items-center md:ml-6">
            <!-- Dark Mode Toggle -->
            <button 
              @click="toggleDarkMode"
              type="button" 
              class="bg-white dark:bg-gray-800 p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mr-2"
              :title="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              <svg v-if="!isDarkMode" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
              </svg>
              <svg v-else class="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </button>

            <!-- Notifications -->
            <button type="button" class="bg-white dark:bg-gray-800 p-1 rounded-full text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              <BellIcon class="h-6 w-6" />
            </button>

            <!-- Profile dropdown -->
            <Menu as="div" class="ml-3 relative">
              <MenuButton class="max-w-xs bg-white dark:bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                <img class="h-8 w-8 rounded-full" :src="authStore.user?.avatar || '/default-avatar.png'" :alt="authStore.user?.name" />
              </MenuButton>
              <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem>
                  <router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Your Profile
                  </router-link>
                </MenuItem>
                <MenuItem>
                  <router-link to="/settings" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Settings
                  </router-link>
                </MenuItem>
                <MenuItem>
                  <button @click="handleLogout" class="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                    Sign out
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <!-- Page content -->
      <main class="flex-1 pb-20 lg:pb-8">
        <slot />
      </main>

      <!-- Mobile bottom navigation -->
      <div class="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2">
        <div class="flex justify-around">
          <router-link
            v-for="item in bottomNavigation"
            :key="item.name"
            :to="item.href"
            :class="[
              $route.path === item.href
                ? 'text-primary'
                : 'text-gray-400 hover:text-gray-500 dark:hover:text-gray-300',
              'flex flex-col items-center justify-center px-2 py-2 text-xs font-medium'
            ]"
          >
            <component :is="item.icon" class="h-6 w-6 mb-1" />
            {{ item.name }}
            <span v-if="item.badge" class="absolute -top-1 -right-1 h-4 w-4 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
              {{ item.badge }}
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {
  Bars3Icon,
  BellIcon,
  XMarkIcon,
  EllipsisVerticalIcon,
} from '@heroicons/vue/24/outline'

// Navigation imports - will be imported based on user type
import { getUserNavigation, getBottomNavigation } from '@/utils/navigation'

const router = useRouter()
const authStore = useAuthStore()

// Dark mode
const darkMode = inject('darkMode')
const isDarkMode = darkMode?.isDark
const toggleDarkMode = darkMode?.toggleDark

const sidebarOpen = ref(false)

const userType = computed(() => authStore.user?.userType || 'user')
const userTypeLabel = computed(() => {
  switch (userType.value) {
    case 'fundi': return 'Fundi Professional'
    case 'business': return 'Business User'
    default: return 'Individual User'
  }
})

const navigation = computed(() => getUserNavigation(userType.value))
const bottomNavigation = computed(() => getBottomNavigation(userType.value))

const pageTitle = computed(() => {
  const route = navigation.value.find(item => item.href === router.currentRoute.value.path)
  return route?.name || 'Dashboard'
})

const handleLogout = async () => {
  try {
    await authStore.logout()
    router.push('/auth/login')
  } catch (error) {
    console.error('Logout failed:', error)
    // Still redirect to login page even if logout fails
    router.push('/auth/login')
  }
}
</script>
