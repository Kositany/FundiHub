# FundiHub Landing Page

A modern, responsive landing page for FundiHub - connecting customers with trusted fundis (skilled professionals) in Kenya.

## Features

- **Modern Design**: Clean, professional interface with FundiHub branding (#FE433F)
- **Fully Responsive**: Mobile-first design that works on all devices
- **Vue 3 Composition API**: Built with the latest Vue.js features
- **Tailwind CSS**: Utility-first styling with custom components
- **Interactive Elements**: 
  - Testimonials carousel
  - Animated service categories
  - Floating WhatsApp button
  - Smooth scrolling navigation
- **Performance Optimized**: Fast loading with optimized assets
- **Accessibility**: WCAG compliant color contrasts and keyboard navigation

## Sections

1. **Hero Section**: Catchy tagline with clear value proposition
2. **How It Works**: 3-step process explanation
3. **Service Categories**: Grid of available services with hover effects
4. **Testimonials**: Customer reviews carousel
5. **Call-to-Action**: Bold banner encouraging sign-ups
6. **Footer**: Links, social media, and company information

## Tech Stack

- Vue 3 (Composition API)
- Vite (Build tool)
- Tailwind CSS (Styling)
- Inter Font (Typography)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project folder
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Customization

### Brand Colors
The primary brand color (#FE433F) is defined in `tailwind.config.js` and can be easily changed:

```js
colors: {
  primary: '#FE433F',
  'primary-dark': '#E53E3A',
  'primary-light': '#FF6B67',
}
```

### Content
- Update company information in `src/components/Footer.vue`
- Modify testimonials in `src/components/TestimonialsSection.vue`
- Change service categories in `src/components/CategoriesSection.vue`
- Update WhatsApp number in `src/components/FloatingActionButton.vue`

### Styling
Custom Tailwind components are defined in `src/style.css`:
- `.btn-primary` - Primary button styling
- `.btn-secondary` - Secondary button styling
- `.card` - Card component with hover effects
- `.section-padding` - Consistent section spacing

## Project Structure

```
src/
├── components/
│   ├── Navigation.vue
│   ├── HeroSection.vue
│   ├── HowItWorksSection.vue
│   ├── CategoriesSection.vue
│   ├── TestimonialsSection.vue
│   ├── CtaBanner.vue
│   ├── Footer.vue
│   └── FloatingActionButton.vue
├── App.vue
├── main.js
└── style.css
```

## Performance Features

- Lazy loading of images
- Optimized animations with CSS transforms
- Minimal JavaScript bundle
- Responsive image loading
- SEO optimized meta tags

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is licensed under the MIT License.

## Support

For support or questions, contact us through:
- WhatsApp: Click the floating button on the website
- Email: info@fundihub.ke
- Website: www.fundihub.ke
