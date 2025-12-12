// Main Application State
const AppState = {
    storeName: '',
    primaryColor: '#2563eb',
    accentColor: '#7c3aed',
    backgroundColor: '#f8fafc',
    currentCategory: null,
    currentSubcategory: null,
    navigationHistory: []
};

// Utility Functions
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function lighten(hex, percent) {
    const rgb = hexToRgb(hex);
    const factor = percent / 100;
    return `#${[rgb.r, rgb.g, rgb.b].map(c => {
        const lightened = Math.round(c + (255 - c) * factor);
        return lightened.toString(16).padStart(2, '0');
    }).join('')}`;
}

function darken(hex, percent) {
    const rgb = hexToRgb(hex);
    const factor = percent / 100;
    return `#${[rgb.r, rgb.g, rgb.b].map(c => {
        const darkened = Math.round(c * (1 - factor));
        return darkened.toString(16).padStart(2, '0');
    }).join('')}`;
}

function applyColorTheme() {
    const root = document.documentElement;

    root.style.setProperty('--primary-color', AppState.primaryColor);
    root.style.setProperty('--primary-light', lighten(AppState.primaryColor, 10));
    root.style.setProperty('--primary-dark', darken(AppState.primaryColor, 15));

    root.style.setProperty('--accent-color', AppState.accentColor);
    root.style.setProperty('--accent-light', lighten(AppState.accentColor, 10));
    root.style.setProperty('--accent-dark', darken(AppState.accentColor, 15));

    root.style.setProperty('--background-color', AppState.backgroundColor);
    root.style.setProperty('--background-light', lighten(AppState.backgroundColor, 5));
    root.style.setProperty('--background-dark', darken(AppState.backgroundColor, 10));
}

// Screen Navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function showView(viewId) {
    document.querySelectorAll('.view').forEach(view => {
        view.classList.remove('active');
    });
    document.getElementById(viewId).classList.add('active');
}

// Initialization Screen
function initializeApp() {
    const storeNameInput = document.getElementById('store-name');
    const primaryColorInput = document.getElementById('primary-color');
    const accentColorInput = document.getElementById('accent-color');
    const backgroundColorInput = document.getElementById('background-color');
    const continueBtn = document.getElementById('continue-btn');

    // Update hex displays
    primaryColorInput.addEventListener('input', (e) => {
        document.getElementById('primary-hex').textContent = e.target.value;
        AppState.primaryColor = e.target.value;
        applyColorTheme();
    });

    accentColorInput.addEventListener('input', (e) => {
        document.getElementById('accent-hex').textContent = e.target.value;
        AppState.accentColor = e.target.value;
        applyColorTheme();
    });

    backgroundColorInput.addEventListener('input', (e) => {
        document.getElementById('background-hex').textContent = e.target.value;
        AppState.backgroundColor = e.target.value;
        applyColorTheme();
    });

    continueBtn.addEventListener('click', () => {
        const storeName = storeNameInput.value.trim();
        if (!storeName) {
            storeNameInput.focus();
            storeNameInput.style.borderColor = 'var(--danger-color)';
            setTimeout(() => {
                storeNameInput.style.borderColor = '';
            }, 1000);
            return;
        }

        AppState.storeName = storeName;
        startLoadingSequence();
    });

    // Allow Enter key to continue
    storeNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            continueBtn.click();
        }
    });
}

// Loading Screen
function startLoadingSequence() {
    showScreen('loading-screen');
    document.getElementById('store-name-display').textContent = AppState.storeName;

    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');

    const steps = [
        { percent: 15, text: 'Connecting to server...', duration: 500 },
        { percent: 35, text: 'Authenticating credentials...', duration: 700 },
        { percent: 55, text: 'Loading inventory database...', duration: 600 },
        { percent: 75, text: 'Synchronizing data...', duration: 500 },
        { percent: 90, text: 'Preparing dashboard...', duration: 400 },
        { percent: 100, text: 'Complete!', duration: 300 }
    ];

    let currentStep = 0;

    function nextStep() {
        if (currentStep < steps.length) {
            const step = steps[currentStep];
            progressFill.style.width = step.percent + '%';
            progressText.textContent = step.text;
            currentStep++;
            setTimeout(nextStep, step.duration);
        } else {
            setTimeout(() => {
                initializeDashboard();
                showScreen('main-screen');
            }, 500);
        }
    }

    nextStep();
}

// Dashboard Initialization
function initializeDashboard() {
    document.getElementById('dashboard-store-name').textContent = AppState.storeName;
    updateCategoryCounts();

    // Category card click handlers
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            showSubcategories(category);
        });
    });
}

function updateCategoryCounts() {
    Object.keys(INVENTORY_DATA).forEach(category => {
        let totalItems = 0;
        const subcategories = INVENTORY_DATA[category].subcategories;

        Object.keys(subcategories).forEach(subcat => {
            totalItems += subcategories[subcat].products.length;
        });

        const countElement = document.getElementById(`${category}-count`);
        if (countElement) {
            countElement.textContent = `${totalItems} items`;
        }
    });
}

