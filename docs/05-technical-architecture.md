# 05. Technical Architecture: System Specifications

## 🏗️ Architecture Overview

This document defines the technical architecture, performance requirements, and implementation standards for the Veloria Labs platform transformation. All specifications align with modern startup and enterprise development practices.

### Technical Philosophy

**Core Principles:**
1. **Performance First**: Sub-2s load times, optimized for mobile
2. **Developer Experience**: Clean code, maintainable architecture
3. **Scalability**: Built to handle growth from MVP to enterprise
4. **Security**: Industry-standard practices, compliance-ready
5. **Accessibility**: WCAG 2.1 AA compliance, inclusive design

## 🔧 Current Technology Stack

### Frontend Architecture

#### Core Technologies
```json
{
  "framework": "React 18.2.0",
  "bundler": "Vite 4.4.5",
  "styling": "Tailwind CSS 3.3.3",
  "animations": "Framer Motion 10.16.4",
  "routing": "React Router DOM 6.18.0",
  "icons": "Lucide React 0.487.0",
  "build": "Node.js 18+",
  "package_manager": "npm"
}
```

#### Development Tools
```json
{
  "linting": "ESLint 8.45.0",
  "formatting": "Prettier",
  "testing": "Jest + React Testing Library",
  "type_checking": "TypeScript (optional)",
  "git_hooks": "Husky + lint-staged",
  "ci_cd": "GitHub Actions"
}
```

## 🎨 Enhanced Technology Stack

### New Dependencies for Transformation

#### UI/UX Enhancement
```bash
# Install new dependencies
npm install @headlessui/react@^1.7.17
npm install @heroicons/react@^2.0.18
npm install clsx@^2.0.0
npm install tailwind-merge@^2.0.0
npm install react-intersection-observer@^9.5.2
npm install react-hot-toast@^2.4.1
```

#### Animation & Interaction
```bash
# Enhanced animation capabilities
npm install framer-motion@^10.16.4
npm install lottie-react@^2.4.0
npm install react-spring@^9.7.3
```

#### Development & Quality
```bash
# Development tools
npm install -D @typescript-eslint/eslint-plugin@^6.0.0
npm install -D @typescript-eslint/parser@^6.0.0
npm install -D eslint-plugin-a11y@^6.7.1
npm install -D prettier-plugin-tailwindcss@^0.5.0
```

### Updated File Structure

```
client/
├── public/
│   ├── favicon.ico (updated purple theme)
│   ├── logo192.png (new Veloria Labs logo)
│   ├── logo512.png (new Veloria Labs logo)
│   └── manifest.json (updated branding)
├── src/
│   ├── components/
│   │   ├── ui/               # New design system components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Typography.jsx
│   │   │   ├── BentoGrid.jsx
│   │   │   ├── CodePreview.jsx
│   │   │   ├── AnimatedCounter.jsx
│   │   │   └── GradientBackground.jsx
│   │   ├── layout/           # Layout components
│   │   │   ├── Header.jsx
│   │   │   ├── Navigation.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Container.jsx
│   │   ├── sections/         # Page sections
│   │   │   ├── HeroSection.jsx
│   │   │   ├── ServicesSection.jsx
│   │   │   ├── CaseStudiesSection.jsx
│   │   │   ├── TechStackSection.jsx
│   │   │   └── CTASection.jsx
│   │   └── features/         # Feature-specific components
│   │       ├── TechStackBadges.jsx
│   │       ├── MetricsDashboard.jsx
│   │       ├── ServiceCards.jsx
│   │       └── ContactForm.jsx
│   ├── styles/
│   │   ├── globals.css       # Updated global styles
│   │   ├── components.css    # Component-specific styles
│   │   └── animations.css    # Animation definitions
│   ├── utils/
│   │   ├── cn.js            # Class name utility
│   │   ├── animations.js    # Framer Motion presets
│   │   ├── constants.js     # Design system constants
│   │   └── helpers.js       # Utility functions
│   ├── hooks/
│   │   ├── useIntersection.js
│   │   ├── useMediaQuery.js
│   │   └── useScrollPosition.js
│   ├── data/
│   │   ├── services.js      # Updated service data
│   │   ├── techStack.js     # Technology specifications
│   │   ├── caseStudies.js   # Client success stories
│   │   └── metrics.js       # Performance metrics
│   └── assets/
│       ├── images/          # Optimized images
│       ├── icons/           # Custom SVG icons
│       └── brand/           # Brand assets
├── tailwind.config.js       # Updated configuration
├── vite.config.js          # Enhanced build config
└── package.json            # Updated dependencies
```

