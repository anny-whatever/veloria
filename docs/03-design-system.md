# 03. Design System: Technical Implementation Specifications

## 🎨 Design System Overview

This document provides detailed technical specifications for implementing the Veloria Labs design system. All components follow atomic design principles, ensuring consistency, reusability, and maintainability across the platform.

### Design System Philosophy

**Principles:**
1. **Consistency**: Uniform visual language across all touchpoints
2. **Accessibility**: WCAG 2.1 AA compliance minimum
3. **Performance**: Optimized for speed and efficiency
4. **Scalability**: Components that grow with the product
5. **Developer Experience**: Clear documentation and easy implementation

## 🎯 Tailwind CSS Configuration

### Updated Color Palette (tailwind.config.js)

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Primary Purple Palette
        primary: {
          50: '#f5f3ff',
          100: '#ede9fe', 
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6', // Main brand color
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        
        // Secondary Purple Palette  
        secondary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe', 
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1', // Supporting purple
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        
        // Accent Purple Palette
        accent: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe', 
          400: '#c084fc',
          500: '#a855f7', // Bright purple
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
        },
        
        // Neutral Palette
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
          950: '#0f0f23', // Rich black
        },
        
        // Status Colors (minimal, purple-tinted)
        success: {
          500: '#8b5cf6', // Use primary for success
          600: '#7c3aed',
        },
        warning: {
          500: '#a855f7', // Use accent for warnings
          600: '#9333ea',
        },
        error: {
          500: '#ef4444', // Standard red for errors
          600: '#dc2626',
        },
      },
      
      // Typography System
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      
      // Extended Spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Animation System
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
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
      
      // Box Shadow System
      boxShadow: {
        'purple': '0 10px 25px -5px rgba(139, 92, 246, 0.1), 0 4px 6px -2px rgba(139, 92, 246, 0.05)',
        'purple-lg': '0 20px 25px -5px rgba(139, 92, 246, 0.15), 0 10px 10px -5px rgba(139, 92, 246, 0.08)',
        'glow': '0 0 20px rgba(139, 92, 246, 0.3)',
        'glow-lg': '0 0 40px rgba(139, 92, 246, 0.4)',
      },
      
      // Border Radius System
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      
      // Background Patterns
      backgroundImage: {
        'gradient-purple': 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #a855f7 100%)',
        'gradient-purple-dark': 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #9333ea 100%)',
        'dot-pattern': 'radial-gradient(circle, rgb(139 92 246 / 0.1) 1px, transparent 1px)',
        'grid-pattern': 'linear-gradient(rgb(139 92 246 / 0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(139 92 246 / 0.05) 1px, transparent 1px)',
      },
      
      backgroundSize: {
        'dot-sm': '20px 20px',
        'dot-md': '30px 30px',
        'dot-lg': '40px 40px',
        'grid-sm': '20px 20px',
        'grid-md': '30px 30px',
        'grid-lg': '40px 40px',
      },
    },
  },
}
```

## 🧩 Component Library

### Base Components

#### 1. Button Component

```jsx
// components/ui/Button.jsx
import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

const buttonVariants = {
  variant: {
    primary: 'bg-gradient-purple hover:bg-gradient-purple-dark text-white shadow-purple hover:shadow-purple-lg',
    secondary: 'bg-white border-2 border-primary-500 text-primary-600 hover:bg-primary-50',
    outline: 'border border-neutral-300 bg-transparent hover:bg-neutral-50',
    ghost: 'bg-transparent hover:bg-neutral-100',
    destructive: 'bg-error-500 hover:bg-error-600 text-white',
  },
  size: {
    sm: 'h-9 px-3 text-sm',
    default: 'h-10 px-4 py-2',
    lg: 'h-11 px-8 text-lg',
    xl: 'h-12 px-10 text-xl',
  },
}

const Button = forwardRef(({ 
  className, 
  variant = 'primary', 
  size = 'default', 
  disabled,
  children,
  ...props 
}, ref) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'transform hover:-translate-y-0.5 active:translate-y-0',
        buttonVariants.variant[variant],
        buttonVariants.size[size],
        className
      )}
      disabled={disabled}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})

export default Button
```

#### 2. Card Component

```jsx
// components/ui/Card.jsx
import { cn } from '@/lib/utils'

