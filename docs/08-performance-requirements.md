# 08. Performance Requirements: Speed & Optimization

## ⚡ Performance Philosophy

Performance is a core technical differentiator for Veloria Labs. Our website must demonstrate the same engineering excellence we deliver to clients, serving as a proof-of-concept for our capabilities.

### Performance as Technical Credibility
Technical founders evaluate agencies partially based on their own website performance. A fast, optimized site signals attention to detail and technical competence.

## 🎯 Core Web Vitals Targets

### Primary Metrics (Must Achieve)
```
Largest Contentful Paint (LCP): < 2.5 seconds
First Input Delay (FID): < 100 milliseconds  
Cumulative Layout Shift (CLS): < 0.1
Interaction to Next Paint (INP): < 200 milliseconds
```

### Secondary Metrics (Should Achieve)
```
First Contentful Paint (FCP): < 1.5 seconds
Time to Interactive (TTI): < 3.5 seconds
Total Blocking Time (TBT): < 200 milliseconds
Speed Index: < 3.0 seconds
```

### Lighthouse Score Targets
```
Performance: > 90 (Mobile), > 95 (Desktop)
Accessibility: > 95
Best Practices: > 90
SEO: > 95
```

## 🚀 Optimization Strategy

### 1. Bundle Optimization

#### Code Splitting Implementation
```javascript
// Route-based code splitting
const HomePage = lazy(() => import('./pages/HomePage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'))

// Component-based code splitting for heavy components
const InteractiveDemo = lazy(() => import('./components/InteractiveDemo'))
const TechStackAnimation = lazy(() => import('./components/TechStackAnimation'))

// Vendor chunking in vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['framer-motion', 'lottie-react'],
          ui: ['@headlessui/react', 'lucide-react'],
          utils: ['date-fns', 'clsx']
        }
      }
    }
  }
})
```

#### Bundle Size Targets
```
Main bundle: < 50KB gzipped
Vendor bundle: < 100KB gzipped
CSS bundle: < 15KB gzipped
Total initial load: < 165KB gzipped
```

### 2. Image Optimization

#### Format Strategy
```javascript
// Image optimization configuration
const imageConfig = {
  formats: ['avif', 'webp', 'jpg'],
  quality: {
    avif: 70,
    webp: 80,
    jpg: 85
  },
  sizes: [320, 640, 768, 1024, 1280, 1536, 1920],
  lazyLoading: true,
  placeholder: 'blur'
}

// Implementation example
<picture>
  <source srcSet="hero-image.avif" type="image/avif" />
  <source srcSet="hero-image.webp" type="image/webp" />
  <img 
    src="hero-image.jpg" 
    alt="Hero image"
    loading="lazy"
    decoding="async"
  />
</picture>
```

#### Image Size Targets
```
Hero images: < 100KB (optimized)
Service icons: < 5KB (SVG preferred)
Case study images: < 50KB each
Team photos: < 30KB each
Background patterns: < 10KB
```

### 3. CSS Optimization

#### Critical CSS Strategy
```javascript
// Critical CSS extraction
const criticalCSS = `
/* Above-the-fold styles only */
.hero-section { ... }
.navigation { ... }
.loading-spinner { ... }
`

// Non-critical CSS lazy loading
const loadCSS = (href) => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  link.media = 'print'
  link.onload = () => link.media = 'all'
  document.head.appendChild(link)
}
```

#### CSS Bundle Optimization
```css
/* Purge unused CSS */
/* Remove unused Tailwind classes */
/* Minimize custom CSS */
/* Use CSS custom properties for theming */

:root {
  --primary-500: 139 92 246;
  --transition-normal: 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Optimized animations */
@media (prefers-reduced-motion: no-preference) {
  .animate-slide-up {
    animation: slideUp 0.6s var(--transition-normal);
  }
}
```

### 4. JavaScript Optimization

#### Performance-First Code Patterns
```javascript
// Optimize component renders
const ServiceCard = memo(({ service }) => {
  return (
    <div className="service-card">
      {service.title}
    </div>
  )
})

// Debounce expensive operations
const debouncedSearch = useMemo(
  () => debounce((query) => {
    // Search implementation
  }, 300),
  []
)

// Virtual scrolling for large lists
const VirtualizedList = ({ items }) => {
  return (
    <FixedSizeList
      height={400}
      itemCount={items.length}
      itemSize={60}
    >
      {Row}
    </FixedSizeList>
  )
}
```

#### Third-Party Script Optimization
```javascript
// Lazy load analytics
const loadAnalytics = () => {
  if (window.gtag) return
  
  const script = document.createElement('script')
  script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_ID'
  script.async = true
  document.head.appendChild(script)
}

// Load on user interaction
document.addEventListener('click', loadAnalytics, { once: true })
document.addEventListener('scroll', loadAnalytics, { once: true })
```

## 📊 Performance Monitoring

### Real User Monitoring (RUM)
```javascript
// Core Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

const sendToAnalytics = (metric) => {
  const body = JSON.stringify(metric)
  
  // Use Navigator.sendBeacon() if available
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/analytics', body)
  } else {
    fetch('/api/analytics', { body, method: 'POST', keepalive: true })
  }
}

// Track all Core Web Vitals
getCLS(sendToAnalytics)
getFID(sendToAnalytics)
getFCP(sendToAnalytics)
getLCP(sendToAnalytics)
getTTFB(sendToAnalytics)
```

### Performance Budget
```javascript
// Performance budget configuration
const performanceBudget = {
  'budget': [
    {
      'path': '/*',
      'timings': [
        { 'metric': 'interactive', 'budget': 3500 },
        { 'metric': 'first-contentful-paint', 'budget': 1500 }
      ],
      'resourceSizes': [
        { 'resourceType': 'script', 'budget': 150 },
        { 'resourceType': 'total', 'budget': 300 }
      ]
    }
  ]
}
```

