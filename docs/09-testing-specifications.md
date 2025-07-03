# 09. Testing Specifications: Quality Assurance Strategy

## 🧪 Testing Philosophy

Quality assurance for Veloria Labs must reflect the same engineering standards we deliver to clients. Our testing strategy ensures technical credibility while maintaining rapid development velocity.

### Testing as Technical Demonstration
A well-tested website serves as proof of our development practices and quality standards to technical evaluators.

## 🎯 Testing Strategy Overview

### Testing Pyramid
```
                   E2E Tests (10%)
                 /               \
            Integration Tests (20%)
           /                       \
      Unit Tests (70%)
```

### Quality Gates
```
Code Coverage: > 80%
Unit Test Pass Rate: 100%
Integration Test Pass Rate: 100%
E2E Test Pass Rate: > 95%
Accessibility Score: > 95%
Performance Budget: Within limits
```

## 🔧 Unit Testing Strategy

### Testing Framework Setup
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/reportWebVitals.js',
    '!src/**/*.stories.js',
    '!src/**/*.test.js',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
    '<rootDir>/src/**/*.{test,spec}.{js,jsx}',
  ],
}
```

### Component Testing Examples

#### Button Component Tests
```javascript
// src/components/ui/Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('applies primary variant styles by default', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-gradient-purple')
  })

  it('applies secondary variant styles when specified', () => {
    render(<Button variant="secondary">Click me</Button>)
    expect(screen.getByRole('button')).toHaveClass('border-primary-500')
  })

  it('calls onClick handler when clicked', async () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('has correct ARIA attributes', () => {
    render(<Button aria-label="Submit form">Submit</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Submit form')
  })
})
```

#### Service Card Tests
```javascript
// src/components/ServiceCard.test.jsx
import { render, screen } from '@testing-library/react'
import ServiceCard from './ServiceCard'

const mockService = {
  title: 'MVP Engineering',
  description: 'Build production-ready MVPs in 4-8 weeks',
  features: ['Architecture Planning', 'Rapid Prototyping', 'Technical Advisory'],
  icon: 'Rocket',
  cta: 'Start Your MVP'
}

describe('ServiceCard Component', () => {
  it('renders service information correctly', () => {
    render(<ServiceCard service={mockService} />)
    
    expect(screen.getByText('MVP Engineering')).toBeInTheDocument()
    expect(screen.getByText('Build production-ready MVPs in 4-8 weeks')).toBeInTheDocument()
    expect(screen.getByText('Start Your MVP')).toBeInTheDocument()
  })

  it('renders all service features', () => {
    render(<ServiceCard service={mockService} />)
    
    mockService.features.forEach(feature => {
      expect(screen.getByText(feature)).toBeInTheDocument()
    })
  })

  it('has proper accessibility structure', () => {
    render(<ServiceCard service={mockService} />)
    
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('MVP Engineering')
    expect(screen.getByRole('button')).toHaveTextContent('Start Your MVP')
  })

  it('applies hover effects correctly', () => {
    render(<ServiceCard service={mockService} />)
    const card = screen.getByTestId('service-card')
    
    expect(card).toHaveClass('hover:-translate-y-1')
  })
})
```

### Hook Testing
```javascript
// src/hooks/useIntersection.test.js
import { renderHook } from '@testing-library/react'
import useIntersection from './useIntersection'

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
})
window.IntersectionObserver = mockIntersectionObserver

describe('useIntersection Hook', () => {
  it('initializes with correct default values', () => {
    const { result } = renderHook(() => useIntersection())
    
    expect(result.current.isIntersecting).toBe(false)
    expect(result.current.ref.current).toBe(null)
  })

  it('creates IntersectionObserver with correct options', () => {
    const options = { threshold: 0.5 }
    renderHook(() => useIntersection(options))
    
    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      options
    )
  })
})
```

## 🔗 Integration Testing

### Page Integration Tests
```javascript
// src/pages/Home.integration.test.jsx
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Home from './Home'

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Home Page Integration', () => {
  it('renders all main sections', async () => {
    renderWithRouter(<Home />)
    
    expect(screen.getByRole('banner')).toBeInTheDocument() // Header
    expect(screen.getByText(/Engineering Tomorrow's Products/i)).toBeInTheDocument() // Hero
    expect(screen.getByText(/Comprehensive Product Engineering/i)).toBeInTheDocument() // Services
    expect(screen.getByRole('contentinfo')).toBeInTheDocument() // Footer
  })

  it('has working navigation links', async () => {
    renderWithRouter(<Home />)
    
    const servicesLink = screen.getByRole('link', { name: /services/i })
    expect(servicesLink).toHaveAttribute('href', '/services')
  })

  it('loads service cards correctly', async () => {
    renderWithRouter(<Home />)
    
    await waitFor(() => {
      expect(screen.getByText('MVP Engineering')).toBeInTheDocument()
      expect(screen.getByText('Scale Engineering')).toBeInTheDocument()
      expect(screen.getByText('AI Product Development')).toBeInTheDocument()
      expect(screen.getByText('Enterprise Solutions')).toBeInTheDocument()
    })
  })
})
```

### Form Integration Tests
```javascript
// src/components/ContactForm.integration.test.jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from './ContactForm'