## 🎯 Performance Architecture

### Performance Requirements

#### Core Web Vitals Targets
```json
{
  "first_contentful_paint": "<1.5s",
  "largest_contentful_paint": "<2.5s",
  "cumulative_layout_shift": "<0.1",
  "first_input_delay": "<100ms",
  "interaction_to_next_paint": "<200ms"
}
```

#### Lighthouse Score Targets
```json
{
  "performance": ">90",
  "accessibility": ">95",
  "best_practices": ">90",
  "seo": ">95",
  "mobile_performance": ">85"
}
```

### Optimization Strategies

#### Bundle Optimization
```javascript
// vite.config.js enhancements
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
          ui: ['@headlessui/react', 'lucide-react'],
        },
      },
    },
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
})
```

#### Image Optimization
```javascript
// Image optimization strategy
const imageOptimization = {
  formats: ['webp', 'avif', 'jpg'],
  sizes: [320, 640, 768, 1024, 1280, 1536],
  quality: {
    webp: 80,
    jpg: 75,
    avif: 70,
  },
  lazy_loading: true,
  responsive_images: true,
}
```

#### Code Splitting Strategy
```javascript
// Lazy loading implementation
import { lazy, Suspense } from 'react'

// Route-based code splitting
const Home = lazy(() => import('./pages/Home'))
const Services = lazy(() => import('./pages/Services'))
const CaseStudies = lazy(() => import('./pages/CaseStudies'))

// Component-based code splitting
const HeavyComponent = lazy(() => import('./components/HeavyComponent'))

// Usage with fallback
<Suspense fallback={<LoadingSpinner />}>
  <HeavyComponent />
</Suspense>
```

## 🎨 CSS Architecture

### Tailwind Configuration Enhancement

```javascript
// tailwind.config.js - Complete configuration
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#0f0f23',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'purple': '0 10px 25px -5px rgba(139, 92, 246, 0.1)',
        'purple-lg': '0 20px 25px -5px rgba(139, 92, 246, 0.15)',
        'glow': '0 0 20px rgba(139, 92, 246, 0.3)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
```

### CSS Custom Properties

```css
/* globals.css - Enhanced styles */
:root {
  /* Color system */
  --color-primary: 139 92 246;
  --color-secondary: 99 102 241;
  --color-accent: 168 85 247;
  --color-neutral: 15 15 35;
  
  /* Spacing system */
  --space-xs: 0.5rem;
  --space-sm: 0.75rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;
  --space-2xl: 3rem;
  
  /* Typography scale */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  
  /* Animation timings */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  
  /* Easing functions */
  --ease-out-cubic: cubic-bezier(0.33, 1, 0.68, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-spring: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Base styles */
* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 5rem;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Focus styles */
.focus-visible:focus-visible {
  outline: 2px solid rgb(var(--color-primary));
  outline-offset: 2px;
}

/* Utility classes */
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .container {
    padding: 0 1.5rem;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 2rem;
  }
}

/* Animation utilities */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity var(--duration-slow) var(--ease-out-cubic),
              transform var(--duration-slow) var(--ease-out-cubic);
}

.animate-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Gradient utilities */
.gradient-purple {
  background: linear-gradient(135deg, 
    rgb(var(--color-primary)) 0%, 
    rgb(var(--color-secondary)) 50%, 
    rgb(var(--color-accent)) 100%);
}

.text-gradient-purple {
  background: linear-gradient(135deg, 
    rgb(var(--color-primary)) 0%, 
    rgb(var(--color-secondary)) 50%, 
    rgb(var(--color-accent)) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

## 🔒 Security Architecture

### Security Requirements

#### Content Security Policy
```javascript
// Security headers configuration
const securityHeaders = {
  'Content-Security-Policy': `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline' fonts.googleapis.com;
    font-src 'self' fonts.gstatic.com;
    img-src 'self' data: blob:;
    connect-src 'self' api.velorialabs.com;
  `,
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
}
```

#### Input Sanitization
```javascript
// Input validation utilities
const sanitizeInput = (input) => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
}

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validateForm = (formData) => {
  const errors = {}
  
  if (!formData.name || formData.name.length < 2) {
    errors.name = 'Name must be at least 2 characters'
  }
  
  if (!validateEmail(formData.email)) {
    errors.email = 'Invalid email format'
  }
  
  if (!formData.message || formData.message.length < 10) {
    errors.message = 'Message must be at least 10 characters'
  }
  
  return errors
}
```

### Data Protection

#### Privacy Compliance
```javascript
// GDPR/Privacy compliance utilities
const privacyConfig = {
  cookieConsent: true,
  dataRetention: '2 years',
  userRights: [
    'access',
    'rectification', 
    'erasure',
    'portability',
    'restriction'
  ],
  lawfulBasis: 'legitimate interest',
  dataMinimization: true,
}

