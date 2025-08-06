# ARZONBOZORNAVOI E-commerce Website

## Overview

ARZONBOZORNAVOI is a modern, multilingual e-commerce website focused on affordable, quality products for daily use. The site features a comprehensive product catalog with featured items, discount pricing, and responsive design. Built as a single-page application using vanilla HTML, CSS, and JavaScript, it includes multi-language support (English, Uzbek, Russian) and dark/light theme modes for enhanced user experience and accessibility.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Single-page application (SPA)** using vanilla HTML, CSS, and JavaScript
- **Responsive design** with mobile-first approach and CSS Grid/Flexbox layouts
- **Component-based structure** with modular CSS and JavaScript functions
- **Smooth scrolling navigation** between sections using anchor links
- **Interactive UI elements** including hamburger menu, product filters, and animated cards
- **Multi-language support** with English, Uzbek, and Russian translations
- **Dark/light theme toggle** with user preference persistence via localStorage
- **Accessibility features** including theme switching and keyboard navigation support

### Design Patterns
- **Static product data** stored in JavaScript arrays (simulating API responses)
- **Event-driven interactions** using DOM manipulation and event listeners
- **CSS custom properties** for consistent theming and easy maintenance
- **Progressive enhancement** with graceful degradation for older browsers

### Styling Architecture
- **CSS Grid and Flexbox** for layout management
- **Custom CSS animations** and transitions for enhanced user experience
- **Mobile-responsive design** with breakpoints for different screen sizes
- **Color scheme** centered around crimson (#DC143C) primary color

### JavaScript Architecture
- **Modular functions** for product rendering, filtering, and navigation
- **Global state management** using JavaScript variables for products, filters, language, and theme
- **DOM manipulation** for dynamic content updates
- **Smooth scrolling utilities** for enhanced navigation experience
- **Translation system** with comprehensive language data objects (English, Uzbek, Russian)
- **Theme management** with localStorage persistence for user preferences
- **Event-driven architecture** for language switching and theme toggling

## External Dependencies

### Frontend Libraries
- **No external JavaScript frameworks** - pure vanilla JavaScript implementation
- **Web fonts** - Segoe UI font family with system fallbacks
- **CSS animations** - custom CSS keyframes and transitions

### Browser APIs
- **DOM API** for element manipulation and event handling
- **Intersection Observer API** for scroll animations and visibility detection
- **Local Storage API** for persisting user preferences (language and theme settings)
- **Event API** for handling user interactions and keyboard navigation

### Development Tools
- **Standard web technologies** - HTML5, CSS3, ES6+ JavaScript
- **No build tools required** - direct browser execution
- **Cross-browser compatibility** targeting modern browsers

Note: The current implementation uses static product data. The architecture is designed to easily integrate with REST APIs or backend services for dynamic product management in future iterations.