import {
  HomeIcon,
  UserIcon,
  BriefcaseIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  CogIcon,
  ChartBarIcon,
  MapPinIcon,
  PlusIcon,
  WalletIcon,
  DocumentTextIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  HeartIcon,
  MagnifyingGlassIcon,
  BellIcon,
} from '@heroicons/vue/24/outline'

// Fundi Navigation
const fundiNavigation = [
  { name: 'Dashboard', href: '/dashboard/fundi', icon: HomeIcon },
  { name: 'Profile', href: '/profile/fundi', icon: UserIcon },
  { name: 'Bookings', href: '/fundi/bookings', icon: CalendarIcon, badge: '3' },
  { name: 'Portfolio', href: '/fundi/portfolio', icon: BriefcaseIcon },
  { name: 'Reviews', href: '/fundi/reviews', icon: StarIcon },
  { name: 'Messages', href: '/fundi/messages', icon: ChatBubbleLeftRightIcon, badge: '2' },
  { name: 'Earnings', href: '/fundi/earnings', icon: WalletIcon },
  { name: 'Analytics', href: '/fundi/analytics', icon: ChartBarIcon },
  { name: 'Settings', href: '/fundi/settings', icon: CogIcon },
]

const fundiBottomNav = [
  { name: 'Home', href: '/dashboard/fundi', icon: HomeIcon },
  { name: 'Bookings', href: '/fundi/bookings', icon: CalendarIcon, badge: '3' },
  { name: 'Messages', href: '/fundi/messages', icon: ChatBubbleLeftRightIcon, badge: '2' },
  { name: 'Profile', href: '/profile/fundi', icon: UserIcon },
]

// User Navigation
const userNavigation = [
  { name: 'Dashboard', href: '/dashboard/user', icon: HomeIcon },
  { name: 'Profile', href: '/profile/user', icon: UserIcon },
  { name: 'Find Fundis', href: '/user/find-fundis', icon: MagnifyingGlassIcon },
  { name: 'My Bookings', href: '/user/my-bookings', icon: CalendarIcon, badge: '1' },
  { name: 'Favorites', href: '/user/favorites', icon: HeartIcon },
  { name: 'Messages', href: '/user/messages', icon: ChatBubbleLeftRightIcon },
  { name: 'Reviews', href: '/user/reviews', icon: StarIcon },
  { name: 'Settings', href: '/user/settings', icon: CogIcon },
]

const userBottomNav = [
  { name: 'Home', href: '/dashboard/user', icon: HomeIcon },
  { name: 'Search', href: '/user/find-fundis', icon: MagnifyingGlassIcon },
  { name: 'Bookings', href: '/user/my-bookings', icon: CalendarIcon, badge: '1' },
  { name: 'Messages', href: '/user/messages', icon: ChatBubbleLeftRightIcon },
]

// Business Navigation
const businessNavigation = [
  { name: 'Dashboard', href: '/dashboard/business', icon: HomeIcon },
  { name: 'Find Fundis', href: '/business/find-fundis', icon: MagnifyingGlassIcon },
  { name: 'Projects', href: '/business/projects', icon: ClipboardDocumentListIcon },
  { name: 'Team', href: '/business/team', icon: UsersIcon },
  { name: 'Contracts', href: '/business/contracts', icon: DocumentTextIcon },
  { name: 'Analytics', href: '/business/analytics', icon: ChartBarIcon },
  { name: 'Settings', href: '/business/settings', icon: CogIcon },
]

const businessBottomNav = [
  { name: 'Home', href: '/dashboard/business', icon: HomeIcon },
  { name: 'Projects', href: '/business/projects', icon: ClipboardDocumentListIcon },
  { name: 'Team', href: '/business/team', icon: UsersIcon },
  { name: 'Find Fundis', href: '/business/find-fundis', icon: MagnifyingGlassIcon },
]

export function getUserNavigation(userType) {
  switch (userType) {
    case 'fundi':
      return fundiNavigation
    case 'business':
      return businessNavigation
    default:
      return userNavigation
  }
}

export function getBottomNavigation(userType) {
  switch (userType) {
    case 'fundi':
      return fundiBottomNav
    case 'business':
      return businessBottomNav
    default:
      return userBottomNav
  }
}