// Mock fetch for form submission
global.fetch = jest.fn()

describe('Contact Form Integration', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  it('submits form with valid data', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    })

    render(<ContactForm />)
    
    await userEvent.type(screen.getByLabelText(/name/i), 'John Doe')
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com')
    await userEvent.type(screen.getByLabelText(/message/i), 'Test message content')
    
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Test message content'
        })
      })
    })
  })

  it('displays validation errors for invalid data', async () => {
    render(<ContactForm />)
    
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument()
      expect(screen.getByText(/email is required/i)).toBeInTheDocument()
      expect(screen.getByText(/message is required/i)).toBeInTheDocument()
    })
  })
})
```

## 🌐 End-to-End Testing

### E2E Testing Setup with Playwright
```javascript
// playwright.config.js
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
})
```

### Critical User Journey Tests
```javascript
// e2e/user-journey.spec.js
import { test, expect } from '@playwright/test'

test.describe('Technical Founder Journey', () => {
  test('complete evaluation flow', async ({ page }) => {
    // Land on homepage
    await page.goto('/')
    
    // Verify hero section loads
    await expect(page.getByText('Engineering Tomorrow\'s Products')).toBeVisible()
    
    // Check technical credibility signals
    await expect(page.getByText('99.9% Uptime')).toBeVisible()
    await expect(page.getByText('SOC2 Compliant')).toBeVisible()
    
    // Navigate to services
    await page.click('text=Products')
    await expect(page).toHaveURL('/services')
    
    // Explore MVP Engineering service
    await page.click('text=MVP Engineering')
    await expect(page.getByText('0→1 Product Development')).toBeVisible()
    
    // View case studies
    await page.click('text=Case Studies')
    await expect(page).toHaveURL('/case-studies')
    await expect(page.getByText('Startup Success Stories')).toBeVisible()
    
    // Start consultation process
    await page.click('text=Start Building')
    await expect(page.getByText('Let\'s discuss your project')).toBeVisible()
  })

  test('mobile responsive navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Open mobile menu
    await page.click('[data-testid="mobile-menu-button"]')
    await expect(page.getByText('Products')).toBeVisible()
    
    // Navigate using mobile menu
    await page.click('text=Case Studies')
    await expect(page).toHaveURL('/case-studies')
  })
})

test.describe('Performance Validation', () => {
  test('page load performance', async ({ page }) => {
    const startTime = Date.now()
    await page.goto('/')
    
    // Wait for hero section to be visible
    await expect(page.getByText('Engineering Tomorrow\'s Products')).toBeVisible()
    
    const loadTime = Date.now() - startTime
    expect(loadTime).toBeLessThan(3000) // 3 second load time requirement
  })

  test('interactive elements respond quickly', async ({ page }) => {
    await page.goto('/')
    
    const startTime = Date.now()
    await page.click('text=Start Building')
    await page.waitForSelector('text=Let\'s discuss your project')
    
    const responseTime = Date.now() - startTime
    expect(responseTime).toBeLessThan(200) // 200ms interaction requirement
  })
})
```

### Form Submission E2E Tests
```javascript
// e2e/contact-form.spec.js
import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  test('successful form submission', async ({ page }) => {
    await page.goto('/contact')
    
    // Fill form
    await page.fill('[data-testid="name-input"]', 'Jane Smith')
    await page.fill('[data-testid="email-input"]', 'jane@startup.com')
    await page.selectOption('[data-testid="project-type"]', 'MVP Engineering')
    await page.fill('[data-testid="message-input"]', 'We need to build an MVP for our fintech startup.')
    
    // Submit form
    await page.click('text=Send Message')
    
    // Verify success message
    await expect(page.getByText('Message sent successfully')).toBeVisible()
  })

  test('form validation errors', async ({ page }) => {
    await page.goto('/contact')
    
    // Submit empty form
    await page.click('text=Send Message')
    
    // Check validation errors
    await expect(page.getByText('Name is required')).toBeVisible()
    await expect(page.getByText('Email is required')).toBeVisible()
    await expect(page.getByText('Message is required')).toBeVisible()
  })
})
```

## ♿ Accessibility Testing

### Automated Accessibility Testing
```javascript
// src/setupTests.js
import { toHaveNoViolations } from 'jest-axe'
expect.extend(toHaveNoViolations)