// Cookie management
const cookieManager = {
  set: (name, value, days = 365) => {
    const expires = new Date()
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000))
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;secure;samesite=strict`
  },
  
  get: (name) => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop().split(';').shift()
    return null
  },
  
  delete: (name) => {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
  }
}
```

## 📊 Analytics & Monitoring

### Performance Monitoring

#### Core Web Vitals Tracking
```javascript
// Performance monitoring setup
const performanceMonitor = {
  trackCWV: () => {
    // First Contentful Paint
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          console.log('FCP:', entry.startTime)
          // Send to analytics
        }
      }
    }).observe({ entryTypes: ['paint'] })
    
    // Largest Contentful Paint
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      console.log('LCP:', lastEntry.startTime)
      // Send to analytics
    }).observe({ entryTypes: ['largest-contentful-paint'] })
    
    // Cumulative Layout Shift
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          console.log('CLS:', entry.value)
          // Send to analytics
        }
      }
    }).observe({ entryTypes: ['layout-shift'] })
  },
  
  trackUserInteractions: () => {
    // Track button clicks, form submissions, etc.
    document.addEventListener('click', (event) => {
      if (event.target.matches('button, a, [role="button"]')) {
        const elementText = event.target.textContent || event.target.ariaLabel
        console.log('Interaction:', elementText)
        // Send to analytics
      }
    })
  }
}
```

#### Error Tracking
```javascript
// Error boundary and tracking
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true }
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    // Send to error tracking service
    this.logErrorToService(error, errorInfo)
  }
  
  logErrorToService = (error, errorInfo) => {
    // Implementation for error logging service
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    }
    
    // Send to monitoring service
    fetch('/api/errors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(errorData),
    })
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong.</h2>
          <button onClick={() => window.location.reload()}>
            Reload page
          </button>
        </div>
      )
    }
    
    return this.props.children
  }
}
```

## 🚀 Deployment Architecture

### Build Configuration

#### Production Build Setup
```javascript
// vite.config.js - Production configuration
export default defineConfig({
  plugins: [
    react(),
    // PWA plugin for service worker
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
            },
          },
        ],
      },
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion'],
          router: ['react-router-dom'],
        },
      },
    },
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
})
```

#### Environment Configuration
```javascript
// Environment variables
const config = {
  development: {
    API_URL: 'http://localhost:3001/api',
    DEBUG: true,
    ANALYTICS_ID: 'dev-analytics-id',
  },
  staging: {
    API_URL: 'https://staging-api.velorialabs.com/api',
    DEBUG: false,
    ANALYTICS_ID: 'staging-analytics-id',
  },
  production: {
    API_URL: 'https://api.velorialabs.com/api',
    DEBUG: false,
    ANALYTICS_ID: 'prod-analytics-id',
  },
}

export default config[process.env.NODE_ENV || 'development']
```

### CI/CD Pipeline

#### GitHub Actions Configuration
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build
      
      - name: Lighthouse CI
        run: |
          npm install -g @lhci/cli@0.12.x
          lhci autorun

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build
      
      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v2.0
        with:
          publish-dir: './dist'
          production-branch: main
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Deploy from GitHub Actions"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 📋 Quality Assurance

### Testing Strategy

#### Unit Testing Setup
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/reportWebVitals.js',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}

// Example component test
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '../Button'

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })
  
  it('calls onClick when clicked', async () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
  
  it('applies correct styles', () => {
    render(<Button variant="primary">Click me</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-gradient-purple')
  })
})
```

### Accessibility Testing

#### Automated a11y Testing
```javascript
// Accessibility testing with jest-axe
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

test('should not have accessibility violations', async () => {
  const { container } = render(<App />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})

// Manual accessibility checklist
const a11yChecklist = {
  colorContrast: 'WCAG AA (4.5:1) minimum',
  keyboardNavigation: 'All interactive elements accessible',
  screenReader: 'Proper ARIA labels and semantic HTML',
  focusManagement: 'Visible focus indicators',
  textAlternatives: 'Alt text for images, aria-labels for icons',
  formLabels: 'All form inputs properly labeled',
  headingStructure: 'Logical heading hierarchy (h1-h6)',
}
```

---

**Next Document**: [`06-content-strategy.md`](./06-content-strategy.md) - Messaging and content guidelines 