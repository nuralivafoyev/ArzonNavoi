# ARZONBOZORNAVOI E-commerce Website

## Overview

ARZONBOZORNAVOI is a static e-commerce website focused on affordable, quality products for daily use. The site showcases a product catalog with featured items, discount pricing, and responsive design. It's built as a single-page application using vanilla HTML, CSS, and JavaScript with a focus on user experience and mobile responsiveness.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Single-page application (SPA)** using vanilla HTML, CSS, and JavaScript
- **Responsive design** with mobile-first approach and CSS Grid/Flexbox layouts
- **Component-based structure** with modular CSS and JavaScript functions
- **Smooth scrolling navigation** between sections using anchor links
- **Interactive UI elements** including hamburger menu, product filters, and animated cards

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
- **Global state management** using JavaScript variables for products and filters
- **DOM manipulation** for dynamic content updates
- **Smooth scrolling utilities** for enhanced navigation experience

## External Dependencies

### Frontend Libraries
- **No external JavaScript frameworks** - pure vanilla JavaScript implementation
- **Web fonts** - Segoe UI font family with system fallbacks
- **CSS animations** - custom CSS keyframes and transitions

### Browser APIs
- **DOM API** for element manipulation and event handling
- **Intersection Observer API** (if implemented) for scroll animations
- **Local Storage API** (potential future use) for user preferences

### Development Tools
- **Standard web technologies** - HTML5, CSS3, ES6+ JavaScript
- **No build tools required** - direct browser execution
- **Cross-browser compatibility** targeting modern browsers

Note: The current implementation uses static product data. The architecture is designed to easily integrate with REST APIs or backend services for dynamic product management in future iterations.