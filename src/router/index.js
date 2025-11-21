import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Views
import Landing from '@/views/Landing.vue'
import SimpleLanding from '@/views/SimpleLanding.vue'
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import TestView from '@/views/TestView.vue'
import OnboardingFundi from '@/views/auth/OnboardingFundi.vue'
import OnboardingUser from '@/views/auth/OnboardingUser.vue'
import OnboardingBusiness from '@/views/auth/OnboardingBusiness.vue'

// Dashboard Views
import UserDashboard from '@/views/user/Dashboard.vue'
import FundiDashboard from '@/views/fundi/Dashboard.vue'
import BusinessDashboard from '@/views/business/Dashboard.vue'

// Profile Views
import UserProfile from '@/views/user/Profile.vue'
import FundiProfile from '@/views/fundi/Profile.vue'
import PublicFundiProfile from '@/views/PublicFundiProfile.vue'

// App Views
import FundiFeed from '@/views/user/FundiFeed.vue'
import BookingFlow from '@/views/user/BookingFlow.vue'
import ProjectManagement from '@/views/ProjectManagement.vue'
import Messages from '@/views/Messages.vue'
import Notifications from '@/views/Notifications.vue'

// Debug Views
import AppwriteDebug from '@/views/debug/AppwriteDebug.vue'
import TestAuth from '@/views/debug/TestAuth.vue'
import ConnectivityTest from '@/views/ConnectivityTest.vue'
import ConnectionTest from '@/views/debug/ConnectionTest.vue'
import CreateDummyAccounts from '@/views/debug/CreateDummyAccounts.vue'