// Accessibility test example
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import HomePage from './HomePage'

test('should not have accessibility violations', async () => {
  const { container } = render(<HomePage />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

### E2E Accessibility Testing
```javascript
// e2e/accessibility.spec.js
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility Tests', () => {
  test('homepage accessibility', async ({ page }) => {
    await page.goto('/')
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('keyboard navigation', async ({ page }) => {
    await page.goto('/')
    
    // Test Tab navigation
    await page.keyboard.press('Tab')
    await expect(page.locator(':focus')).toBeVisible()
    
    // Test Enter key activation
    await page.keyboard.press('Enter')
    // Verify appropriate action occurs
  })

  test('screen reader compatibility', async ({ page }) => {
    await page.goto('/')
    
    // Check for proper heading structure
    const h1 = page.locator('h1')
    await expect(h1).toHaveCount(1)
    
    // Check for alt text on images
    const images = page.locator('img')
    const imageCount = await images.count()
    for (let i = 0; i < imageCount; i++) {
      await expect(images.nth(i)).toHaveAttribute('alt')
    }
  })
})
```

## 📊 Performance Testing

### Lighthouse CI Integration
```yaml
# .lighthouserc.json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3000/"],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.95}],
        "categories:best-practices": ["error", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.95}]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

### Load Testing
```javascript
// load-testing/basic-load.js
import http from 'k6/http'
import { check, sleep } from 'k6'

export let options = {
  stages: [
    { duration: '2m', target: 100 }, // Ramp up to 100 users
    { duration: '5m', target: 100 }, // Stay at 100 users
    { duration: '2m', target: 200 }, // Ramp up to 200 users
    { duration: '5m', target: 200 }, // Stay at 200 users
    { duration: '2m', target: 0 },   // Ramp down to 0 users
  ],
}

export default function () {
  let response = http.get('https://velorialabs.com/')
  
  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 2s': (r) => r.timings.duration < 2000,
  })
  
  sleep(1)
}
```

## 🔧 Testing Implementation Strategy

### Phase 1: Foundation Testing (Week 1-2)
```bash
# Setup testing infrastructure
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
npm install --save-dev @testing-library/user-event jest-axe
npm install --save-dev @playwright/test @axe-core/playwright

# Configure test scripts
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage",
  "test:e2e": "playwright test",
  "test:e2e:ui": "playwright test --ui"
}
```

### Phase 2: Component Testing (Week 3-4)
- [ ] Test all UI components (Button, Card, Typography)
- [ ] Test custom hooks (useIntersection, useMediaQuery)
- [ ] Test utility functions
- [ ] Achieve 80%+ code coverage

### Phase 3: Integration Testing (Week 5-6)
- [ ] Test page components with routing
- [ ] Test form submissions
- [ ] Test API integrations
- [ ] Test component interactions

### Phase 4: E2E & Performance Testing (Week 7-8)
- [ ] Implement critical user journey tests
- [ ] Add performance testing
- [ ] Set up accessibility testing
- [ ] Configure CI/CD testing pipeline

### Testing Checklist
- [ ] Unit tests for all components (>80% coverage)
- [ ] Integration tests for pages and forms
- [ ] E2E tests for critical user journeys
- [ ] Accessibility tests (no violations)
- [ ] Performance tests (meet Web Vitals targets)
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Mobile device testing
- [ ] Load testing for high traffic

### CI/CD Integration
```yaml
# .github/workflows/test.yml
name: Test Suite
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run unit tests
        run: npm run test:coverage
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

---

**Next Document**: [`10-deployment-strategy.md`](./10-deployment-strategy.md) - Go-live and rollout plans 