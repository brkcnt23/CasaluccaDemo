// Product Data
const products = [
    // Tableware
    {
        id: 1,
        name: "Elegant Dinner Plate Set",
        category: "tableware",
        price: 89.99,
        description: "Premium ceramic dinner plates, set of 6",
        icon: "🍽️"
    },
    {
        id: 2,
        name: "Fine China Collection",
        category: "tableware",
        price: 249.99,
        description: "Complete fine china set for 8",
        icon: "🍽️"
    },
    {
        id: 3,
        name: "Modern Bowl Set",
        category: "tableware",
        price: 59.99,
        description: "Contemporary ceramic bowls, set of 4",
        icon: "🥣"
    },
    
    // Kitchen Sets
    {
        id: 4,
        name: "Professional Chef's Knife Set",
        category: "kitchen",
        price: 199.99,
        description: "High-carbon stainless steel knives, set of 8",
        icon: "🔪"
    },
    {
        id: 5,
        name: "Complete Cookware Set",
        category: "kitchen",
        price: 349.99,
        description: "Non-stick cookware collection, 12 pieces",
        icon: "🍳"
    },
    {
        id: 6,
        name: "Wooden Utensil Set",
        category: "kitchen",
        price: 39.99,
        description: "Bamboo cooking utensils, set of 6",
        icon: "🥄"
    },
    
    // Coffee Mugs
    {
        id: 7,
        name: "Artisan Coffee Mugs",
        category: "mugs",
        price: 34.99,
        description: "Handcrafted ceramic mugs, set of 4",
        icon: "☕"
    },
    {
        id: 8,
        name: "Minimalist Mug Collection",
        category: "mugs",
        price: 29.99,
        description: "Modern design mugs, set of 4",
        icon: "☕"
    },
    {
        id: 9,
        name: "Large Capacity Mugs",
        category: "mugs",
        price: 44.99,
        description: "Extra large ceramic mugs, set of 2",
        icon: "☕"
    },
    
    // Bed Linens
    {
        id: 10,
        name: "Egyptian Cotton Sheet Set",
        category: "linens",
        price: 149.99,
        description: "1000 thread count, queen size",
        icon: "🛏️"
    },
    {
        id: 11,
        name: "Luxury Linen Sheet Set",
        category: "linens",
        price: 179.99,
        description: "Premium European linen, king size",
        icon: "🛏️"
    },
    {
        id: 12,
        name: "Organic Cotton Pillowcases",
        category: "linens",
        price: 39.99,
        description: "Soft organic cotton, set of 2",
        icon: "🛏️"
    },
    
    // Duvets
    {
        id: 13,
        name: "All-Season Duvet",
        category: "duvets",
        price: 129.99,
        description: "Hypoallergenic fill, queen size",
        icon: "🌙"
    },
    {
        id: 14,
        name: "Premium Down Duvet",
        category: "duvets",
        price: 299.99,
        description: "Hungarian goose down, king size",
        icon: "🌙"
    },
    {
        id: 15,
        name: "Lightweight Summer Duvet",
        category: "duvets",
        price: 89.99,
        description: "Breathable microfiber, full size",
        icon: "🌙"
    },
    
    // Towels
    {
        id: 16,
        name: "Spa Towel Collection",
        category: "towels",
        price: 79.99,
        description: "Ultra-soft Turkish cotton, set of 6",
        icon: "🧖"
    },
    {
        id: 17,
        name: "Quick-Dry Bath Towels",
        category: "towels",
        price: 54.99,
        description: "Microfiber bath towels, set of 4",
        icon: "🧖"
    },
    {
        id: 18,
        name: "Luxury Hand Towels",
        category: "towels",
        price: 44.99,
        description: "Egyptian cotton hand towels, set of 4",
        icon: "🧖"
    },
    
    // Candles
    {
        id: 19,
        name: "Lavender Dreams Candle",
        category: "candles",
        price: 24.99,
        description: "Soy wax candle with calming lavender",
        icon: "🕯️"
    },
    {
        id: 20,
        name: "Vanilla Bean Bliss",
        category: "candles",
        price: 24.99,
        description: "Natural vanilla scented candle",
        icon: "🕯️"
    },
    {
        id: 21,
        name: "Citrus Fresh Collection",
        category: "candles",
        price: 34.99,
        description: "Set of 3 citrus scented candles",
        icon: "🕯️"
    },
    {
        id: 22,
        name: "Sandalwood & Cedar",
        category: "candles",
        price: 29.99,
        description: "Warm woody scent candle",
        icon: "🕯️"
    },
    
    // Home Décor
    {
        id: 23,
        name: "Minimalist Vase Set",
        category: "decor",
        price: 64.99,
        description: "Ceramic vases in neutral tones, set of 3",
        icon: "🏺"
    },
    {
        id: 24,
        name: "Decorative Throw Pillows",
        category: "decor",
        price: 49.99,
        description: "Soft velvet pillows, set of 2",
        icon: "🛋️"
    },
    {
        id: 25,
        name: "Wall Art Print Set",
        category: "decor",
        price: 79.99,
        description: "Abstract botanical prints, set of 3",
        icon: "🖼️"
    },
    {
        id: 26,
        name: "Woven Storage Baskets",
        category: "decor",
        price: 54.99,
        description: "Natural fiber baskets, set of 3",
        icon: "🧺"
    },
    {
        id: 27,
        name: "Decorative Mirror",
        category: "decor",
        price: 119.99,
        description: "Round brass-framed mirror",
        icon: "🪞"
    },
    {
        id: 28,
        name: "Ceramic Plant Pots",
        category: "decor",
        price: 39.99,
        description: "Modern ceramic planters, set of 3",
        icon: "🪴"
    }
];