// Navigation
function setupNavigation() {
    const backBtn = document.getElementById('back-btn');

    backBtn.addEventListener('click', () => {
        if (AppState.navigationHistory.length > 0) {
            const previous = AppState.navigationHistory.pop();

            if (previous.type === 'dashboard') {
                showView('dashboard-view');
                document.getElementById('header-title').textContent = 'Dashboard';
                if (AppState.navigationHistory.length === 0) {
                    backBtn.classList.remove('visible');
                }
            } else if (previous.type === 'subcategories') {
                showSubcategories(previous.category);
            } else if (previous.type === 'products') {
                showProducts(previous.category, previous.subcategory);
            }
        }
    });
}

// Subcategories View
function showSubcategories(category) {
    AppState.currentCategory = category;
    AppState.navigationHistory.push({ type: 'dashboard' });

    const categoryData = INVENTORY_DATA[category];
    const subcategoryList = document.getElementById('subcategory-list');

    document.getElementById('header-title').textContent = categoryData.name;
    document.getElementById('back-btn').classList.add('visible');

    subcategoryList.innerHTML = '';

    Object.keys(categoryData.subcategories).forEach(subcatKey => {
        const subcat = categoryData.subcategories[subcatKey];
        const productCount = subcat.products.length;

        const item = document.createElement('div');
        item.className = 'subcategory-item';
        item.innerHTML = `
            <div class="subcategory-info">
                <h3>${subcat.name}</h3>
                <p>${productCount} product${productCount !== 1 ? 's' : ''}</p>
            </div>
            <div class="subcategory-arrow">→</div>
        `;

        item.addEventListener('click', () => {
            showProducts(category, subcatKey);
        });

        subcategoryList.appendChild(item);
    });

    showView('subcategories-view');
}

// Products View
function showProducts(category, subcategory) {
    AppState.currentSubcategory = subcategory;
    AppState.navigationHistory.push({
        type: 'subcategories',
        category: category
    });

    const subcatData = INVENTORY_DATA[category].subcategories[subcategory];
    const productsGrid = document.getElementById('products-grid');

    document.getElementById('header-title').textContent = subcatData.name;

    productsGrid.innerHTML = '';

    subcatData.products.forEach(product => {
        const card = createProductCard(product);
        productsGrid.appendChild(card);
    });

    showView('products-view');
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
        <div class="product-header">
            <span class="product-code">${product.code}</span>
        </div>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-manufacturer">${product.manufacturer}</p>
        <div class="product-stats">
            <div class="stat-item">
                <span class="stat-label">Available</span>
                <span class="stat-value available">${product.available}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Total</span>
                <span class="stat-value">${product.total}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">On Hold</span>
                <span class="stat-value onhold">${product.onHold}</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">Sold</span>
                <span class="stat-value sold">${product.sold}</span>
            </div>
        </div>
    `;

    card.addEventListener('click', () => {
        showProductModal(product);
    });

    return card;
}

// View Toggle
function setupViewToggle() {
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const productsGrid = document.getElementById('products-grid');

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const view = btn.dataset.view;
            if (view === 'list') {
                productsGrid.classList.add('list-view');
            } else {
                productsGrid.classList.remove('list-view');
            }
        });
    });
}

// Product Modal
function showProductModal(product) {
    const modal = document.getElementById('product-modal');
    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
        <div class="modal-product-header">
            <span class="modal-product-code">${product.code}</span>
            <h2 class="modal-product-name">${product.name}</h2>
            <p class="modal-product-manufacturer">${product.manufacturer}</p>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">Inventory Status</h3>
            <div class="detail-grid">
                <div class="detail-item">
                    <span class="detail-label">Total Stock</span>
                    <span class="detail-value">${product.total}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Available</span>
                    <span class="detail-value" style="color: var(--success-color);">${product.available}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">On Hold</span>
                    <span class="detail-value" style="color: var(--warning-color);">${product.onHold}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Sold</span>
                    <span class="detail-value">${product.sold}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Requested</span>
                    <span class="detail-value" style="color: var(--accent-color);">${product.requested}</span>
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">Product Details</h3>
            <div class="detail-grid">
                <div class="detail-item">
                    <span class="detail-label">Material</span>
                    <span class="detail-value">${product.material}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Weight</span>
                    <span class="detail-value">${product.weight}</span>
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">Available Sizes</h3>
            <div class="tag-list">
                ${product.sizes.map(size => `<span class="tag">${size}</span>`).join('')}
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">Available Colors</h3>
            <div class="tag-list">
                ${product.colors.map(color => `<span class="tag">${color}</span>`).join('')}
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">Pricing</h3>
            <div class="price-grid">
                <div class="detail-item">
                    <span class="detail-label">Wholesale</span>
                    <span class="detail-value">$${product.wholesalePrice.toFixed(2)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Retail</span>
                    <span class="detail-value">$${product.retailPrice.toFixed(2)}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">MSRP</span>
                    <span class="detail-value">$${product.msrp.toFixed(2)}</span>
                </div>
            </div>
        </div>

        <div class="modal-section">
            <h3 class="modal-section-title">Features</h3>
            <div class="tag-list">
                ${product.features.map(feature => `<span class="tag">${feature}</span>`).join('')}
            </div>
        </div>
    `;

    modal.classList.add('active');
}

function setupModal() {
    const modal = document.getElementById('product-modal');
    const modalClose = modal.querySelector('.modal-close');
    const modalOverlay = modal.querySelector('.modal-overlay');

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modalOverlay.addEventListener('click', () => {
        modal.classList.remove('active');
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupNavigation();
    setupViewToggle();
    setupModal();
    applyColorTheme();
});
