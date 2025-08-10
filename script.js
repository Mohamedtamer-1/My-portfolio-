// Navigation functionality
document.addEventListener("DOMContentLoaded", () => {
  // Initialize all managers
  const themeManager = new ThemeManager()
  const particleSystem = new ParticleSystem()
  const customCursor = new CustomCursor()
  const navigationManager = new NavigationManager()
  const animationManager = new AnimationManager()
  const tiltEffect = new TiltEffect()
  const backToTopButton = new BackToTopButton()
  const performanceMonitor = new PerformanceMonitor()

  // Theme toggle event listener
  document.getElementById("theme-toggle").addEventListener("click", () => {
    themeManager.toggle()
  })

  // Smooth scrolling for all internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Enhanced button hover effects
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)"
    })

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })

  // Parallax effect for hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const hero = document.querySelector(".hero")
    const shapes = document.querySelectorAll(".shape")

    if (hero) {
      hero.style.transform = `translateY(${scrolled * 0.1}px)`
    }

    shapes.forEach((shape, index) => {
      const speed = 0.05 + index * 0.02
      shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`
    })
  })

  // Console welcome message
  console.log(`
    🎨 Welcome to Mohamed Tamer's Creative Portfolio!
    
    ✨ Features:
    • Dark/Light Theme Toggle
    • Particle Animation System
    • Custom Cursor Effects
    • 3D Tilt Interactions
    • Smooth Scroll Animations
    • Glassmorphism Design
    • Responsive Layout
    • Performance Optimized
    
    🛠️ Built with:
    • HTML5 & Semantic Markup
    • Modern CSS3 (Grid, Flexbox, Custom Properties)
    • Vanilla JavaScript (ES6+ Classes)
    • CSS Animations & Transforms
    • Intersection Observer API
    
    📧 Contact: mohamedtamer1834@gmail.com
    🔗 LinkedIn: https://www.linkedin.com/in/mohamed-tamer-aa8055317
  `)
})

// Handle window resize
window.addEventListener("resize", () => {
  // Reinitialize particle system on resize
  const particlesContainer = document.getElementById("particles")
  if (particlesContainer) {
    particlesContainer.innerHTML = ""
    new ParticleSystem()
  }
})

// Service Worker registration (for PWA capabilities)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Uncomment when you have a service worker file
    // navigator.serviceWorker.register('/sw.js')
    //   .then(registration => console.log('SW registered'))
    //   .catch(error => console.log('SW registration failed'));
  })
}

// Theme Management
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem("theme") || "light"
    this.init()
  }

  init() {
    document.documentElement.setAttribute("data-theme", this.theme)
    this.updateThemeIcon()
  }

  toggle() {
    this.theme = this.theme === "light" ? "dark" : "light"
    document.documentElement.setAttribute("data-theme", this.theme)
    localStorage.setItem("theme", this.theme)
    this.updateThemeIcon()
  }

  updateThemeIcon() {
    const themeToggle = document.getElementById("theme-toggle")
    const sunIcon = themeToggle.querySelector(".fa-sun")
    const moonIcon = themeToggle.querySelector(".fa-moon")

    if (this.theme === "dark") {
      sunIcon.style.opacity = "0"
      moonIcon.style.opacity = "1"
    } else {
      sunIcon.style.opacity = "1"
      moonIcon.style.opacity = "0"
    }
  }
}

// Particle System
class ParticleSystem {
  constructor() {
    this.container = document.getElementById("particles")
    this.particles = []
    this.init()
  }

  init() {
    this.createParticles()
    this.animate()
  }

  createParticles() {
    const particleCount = window.innerWidth < 768 ? 30 : 50

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div")
      particle.className = "particle"

      const size = Math.random() * 3 + 1
      const x = Math.random() * window.innerWidth
      const y = Math.random() * window.innerHeight
      const duration = Math.random() * 10 + 5
      const delay = Math.random() * 5

      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
      `

      this.container.appendChild(particle)
      this.particles.push({
        element: particle,
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      })
    }
  }

  animate() {
    this.particles.forEach((particle) => {
      particle.x += particle.vx
      particle.y += particle.vy

      if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1
      if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1

      particle.element.style.left = particle.x + "px"
      particle.element.style.top = particle.y + "px"
    })

    requestAnimationFrame(() => this.animate())
  }
}

// Custom Cursor
class CustomCursor {
  constructor() {
    this.cursor = document.getElementById("cursor")
    this.follower = document.getElementById("cursor-follower")
    this.init()
  }

  init() {
    if (window.innerWidth < 768) return

    document.addEventListener("mousemove", (e) => {
      this.cursor.style.left = e.clientX + "px"
      this.cursor.style.top = e.clientY + "px"

      setTimeout(() => {
        this.follower.style.left = e.clientX + "px"
        this.follower.style.top = e.clientY + "px"
      }, 100)
    })

    // Hover effects
    const hoverElements = document.querySelectorAll("a, button, .project-card, .service-card, .timeline-card")

    hoverElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        this.cursor.style.transform = "scale(2)"
        this.follower.style.transform = "scale(1.5)"
      })

      element.addEventListener("mouseleave", () => {
        this.cursor.style.transform = "scale(1)"
        this.follower.style.transform = "scale(1)"
      })
    })
  }
}