const Card = ({ 
  className, 
  children, 
  hover = false, 
  glow = false,
  ...props 
}) => {
  return (
    <div
      className={cn(
        'rounded-xl bg-white border border-neutral-200 p-6',
        hover && 'transition-all duration-300 hover:-translate-y-1 hover:shadow-purple',
        glow && 'shadow-purple-lg',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const CardHeader = ({ className, children, ...props }) => (
  <div className={cn('space-y-1.5 pb-4', className)} {...props}>
    {children}
  </div>
)

const CardTitle = ({ className, children, ...props }) => (
  <h3 
    className={cn('font-semibold leading-none tracking-tight text-neutral-900', className)} 
    {...props}
  >
    {children}
  </h3>
)

const CardDescription = ({ className, children, ...props }) => (
  <p 
    className={cn('text-sm text-neutral-600', className)} 
    {...props}
  >
    {children}
  </p>
)

const CardContent = ({ className, children, ...props }) => (
  <div className={cn('pt-0', className)} {...props}>
    {children}
  </div>
)

const CardFooter = ({ className, children, ...props }) => (
  <div className={cn('flex items-center pt-4', className)} {...props}>
    {children}
  </div>
)

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
```

#### 3. Typography Components

```jsx
// components/ui/Typography.jsx
import { cn } from '@/lib/utils'

const Typography = {
  H1: ({ className, children, ...props }) => (
    <h1 
      className={cn(
        'text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-neutral-950',
        className
      )} 
      {...props}
    >
      {children}
    </h1>
  ),
  
  H2: ({ className, children, ...props }) => (
    <h2 
      className={cn(
        'text-3xl md:text-4xl font-bold leading-tight tracking-tight text-neutral-900',
        className
      )} 
      {...props}
    >
      {children}
    </h2>
  ),
  
  H3: ({ className, children, ...props }) => (
    <h3 
      className={cn(
        'text-2xl md:text-3xl font-semibold leading-tight tracking-tight text-neutral-900',
        className
      )} 
      {...props}
    >
      {children}
    </h3>
  ),
  
  H4: ({ className, children, ...props }) => (
    <h4 
      className={cn(
        'text-xl md:text-2xl font-semibold leading-tight text-neutral-900',
        className
      )} 
      {...props}
    >
      {children}
    </h4>
  ),
  
  Lead: ({ className, children, ...props }) => (
    <p 
      className={cn(
        'text-lg md:text-xl text-neutral-600 leading-relaxed',
        className
      )} 
      {...props}
    >
      {children}
    </p>
  ),
  
  Body: ({ className, children, ...props }) => (
    <p 
      className={cn(
        'text-base text-neutral-600 leading-relaxed',
        className
      )} 
      {...props}
    >
      {children}
    </p>
  ),
  
  Small: ({ className, children, ...props }) => (
    <p 
      className={cn(
        'text-sm text-neutral-500 leading-relaxed',
        className
      )} 
      {...props}
    >
      {children}
    </p>
  ),
  
  Code: ({ className, children, ...props }) => (
    <code 
      className={cn(
        'font-mono text-sm bg-neutral-100 px-2 py-1 rounded border',
        className
      )} 
      {...props}
    >
      {children}
    </code>
  ),
  
  Gradient: ({ className, children, ...props }) => (
    <span 
      className={cn(
        'bg-gradient-purple bg-clip-text text-transparent',
        className
      )} 
      {...props}
    >
      {children}
    </span>
  ),
}

export default Typography
```

### Advanced Components

#### 4. Bento Grid Component

```jsx
// components/ui/BentoGrid.jsx
import { cn } from '@/lib/utils'

const BentoGrid = ({ className, children, ...props }) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const BentoGridItem = ({ 
  className, 
  title, 
  description, 
  header, 
  icon,
  span = 1,
  children,
  ...props 
}) => {
  return (
    <div
      className={cn(
        'rounded-xl group/bento hover:shadow-purple transition-all duration-300',
        'bg-white border border-neutral-200 p-6',
        'hover:-translate-y-1',
        span === 2 && 'md:col-span-2',
        span === 3 && 'lg:col-span-3',
        className
      )}
      {...props}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-gradient-purple flex items-center justify-center mb-4">
            <div className="text-white">
              {icon}
            </div>
          </div>
        )}
        <div className="font-semibold text-neutral-900 mb-2">
          {title}
        </div>
        <div className="font-normal text-neutral-600 text-sm leading-relaxed">
          {description}
        </div>
        {children}
      </div>
    </div>
  )
}

export { BentoGrid, BentoGridItem }
```

#### 5. Code Preview Component

```jsx
// components/ui/CodePreview.jsx
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Copy, Check } from 'lucide-react'

const CodePreview = ({ 
  code, 
  language = 'javascript', 
  title,
  className,
  ...props 
}) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  return (
    <div 
      className={cn(
        'rounded-xl bg-neutral-950 border border-neutral-800 overflow-hidden',
        className
      )}
      {...props}
    >
      {title && (
        <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
          <span className="text-neutral-300 text-sm font-medium">{title}</span>
          <button
            onClick={copyToClipboard}
            className="p-1.5 rounded-md hover:bg-neutral-800 transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-neutral-400" />
            )}
          </button>
        </div>
      )}
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm text-neutral-300 font-mono leading-relaxed">
          <code className={`language-${language}`}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  )
}