const routes = [
  {
    path: '/profile-fixer',
    name: 'ProfileFixer',
    component: () => import('@/views/ProfileFixer.vue')
  },
  {
    path: '/test-connection',
    name: 'TestConnection',
    component: () => import('@/views/TestConnection.vue')
  },
  {
    path: '/session-reset',
    name: 'SessionReset',
    component: () => import('@/views/SessionReset.vue')
  },
  {
    path: '/admin-login',
    name: 'AdminLogin',
    component: () => import('@/views/AdminLogin.vue')
  },
  {
    path: '/quick-test',
    name: 'QuickTest',
    component: () => import('@/views/QuickTest.vue')
  },
  {
    path: '/network-diagnostic',
    name: 'NetworkDiagnostic',
    component: () => import('@/views/NetworkDiagnostic.vue')
  },
  {
    path: '/mobile-hub',
    name: 'MobileHub',
    component: () => import('@/views/MobileHub.vue')
  },
  {
    path: '/offline-login',
    name: 'OfflineLogin',
    component: () => import('@/views/OfflineLogin.vue')
  },
  {
    path: '/user-management',
    name: 'UserManagement',
    component: () => import('@/views/UserManagement.vue')
  },
  {
    path: '/force-online',
    name: 'ForceOnlineMode',
    component: () => import('@/views/ForceOnlineMode.vue')
  },
  {
    path: '/quick-online-test',
    name: 'QuickOnlineTest',
    component: () => import('@/views/QuickOnlineTest.vue')
  },
  {
    path: '/rate-limit-recovery',
    name: 'RateLimitRecovery',
    component: () => import('@/views/RateLimitRecovery.vue')
  },
  {
    path: '/working-environment',
    name: 'WorkingEnvironment',
    component: () => import('@/views/WorkingEnvironment.vue')
  },
  {
    path: '/test',
    name: 'Test',
    component: TestView
  },
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresGuest: true }
  },
  {
    path: '/auth-debug',
    name: 'AuthDebug',
    component: () => import('@/components/debug/AuthDebugPanel.vue')
  },
  
  // Onboarding Routes
  {
    path: '/onboarding/fundi',
    name: 'OnboardingFundi',
    component: OnboardingFundi,
    meta: { requiresAuth: true, requiresOnboarding: true }
  },
  {
    path: '/onboarding/user',
    name: 'OnboardingUser',
    component: OnboardingUser,
    meta: { requiresAuth: true, requiresOnboarding: true }
  },
  {
    path: '/onboarding/business',
    name: 'OnboardingBusiness',
    component: OnboardingBusiness,
    meta: { requiresAuth: true, requiresOnboarding: true }
  },

  // Dashboard Routes
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/DashboardRedirect.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard/user',
    name: 'UserDashboard',
    component: UserDashboard,
    meta: { requiresAuth: true, allowedRoles: ['user'] }
  },
  {
    path: '/dashboard/fundi',
    name: 'FundiDashboard',
    component: FundiDashboard,
    meta: { requiresAuth: true, allowedRoles: ['fundi'] }
  },
  {
    path: '/dashboard/business',
    name: 'BusinessDashboard',
    component: BusinessDashboard,
    meta: { requiresAuth: true, allowedRoles: ['business'] }
  },

  // Profile Routes
  {
    path: '/profile',
    name: 'Profile',
    redirect: (to) => {
      const auth = useAuthStore()
      switch (auth.user?.userType) {
        case 'fundi':
          return '/profile/fundi'
        default:
          return '/profile/user'
      }
    },
    meta: { requiresAuth: true }
  },
  {
    path: '/profile/user',
    name: 'UserProfile',
    component: UserProfile,
    meta: { requiresAuth: true, allowedRoles: ['user', 'business'] }
  },
  {
    path: '/profile/fundi',
    name: 'FundiProfile',
    component: FundiProfile,
    meta: { requiresAuth: true, allowedRoles: ['fundi'] }
  },
  {
    path: '/fundi/:id',
    name: 'PublicFundiProfile',
    component: PublicFundiProfile,
    props: true
  },

  // Fundi-specific routes
  {
    path: '/fundi/bookings',
    name: 'FundiBookings',
    component: () => import('@/views/fundi/Bookings.vue'),
    meta: { requiresAuth: true, allowedRoles: ['fundi'] }
  },
  {
    path: '/fundi/portfolio',
    name: 'FundiPortfolio',
    component: () => import('@/views/fundi/Portfolio.vue'),
    meta: { requiresAuth: true, allowedRoles: ['fundi'] }
  },
  {
    path: '/fundi/reviews',
    name: 'FundiReviews',
    component: () => import('@/views/fundi/Reviews.vue'),
    meta: { requiresAuth: true, allowedRoles: ['fundi'] }
  },
  {
    path: '/fundi/messages',
    name: 'FundiMessages',
    component: () => import('@/views/fundi/Messages.vue'),
    meta: { requiresAuth: true, allowedRoles: ['fundi'] }
  },
  {
    path: '/fundi/earnings',
    name: 'FundiEarnings',
    component: () => import('@/views/fundi/Earnings.vue'),
    meta: { requiresAuth: true, allowedRoles: ['fundi'] }
  },
  {
    path: '/fundi/analytics',
    name: 'FundiAnalytics',
    component: () => import('@/views/fundi/Analytics.vue'),
    meta: { requiresAuth: true, allowedRoles: ['fundi'] }
  },
  {
    path: '/fundi/settings',
    name: 'FundiSettings',
    component: () => import('@/views/fundi/Settings.vue'),
    meta: { requiresAuth: true, allowedRoles: ['fundi'] }
  },

  // Business-specific routes
  {
    path: '/business/find-fundis',
    name: 'BusinessFindFundis',
    component: () => import('@/views/business/FindFundis.vue'),
    meta: { requiresAuth: true, allowedRoles: ['business'] }
  },
  {
    path: '/business/projects',
    name: 'BusinessProjects',
    component: () => import('@/views/business/Projects.vue'),
    meta: { requiresAuth: true, allowedRoles: ['business'] }
  },
  {
    path: '/business/team',
    name: 'BusinessTeam',
    component: () => import('@/views/business/Team.vue'),
    meta: { requiresAuth: true, allowedRoles: ['business'] }
  },
  {
    path: '/business/contracts',
    name: 'BusinessContracts',
    component: () => import('@/views/business/Contracts.vue'),
    meta: { requiresAuth: true, allowedRoles: ['business'] }
  },
  {
    path: '/business/analytics',
    name: 'BusinessAnalytics',
    component: () => import('@/views/business/Analytics.vue'),
    meta: { requiresAuth: true, allowedRoles: ['business'] }
  },
  {
    path: '/business/settings',
    name: 'BusinessSettings',
    component: () => import('@/views/business/Settings.vue'),
    meta: { requiresAuth: true, allowedRoles: ['business'] }
  },

  // User-specific routes
  {
    path: '/user/find-fundis',
    name: 'UserFindFundis',
    component: () => import('@/views/user/FindFundis.vue'),
    meta: { requiresAuth: true, allowedRoles: ['user'] }
  },
  {
    path: '/user/my-bookings',
    name: 'UserMyBookings',
    component: () => import('@/views/user/MyBookings.vue'),
    meta: { requiresAuth: true, allowedRoles: ['user'] }
  },
  {
    path: '/user/favorites',
    name: 'UserFavorites',
    component: () => import('@/views/user/Favorites.vue'),
    meta: { requiresAuth: true, allowedRoles: ['user'] }
  },
  {
    path: '/user/messages',
    name: 'UserMessages',
    component: () => import('@/views/user/Messages.vue'),
    meta: { requiresAuth: true, allowedRoles: ['user'] }
  },
  {
    path: '/user/reviews',
    name: 'UserReviews',
    component: () => import('@/views/user/Reviews.vue'),
    meta: { requiresAuth: true, allowedRoles: ['user'] }
  },
  {
    path: '/user/settings',
    name: 'UserSettings',
    component: () => import('@/views/user/Settings.vue'),
    meta: { requiresAuth: true, allowedRoles: ['user'] }
  },

  // App Features
  {
    path: '/feed',
    name: 'FundiFeed',
    component: FundiFeed,
    meta: { requiresAuth: true, allowedRoles: ['user', 'business'] }
  },
  {
    path: '/book/:fundiId?',
    name: 'BookingFlow',
    component: BookingFlow,
    props: true,
    meta: { requiresAuth: true, allowedRoles: ['user', 'business'] }
  },
  {
    path: '/projects',
    name: 'ProjectManagement',
    component: ProjectManagement,
    meta: { requiresAuth: true }
  },
  {
    path: '/messages',
    name: 'Messages',
    component: Messages,
    meta: { requiresAuth: true }
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: Notifications,
    meta: { requiresAuth: true }
  },

  // 404 Route
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },

  // Debug Routes (Development only)
  {
    path: '/debug/appwrite',
    name: 'AppwriteDebug',
    component: AppwriteDebug
  },
  {
    path: '/debug/auth',
    name: 'TestAuth',
    component: TestAuth
  },
  {
    path: '/test-connectivity',
    name: 'ConnectivityTest',
    component: ConnectivityTest
  },
  {
    path: '/debug/connection',
    name: 'ConnectionTest',
    component: ConnectionTest
  },
  {
    path: '/debug/create-accounts',
    name: 'CreateDummyAccounts',
    component: CreateDummyAccounts
  },
  {
    path: '/create-accounts',
    redirect: '/debug/create-accounts'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

// Navigation Guards
router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  
  console.log('🔍 Navigation Guard:', {
    from: from.path,
    to: to.path,
    isAuthenticated: auth.isAuthenticated,
    userType: auth.user?.userType,
    onboardingComplete: auth.isOnboardingComplete
  })
  
  // Initialize auth if not already done
  if (!auth.initialized) {
    console.log('🔄 Initializing auth store...')
    await auth.initialize()
  }

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest)
  const allowedRoles = to.meta.allowedRoles
  const requiresOnboarding = to.matched.some(record => record.meta.requiresOnboarding)

  console.log('🔍 Route requirements:', {
    requiresAuth,
    requiresGuest,
    allowedRoles,
    requiresOnboarding
  })

  // Check if route requires guest (login/register pages)
  if (requiresGuest && auth.isAuthenticated) {
    console.log('🔄 Redirecting authenticated user away from guest route to dashboard')
    return next('/dashboard')
  }

  // Check if route requires authentication
  if (requiresAuth && !auth.isAuthenticated) {
    console.log('🔄 Redirecting unauthenticated user to login')
    return next('/login')
  }

  // Special handling for dashboard routes - allow access and let the component handle redirects
  if (to.path.startsWith('/dashboard')) {
    // If user is authenticated, allow access to dashboard
    if (auth.isAuthenticated) {
      // Check role-based access for specific dashboard routes
      if (allowedRoles && auth.user?.userType) {
        let userRole = auth.user.userType
        
        // Map certain user types to the correct dashboard routes
        if (userRole === 'individual') {
          userRole = 'fundi' // Individual professionals go to fundi dashboard
        }
        
        if (!allowedRoles.includes(userRole)) {
          console.log('🔄 Redirecting to correct dashboard for user type:', userRole)
          return next(`/dashboard/${userRole}`)
        }
      }
      console.log('✅ Allowing dashboard access to:', to.path)
      return next()
    } else {
      console.log('🔄 Redirecting unauthenticated user from dashboard to login')
      return next('/login')
    }
  }

  // Check if user needs onboarding (but not for onboarding routes, landing, or auth debug)
  if (auth.isAuthenticated && 
      !auth.isOnboardingComplete && 
      !requiresOnboarding && 
      to.name !== 'Landing' && 
      to.name !== 'AuthDebug' &&
      !to.path.startsWith('/onboarding') &&
      !to.path.startsWith('/debug')) {
    const userType = auth.user?.userType || 'user'
    console.log('🔄 Redirecting to onboarding for incomplete onboarding:', userType)
    return next(`/onboarding/${userType}`)
  }

  // Check role-based access for specific routes (only if roles are explicitly defined)
  if (allowedRoles && allowedRoles.length > 0 && auth.isAuthenticated) {
    const userRole = auth.user?.userType
    
    if (!allowedRoles.includes(userRole)) {
      console.log('🔄 Role-based access denied for', userRole, 'accessing', to.path)
      console.log('🔄 Allowed roles:', allowedRoles)
      
      // Redirect to the user's appropriate dashboard
      switch (userRole) {
        case 'fundi':
          return next('/dashboard/fundi')
        case 'business':
          return next('/dashboard/business')
        case 'user':
        default:
          return next('/dashboard/user')
      }
    }
  }

  console.log('✅ Navigation allowed to:', to.path)
  next()
})

export default router