// Navigation Manager
class NavigationManager {
  constructor() {
    this.navbar = document.getElementById("navbar")
    this.navToggle = document.getElementById("nav-toggle")
    this.navMenu = document.getElementById("nav-menu")
    this.navLinks = document.querySelectorAll(".nav-link")
    this.scrollProgress = document.getElementById("scroll-progress")
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.updateActiveLink()
    this.updateScrollProgress()
  }

  setupEventListeners() {
    // Mobile menu toggle
    this.navToggle.addEventListener("click", () => {
      this.navMenu.classList.toggle("active")
      this.navToggle.classList.toggle("active")
    })

    // Close mobile menu when clicking on a link
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const targetId = link.getAttribute("href")
        const targetSection = document.querySelector(targetId)

        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }

        this.navMenu.classList.remove("active")
        this.navToggle.classList.remove("active")
      })
    })

    // Scroll events
    window.addEventListener("scroll", () => {
      this.updateScrollEffect()
      this.updateActiveLink()
      this.updateScrollProgress()
    })
  }

  updateScrollEffect() {
    if (window.scrollY > 50) {
      this.navbar.classList.add("scrolled")
    } else {
      this.navbar.classList.remove("scrolled")
    }
  }

  updateActiveLink() {
    const sections = document.querySelectorAll("section")
    const scrollPos = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")
      const correspondingNavLink = document.querySelector(`a[href="#${sectionId}"]`)

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        this.navLinks.forEach((link) => link.classList.remove("active"))
        if (correspondingNavLink) {
          correspondingNavLink.classList.add("active")
        }
      }
    })
  }

  updateScrollProgress() {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100
    this.scrollProgress.style.width = scrollPercent + "%"
  }
}

// Animation Manager
class AnimationManager {
  constructor() {
    this.init()
  }

  init() {
    this.setupIntersectionObserver()
    this.animateCounters()
    this.animateSkills()
    this.animateTimeline()
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"

          // Add visible class for timeline items
          if (entry.target.classList.contains("timeline-item")) {
            entry.target.classList.add("visible")
          }
        }
      })
    }, observerOptions)

    // Observe elements
    const animatedElements = document.querySelectorAll(
      ".service-card, .project-card, .timeline-item, .highlight-item, .contact-item, .skill-category",
    )

    animatedElements.forEach((el) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(30px)"
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      observer.observe(el)
    })
  }

  animateCounters() {
    const counters = document.querySelectorAll(".stat-item")

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target
            const target = Number.parseInt(counter.getAttribute("data-count"))
            const numberElement = counter.querySelector(".stat-number")
            let current = 0

            const increment = target / 50
            const timer = setInterval(() => {
              current += increment
              if (current >= target) {
                current = target
                clearInterval(timer)
              }
              numberElement.textContent = Math.floor(current)
            }, 30)

            counterObserver.unobserve(counter)
          }
        })
      },
      { threshold: 0.5 },
    )

    counters.forEach((counter) => {
      counterObserver.observe(counter)
    })
  }

  animateSkills() {
    const skillItems = document.querySelectorAll(".skill-item")

    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillItem = entry.target
            const skillLevel = skillItem.getAttribute("data-skill")
            const progressBar = skillItem.querySelector(".skill-progress")

            setTimeout(() => {
              progressBar.style.width = skillLevel + "%"
            }, 200)

            skillObserver.unobserve(skillItem)
          }
        })
      },
      { threshold: 0.5 },
    )

    skillItems.forEach((item) => {
      skillObserver.observe(item)
    })
  }

  animateTimeline() {
    const timelineItems = document.querySelectorAll(".timeline-item")

    timelineItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("visible")
      }, index * 200)
    })
  }
}

// 3D Tilt Effect
class TiltEffect {
  constructor() {
    this.init()
  }

  init() {
    const tiltElements = document.querySelectorAll("[data-tilt]")

    tiltElements.forEach((element) => {
      element.addEventListener("mousemove", (e) => {
        const rect = element.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = (y - centerY) / 10
        const rotateY = (centerX - x) / 10

        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
      })

      element.addEventListener("mouseleave", () => {
        element.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
      })
    })
  }
}

// Back to Top Button
class BackToTopButton {
  constructor() {
    this.button = document.getElementById("backToTop")
    this.init()
  }

  init() {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        this.button.classList.add("visible")
      } else {
        this.button.classList.remove("visible")
      }
    })

    this.button.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }
}

// Performance Monitor
class PerformanceMonitor {
  constructor() {
    this.init()
  }

  init() {
    if ("performance" in window) {
      window.addEventListener("load", () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType("navigation")[0]
          const loadTime = Math.round(perfData.loadEventEnd - perfData.fetchStart)
          console.log(`🚀 Page loaded in ${loadTime}ms`)

          // Log performance metrics
          console.log(`📊 Performance Metrics:
            - DOM Content Loaded: ${Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart)}ms
            - First Paint: ${Math.round(perfData.responseEnd - perfData.fetchStart)}ms
            - Load Complete: ${loadTime}ms
          `)
        }, 0)
      })
    }
  }
}