export default CodePreview
```

#### 6. Animated Counter Component

```jsx
// components/ui/AnimatedCounter.jsx
import { useState, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

const AnimatedCounter = ({ 
  end, 
  duration = 2000, 
  suffix = '', 
  prefix = '',
  className = '',
  ...props 
}) => {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      let startTime = null
      const startCount = 0

      const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)

        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentCount = Math.floor(easeOutQuart * (end - startCount) + startCount)

        setCount(currentCount)

        if (progress < 1) {
          requestAnimationFrame(animation)
        }
      }

      requestAnimationFrame(animation)
    }
  }, [inView, end, duration])

  return (
    <span 
      ref={ref}
      className={`font-bold tabular-nums ${className}`}
      {...props}
    >
      {prefix}{count}{suffix}
    </span>
  )
}

export default AnimatedCounter
```

#### 7. Gradient Background Component

```jsx
// components/ui/GradientBackground.jsx
import { cn } from '@/lib/utils'

const GradientBackground = ({ 
  variant = 'default',
  className,
  children,
  ...props 
}) => {
  const variants = {
    default: 'bg-gradient-to-br from-primary-50 via-white to-accent-50',
    purple: 'bg-gradient-to-br from-primary-100 via-secondary-50 to-accent-100',
    dark: 'bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900',
    dots: 'bg-white bg-dot-pattern bg-dot-md bg-center',
    grid: 'bg-white bg-grid-pattern bg-grid-md bg-center',
  }

  return (
    <div 
      className={cn(
        'relative',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default GradientBackground
```

## 🎭 Animation System

### Framer Motion Presets

```jsx
// utils/animations.js
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }
}

export const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.6, 0.05, 0.01, 0.9] }
}

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

export const slideInFromBottom = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }
}

export const buttonHover = {
  whileHover: { 
    y: -2, 
    scale: 1.02,
    transition: { duration: 0.2 } 
  },
  whileTap: { 
    scale: 0.98,
    transition: { duration: 0.1 } 
  }
}

export const cardHover = {
  whileHover: {
    y: -5,
    transition: { duration: 0.3, ease: "easeOut" }
  }
}
```

### CSS Custom Properties

```css
/* globals.css */
:root {
  /* Purple Color System */
  --purple-50: 245 243 255;
  --purple-100: 237 233 254;
  --purple-200: 221 214 254;
  --purple-300: 196 181 253;
  --purple-400: 167 139 250;
  --purple-500: 139 92 246;
  --purple-600: 124 58 237;
  --purple-700: 109 40 217;
  --purple-800: 91 33 182;
  --purple-900: 76 29 149;
  
  /* Animation Timings */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  
  /* Easing Functions */
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  --ease-spring: cubic-bezier(0.6, 0.05, 0.01, 0.9);
  
  /* Shadows */
  --shadow-purple: 0 10px 25px -5px rgb(139 92 246 / 0.1), 0 4px 6px -2px rgb(139 92 246 / 0.05);
  --shadow-purple-lg: 0 20px 25px -5px rgb(139 92 246 / 0.15), 0 10px 10px -5px rgb(139 92 246 / 0.08);
  
  /* Gradients */
  --gradient-purple: linear-gradient(135deg, rgb(139 92 246) 0%, rgb(99 102 241) 50%, rgb(168 85 247) 100%);
  --gradient-purple-dark: linear-gradient(135deg, rgb(124 58 237) 0%, rgb(79 70 229) 50%, rgb(147 51 234) 100%);
}

