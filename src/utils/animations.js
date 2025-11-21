import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin, MorphSVGPlugin)

// Global animation settings
gsap.defaults({
  duration: 1,
  ease: "power2.out"
})

/**
 * Award-winning animation presets
 */
export const AnimationPresets = {
  // Hero section entrance
  heroEntrance: {
    from: { 
      opacity: 0, 
      y: 100, 
      scale: 0.8,
      rotationX: 45 
    },
    to: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      rotationX: 0,
      duration: 1.5,
      ease: "elastic.out(1, 0.75)",
      stagger: 0.2
    }
  },

  // Cards reveal with magnetic effect
  cardReveal: {
    from: {
      opacity: 0,
      y: 80,
      rotationY: 25,
      transformOrigin: "center bottom"
    },
    to: {
      opacity: 1,
      y: 0,
      rotationY: 0,
      duration: 1.2,
      ease: "back.out(1.7)",
      stagger: {
        amount: 0.6,
        from: "center"
      }
    }
  },

  // Liquid morphing entrance
  liquidMorph: {
    from: {
      opacity: 0,
      scale: 0,
      borderRadius: "50%",
      rotation: 180
    },
    to: {
      opacity: 1,
      scale: 1,
      borderRadius: "12px",
      rotation: 0,
      duration: 1.8,
      ease: "elastic.out(1, 0.5)",
      stagger: 0.15
    }
  },

  // Text typing effect
  typeWriter: {
    from: { text: "" },
    to: {
      duration: 2,
      ease: "none",
      stagger: 0.5
    }
  },

  // Floating animation
  floating: {
    to: {
      y: -20,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      stagger: {
        amount: 1,
        from: "random"
      }
    }
  },

  // Parallax scroll
  parallax: {
    to: {
      yPercent: -50,
      ease: "none"
    }
  },

  // Magnetic hover effect
  magnetic: {
    hover: {
      scale: 1.1,
      rotation: 5,
      duration: 0.3,
      ease: "power2.out"
    },
    leave: {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: "power2.out"
    }
  }
}

/**
 * Initialize scroll-triggered animations
 */
export function initializeScrollAnimations() {
  console.log('🎬 Initializing award-winning GSAP animations...')

  // Hero section animations
  gsap.set(".hero-title", AnimationPresets.heroEntrance.from)
  gsap.set(".hero-subtitle", AnimationPresets.heroEntrance.from)
  gsap.set(".hero-cta", AnimationPresets.heroEntrance.from)

  const heroTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse"
    }
  })

  heroTl
    .to(".hero-title", {
      ...AnimationPresets.heroEntrance.to,
      delay: 0.2
    })
    .to(".hero-subtitle", {
      ...AnimationPresets.heroEntrance.to,
      delay: 0.1
    }, "-=1")
    .to(".hero-cta", {
      ...AnimationPresets.heroEntrance.to,
      scale: 1.05
    }, "-=0.8")

  // Features cards animation
  gsap.set(".feature-card", AnimationPresets.cardReveal.from)
  
  ScrollTrigger.create({
    trigger: ".features-section",
    start: "top 70%",
    onEnter: () => {
      gsap.to(".feature-card", AnimationPresets.cardReveal.to)
    }
  })

  // Statistics counter animation
  gsap.set(".stat-number", { innerText: 0 })
  
  ScrollTrigger.create({
    trigger: ".stats-section",
    start: "top 80%",
    onEnter: () => {
      document.querySelectorAll('.stat-number').forEach(el => {
        const endValue = parseInt(el.dataset.value || 0)
        gsap.to(el, {
          innerText: endValue,
          duration: 2,
          ease: "power2.out",
          snap: { innerText: 1 },
          onUpdate: function() {
            el.innerText = Math.round(el.innerText).toLocaleString()
          }
        })
      })
    }
  })

  // Services grid with stagger effect
  gsap.set(".service-item", AnimationPresets.liquidMorph.from)
  
  ScrollTrigger.create({
    trigger: ".services-grid",
    start: "top 75%",
    onEnter: () => {
      gsap.to(".service-item", AnimationPresets.liquidMorph.to)
    }
  })

  // Testimonials carousel
  ScrollTrigger.create({
    trigger: ".testimonials-section",
    start: "top center",
    end: "bottom center",
    onEnter: () => initTestimonialsCarousel(),
    onLeave: () => cleanupTestimonialsCarousel(),
    onEnterBack: () => initTestimonialsCarousel()
  })

  // Parallax backgrounds
  gsap.utils.toArray('.parallax-bg').forEach((bg, i) => {
    gsap.to(bg, {
      ...AnimationPresets.parallax.to,
      yPercent: -50 * (i + 1),
      scrollTrigger: {
        trigger: bg,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    })
  })

  // Floating elements
  gsap.to(".floating-element", AnimationPresets.floating.to)

  // Navbar transform on scroll
  ScrollTrigger.create({
    start: "top -80",
    end: 99999,
    toggleClass: {
      className: "scrolled",
      targets: ".navbar"
    }
  })

  // Text reveal on scroll
  gsap.utils.toArray('.reveal-text').forEach(text => {
    const chars = text.textContent.split('')
    text.innerHTML = chars.map(char => 
      `<span style="display: inline-block; opacity: 0; transform: translateY(50px);">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('')

    ScrollTrigger.create({
      trigger: text,
      start: "top 80%",
      onEnter: () => {
        gsap.to(text.children, {
          opacity: 1,
          y: 0,
          duration: 0.05,
          stagger: 0.02,
          ease: "power2.out"
        })
      }
    })
  })

  console.log('✨ GSAP animations initialized successfully!')
}

/**
 * Testimonials carousel with smooth transitions
 */
let testimonialsTimeline = null

function initTestimonialsCarousel() {
  const testimonials = gsap.utils.toArray('.testimonial-item')
  if (testimonials.length === 0) return

  testimonialsTimeline = gsap.timeline({ repeat: -1 })
  
  testimonials.forEach((testimonial, i) => {
    testimonialsTimeline
      .set(testimonial, { opacity: 0, x: 100, rotationY: 45 })
      .to(testimonial, {
        opacity: 1,
        x: 0,
        rotationY: 0,
        duration: 1,
        ease: "back.out(1.7)"
      })
      .to(testimonial, {
        opacity: 1,
        duration: 3
      })
      .to(testimonial, {
        opacity: 0,
        x: -100,
        rotationY: -45,
        duration: 1,
        ease: "back.in(1.7)"
      })
  })
}

function cleanupTestimonialsCarousel() {
  if (testimonialsTimeline) {
    testimonialsTimeline.kill()
    testimonialsTimeline = null
  }
}

/**
 * Interactive hover animations
 */
export function initializeHoverAnimations() {
  // Magnetic buttons
  gsap.utils.toArray('.magnetic-btn').forEach(btn => {
    const hover = gsap.to(btn, {
      ...AnimationPresets.magnetic.hover,
      paused: true
    })
    
    const leave = gsap.to(btn, {
      ...AnimationPresets.magnetic.leave,
      paused: true
    })

    btn.addEventListener('mouseenter', () => {
      leave.pause()
      hover.play()
    })
    
    btn.addEventListener('mouseleave', () => {
      hover.pause()
      leave.play()
    })

    // Mouse movement effect
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      
      gsap.to(btn, {
        x: x * 0.3,
        y: y * 0.3,
        rotation: x * 0.1,
        duration: 0.3,
        ease: "power2.out"
      })
    })

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      })
    })
  })

  // Card tilt effect
  gsap.utils.toArray('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: "power2.out"
      })
    })

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)"
      })
    })
  })

  // Ripple effect on click
  gsap.utils.toArray('.ripple-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const rect = btn.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      const ripple = document.createElement('span')
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
        transform: scale(0);
      `
      
      btn.appendChild(ripple)

      gsap.to(ripple, {
        scale: 4,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => ripple.remove()
      })
    })
  })
}

