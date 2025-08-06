// Global variables
let allProducts = [];
let featuredProducts = [];
let currentFilter = 'all';

// Sample product data - In a real application, this would come from an API
const sampleProducts = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        currentPrice: 45000,
        originalPrice: 75000,
        discount: 40,
        category: "electronics",
        featured: true,
        icon: "🎧"
    },
    {
        id: 2,
        name: "Smart Kitchen Scale",
        description: "Digital kitchen scale with app connectivity",
        currentPrice: 25000,
        originalPrice: 35000,
        discount: 29,
        category: "home",
        featured: true,
        icon: "⚖️"
    },
    {
        id: 3,
        name: "Premium Face Cream",
        description: "Anti-aging face cream with natural ingredients",
        currentPrice: 30000,
        originalPrice: 45000,
        discount: 33,
        category: "personal",
        featured: false,
        icon: "🧴"
    },
    {
        id: 4,
        name: "Cotton T-Shirt Set",
        description: "Pack of 3 comfortable cotton t-shirts",
        currentPrice: 35000,
        originalPrice: 50000,
        discount: 30,
        category: "clothing",
        featured: true,
        icon: "👕"
    },
    {
        id: 5,
        name: "LED Desk Lamp",
        description: "Adjustable LED desk lamp with USB charging",
        currentPrice: 40000,
        originalPrice: 60000,
        discount: 33,
        category: "electronics",
        featured: false,
        icon: "💡"
    },
    {
        id: 6,
        name: "Non-stick Cookware Set",
        description: "5-piece non-stick cookware set for modern kitchens",
        currentPrice: 85000,
        originalPrice: 120000,
        discount: 29,
        category: "home",
        featured: true,
        icon: "🍳"
    },
    {
        id: 7,
        name: "Hair Care Bundle",
        description: "Complete hair care set with shampoo and conditioner",
        currentPrice: 28000,
        originalPrice: 40000,
        discount: 30,
        category: "personal",
        featured: false,
        icon: "💇"
    },
    {
        id: 8,
        name: "Casual Jeans",
        description: "Comfortable slim-fit jeans for everyday wear",
        currentPrice: 55000,
        originalPrice: 80000,
        discount: 31,
        category: "clothing",
        featured: false,
        icon: "👖"
    },
    {
        id: 9,
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse with long battery life",
        currentPrice: 18000,
        originalPrice: 25000,
        discount: 28,
        category: "electronics",
        featured: false,
        icon: "🖱️"
    },
    {
        id: 10,
        name: "Glass Storage Containers",
        description: "Set of 6 glass food storage containers",
        currentPrice: 32000,
        originalPrice: 45000,
        discount: 29,
        category: "home",
        featured: false,
        icon: "🥡"
    },
    {
        id: 11,
        name: "Vitamin C Serum",
        description: "Brightening vitamin C serum for healthy skin",
        currentPrice: 22000,
        originalPrice: 35000,
        discount: 37,
        category: "personal",
        featured: true,
        icon: "✨"
    },
    {
        id: 12,
        name: "Running Shoes",
        description: "Lightweight running shoes with superior comfort",
        currentPrice: 75000,
        originalPrice: 100000,
        discount: 25,
        category: "clothing",
        featured: false,
        icon: "👟"
    }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadProducts();
    setupScrollAnimations();
});

// Initialize application
function initializeApp() {
    allProducts = sampleProducts;
    featuredProducts = sampleProducts.filter(product => product.featured);
    
    // Add smooth scrolling to navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterProducts(category);
            
            // Update active button
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', handleContactForm);

    // Header scroll effect
    window.addEventListener('scroll', handleScroll);

    // Back to top button
    window.addEventListener('scroll', toggleBackToTop);
}

// Load and display products
function loadProducts() {
    displayFeaturedProducts();
    displayAllProducts();
}

// Display featured products
function displayFeaturedProducts() {
    const container = document.getElementById('featured-products');
    container.innerHTML = '';
    
    if (featuredProducts.length === 0) {
        container.innerHTML = '<p class="text-center">No featured products available at the moment.</p>';
        return;
    }
    
    featuredProducts.forEach((product, index) => {
        const productCard = createProductCard(product);
        productCard.style.animationDelay = `${index * 0.1}s`;
        productCard.classList.add('animate-fade-up');
        container.appendChild(productCard);
    });
}

// Display all products
function displayAllProducts() {
    const container = document.getElementById('all-products');
    container.innerHTML = '';
    
    const filteredProducts = currentFilter === 'all' 
        ? allProducts 
        : allProducts.filter(product => product.category === currentFilter);
    
    if (filteredProducts.length === 0) {
        container.innerHTML = '<p class="text-center">No products found in this category.</p>';
        return;
    }
    
    filteredProducts.forEach((product, index) => {
        const productCard = createProductCard(product);
        productCard.style.animationDelay = `${index * 0.1}s`;
        productCard.classList.add('animate-fade-up');
        container.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <div class="product-image">
            <span style="font-size: 3rem;">${product.icon}</span>
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">
                <span class="current-price">${formatPrice(product.currentPrice)} UZS</span>
                <span class="original-price">${formatPrice(product.originalPrice)} UZS</span>
                <span class="discount">-${product.discount}%</span>
            </div>
            <div class="product-actions">
                <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                <button class="btn btn-secondary" onclick="viewProduct(${product.id})">View Details</button>
            </div>
        </div>
    `;
    
    return card;
}

// Format price with thousands separator
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Filter products by category
function filterProducts(category) {
    currentFilter = category;
    displayAllProducts();
}

// Add to cart functionality
function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
        // In a real application, this would add to a cart system
        showNotification(`${product.name} added to cart!`, 'success');
        
        // Animate the button
        const button = event.target;
        button.innerHTML = 'Added!';
        button.style.background = '#28a745';
        
        setTimeout(() => {
            button.innerHTML = 'Add to Cart';
            button.style.background = '#dc143c';
        }, 2000);
    }
}

// View product details
function viewProduct(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
        // In a real application, this would navigate to a product detail page
        showNotification(`Viewing details for ${product.name}`, 'info');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Handle contact form submission
function handleContactForm(e) {
    e.preventDefault();
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(error => error.textContent = '');
    
    // Get form data
    const formData = new FormData(e.target);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();
    
    // Validate form
    let isValid = true;
    
    if (!name) {
        showFieldError('name-error', 'Name is required');
        isValid = false;
    }
    
    if (!email) {
        showFieldError('email-error', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFieldError('email-error', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!message) {
        showFieldError('message-error', 'Message is required');
        isValid = false;
    } else if (message.length < 10) {
        showFieldError('message-error', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    if (isValid) {
        // Simulate form submission
        const submitBtn = e.target.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            e.target.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
}

// Show field error
function showFieldError(fieldId, message) {
    const errorElement = document.getElementById(fieldId);
    errorElement.textContent = message;
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Handle scroll effects
function handleScroll() {
    const header = document.getElementById('header');
    
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Toggle back to top button
function toggleBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.getElementById('header').offsetHeight;
        const sectionTop = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
}

// Setup scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    document.querySelectorAll('.featured, .products, .contact').forEach(section => {
        observer.observe(section);
    });
}

// Utility function to debounce events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add CSS animation styles dynamically
const animationStyles = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (window.innerWidth > 768) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
}, 250));

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