// Shopping Cart State
let cart = [];

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const cartBtn = document.querySelector('.cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCartBtn = document.querySelector('.close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCountElement = document.querySelector('.cart-count');
const filterButtons = document.querySelectorAll('.filter-btn');
const categoryCards = document.querySelectorAll('.category-card');
const contactForm = document.querySelector('.contact-form');

// Initialize App
function init() {
    renderProducts('all');
    setupEventListeners();
    updateCartUI();
}

// Render Products
function renderProducts(filter = 'all') {
    productsGrid.innerHTML = '';
    
    const filteredProducts = filter === 'all' 
        ? products 
        : products.filter(product => product.category === filter);
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">${product.icon}</div>
        <div class="product-info">
            <div class="product-category">${product.category}</div>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <span class="product-price">$${product.price.toFixed(2)}</span>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `;
    
    // Add to cart event
    const addToCartBtn = card.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(product.id);
    });
    
    return card;
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    showCartSidebar();
    
    // Add animation feedback
    const btn = document.querySelector(`[data-id="${productId}"]`);
    btn.textContent = 'Added!';
    btn.style.backgroundColor = '#27ae60';
    setTimeout(() => {
        btn.textContent = 'Add to Cart';
        btn.style.backgroundColor = '';
    }, 1000);
}

// Update Cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
    
    // Update cart items display
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => createCartItemHTML(item)).join('');
        
        // Add event listeners to cart item buttons
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', handleQuantityChange);
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', handleRemoveItem);
        });
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
}

// Create Cart Item HTML
function createCartItemHTML(item) {
    return `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-image">${item.icon}</div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" data-action="decrease" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" data-action="increase" data-id="${item.id}">+</button>
                </div>
            </div>
            <button class="remove-item" data-id="${item.id}">&times;</button>
        </div>
    `;
}

// Handle Quantity Change
function handleQuantityChange(e) {
    const id = parseInt(e.target.dataset.id);
    const action = e.target.dataset.action;
    const item = cart.find(item => item.id === id);
    
    if (!item) return;
    
    if (action === 'increase') {
        item.quantity += 1;
    } else if (action === 'decrease') {
        item.quantity -= 1;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.id !== id);
        }
    }
    
    updateCartUI();
}

// Handle Remove Item
function handleRemoveItem(e) {
    const id = parseInt(e.target.dataset.id);
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

// Show Cart Sidebar
function showCartSidebar() {
    cartSidebar.classList.add('active');
}

// Hide Cart Sidebar
function hideCartSidebar() {
    cartSidebar.classList.remove('active');
}

// Setup Event Listeners
function setupEventListeners() {
    // Cart toggle
    cartBtn.addEventListener('click', showCartSidebar);
    closeCartBtn.addEventListener('click', hideCartSidebar);
    
    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (cartSidebar.classList.contains('active') && 
            !cartSidebar.contains(e.target) && 
            !cartBtn.contains(e.target)) {
            hideCartSidebar();
        }
    });
    
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            renderProducts(filter);
        });
    });
    
    // Category cards
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            
            // Update filter buttons
            filterButtons.forEach(btn => {
                if (btn.dataset.filter === category) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            
            // Scroll to products section
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
            
            // Render filtered products
            setTimeout(() => {
                renderProducts(category);
            }, 500);
        });
    });
    
    // Contact form
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
