// Global variables
let allProducts = [];
let featuredProducts = [];
let currentFilter = 'all';
let currentLanguage = 'en';
let isDarkMode = false;
let cart = [];

// Cart functions
function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? 'flex' : 'none';
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartBadge();
    }
}

function showCart() {
    // Hide all other sections
    document.querySelectorAll('main > section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show cart section
    const cartSection = document.getElementById('cart-section');
    cartSection.style.display = 'block';
    cartSection.classList.remove('hidden');
    
    displayCartItems();
    scrollToSection('cart-section');
}

function hideCart() {
    // Hide cart section
    const cartSection = document.getElementById('cart-section');
    cartSection.style.display = 'none';
    cartSection.classList.add('hidden');
    
    // Show all other sections
    document.querySelectorAll('main > section:not(.cart-section)').forEach(section => {
        section.style.display = 'block';
    });
    
    scrollToSection('home');
}

function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    const cartContent = document.querySelector('.cart-content');
    
    if (cart.length === 0) {
        cartContent.style.display = 'none';
        emptyCart.classList.remove('hidden');
        return;
    }
    
    cartContent.style.display = 'grid';
    emptyCart.classList.add('hidden');
    
    cartItemsContainer.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = createCartItem(item);
        cartItemsContainer.appendChild(cartItem);
    });
    
    updateCartSummary();
}

function createCartItem(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    
    cartItem.innerHTML = `
        <div class="cart-item-image">
            <span>${item.icon}</span>
        </div>
        <div class="cart-item-details">
            <h4>${item.name}</h4>
            <p>${item.description}</p>
            <div class="cart-item-price">${formatPrice(item.currentPrice)} UZS</div>
        </div>
        <div class="cart-item-controls">
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})" data-translate="remove">Remove</button>
        </div>
    `;
    
    return cartItem;
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartBadge();
            saveCart();
            displayCartItems();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartBadge();
    saveCart();
    displayCartItems();
    
    const product = allProducts.find(p => p.id === productId);
    if (product) {
        showNotification(`${product.name} ${getTranslation('remove')}d from cart`, 'info');
    }
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.currentPrice * item.quantity), 0);
    const shipping = 0; // Free shipping
    const total = subtotal + shipping;
    
    document.getElementById('cart-subtotal').textContent = `${formatPrice(subtotal)} UZS`;
    document.getElementById('cart-shipping').textContent = shipping === 0 ? getTranslation('shipping') + ': Free' : `${formatPrice(shipping)} UZS`;
    document.getElementById('cart-total').textContent = `${formatPrice(total)} UZS`;
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
        showFieldError('name-error', getTranslation('name-required'));
        isValid = false;
    }
    
    if (!email) {
        showFieldError('email-error', getTranslation('email-required'));
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFieldError('email-error', getTranslation('email-invalid'));
        isValid = false;
    }
    
    if (!message) {
        showFieldError('message-error', getTranslation('message-required'));
        isValid = false;
    } else if (message.length < 10) {
        showFieldError('message-error', getTranslation('message-short'));
        isValid = false;
    }
    
    if (isValid) {
        // Simulate form submission
        const submitBtn = e.target.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = getTranslation('sending');
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification(getTranslation('message-success'), 'success');
            e.target.reset();
            submitBtn.textContent = getTranslation('send-message');
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