### Continuous Performance Testing
```yaml
# GitHub Actions performance testing
name: Performance Testing
on: [push, pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Lighthouse CI
        run: |
          npm install -g @lhci/cli@0.12.x
          lhci autorun --config=.lighthouserc.json
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

## 🎯 Page-Specific Optimizations

### Homepage Performance
**Critical rendering path optimization:**
1. Inline critical CSS for hero section
2. Preload hero image
3. Defer non-critical JavaScript
4. Use web fonts efficiently

```html
<!-- Optimized homepage head -->
<head>
  <!-- Critical CSS inline -->
  <style>/* Critical styles */</style>
  
  <!-- Preload important resources -->
  <link rel="preload" href="/fonts/inter-variable.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/images/hero-bg.webp" as="image">
  
  <!-- DNS prefetch for external resources -->
  <link rel="dns-prefetch" href="//fonts.googleapis.com">
  <link rel="dns-prefetch" href="//www.google-analytics.com">
</head>
```

### Service Pages Performance
**Service-specific optimizations:**
```javascript
// Lazy load service page components
const ServiceDetails = lazy(() => import('./ServiceDetails'))
const CaseStudies = lazy(() => import('./CaseStudies'))
const TechnicalSpecs = lazy(() => import('./TechnicalSpecs'))

// Progressive image loading
const ProgressiveImage = ({ src, placeholder, alt }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  
  return (
    <div className="relative">
      <img 
        src={placeholder}
        alt={alt}
        className={`transition-opacity ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}
      />
      <img
        src={src}
        alt={alt}
        onLoad={() => setImageLoaded(true)}
        className={`absolute inset-0 transition-opacity ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
}
```

### Case Studies Performance
**Content optimization:**
```javascript
// Infinite scroll with intersection observer
const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false)
  
  useEffect(() => {
    if (!isFetching) return
    
    const fetchMoreData = async () => {
      await callback()
      setIsFetching(false)
    }
    
    fetchMoreData()
  }, [isFetching])
  
  const observerRef = useRef()
  
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFetching(true)
        }
      },
      { threshold: 1 }
    )
    
    return () => observerRef.current?.disconnect()
  }, [])
  
  return [isFetching, setIsFetching, observerRef]
}
```

## 🛠️ Development Tools

### Performance Profiling Setup
```javascript
// Performance profiler for development
const PerformanceProfiler = ({ id, children }) => {
  const onRender = (id, phase, actualDuration) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Profiler:', { id, phase, actualDuration })
    }
  }
  
  return (
    <Profiler id={id} onRender={onRender}>
      {children}
    </Profiler>
  )
}

// Usage
<PerformanceProfiler id="ServiceCard">
  <ServiceCard service={service} />
</PerformanceProfiler>
```

### Bundle Analysis
```bash
# Analyze bundle composition
npm run build
npx webpack-bundle-analyzer dist/static/js/*.js

# Check bundle sizes
npm install -g bundlesize
bundlesize
```

### Performance Testing Tools
```javascript
// Lighthouse programmatic testing
const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')

const runLighthouse = async (url) => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] })
  const options = { logLevel: 'info', output: 'html', port: chrome.port }
  const runnerResult = await lighthouse(url, options)
  
  await chrome.kill()
  return runnerResult
}
```

## 📱 Mobile Performance

### Mobile-Specific Optimizations
```javascript
// Touch event optimization
const TouchOptimizedButton = ({ onClick, children }) => {
  const handleTouchStart = useCallback((e) => {
    // Prevent 300ms delay on mobile
    e.preventDefault()
    onClick()
  }, [onClick])
  
  return (
    <button
      onTouchStart={handleTouchStart}
      onClick={onClick}
      className="touch-manipulation" // CSS property for touch optimization
    >
      {children}
    </button>
  )
}

// Service Worker for mobile caching
const registerSW = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered:', registration)
      })
      .catch(error => {
        console.log('SW registration failed:', error)
      })
  }
}
```

### Mobile Performance Targets
```
Mobile Lighthouse Score: > 85
Mobile FCP: < 2 seconds
Mobile LCP: < 3 seconds
Mobile CLS: < 0.1
Touch response time: < 50ms
```

## 🔧 Performance Implementation Checklist

### Phase 1: Foundation (Week 1-2)
- [ ] Set up performance monitoring (Web Vitals)
- [ ] Implement critical CSS strategy
- [ ] Configure bundle optimization
- [ ] Add image optimization pipeline

### Phase 2: Advanced Optimization (Week 3-4)
- [ ] Implement lazy loading for components
- [ ] Add service worker for caching
- [ ] Optimize third-party scripts
- [ ] Set up performance budgets

### Phase 3: Mobile Optimization (Week 5-6)
- [ ] Optimize touch interactions
- [ ] Implement progressive image loading
- [ ] Add mobile-specific performance features
- [ ] Test on real mobile devices

### Phase 4: Monitoring & Testing (Week 7-8)
- [ ] Set up continuous performance testing
- [ ] Implement real user monitoring
- [ ] Create performance dashboards
- [ ] Document performance guidelines

### Performance Validation Checklist
- [ ] All Core Web Vitals meet targets
- [ ] Bundle sizes within budget
- [ ] Images properly optimized
- [ ] Mobile performance acceptable
- [ ] Accessibility not compromised
- [ ] Cross-browser performance consistent

---

**Next Document**: [`09-testing-specifications.md`](./09-testing-specifications.md) - Testing strategy and criteria 