/* Utility Classes */
.gradient-purple {
  background: var(--gradient-purple);
}

.shadow-purple {
  box-shadow: var(--shadow-purple);
}

.shadow-purple-lg {
  box-shadow: var(--shadow-purple-lg);
}

/* Smooth Animations */
.animate-fade-in {
  animation: fadeIn var(--duration-slow) var(--ease-out-quart);
}

.animate-slide-up {
  animation: slideUp 0.6s var(--ease-out-expo);
}

/* Hover Effects */
.hover-lift {
  transition: transform var(--duration-normal) var(--ease-out-quart);
}

.hover-lift:hover {
  transform: translateY(-4px);
}

.hover-glow {
  transition: box-shadow var(--duration-normal) var(--ease-out-quart);
}

.hover-glow:hover {
  box-shadow: var(--shadow-purple-lg);
}
```

## 📱 Responsive Design System

### Breakpoint Strategy

```javascript
// tailwind.config.js - screens
screens: {
  'xs': '475px',
  'sm': '640px', 
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
}
```

### Container System

```css
.container {
  @apply mx-auto px-4 sm:px-6 lg:px-8;
  max-width: 1280px;
}

.container-tight {
  @apply mx-auto px-4 sm:px-6 lg:px-8;
  max-width: 1024px;
}

.container-wide {
  @apply mx-auto px-4 sm:px-6 lg:px-8;
  max-width: 1536px;
}
```

### Typography Responsive Scale

```css
/* Responsive Typography */
.text-display {
  @apply text-4xl sm:text-5xl lg:text-6xl xl:text-7xl;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.text-headline {
  @apply text-3xl sm:text-4xl lg:text-5xl;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.text-title {
  @apply text-2xl sm:text-3xl lg:text-4xl;
  line-height: 1.3;
}

.text-subtitle {
  @apply text-xl sm:text-2xl lg:text-3xl;
  line-height: 1.4;
}

.text-body-lg {
  @apply text-lg sm:text-xl;
  line-height: 1.6;
}

.text-body {
  @apply text-base sm:text-lg;
  line-height: 1.6;
}
```

## 🔧 Developer Guidelines

### File Structure

```
src/
├── components/
│   ├── ui/           # Base components
│   ├── layout/       # Layout components  
│   ├── sections/     # Page sections
│   └── features/     # Feature-specific components
├── styles/
│   ├── globals.css   # Global styles
│   └── components.css # Component-specific styles
├── utils/
│   ├── cn.js         # Class name utility
│   └── animations.js # Animation presets
└── constants/
    └── design-tokens.js # Design system constants
```

### Component Creation Guidelines

1. **Naming Convention**: PascalCase for components, kebab-case for files
2. **Props Interface**: Always define prop types or use TypeScript
3. **Accessibility**: Include ARIA labels and keyboard navigation
4. **Performance**: Use React.memo for expensive components
5. **Testing**: Include unit tests for complex logic

### Code Quality Standards

```javascript
// Example component structure
import { cn } from '@/utils/cn'
import { forwardRef } from 'react'

const ComponentName = forwardRef(({ 
  className,
  variant = 'default',
  size = 'medium',
  disabled = false,
  children,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'base-styles',
        variants[variant],
        sizes[size],
        disabled && 'disabled-styles',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

ComponentName.displayName = 'ComponentName'

export default ComponentName
```

## 🎯 Implementation Checklist

### Phase 1: Foundation Setup
- [ ] Update Tailwind configuration with new color system
- [ ] Install additional dependencies (framer-motion, etc.)
- [ ] Create base component library
- [ ] Set up design token constants
- [ ] Implement utility functions

### Phase 2: Component Migration
- [ ] Update existing components to use new design system
- [ ] Create new advanced components (Bento Grid, Code Preview)
- [ ] Implement animation presets
- [ ] Add responsive design utilities
- [ ] Test component compatibility

### Phase 3: Integration & Testing
- [ ] Update all pages with new components
- [ ] Perform accessibility audit
- [ ] Test responsive behavior
- [ ] Optimize performance
- [ ] Document usage examples

---

**Next Document**: [`04-phase-implementation.md`](./04-phase-implementation.md) - Detailed implementation roadmap 