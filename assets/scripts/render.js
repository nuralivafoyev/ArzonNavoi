// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadProducts();
    setupScrollAnimations();
    loadUserPreferences();
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

    // Language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
            
            // Update active button
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);

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
            <h3 class="product-name" data-translate="product-name">${product.name}</h3>
            <p class="product-description" data-translate="product-description">${product.description}</p>
            <div class="product-price">
                <span class="current-price">${formatPrice(product.currentPrice)} UZS</span>
                <span class="original-price">${formatPrice(product.originalPrice)} UZS</span>
                <span class="discount">-${product.discount}%</span>
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
        // Check if product already in cart
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCartBadge();
        saveCart();
        showNotification(`${product.name} ${getTranslation('cart-success')}`, 'success');
        
        // Animate the button
        const button = event.target;
        button.innerHTML = getTranslation('added');
        button.style.background = '#28a745';
        
        setTimeout(() => {
            button.innerHTML = getTranslation('add-to-cart');
            button.style.background = '#dc143c';
        }, 2000);
    }
}

// View product details
function viewProduct(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (product) {
        // In a real application, this would navigate to a product detail page
        showNotification(`${getTranslation('viewing')} ${product.name}`, 'info');
    }
}

// Language functions
function getTranslation(key) {
    return translations[currentLanguage][key] || translations['en'][key] || key;
}

function changeLanguage(lang) {
    currentLanguage = lang;
    updateLanguage();
    saveUserPreferences();
}

function updateLanguage() {
    // Update all elements with data-translate attribute
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        const translation = getTranslation(key);
        element.textContent = translation;
    });

    // Update placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        const translation = getTranslation(key);
        element.placeholder = translation;
    });

    // Update dynamically created product cards
    displayFeaturedProducts();
    displayAllProducts();
}

// Theme functions
function toggleTheme() {
    isDarkMode = !isDarkMode;
    updateTheme();
    saveUserPreferences();
}

function updateTheme() {
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    
    if (isDarkMode) {
        body.classList.add('dark-mode');
        themeIcon.textContent = '☀️';
    } else {
        body.classList.remove('dark-mode');
        themeIcon.textContent = '🌙';
    }
}

// Save user preferences to localStorage
function saveUserPreferences() {
    const preferences = {
        language: currentLanguage,
        darkMode: isDarkMode
    };
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
}

// Load user preferences from localStorage
function loadUserPreferences() {
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
        const preferences = JSON.parse(saved);
        
        // Set language
        if (preferences.language) {
            currentLanguage = preferences.language;
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-lang') === currentLanguage) {
                    btn.classList.add('active');
                }
            });
            updateLanguage();
        }
        
        // Set theme
        if (preferences.darkMode !== undefined) {
            isDarkMode = preferences.darkMode;
            updateTheme();
        }
    }
    
    // Load cart
    loadCart();
}