# Synergy Development Client Portal — Design Specification Sheet
## Comprehensive Design System for Implementation

**Version:** 1.0  
**Created:** February 6, 2026  
**Purpose:** Complete design specifications for Haiku agent implementation  
**Target:** Modern, premium SaaS-quality client portal

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Color Palette](#2-color-palette)
3. [Typography System](#3-typography-system)
4. [Spacing & Layout System](#4-spacing--layout-system)
5. [Component Specifications](#5-component-specifications)
6. [Page Layouts](#6-page-layouts)
7. [Interactive Elements & Animations](#7-interactive-elements--animations)
8. [Brand Voice & Tone](#8-brand-voice--tone)
9. [Technical Implementation Notes](#9-technical-implementation-notes)
10. [Accessibility Requirements](#10-accessibility-requirements)

---

## 1. Design Philosophy

### Core Principles

**"Modern Trust + Technical Excellence"**

Synergy Development's portal should communicate:
- **Professionalism** — We are a serious, capable partner for business transformation
- **Modern Expertise** — We practice what we preach with cutting-edge design
- **Trustworthiness** — Clients are entrusting their business identity to us
- **Approachability** — Technology should feel accessible, not intimidating

### Design Inspirations (Primary)
- **Stripe** — Enterprise trust, layered depth, clean hierarchy
- **Linear** — Dark mode excellence, confident minimalism
- **Vercel** — Bold typography, modern tech aesthetic
- **Notion** — Breathing space, large typography, subtle animations

### Overall Aesthetic
- Clean, uncluttered layouts with generous white space
- Bold typography that commands attention
- Subtle animations that feel responsive without being distracting
- Strategic use of color to guide user attention
- Card-based components for information organization
- Mobile-first responsive design throughout

---

## 2. Color Palette

### Primary Colors

| Name | Hex Code | RGB | Usage |
|------|----------|-----|-------|
| **Synergy Blue** | `#0066FF` | rgb(0, 102, 255) | Primary CTAs, links, key highlights |
| **Deep Navy** | `#0A1628` | rgb(10, 22, 40) | Primary text, dark backgrounds, headers |
| **Pure White** | `#FFFFFF` | rgb(255, 255, 255) | Primary backgrounds, text on dark |

### Secondary Colors

| Name | Hex Code | RGB | Usage |
|------|----------|-----|-------|
| **Soft Blue** | `#E8F1FF` | rgb(232, 241, 255) | Light backgrounds, hover states, cards |
| **Medium Blue** | `#3385FF` | rgb(51, 133, 255) | Secondary buttons, accents |
| **Muted Navy** | `#1A2A42` | rgb(26, 42, 66) | Secondary text, borders |

### Accent Colors

| Name | Hex Code | RGB | Usage |
|------|----------|-----|-------|
| **Success Green** | `#00C851` | rgb(0, 200, 81) | Success states, positive indicators |
| **Warning Amber** | `#FFB400` | rgb(255, 180, 0) | Warning states, attention indicators |
| **Error Red** | `#FF3B30` | rgb(255, 59, 48) | Error states, destructive actions |
| **Accent Purple** | `#7C3AED` | rgb(124, 58, 237) | Premium features, special highlights |

### Neutral Colors

| Name | Hex Code | RGB | Usage |
|------|----------|-----|-------|
| **Gray 50** | `#F9FAFB` | rgb(249, 250, 251) | Subtle backgrounds, alternating rows |
| **Gray 100** | `#F3F4F6` | rgb(243, 244, 246) | Card backgrounds, dividers |
| **Gray 200** | `#E5E7EB` | rgb(229, 231, 235) | Borders, separators |
| **Gray 300** | `#D1D5DB` | rgb(209, 213, 219) | Disabled states, placeholders |
| **Gray 400** | `#9CA3AF` | rgb(156, 163, 175) | Placeholder text, muted text |
| **Gray 500** | `#6B7280` | rgb(107, 114, 128) | Secondary text, captions |
| **Gray 600** | `#4B5563` | rgb(75, 85, 99) | Body text alternative |
| **Gray 700** | `#374151` | rgb(55, 65, 81) | Strong text on light backgrounds |
| **Gray 800** | `#1F2937` | rgb(31, 41, 55) | Near-black text |
| **Gray 900** | `#111827` | rgb(17, 24, 39) | Darkest text, near black |

### Gradient Definitions

```css
/* Hero Gradient - Animated background */
--gradient-hero: linear-gradient(135deg, #0A1628 0%, #1A2A42 50%, #0A1628 100%);

/* Blue Accent Gradient - CTAs and highlights */
--gradient-blue: linear-gradient(135deg, #0066FF 0%, #3385FF 100%);

/* Subtle Card Gradient - Premium feel */
--gradient-card: linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%);

/* Mesh Gradient - Hero animated background */
--gradient-mesh: radial-gradient(ellipse at 20% 50%, rgba(0, 102, 255, 0.15) 0%, transparent 50%),
                 radial-gradient(ellipse at 80% 20%, rgba(124, 58, 237, 0.1) 0%, transparent 50%),
                 radial-gradient(ellipse at 60% 80%, rgba(0, 102, 255, 0.1) 0%, transparent 50%);
```

### Color Usage Guidelines

1. **Primary Blue (`#0066FF`)**: Use ONLY for primary CTAs, active navigation, links, and key interactive elements. Never use as a background color for large areas.

2. **Deep Navy (`#0A1628`)**: Primary choice for headings, important text, and dark-mode backgrounds. Creates sophistication and trust.

3. **Soft Blue (`#E8F1FF`)**: Use for card hover states, light backgrounds that need subtle color, and to create visual sections.

4. **Neutrals**: Gray 700 (`#374151`) is the default body text color. Gray 500 (`#6B7280`) for secondary/muted text. Gray 200 (`#E5E7EB`) for borders.

5. **Semantic Colors**: Always use Success Green for positive feedback, Warning Amber for cautions, Error Red for errors. Never use these for decorative purposes.

---

## 3. Typography System

### Font Stack

```css
/* Primary Font - Headings and Display */
--font-display: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* Body Font - Same family, different weights */
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* Monospace - Code and technical elements */
--font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace;
```

### Font Weights

| Weight Name | Value | Usage |
|-------------|-------|-------|
| Regular | 400 | Body text, paragraphs |
| Medium | 500 | Emphasized body text, labels |
| Semibold | 600 | Subheadings, card titles, buttons |
| Bold | 700 | Main headings, hero text |
| Extrabold | 800 | Display text, hero headlines |

### Type Scale

| Element | Size (Desktop) | Size (Mobile) | Weight | Line Height | Letter Spacing |
|---------|----------------|---------------|--------|-------------|----------------|
| **Display** | 72px | 48px | 800 | 1.1 | -0.02em |
| **H1** | 56px | 40px | 700 | 1.15 | -0.02em |
| **H2** | 40px | 32px | 700 | 1.2 | -0.01em |
| **H3** | 32px | 26px | 600 | 1.25 | -0.01em |
| **H4** | 24px | 20px | 600 | 1.3 | 0 |
| **H5** | 20px | 18px | 600 | 1.4 | 0 |
| **H6** | 18px | 16px | 600 | 1.4 | 0 |
| **Body Large** | 18px | 17px | 400 | 1.6 | 0 |
| **Body** | 16px | 16px | 400 | 1.6 | 0 |
| **Body Small** | 14px | 14px | 400 | 1.5 | 0 |
| **Caption** | 12px | 12px | 500 | 1.4 | 0.01em |
| **Overline** | 12px | 11px | 600 | 1.4 | 0.1em |

### Typography Classes (Tailwind)

```jsx
// Display - Hero headlines
className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]"

// H1 - Page titles
className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.15]"

// H2 - Section headers
className="text-3xl md:text-4xl font-bold tracking-tight leading-[1.2]"

// H3 - Subsection headers
className="text-2xl md:text-3xl font-semibold leading-[1.25]"

// H4 - Card titles, labels
className="text-xl md:text-2xl font-semibold leading-[1.3]"

// Body Large - Introductory paragraphs
className="text-lg font-normal leading-relaxed text-gray-600"

// Body - Standard text
className="text-base font-normal leading-relaxed text-gray-700"

// Body Small - Secondary text
className="text-sm font-normal leading-normal text-gray-500"

// Caption - Meta info, timestamps
className="text-xs font-medium text-gray-400"

// Overline - Section labels
className="text-xs font-semibold uppercase tracking-widest text-blue-600"
```

### Typography Rules

1. **Maximum Line Width**: Body text should never exceed 75 characters (approximately `max-w-prose` or `max-w-2xl`)

2. **Paragraph Spacing**: Use `space-y-4` between paragraphs (16px gap)

3. **Heading Margins**: 
   - H2: `mt-16 mb-6` (64px top, 24px bottom)
   - H3: `mt-12 mb-4` (48px top, 16px bottom)
   - H4: `mt-8 mb-3` (32px top, 12px bottom)

4. **Color Hierarchy**:
   - Primary headings: `text-gray-900` or `text-[#0A1628]`
   - Body text: `text-gray-700`
   - Secondary text: `text-gray-500`
   - Muted text: `text-gray-400`

5. **Links**: Use `text-blue-600 hover:text-blue-700 underline-offset-2 hover:underline`

---

## 4. Spacing & Layout System

### Spacing Scale (8px Base)

| Token | Value | Usage |
|-------|-------|-------|
| `space-0` | 0px | No spacing |
| `space-1` | 4px | Tight spacing, icon gaps |
| `space-2` | 8px | Component internal padding |
| `space-3` | 12px | Small gaps |
| `space-4` | 16px | Standard component gap |
| `space-5` | 20px | Slightly larger gaps |
| `space-6` | 24px | Card padding, section gaps |
| `space-8` | 32px | Larger component separation |
| `space-10` | 40px | Section padding |
| `space-12` | 48px | Major section gaps |
| `space-16` | 64px | Page section separation |
| `space-20` | 80px | Large section separation |
| `space-24` | 96px | Hero padding, major sections |
| `space-32` | 128px | Maximum section spacing |

### Container Widths

```css
/* Maximum content width */
--container-max: 1280px;

/* Reading width for text-heavy sections */
--container-prose: 768px;

/* Wide content (features, grids) */
--container-wide: 1440px;
```

### Container Classes (Tailwind)

```jsx
// Standard page container
className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"

// Narrow content container (text-focused)
className="mx-auto max-w-3xl px-4 sm:px-6"

// Wide container (hero sections)
className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8"

// Full-width with padding
className="w-full px-4 sm:px-6 lg:px-8"
```

### Grid System

```jsx
// 12-column grid (desktop)
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"

// Feature grid (3 columns)
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"

// Portfolio grid (responsive)
className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"

// Dashboard grid
className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"

// Two-column layout (content + sidebar)
className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8"
```

### Section Spacing

| Section Type | Top Padding | Bottom Padding |
|--------------|-------------|----------------|
| Hero | 96px (py-24) | 96px (py-24) |
| Standard Section | 80px (py-20) | 80px (py-20) |
| Compact Section | 64px (py-16) | 64px (py-16) |
| Card Content | 24px (p-6) | 24px (p-6) |
| Dashboard Content | 32px (p-8) | 32px (p-8) |

### Responsive Breakpoints

| Breakpoint | Min-Width | Target Devices |
|------------|-----------|----------------|
| `sm` | 640px | Large phones, small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops, small desktops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large desktops |

---

## 5. Component Specifications

### 5.1 Buttons

#### Primary Button
```jsx
<button className="
  inline-flex items-center justify-center
  px-6 py-3
  bg-blue-600 hover:bg-blue-700 active:bg-blue-800
  text-white font-semibold text-base
  rounded-lg
  transition-all duration-200 ease-out
  hover:shadow-lg hover:shadow-blue-600/25
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none
">
  Get Started
</button>
```

**States:**
- Default: `bg-blue-600`, white text
- Hover: `bg-blue-700`, subtle shadow (`shadow-lg shadow-blue-600/25`)
- Active: `bg-blue-800`
- Focus: Blue ring (`ring-2 ring-blue-500 ring-offset-2`)
- Disabled: 50% opacity, no shadow, no pointer cursor

**Sizes:**
| Size | Padding | Font Size | Class |
|------|---------|-----------|-------|
| Small | px-4 py-2 | 14px | `text-sm` |
| Medium | px-6 py-3 | 16px | `text-base` |
| Large | px-8 py-4 | 18px | `text-lg` |

#### Secondary Button
```jsx
<button className="
  inline-flex items-center justify-center
  px-6 py-3
  bg-white hover:bg-gray-50 active:bg-gray-100
  text-gray-700 font-semibold text-base
  border border-gray-300 hover:border-gray-400
  rounded-lg
  transition-all duration-200 ease-out
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Learn More
</button>
```

#### Ghost Button
```jsx
<button className="
  inline-flex items-center justify-center
  px-6 py-3
  bg-transparent hover:bg-blue-50
  text-blue-600 hover:text-blue-700 font-semibold text-base
  rounded-lg
  transition-all duration-200 ease-out
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
">
  View Details
</button>
```

#### Icon Button
```jsx
<button className="
  inline-flex items-center justify-center
  w-10 h-10
  bg-gray-100 hover:bg-gray-200 active:bg-gray-300
  text-gray-600 hover:text-gray-800
  rounded-lg
  transition-all duration-200 ease-out
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
">
  <IconComponent className="w-5 h-5" />
</button>
```

### 5.2 Cards

#### Feature Card
```jsx
<div className="
  group
  p-6 lg:p-8
  bg-white hover:bg-gray-50
  border border-gray-200 hover:border-gray-300
  rounded-2xl
  shadow-sm hover:shadow-md
  transition-all duration-300 ease-out
">
  {/* Icon Container */}
  <div className="
    w-12 h-12 mb-4
    flex items-center justify-center
    bg-blue-100 text-blue-600
    rounded-xl
    group-hover:bg-blue-600 group-hover:text-white
    transition-all duration-300
  ">
    <IconComponent className="w-6 h-6" />
  </div>
  
  {/* Title */}
  <h3 className="text-xl font-semibold text-gray-900 mb-2">
    Feature Title
  </h3>
  
  {/* Description */}
  <p className="text-gray-600 leading-relaxed">
    Brief description of the feature and its benefits for the client.
  </p>
</div>
```

#### Portfolio/Project Card
```jsx
<div className="
  group relative overflow-hidden
  bg-white
  border border-gray-200
  rounded-2xl
  shadow-sm hover:shadow-xl
  transition-all duration-500 ease-out
">
  {/* Image Container */}
  <div className="relative aspect-[16/10] overflow-hidden">
    <img 
      src="/project-image.jpg"
      alt="Project Name"
      className="
        w-full h-full object-cover
        group-hover:scale-105
        transition-transform duration-500 ease-out
      "
    />
    {/* Overlay on hover */}
    <div className="
      absolute inset-0
      bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent
      opacity-0 group-hover:opacity-100
      transition-opacity duration-300
      flex items-end p-6
    ">
      <span className="text-white font-semibold">View Case Study →</span>
    </div>
  </div>
  
  {/* Content */}
  <div className="p-6">
    {/* Industry Tag */}
    <span className="
      inline-block px-3 py-1 mb-3
      text-xs font-semibold uppercase tracking-wide
      text-blue-600 bg-blue-50
      rounded-full
    ">
      Industry
    </span>
    
    {/* Project Title */}
    <h3 className="text-xl font-semibold text-gray-900 mb-2">
      Project Name
    </h3>
    
    {/* Description */}
    <p className="text-gray-600 text-sm leading-relaxed">
      Brief description of the project outcome and client impact.
    </p>
  </div>
</div>
```

#### Testimonial Card
```jsx
<div className="
  p-6 lg:p-8
  bg-white
  border border-gray-200
  rounded-2xl
  shadow-sm
">
  {/* Quote Icon */}
  <svg className="w-10 h-10 text-blue-100 mb-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
  </svg>
  
  {/* Quote Text */}
  <p className="text-gray-700 text-lg leading-relaxed mb-6">
    "Testimonial quote text goes here. Should be impactful and specific about results."
  </p>
  
  {/* Attribution */}
  <div className="flex items-center gap-4">
    <img 
      src="/avatar.jpg"
      alt="Client Name"
      className="w-12 h-12 rounded-full object-cover"
    />
    <div>
      <p className="font-semibold text-gray-900">Client Name</p>
      <p className="text-sm text-gray-500">Title, Company Name</p>
    </div>
  </div>
</div>
```

#### Dashboard Stat Card
```jsx
<div className="
  p-6
  bg-white
  border border-gray-200
  rounded-xl
  shadow-sm
">
  <div className="flex items-center justify-between mb-4">
    <span className="text-sm font-medium text-gray-500">Stat Label</span>
    <div className="
      w-10 h-10
      flex items-center justify-center
      bg-blue-50 text-blue-600
      rounded-lg
    ">
      <IconComponent className="w-5 h-5" />
    </div>
  </div>
  
  <p className="text-3xl font-bold text-gray-900 mb-1">$12,450</p>
  <p className="text-sm text-green-600 flex items-center gap-1">
    <TrendUpIcon className="w-4 h-4" />
    <span>+12.5% from last month</span>
  </p>
</div>
```

### 5.3 Navigation

#### Header (Desktop)
```jsx
<header className="
  fixed top-0 left-0 right-0 z-50
  bg-white/80 backdrop-blur-lg
  border-b border-gray-200/50
  transition-all duration-300
">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16 lg:h-20">
      {/* Logo */}
      <a href="/" className="flex items-center gap-2">
        <img src="/logo.svg" alt="Synergy Development" className="h-8 w-auto" />
        <span className="text-xl font-bold text-gray-900">Synergy</span>
      </a>
      
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-8">
        <a href="/" className="
          text-gray-600 hover:text-gray-900
          font-medium text-sm
          transition-colors duration-200
        ">
          Home
        </a>
        <a href="/about" className="
          text-gray-600 hover:text-gray-900
          font-medium text-sm
          transition-colors duration-200
        ">
          About
        </a>
        <a href="/portfolio" className="
          text-gray-600 hover:text-gray-900
          font-medium text-sm
          transition-colors duration-200
        ">
          Portfolio
        </a>
      </nav>
      
      {/* CTA Buttons */}
      <div className="hidden lg:flex items-center gap-4">
        <a href="/login" className="
          text-gray-600 hover:text-gray-900
          font-medium text-sm
          transition-colors duration-200
        ">
          Sign In
        </a>
        <a href="/contact" className="
          px-5 py-2.5
          bg-blue-600 hover:bg-blue-700
          text-white font-semibold text-sm
          rounded-lg
          transition-all duration-200
          hover:shadow-lg hover:shadow-blue-600/25
        ">
          Get Started
        </a>
      </div>
      
      {/* Mobile Menu Button */}
      <button className="lg:hidden p-2 text-gray-600 hover:text-gray-900">
        <MenuIcon className="w-6 h-6" />
      </button>
    </div>
  </div>
</header>
```

**Header Behavior:**
- Starts transparent on hero sections with white text
- Becomes `bg-white/80 backdrop-blur-lg` on scroll (after 50px)
- Stays fixed to top
- Height: 64px mobile, 80px desktop

#### Mobile Navigation Menu
```jsx
<div className="
  fixed inset-0 z-50
  lg:hidden
">
  {/* Backdrop */}
  <div className="
    absolute inset-0 bg-gray-900/50 backdrop-blur-sm
    animate-fadeIn
  " />
  
  {/* Panel */}
  <div className="
    absolute right-0 top-0 bottom-0 w-full max-w-sm
    bg-white shadow-2xl
    animate-slideInRight
  ">
    <div className="p-6">
      {/* Close Button */}
      <button className="absolute top-4 right-4 p-2">
        <XIcon className="w-6 h-6 text-gray-600" />
      </button>
      
      {/* Navigation Links */}
      <nav className="mt-12 space-y-4">
        <a href="/" className="block text-xl font-semibold text-gray-900 py-2">
          Home
        </a>
        <a href="/about" className="block text-xl font-semibold text-gray-900 py-2">
          About
        </a>
        <a href="/portfolio" className="block text-xl font-semibold text-gray-900 py-2">
          Portfolio
        </a>
      </nav>
      
      {/* CTA */}
      <div className="mt-8 space-y-4">
        <a href="/login" className="
          block text-center py-3
          text-gray-600 font-semibold
          border border-gray-300 rounded-lg
        ">
          Sign In
        </a>
        <a href="/contact" className="
          block text-center py-3
          bg-blue-600 text-white font-semibold
          rounded-lg
        ">
          Get Started
        </a>
      </div>
    </div>
  </div>
</div>
```

#### Footer
```jsx
<footer className="bg-gray-900 text-white">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
      {/* Brand Column */}
      <div className="lg:col-span-1">
        <a href="/" className="flex items-center gap-2 mb-4">
          <img src="/logo-white.svg" alt="Synergy" className="h-8 w-auto" />
          <span className="text-xl font-bold">Synergy</span>
        </a>
        <p className="text-gray-400 text-sm leading-relaxed mb-6">
          Modern web development for Ohio businesses ready to grow.
        </p>
        <div className="flex gap-4">
          {/* Social Icons */}
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <LinkedInIcon className="w-5 h-5" />
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors">
            <TwitterIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
      
      {/* Link Columns */}
      <div>
        <h4 className="font-semibold text-white mb-4">Company</h4>
        <ul className="space-y-3">
          <li><a href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">About</a></li>
          <li><a href="/portfolio" className="text-gray-400 hover:text-white text-sm transition-colors">Portfolio</a></li>
          <li><a href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</a></li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-semibold text-white mb-4">Services</h4>
        <ul className="space-y-3">
          <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Website Design</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Development</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">SEO & Marketing</a></li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-semibold text-white mb-4">Contact</h4>
        <ul className="space-y-3 text-gray-400 text-sm">
          <li>Dublin, Ohio</li>
          <li><a href="mailto:hello@synergy.dev" className="hover:text-white transition-colors">hello@synergy.dev</a></li>
          <li><a href="tel:+16145551234" className="hover:text-white transition-colors">(614) 555-1234</a></li>
        </ul>
      </div>
    </div>
    
    {/* Bottom Bar */}
    <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-gray-500 text-sm">
        © 2026 Synergy Development LLC. All rights reserved.
      </p>
      <div className="flex gap-6">
        <a href="/privacy" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Privacy Policy</a>
        <a href="/terms" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Terms of Service</a>
      </div>
    </div>
  </div>
</footer>
```

### 5.4 Form Elements

#### Text Input
```jsx
<div className="space-y-2">
  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
    Email Address
  </label>
  <input
    type="email"
    id="email"
    name="email"
    placeholder="you@company.com"
    className="
      w-full px-4 py-3
      bg-white
      border border-gray-300
      rounded-lg
      text-gray-900 placeholder:text-gray-400
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
      transition-all duration-200
    "
  />
</div>
```

**Input States:**
- Default: `border-gray-300`
- Focus: `ring-2 ring-blue-500 border-transparent`
- Error: `border-red-500 ring-2 ring-red-500/20`
- Disabled: `bg-gray-100 text-gray-500 cursor-not-allowed`

#### Textarea
```jsx
<textarea
  rows={4}
  className="
    w-full px-4 py-3
    bg-white
    border border-gray-300
    rounded-lg
    text-gray-900 placeholder:text-gray-400
    resize-none
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
    transition-all duration-200
  "
/>
```

#### Select Dropdown
```jsx
<select className="
  w-full px-4 py-3
  bg-white
  border border-gray-300
  rounded-lg
  text-gray-900
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
  transition-all duration-200
  appearance-none
  bg-[url('data:image/svg+xml;...')] bg-no-repeat bg-[right_1rem_center]
">
  <option value="">Select an option</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</select>
```

#### Checkbox
```jsx
<label className="flex items-center gap-3 cursor-pointer group">
  <input
    type="checkbox"
    className="
      w-5 h-5
      rounded
      border-gray-300
      text-blue-600
      focus:ring-blue-500 focus:ring-offset-0
      transition-colors duration-200
    "
  />
  <span className="text-gray-700 text-sm group-hover:text-gray-900 transition-colors">
    Checkbox label
  </span>
</label>
```

### 5.5 Badges & Tags

#### Status Badge
```jsx
// Active/Success
<span className="
  inline-flex items-center gap-1.5 px-3 py-1
  text-xs font-semibold
  text-green-700 bg-green-100
  rounded-full
">
  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
  Active
</span>

// Pending/Warning
<span className="
  inline-flex items-center gap-1.5 px-3 py-1
  text-xs font-semibold
  text-amber-700 bg-amber-100
  rounded-full
">
  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
  Pending
</span>

// Inactive/Error
<span className="
  inline-flex items-center gap-1.5 px-3 py-1
  text-xs font-semibold
  text-red-700 bg-red-100
  rounded-full
">
  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
  Inactive
</span>
```

#### Industry Tag
```jsx
<span className="
  inline-block px-3 py-1
  text-xs font-semibold uppercase tracking-wide
  text-blue-600 bg-blue-50
  rounded-full
">
  Healthcare
</span>
```

---

## 6. Page Layouts

### 6.1 Landing Page (Home)

#### Hero Section
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                 HEADER (Fixed)                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│     ┌─────────────────────────────────────────────────────────────────┐     │
│     │                                                                 │     │
│     │     [OVERLINE: "Web Modernization Experts"]                    │     │
│     │                                                                 │     │
│     │     [H1: "Transform Your Business                              │     │
│     │           with a Modern Web Presence"]                         │     │
│     │                                                                 │     │
│     │     [Body: Subheadline text describing value                   │     │
│     │      proposition, 2-3 lines max]                               │     │
│     │                                                                 │     │
│     │     [PRIMARY BUTTON: "Get Started"]  [SECONDARY: "View Work"]  │     │
│     │                                                                 │     │
│     │     [Social proof: "Trusted by 50+ Ohio businesses"]           │     │
│     │     [Company logos row: 4-5 small grayscale logos]             │     │
│     │                                                                 │     │
│     └─────────────────────────────────────────────────────────────────┘     │
│                                                                             │
│     [ANIMATED BACKGROUND: Subtle gradient mesh with floating shapes]        │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
Height: 100vh (minimum), padding-top: 120px
```

**Hero Content:**
- Overline: 12px, uppercase, tracking-widest, blue color
- H1: 56px desktop / 40px mobile, font-bold
- Subheadline: 18px, text-gray-600, max-width 600px
- Button row: gap-4, centered on mobile
- Logo row: grayscale, opacity-60, gap-8

**Animated Elements:**
- Gradient mesh background with subtle movement (CSS animation, 20s duration)
- Text fade-in + slide-up on load (Framer Motion, staggered 0.1s)
- Floating geometric shapes (optional, low opacity)

#### Features Section
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│     [OVERLINE: "Why Choose Synergy"]                                        │
│     [H2: "Everything You Need to Succeed Online"]                           │
│     [Body: Brief intro paragraph]                                           │
│                                                                             │
│     ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐       │
│     │  [ICON]          │  │  [ICON]          │  │  [ICON]          │       │
│     │  Modern Design   │  │  Fast & Secure   │  │  SEO Optimized   │       │
│     │  Description...  │  │  Description...  │  │  Description...  │       │
│     └──────────────────┘  └──────────────────┘  └──────────────────┘       │
│                                                                             │
│     ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐       │
│     │  [ICON]          │  │  [ICON]          │  │  [ICON]          │       │
│     │  Mobile First    │  │  Easy to Manage  │  │  Ongoing Support │       │
│     │  Description...  │  │  Description...  │  │  Description...  │       │
│     └──────────────────┘  └──────────────────┘  └──────────────────┘       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
Padding: py-20 (80px vertical)
Grid: 3 columns desktop, 2 tablet, 1 mobile, gap-8
```

**Features Content (6 cards):**
1. Modern Design — Professional, contemporary aesthetics
2. Fast & Secure — Optimized performance and SSL
3. SEO Optimized — Built for search engine visibility
4. Mobile First — Responsive across all devices
5. Easy to Manage — Simple content management
6. Ongoing Support — Continuous partnership

#### Process Section
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [BACKGROUND: Gray-50]                                                       │
│                                                                             │
│     [OVERLINE: "Our Process"]                                               │
│     [H2: "From Concept to Launch in Weeks, Not Months"]                     │
│                                                                             │
│     ┌────────────────────────────────────────────────────────────────┐     │
│     │                                                                │     │
│     │   ①────────────②────────────③────────────④                    │     │
│     │                                                                │     │
│     │   Discovery      Design       Development   Launch             │     │
│     │   We learn       Crafting     Building      Deploy &           │     │
│     │   your goals     your look    your site     optimize           │     │
│     │                                                                │     │
│     └────────────────────────────────────────────────────────────────┘     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
Padding: py-20
Layout: Horizontal stepper (desktop), vertical (mobile)
```

#### Testimonials Section
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│     [OVERLINE: "Client Success Stories"]                                    │
│     [H2: "Trusted by Growing Businesses"]                                   │
│                                                                             │
│     ┌─────────────────────────┐  ┌─────────────────────────┐               │
│     │  "Quote from client..." │  │  "Quote from client..." │               │
│     │                         │  │                         │               │
│     │  [Avatar] Name          │  │  [Avatar] Name          │               │
│     │           Title, Co.    │  │           Title, Co.    │               │
│     └─────────────────────────┘  └─────────────────────────┘               │
│                                                                             │
│                   ┌─────────────────────────┐                               │
│                   │  "Quote from client..." │                               │
│                   │                         │                               │
│                   │  [Avatar] Name          │                               │
│                   │           Title, Co.    │                               │
│                   └─────────────────────────┘                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
Grid: Masonry-style or 2 columns, gap-8
Placeholder: 3 testimonial cards with example structure
```

#### CTA Section
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [BACKGROUND: Deep Navy gradient]                                           │
│                                                                             │
│     ┌─────────────────────────────────────────────────────────────────┐    │
│     │                                                                 │    │
│     │     [H2: "Ready to Modernize Your Web Presence?"]              │    │
│     │                                                                 │    │
│     │     [Body: Brief compelling text]                              │    │
│     │                                                                 │    │
│     │     [PRIMARY BUTTON: "Start Your Project"]                     │    │
│     │                                                                 │    │
│     └─────────────────────────────────────────────────────────────────┘    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
Padding: py-24
Text: White on dark background
```

### 6.2 About Page

```
HEADER (Fixed, transparent initially)
│
├── HERO SECTION
│   ├── Overline: "About Synergy Development"
│   ├── H1: "We Build Websites That Drive Business Growth"
│   └── Body: Mission statement paragraph
│
├── STORY SECTION (py-20)
│   ├── H2: "Our Story"
│   ├── Two-column layout:
│   │   ├── Left: Rich text narrative (2-3 paragraphs)
│   │   └── Right: Image or illustration
│   └── Background: White
│
├── VALUES SECTION (py-20, bg-gray-50)
│   ├── H2: "Our Core Values"
│   └── 3-column grid of value cards:
│       ├── Excellence: Quality-first approach
│       ├── Partnership: True collaboration
│       └── Innovation: Modern solutions
│
├── EXPERTISE SECTION (py-20)
│   ├── H2: "Our Expertise"
│   └── Icon grid showing technologies/capabilities:
│       ├── Next.js / React
│       ├── Tailwind CSS
│       ├── Vercel Deployment
│       ├── SEO Optimization
│       ├── Responsive Design
│       └── Performance Tuning
│
├── WHY CHOOSE US SECTION (py-20, bg-gray-50)
│   ├── H2: "Why Ohio Businesses Choose Synergy"
│   └── Alternating feature blocks:
│       ├── Local Understanding + Image
│       ├── Image + Results-Driven
│       └── Ongoing Partnership + Image
│
├── TRUST SIGNALS SECTION (py-16)
│   ├── Stats row: "50+ Projects | 5-Star Avg | 100% Satisfaction"
│   └── Certification badges (if any)
│
├── CTA SECTION (same as landing page)
│
└── FOOTER
```

### 6.3 Portfolio Page

```
HEADER (Fixed)
│
├── HERO SECTION (Shorter, py-16)
│   ├── Overline: "Our Work"
│   ├── H1: "Portfolio"
│   └── Body: "See how we've helped businesses transform their web presence"
│
├── FILTER BAR (Sticky below header, py-4)
│   └── Industry filter buttons:
│       ├── All
│       ├── Healthcare
│       ├── Professional Services
│       ├── Retail
│       ├── Hospitality
│       └── Home Services
│
├── PORTFOLIO GRID SECTION (py-12)
│   └── Responsive grid (2 columns desktop, 1 mobile):
│       ├── Project Card 1 (with image, industry tag, title, description)
│       ├── Project Card 2
│       ├── Project Card 3
│       ├── Project Card 4
│       ├── Project Card 5
│       └── Project Card 6
│
├── CASE STUDY HIGHLIGHT (py-20, bg-gray-50)
│   ├── H2: "Featured Case Study"
│   └── Large detailed card:
│       ├── Before/After screenshots (side-by-side or slider)
│       ├── Challenge description
│       ├── Solution description
│       ├── Results (metrics)
│       └── Client testimonial
│
├── INDUSTRIES SECTION (py-20)
│   ├── H2: "Industries We Serve"
│   └── 4-column grid of industry cards with icons:
│       ├── Healthcare
│       ├── Professional Services
│       ├── Retail & E-commerce
│       ├── Home Services
│       ├── Hospitality
│       └── Manufacturing
│
├── CTA SECTION
│
└── FOOTER
```

### 6.4 Dashboard (Authenticated)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  DASHBOARD HEADER (Fixed, white)                                            │
│  ├── Logo                                                                   │
│  ├── Navigation: Dashboard | Services | Billing | Support                   │
│  └── User menu (avatar + dropdown)                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  WELCOME SECTION                                                      │  │
│  │  "Welcome back, [Name]!"                                             │  │
│  │  [Subtext: Account status or message]                                │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│  │ STAT CARD    │ │ STAT CARD    │ │ STAT CARD    │ │ STAT CARD    │       │
│  │ Active       │ │ Next Bill    │ │ Support      │ │ Performance  │       │
│  │ Services: 2  │ │ Due: Mar 1   │ │ Tickets: 0   │ │ 99.9% Uptime │       │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘       │
│                                                                             │
│  ┌────────────────────────────────────────┐ ┌───────────────────────────┐  │
│  │  ACTIVE SERVICES                        │ │  QUICK ACTIONS            │  │
│  │                                         │ │                           │  │
│  │  ┌──────────────────────────────────┐  │ │  [Button] View Invoices   │  │
│  │  │ Website Hosting                  │  │ │  [Button] Request Update  │  │
│  │  │ Status: Active ●                 │  │ │  [Button] Contact Support │  │
│  │  │ Renews: Apr 15, 2026             │  │ │  [Button] Manage Domain   │  │
│  │  └──────────────────────────────────┘  │ │                           │  │
│  │                                         │ │                           │  │
│  │  ┌──────────────────────────────────┐  │ └───────────────────────────┘  │
│  │  │ SEO Package                       │  │                                │
│  │  │ Status: Active ●                  │  │                                │
│  │  │ Renews: May 1, 2026               │  │                                │
│  │  └──────────────────────────────────┘  │                                │
│  └────────────────────────────────────────┘                                │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │  RECENT ACTIVITY                                                      │  │
│  │                                                                        │  │
│  │  [Feb 5] Payment received - $149.00                                   │  │
│  │  [Feb 3] Website update deployed                                      │  │
│  │  [Jan 28] Support ticket resolved                                     │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘

Background: bg-gray-50
Content area: White cards
Grid: 4 stat cards top, 2-column main content below
```

**Dashboard Color Scheme:**
- Background: `#F9FAFB` (gray-50)
- Cards: `#FFFFFF` with `border-gray-200`
- Text: Standard gray hierarchy
- Accents: Synergy Blue for active states, status colors for badges

---

## 7. Interactive Elements & Animations

### 7.1 Animation Library

**Required:** Framer Motion for React

```bash
npm install framer-motion
```

### 7.2 Entrance Animations

#### Fade In + Slide Up (Default)
```jsx
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
};

<motion.div {...fadeInUp}>
  Content here
</motion.div>
```

#### Staggered Children
```jsx
const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

<motion.div variants={staggerContainer} initial="initial" animate="animate">
  <motion.div variants={staggerItem}>Item 1</motion.div>
  <motion.div variants={staggerItem}>Item 2</motion.div>
  <motion.div variants={staggerItem}>Item 3</motion.div>
</motion.div>
```

#### Viewport Trigger (Scroll Animation)
```jsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
>
  Animates when scrolled into view
</motion.div>
```

### 7.3 Hover Animations

#### Button Hover
```jsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2 }}
  className="..."
>
  Button Text
</motion.button>
```

#### Card Hover (CSS preferred for performance)
```css
.card {
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.15);
}
```

#### Link Hover (Underline Animation)
```jsx
<a className="
  relative
  after:absolute after:bottom-0 after:left-0
  after:h-[2px] after:w-0 after:bg-blue-600
  after:transition-all after:duration-300
  hover:after:w-full
">
  Link Text
</a>
```

### 7.4 Loading States

#### Skeleton Loader
```jsx
<div className="animate-pulse space-y-4">
  <div className="h-4 bg-gray-200 rounded w-3/4" />
  <div className="h-4 bg-gray-200 rounded w-1/2" />
  <div className="h-4 bg-gray-200 rounded w-5/6" />
</div>
```

#### Spinner
```jsx
<svg 
  className="animate-spin h-5 w-5 text-blue-600" 
  xmlns="http://www.w3.org/2000/svg" 
  fill="none" 
  viewBox="0 0 24 24"
>
  <circle 
    className="opacity-25" 
    cx="12" cy="12" r="10" 
    stroke="currentColor" 
    strokeWidth="4"
  />
  <path 
    className="opacity-75" 
    fill="currentColor" 
    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
  />
</svg>
```

### 7.5 Page Transitions

```jsx
// Layout wrapper for page transitions
import { AnimatePresence, motion } from 'framer-motion';

function PageTransition({ children }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

### 7.6 Scroll Behaviors

#### Smooth Scroll (Global CSS)
```css
html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

#### Scroll-Linked Header
```jsx
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 50);
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

<header className={`
  fixed top-0 w-full z-50 transition-all duration-300
  ${scrolled 
    ? 'bg-white/80 backdrop-blur-lg border-b border-gray-200/50' 
    : 'bg-transparent'
  }
`}>
```

### 7.7 Animation Timing Reference

| Animation Type | Duration | Easing |
|----------------|----------|--------|
| Micro-interactions (hover, focus) | 150-200ms | `ease-out` |
| Small transitions (buttons, toggles) | 200-300ms | `ease-out` |
| Content reveals (fade in) | 400-500ms | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| Page transitions | 300-400ms | `ease-in-out` |
| Complex animations (hero) | 600-800ms | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| Stagger delay between items | 80-120ms | — |

### 7.8 Hero Background Animation (CSS)

```css
.hero-background {
  background: linear-gradient(135deg, #0A1628 0%, #1A2A42 50%, #0A1628 100%);
  position: relative;
  overflow: hidden;
}

.hero-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(ellipse at 20% 50%, rgba(0, 102, 255, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, rgba(124, 58, 237, 0.1) 0%, transparent 50%),
    radial-gradient(ellipse at 60% 80%, rgba(0, 102, 255, 0.1) 0%, transparent 50%);
  animation: meshMove 20s ease-in-out infinite;
}

@keyframes meshMove {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(2%, -2%) scale(1.02);
  }
  50% {
    transform: translate(-1%, 1%) scale(0.98);
  }
  75% {
    transform: translate(1%, 2%) scale(1.01);
  }
}
```

---

## 8. Brand Voice & Tone

### 8.1 Overall Voice

**Professional but Approachable**
- Confident without arrogance
- Technical knowledge expressed simply
- Warm and human, not corporate-speak
- Results-focused, not feature-focused

### 8.2 Messaging by Section

#### Hero Headlines
- **Tone:** Bold, confident, benefit-driven
- **Examples:**
  - "Transform Your Business with a Modern Web Presence"
  - "Your Website Should Work as Hard as You Do"
  - "Modern Websites for Growing Ohio Businesses"

#### Feature Descriptions
- **Tone:** Clear, benefit-focused, scannable
- **Format:** Start with the benefit, then briefly explain how
- **Example:** "Load in under 2 seconds. Because your customers won't wait."

#### Process Steps
- **Tone:** Simple, reassuring, collaborative
- **Example:** "We start by listening. Tell us about your business, your goals, and your customers."

#### Testimonials (Placeholder Structure)
- **Format:** "Specific result achieved. What it meant for their business."
- **Example:** "Our new website generates 3x more leads than our old one. Synergy understood exactly what we needed."

#### CTAs
- **Primary CTAs:** Action-oriented, clear outcome
  - "Get Started" (primary)
  - "Start Your Project"
  - "Request a Demo"
  - "View Our Work"

- **Secondary CTAs:** Lower commitment
  - "Learn More"
  - "See How It Works"
  - "Explore Portfolio"

### 8.3 Writing Guidelines

1. **Use active voice:** "We build" not "Websites are built by us"
2. **Be specific:** "50+ Ohio businesses" not "many businesses"
3. **Focus on outcomes:** "Increase conversions" not "Implement best practices"
4. **Avoid jargon:** "Fast-loading pages" not "Optimized Core Web Vitals"
5. **Keep it scannable:** Short paragraphs, bullet points, clear headers

### 8.4 Keywords to Use
- Modern, Professional, Growth, Transform
- Ohio, Local, Partnership, Trust
- Fast, Secure, Optimized, Responsive
- Results, Conversions, Leads, Success

### 8.5 Keywords to Avoid
- Synergy (ironic, overused in business)
- Revolutionary, Game-changing (hyperbolic)
- Utilize (just say "use")
- Leverage (unless discussing actual leverage)

---

## 9. Technical Implementation Notes

### 9.1 Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Next.js (App Router) | 14.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.4.x |
| Animations | Framer Motion | 11.x |
| Icons | Lucide React | Latest |
| Forms | React Hook Form + Zod | Latest |
| Deployment | Vercel | — |

### 9.2 Project Structure

```
synergy-portal/
├── app/
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Landing page (/)
│   ├── about/
│   │   └── page.tsx         # About page
│   ├── portfolio/
│   │   └── page.tsx         # Portfolio page
│   ├── dashboard/
│   │   ├── layout.tsx       # Dashboard layout (auth check)
│   │   └── page.tsx         # Dashboard home
│   └── globals.css          # Global styles & Tailwind
├── components/
│   ├── ui/                  # Base UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   └── index.ts
│   ├── layout/              # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileMenu.tsx
│   │   └── index.ts
│   ├── sections/            # Page sections
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Process.tsx
│   │   ├── Testimonials.tsx
│   │   ├── CTA.tsx
│   │   └── index.ts
│   └── dashboard/           # Dashboard components
│       ├── StatCard.tsx
│       ├── ServiceCard.tsx
│       ├── ActivityFeed.tsx
│       └── index.ts
├── lib/
│   ├── utils.ts             # Utility functions (cn, etc.)
│   ├── constants.ts         # Site constants, navigation
│   └── animations.ts        # Framer Motion variants
├── public/
│   ├── images/              # Static images
│   ├── icons/               # Favicon, app icons
│   └── fonts/               # Self-hosted fonts (if any)
├── styles/
│   └── globals.css          # Additional global styles
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json
├── next.config.js
└── package.json
```

### 9.3 Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary
        'synergy-blue': '#0066FF',
        'deep-navy': '#0A1628',
        // Secondary
        'soft-blue': '#E8F1FF',
        'medium-blue': '#3385FF',
        'muted-navy': '#1A2A42',
        // Accents
        'success': '#00C851',
        'warning': '#FFB400',
        'error': '#FF3B30',
        'accent-purple': '#7C3AED',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'display': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'mesh-move': 'meshMove 20s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        meshMove: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(2%, -2%) scale(1.02)' },
          '50%': { transform: 'translate(-1%, 1%) scale(0.98)' },
          '75%': { transform: 'translate(1%, 2%) scale(1.01)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

### 9.4 Utility Function (cn)

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Install dependencies:
```bash
npm install clsx tailwind-merge
```

### 9.5 Animation Variants File

```typescript
// lib/animations.ts
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
  }
};

export const viewportFadeIn = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
};
```

### 9.6 Required Packages

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.300.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/react": "^18.2.0",
    "@types/node": "^20.0.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

---

## 10. Accessibility Requirements

### 10.1 Color Contrast

All text must meet **WCAG 2.1 AA** standards:

| Element | Foreground | Background | Ratio Required |
|---------|------------|------------|----------------|
| Body text | #374151 | #FFFFFF | 4.5:1 ✓ (7.51:1 actual) |
| Large text (18px+ bold) | #6B7280 | #FFFFFF | 3:1 ✓ (4.48:1 actual) |
| Primary button text | #FFFFFF | #0066FF | 4.5:1 ✓ (4.72:1 actual) |
| Links | #0066FF | #FFFFFF | 4.5:1 ✓ (4.72:1 actual) |
| Hero text | #FFFFFF | #0A1628 | 4.5:1 ✓ (15.8:1 actual) |

### 10.2 Focus States

All interactive elements MUST have visible focus states:

```jsx
// Standard focus ring
className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"

// For dark backgrounds
className="focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
```

### 10.3 Required ARIA Labels

| Component | ARIA Requirement |
|-----------|------------------|
| Navigation | `<nav aria-label="Main navigation">` |
| Mobile menu button | `aria-label="Open menu"` / `aria-expanded="true/false"` |
| Logo link | `aria-label="Synergy Development - Home"` |
| Social links | `aria-label="Follow us on LinkedIn"` |
| Form inputs | Associated `<label>` or `aria-label` |
| Status badges | `aria-label="Status: Active"` |
| Loading spinners | `aria-label="Loading..."` / `role="status"` |
| Icons (decorative) | `aria-hidden="true"` |
| Skip link | `<a href="#main-content" className="sr-only focus:not-sr-only">Skip to main content</a>` |

### 10.4 Keyboard Navigation

1. **Tab Order:** All interactive elements must be reachable via Tab key in logical order
2. **Focus Trapping:** Modal dialogs and mobile menus must trap focus
3. **Escape Key:** Modals/menus close on Escape
4. **Enter/Space:** Buttons activate on Enter or Space
5. **Arrow Keys:** Menu items navigable with arrow keys

### 10.5 Screen Reader Considerations

```jsx
// Skip link (first focusable element)
<a 
  href="#main-content" 
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-white focus:text-blue-600"
>
  Skip to main content
</a>

// Main content landmark
<main id="main-content" role="main">

// Announce loading states
<div role="status" aria-live="polite">
  {isLoading && <span>Loading...</span>}
</div>

// Announce form errors
<div role="alert" aria-live="assertive">
  {error && <span>{error}</span>}
</div>
```

### 10.6 Reduced Motion

Respect user preference for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

```jsx
// Framer Motion hook
import { useReducedMotion } from 'framer-motion';

function AnimatedComponent() {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      Content
    </motion.div>
  );
}
```

### 10.7 Image Accessibility

```jsx
// Meaningful images
<img 
  src="/project.jpg" 
  alt="Screenshot of Smith Plumbing's new website showing their services page"
/>

// Decorative images
<img src="/pattern.svg" alt="" aria-hidden="true" />

// Avatar images
<img 
  src="/avatar.jpg" 
  alt="John Smith, CEO of Smith Plumbing"
/>
```

---

## Implementation Checklist

### Setup
- [ ] Initialize Next.js 14 project with TypeScript
- [ ] Install and configure Tailwind CSS
- [ ] Install Framer Motion and Lucide icons
- [ ] Set up project structure per Section 9.2
- [ ] Configure custom colors and fonts in tailwind.config.ts
- [ ] Create utility functions (cn helper)
- [ ] Create animation variants file

### Components
- [ ] Create Button component (all variants)
- [ ] Create Card components (Feature, Portfolio, Testimonial, Stat)
- [ ] Create Header with scroll behavior
- [ ] Create Footer
- [ ] Create Mobile Menu
- [ ] Create Form components (Input, Textarea, Select)
- [ ] Create Badge/Tag components

### Pages
- [ ] Landing Page with all sections
- [ ] About Page with all sections
- [ ] Portfolio Page with filter functionality
- [ ] Dashboard layout and main page

### Animations
- [ ] Hero entrance animations
- [ ] Scroll-triggered section reveals
- [ ] Hover states on all interactive elements
- [ ] Page transitions
- [ ] Loading states

### Accessibility
- [ ] Add skip link
- [ ] Verify color contrast ratios
- [ ] Add all required ARIA labels
- [ ] Test keyboard navigation
- [ ] Add reduced motion support
- [ ] Test with screen reader

### Performance
- [ ] Optimize images (next/image)
- [ ] Verify Lighthouse scores (90+ performance, 95+ accessibility)
- [ ] Test on mobile devices

---

**Document Version:** 1.0  
**Last Updated:** February 6, 2026  
**Ready for Implementation:** Yes

This design sheet provides complete specifications for implementing the Synergy Development client portal without ambiguity. All colors, sizes, spacings, and behaviors are explicitly defined.
