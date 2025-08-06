// Global variables
let allProducts = [];
let featuredProducts = [];
let currentFilter = 'all';
let currentLanguage = 'en';
let isDarkMode = false;
let cart = [];

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

// Translations object
const translations = {
    en: {
        'tagline': 'Affordable Quality',
        'nav-home': 'Home',
        'nav-products': 'Products',
        'nav-featured': 'Featured',
        'nav-contact': 'Contact',
        'hero-title': 'Quality Products at Unbeatable Prices',
        'hero-description': 'Discover our extensive collection of affordable daily essentials designed to make your life easier without breaking the bank.',
        'shop-now': 'Shop Now',
        'best-deals': 'Best Deals',
        'up-to-off': 'Up to 70% Off',
        'fast-delivery': 'Fast Delivery',
        'same-day': 'Same Day',
        'quality': 'Quality',
        'guaranteed': 'Guaranteed',
        'featured-products': 'Featured Products',
        'featured-subtitle': 'Hand-picked deals you can\'t miss',
        'all-products': 'All Products',
        'filter-all': 'All',
        'filter-electronics': 'Electronics',
        'filter-home': 'Home & Kitchen',
        'filter-personal': 'Personal Care',
        'filter-clothing': 'Clothing',
        'contact-us': 'Contact Us',
        'contact-subtitle': 'We\'re here to help with any questions',
        'email': 'Email',
        'phone': 'Phone',
        'address': 'Address',
        'your-name': 'Your Name',
        'your-email': 'Your Email',
        'your-message': 'Your Message',
        'send-message': 'Send Message',
        'add-to-cart': 'Add to Cart',
        'view-details': 'View Details',
        'added': 'Added!',
        'cart-success': 'added to cart!',
        'viewing': 'Viewing details for',
        'message-success': 'Thank you! Your message has been sent successfully.',
        'sending': 'Sending...',
        'name-required': 'Name is required',
        'email-required': 'Email is required',
        'email-invalid': 'Please enter a valid email address',
        'message-required': 'Message is required',
        'message-short': 'Message must be at least 10 characters long',
        'nav-cart': 'Cart',
        'shopping-cart': 'Shopping Cart',
        'order-summary': 'Order Summary',
        'subtotal': 'Subtotal',
        'shipping': 'Shipping',
        'total': 'Total',
        'checkout': 'Checkout',
        'continue-shopping': 'Continue Shopping',
        'cart-empty': 'Your cart is empty',
        'cart-empty-subtitle': 'Add some amazing products to get started!',
        'start-shopping': 'Start Shopping',
        'remove': 'Remove',
        'quantity': 'Qty',
        'checkout-success': 'Thank you for your purchase! Order confirmation sent to your email.'
    },
    uz: {
        'tagline': 'Arzon Sifat',
        'nav-home': 'Bosh sahifa',
        'nav-products': 'Mahsulotlar',
        'nav-featured': 'Tavsiya',
        'nav-contact': 'Aloqa',
        'hero-title': 'Ajoyib narxlarda sifatli mahsulotlar',
        'hero-description': 'Hayotingizni osonlashtiradigan va byudjetingizni buzmaydighan arzon kundalik zarur narsalarning keng assortimentini kashf eting.',
        'shop-now': 'Xarid qiling',
        'best-deals': 'Eng yaxshi takliflar',
        'up-to-off': '70% gacha chegirma',
        'fast-delivery': 'Tez yetkazib berish',
        'same-day': 'Bir kunda',
        'quality': 'Sifat',
        'guaranteed': 'Kafolatlangan',
        'featured-products': 'Tavsiya qilinadigan mahsulotlar',
        'featured-subtitle': 'O\'tkazib yubormaslik kerak bo\'lgan takliflar',
        'all-products': 'Barcha mahsulotlar',
        'filter-all': 'Hammasi',
        'filter-electronics': 'Elektronika',
        'filter-home': 'Uy va oshxona',
        'filter-personal': 'Shaxsiy parvarish',
        'filter-clothing': 'Kiyim',
        'contact-us': 'Biz bilan bog\'laning',
        'contact-subtitle': 'Har qanday savol bo\'yicha yordam berishga tayyormiz',
        'email': 'Elektron pochta',
        'phone': 'Telefon',
        'address': 'Manzil',
        'your-name': 'Ismingiz',
        'your-email': 'Elektron pochtangiz',
        'your-message': 'Xabaringiz',
        'send-message': 'Xabar yuborish',
        'add-to-cart': 'Savatga qo\'shish',
        'view-details': 'Batafsil',
        'added': 'Qo\'shildi!',
        'cart-success': 'savatga qo\'shildi!',
        'viewing': 'Batafsil ko\'rish',
        'message-success': 'Rahmat! Xabaringiz muvaffaqiyatli yuborildi.',
        'sending': 'Yuborilmoqda...',
        'name-required': 'Ism talab qilinadi',
        'email-required': 'Elektron pochta talab qilinadi',
        'email-invalid': 'To\'g\'ri elektron pochta manzilini kiriting',
        'message-required': 'Xabar talab qilinadi',
        'message-short': 'Xabar kamida 10 ta belgidan iborat bo\'lishi kerak',
        'nav-cart': 'Savat',
        'shopping-cart': 'Xaridlar savati',
        'order-summary': 'Buyurtma xulosasi',
        'subtotal': 'Jami:',
        'shipping': 'Yetkazib berish:',
        'total': 'Umumiy:',
        'checkout': 'To\'lov',
        'continue-shopping': 'Xaridni davom ettirish',
        'cart-empty': 'Savatingiz bo\'sh',
        'cart-empty-subtitle': 'Boshlash uchun ajoyib mahsulotlar qo\'shing!',
        'start-shopping': 'Xaridni boshlash',
        'remove': 'O\'chirish',
        'quantity': 'Soni',
        'checkout-success': 'Xaridingiz uchun rahmat! Buyurtma tasdigi elektron pochtangizga yuborildi.'
    },
    ru: {
        'tagline': 'Доступное качество',
        'nav-home': 'Главная',
        'nav-products': 'Товары',
        'nav-featured': 'Рекомендуемые',
        'nav-contact': 'Контакты',
        'hero-title': 'Качественные товары по непревзойденным ценам',
        'hero-description': 'Откройте для себя наш обширный ассортимент доступных предметов первой необходимости, которые сделают вашу жизнь проще, не нарушая бюджет.',
        'shop-now': 'Купить сейчас',
        'best-deals': 'Лучшие предложения',
        'up-to-off': 'Скидки до 70%',
        'fast-delivery': 'Быстрая доставка',
        'same-day': 'В тот же день',
        'quality': 'Качество',
        'guaranteed': 'Гарантировано',
        'featured-products': 'Рекомендуемые товары',
        'featured-subtitle': 'Отобранные предложения, которые нельзя пропустить',
        'all-products': 'Все товары',
        'filter-all': 'Все',
        'filter-electronics': 'Электроника',
        'filter-home': 'Дом и кухня',
        'filter-personal': 'Личная гигиена',
        'filter-clothing': 'Одежда',
        'contact-us': 'Свяжитесь с нами',
        'contact-subtitle': 'Мы готовы помочь с любыми вопросами',
        'email': 'Электронная почта',
        'phone': 'Телефон',
        'address': 'Адрес',
        'your-name': 'Ваше имя',
        'your-email': 'Ваша электронная почта',
        'your-message': 'Ваше сообщение',
        'send-message': 'Отправить сообщение',
        'add-to-cart': 'В корзину',
        'view-details': 'Подробнее',
        'added': 'Добавлено!',
        'cart-success': 'добавлен в корзину!',
        'viewing': 'Просмотр деталей для',
        'message-success': 'Спасибо! Ваше сообщение успешно отправлено.',
        'sending': 'Отправка...',
        'name-required': 'Требуется имя',
        'email-required': 'Требуется электронная почта',
        'email-invalid': 'Введите корректный адрес электронной почты',
        'message-required': 'Требуется сообщение',
        'message-short': 'Сообщение должно содержать не менее 10 символов',
        'nav-cart': 'Корзина',
        'shopping-cart': 'Корзина покупок',
        'order-summary': 'Итог заказа',
        'subtotal': 'Промежуточный итог:',
        'shipping': 'Доставка:',
        'total': 'Итого:',
        'checkout': 'Оформить заказ',
        'continue-shopping': 'Продолжить покупки',
        'cart-empty': 'Ваша корзина пуста',
        'cart-empty-subtitle': 'Добавьте потрясающие товары, чтобы начать!',
        'start-shopping': 'Начать покупки',
        'remove': 'Удалить',
        'quantity': 'Кол-во',
        'checkout-success': 'Спасибо за покупку! Подтверждение заказа отправлено на вашу электронную почту.'
    }
};

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
                <button class="btn btn-primary" onclick="addToCart(${product.id})" data-translate="add-to-cart">Add to Cart</button>
                <button class="btn btn-secondary" onclick="viewProduct(${product.id})" data-translate="view-details">View Details</button>
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

function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    // Simulate checkout process
    showNotification(getTranslation('checkout-success'), 'success');
    
    // Clear cart
    cart = [];
    updateCartBadge();
    saveCart();
    displayCartItems();
    
    // Redirect to home after checkout
    setTimeout(() => {
        hideCart();
    }, 2000);
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