/**
 * Page transition animations
 */
export function pageTransitionIn() {
  const tl = gsap.timeline()
  
  tl.set('.page-content', { opacity: 0, y: 50, scale: 0.95 })
    .to('.page-content', {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power2.out"
    })
    .from('.page-element', {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")

  return tl
}

export function pageTransitionOut() {
  const tl = gsap.timeline()
  
  tl.to('.page-content', {
    opacity: 0,
    y: -30,
    scale: 1.05,
    duration: 0.4,
    ease: "power2.in"
  })

  return tl
}

/**
 * Loading animation
 */
export function createLoadingAnimation(element) {
  return gsap.timeline({ repeat: -1 })
    .to(element, {
      rotation: 360,
      duration: 1,
      ease: "none"
    })
    .to(element, {
      scale: 1.2,
      duration: 0.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1
    }, 0)
}

/**
 * Cursor follower animation
 */
export function initializeCursorFollower() {
  const cursor = document.createElement('div')
  cursor.className = 'custom-cursor'
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background: linear-gradient(45deg, #667eea, #764ba2);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;
    transform: translate(-50%, -50%);
  `
  document.body.appendChild(cursor)

  let mouseX = 0, mouseY = 0
  let cursorX = 0, cursorY = 0

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
  })

  gsap.ticker.add(() => {
    const dx = mouseX - cursorX
    const dy = mouseY - cursorY
    
    cursorX += dx * 0.1
    cursorY += dy * 0.1
    
    gsap.set(cursor, { x: cursorX, y: cursorY })
  })

  // Cursor interactions
  gsap.utils.toArray('a, button, .interactive').forEach(el => {
    el.addEventListener('mouseenter', () => {
      gsap.to(cursor, { scale: 2, duration: 0.3 })
    })
    
    el.addEventListener('mouseleave', () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 })
    })
  })
}

/**
 * Smooth scrolling with momentum
 */
export function initializeSmoothScroll() {
  let currentY = 0
  let targetY = 0
  const ease = 0.1

  function updateScroll() {
    currentY += (targetY - currentY) * ease
    
    if (Math.abs(targetY - currentY) < 0.1) {
      currentY = targetY
    }
    
    window.scrollTo(0, currentY)
    requestAnimationFrame(updateScroll)
  }

  window.addEventListener('wheel', (e) => {
    e.preventDefault()
    targetY += e.deltaY
    targetY = Math.max(0, Math.min(targetY, document.body.scrollHeight - window.innerHeight))
  }, { passive: false })

  updateScroll()
}

/**
 * Initialize all animations
 */
export function initializeAllAnimations() {
  // Initialize core animations
  initializeScrollAnimations()
  initializeHoverAnimations()
  
  // Initialize advanced features on desktop
  if (window.innerWidth > 768) {
    initializeCursorFollower()
  }

  // Page load animation
  gsap.from('body', {
    opacity: 0,
    duration: 0.5,
    ease: "power2.out"
  })

  console.log('🏆 Award-winning animations system fully loaded!')
}

/**
 * Refresh ScrollTrigger on route change
 */
export function refreshScrollTrigger() {
  ScrollTrigger.refresh()
}

/**
 * Kill all animations and ScrollTriggers
 */
export function killAllAnimations() {
  ScrollTrigger.killAll()
  gsap.killTweensOf("*")
}