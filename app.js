// Business Inventory Management System - Application Logic

// ===== APPLICATION STATE =====
const App = {
    storeName: '',
    theme: {
        bg: '#0a0e14',
        text: '#c7cdd8',
        accent: '#39bae6'
    },
    filteredData: [],
    currentPage: 1,
    itemsPerPage: 50,
    sortColumn: 'sku',
    sortDirection: 'asc',
    filters: {
        search: '',
        category: '',
        subcategory: '',
        gender: '',
        stock: ''
    }
};

// ===== LOCAL STORAGE =====
function loadSettings() {
    const saved = localStorage.getItem('inventorySettings');
    if (saved) {
        try {
            const settings = JSON.parse(saved);
            return settings;
        } catch (e) {
            console.error('Error loading settings:', e);
        }
    }
    return null;
}

function saveSettings() {
    const settings = {
        storeName: App.storeName,
        theme: App.theme
    };
    localStorage.setItem('inventorySettings', JSON.stringify(settings));
}

// ===== INITIALIZATION SCREEN =====
let sharedColorPicker;
let activeSwatchRole = 'bg'; // Default active swatch

const swatchColors = {
    bg: '#0a0e14',
    text: '#c7cdd8',
    accent: '#39bae6'
};

function initializeSetup() {
    const storeNameInput = document.getElementById('store-name');
    const submitBtn = document.getElementById('init-submit');
    const swatches = document.querySelectorAll('.color-swatch');

    // Load saved settings
    const savedSettings = loadSettings();
    if (savedSettings?.storeName) {
        storeNameInput.value = savedSettings.storeName;
    }
    if (savedSettings?.theme) {
        swatchColors.bg = savedSettings.theme.bg || '#0a0e14';
        swatchColors.text = savedSettings.theme.text || '#c7cdd8';
        swatchColors.accent = savedSettings.theme.accent || '#39bae6';

        // Update swatch visuals
        document.querySelector('[data-role="bg"] .swatch-color').style.backgroundColor = swatchColors.bg;
        document.querySelector('[data-role="text"] .swatch-color').style.backgroundColor = swatchColors.text;
        document.querySelector('[data-role="accent"] .swatch-color').style.backgroundColor = swatchColors.accent;
    }

    // Initialize ONE shared ColorPicker
    sharedColorPicker = new ColorPicker(document.getElementById('shared-color-picker'), {
        initialColor: swatchColors[activeSwatchRole],
        showHexDisplay: true,
        onChange: (hex) => {
            // Update the active swatch
            swatchColors[activeSwatchRole] = hex;
            const activeSwatch = document.querySelector(`.color-swatch[data-role="${activeSwatchRole}"]`);
            activeSwatch.querySelector('.swatch-color').style.backgroundColor = hex;
        }
    });

    // Swatch click handlers
    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            // Update active state
            swatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');

            // Update active role
            activeSwatchRole = swatch.dataset.role;

            // Update color picker to show this swatch's color
            sharedColorPicker.setValue(swatchColors[activeSwatchRole]);
        });
    });

    // Set initial theme values
    App.theme.bg = swatchColors.bg;
    App.theme.text = swatchColors.text;
    App.theme.accent = swatchColors.accent;

    submitBtn.addEventListener('click', () => {
        const storeName = storeNameInput.value.trim();

        if (!storeName) {
            alert('Please enter a store name');
            storeNameInput.focus();
            return;
        }

        App.storeName = storeName;
        App.theme.bg = swatchColors.bg;
        App.theme.text = swatchColors.text;
        App.theme.accent = swatchColors.accent;

        saveSettings();
        startLoadingSequence();
    });

    storeNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            submitBtn.click();
        }
    });
}

// ===== LOADING SCREEN =====
function startLoadingSequence() {
    showScreen('loading-screen');
    document.getElementById('loading-store-name').textContent = App.storeName.toUpperCase();

    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    const progressPercent = document.getElementById('progress-percent');
    const loadingLog = document.getElementById('loading-log');

    const steps = [
        { percent: 10, text: 'Initializing database connection...', log: '[OK] Database connection established' },
        { percent: 25, text: 'Authenticating credentials...', log: '[OK] Authentication successful' },
        { percent: 40, text: 'Loading inventory database...', log: '[OK] Loaded ' + INVENTORY_DATABASE.length + ' SKUs' },
        { percent: 55, text: 'Indexing product categories...', log: '[OK] Indexed 5 main categories' },
        { percent: 70, text: 'Building search index...', log: '[OK] Search index ready' },
        { percent: 85, text: 'Applying color scheme...', log: '[OK] Theme applied' },
        { percent: 100, text: 'System ready', log: '[OK] System initialized successfully' }
    ];

    let currentStep = 0;

    function executeStep() {
        if (currentStep < steps.length) {
            const step = steps[currentStep];
            progressFill.style.width = step.percent + '%';
            progressText.textContent = step.text;
            progressPercent.textContent = step.percent + '%';

            if (step.log) {
                const logEntry = document.createElement('div');
                logEntry.className = 'log-entry success';
                logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${step.log}`;
                loadingLog.appendChild(logEntry);
                loadingLog.scrollTop = loadingLog.scrollHeight;
            }

            currentStep++;
            setTimeout(executeStep, 400 + Math.random() * 300);
        } else {
            setTimeout(() => {
                applyTheme();
                initializeApp();
                showScreen('main-screen');
            }, 500);
        }
    }

    executeStep();
}

// ===== THEME APPLICATION =====
function getLuminance(hex) {
    const rgb = parseInt(hex.replace('#', ''), 16);
    const r = (rgb >> 16) / 255;
    const g = ((rgb >> 8) & 0xFF) / 255;
    const b = (rgb & 0xFF) / 255;

    // Calculate relative luminance
    const [rs, gs, bs] = [r, g, b].map(c => {
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function adjustColorByPercent(hex, percent) {
    const rgb = parseInt(hex.replace('#', ''), 16);
    const r = (rgb >> 16) & 0xFF;
    const g = (rgb >> 8) & 0xFF;
    const b = rgb & 0xFF;

    const adjust = (c) => {
        if (percent > 0) {
            // Lighten
            return Math.round(c + (255 - c) * (percent / 100));
        } else {
            // Darken
            return Math.round(c * (1 + percent / 100));
        }
    };

    const newR = Math.min(255, Math.max(0, adjust(r)));
    const newG = Math.min(255, Math.max(0, adjust(g)));
    const newB = Math.min(255, Math.max(0, adjust(b)));

    return '#' + ((newR << 16) | (newG << 8) | newB).toString(16).padStart(6, '0');
}

function applyTheme() {
    const root = document.documentElement;
    root.style.setProperty('--bg-color', App.theme.bg);
    root.style.setProperty('--text-color', App.theme.text);
    root.style.setProperty('--accent-color', App.theme.accent);

    // Detect if background is light or dark
    const bgLuminance = getLuminance(App.theme.bg);
    const isLightBackground = bgLuminance > 0.15; // 15% threshold

    // Generate variants based on background brightness
    let bgLight, bgLighter, tableStripe;

    if (isLightBackground) {
        // Light background - make variants darker
        bgLight = adjustColorByPercent(App.theme.bg, -5);
        bgLighter = adjustColorByPercent(App.theme.bg, -10);
        tableStripe = adjustColorByPercent(App.theme.bg, -10);
    } else {
        // Dark background - make variants lighter
        bgLight = adjustColorByPercent(App.theme.bg, 10);
        bgLighter = adjustColorByPercent(App.theme.bg, 20);
        tableStripe = adjustColorByPercent(App.theme.bg, 5);
    }

    // Adjust text dimness
    const textLuminance = getLuminance(App.theme.text);
    const textDim = adjustColorByPercent(App.theme.text, textLuminance > 0.5 ? -30 : 30);

    // Adjust border color based on background
    const borderColor = adjustColorByPercent(App.theme.bg, isLightBackground ? -20 : 30);

    root.style.setProperty('--bg-light', bgLight);
    root.style.setProperty('--bg-lighter', bgLighter);
    root.style.setProperty('--text-dim', textDim);
    root.style.setProperty('--table-stripe', tableStripe);
    root.style.setProperty('--border-color', borderColor);
}

// ===== MAIN APPLICATION =====
function initializeApp() {
    document.getElementById('header-store-name').textContent = App.storeName.toUpperCase();

    App.filteredData = [...INVENTORY_DATABASE];
    populateFilterDropdowns();
    updateDisplay();
    setupEventListeners();
}

function populateFilterDropdowns() {
    const categories = [...new Set(INVENTORY_DATABASE.map(item => item.category))].sort();
    const categorySelect = document.getElementById('filter-category');

    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categorySelect.appendChild(option);
    });
}

function updateSubcategoryFilter() {
    const subcategorySelect = document.getElementById('filter-subcategory');
    const selectedCategory = App.filters.category;

    // Clear current options except first
    subcategorySelect.innerHTML = '<option value="">All Subcategories</option>';

    if (selectedCategory) {
        const subcategories = [...new Set(
            INVENTORY_DATABASE
                .filter(item => item.category === selectedCategory)
                .map(item => item.subcategory)
        )].sort();

        subcategories.forEach(subcat => {
            const option = document.createElement('option');
            option.value = subcat;
            option.textContent = subcat;
            subcategorySelect.appendChild(option);
        });
    }
}

// ===== FILTERING & SEARCHING =====
function applyFilters() {
    let data = [...INVENTORY_DATABASE];

    // Search filter
    if (App.filters.search) {
        const search = App.filters.search.toLowerCase();
        data = data.filter(item =>
            item.sku.toLowerCase().includes(search) ||
            item.name.toLowerCase().includes(search) ||
            item.category.toLowerCase().includes(search) ||
            item.subcategory.toLowerCase().includes(search) ||
            item.manufacturer.toLowerCase().includes(search) ||
            item.colors.toLowerCase().includes(search)
        );
    }

    // Category filter
    if (App.filters.category) {
        data = data.filter(item => item.category === App.filters.category);
    }

    // Subcategory filter
    if (App.filters.subcategory) {
        data = data.filter(item => item.subcategory === App.filters.subcategory);
    }

    // Gender filter
    if (App.filters.gender) {
        data = data.filter(item => item.gender === App.filters.gender);
    }

    // Stock filter
    if (App.filters.stock) {
        if (App.filters.stock === 'in-stock') {
            data = data.filter(item => item.available > 20);
        } else if (App.filters.stock === 'low') {
            data = data.filter(item => item.available > 0 && item.available <= 20);
        } else if (App.filters.stock === 'out') {
            data = data.filter(item => item.available === 0);
        }
    }

    App.filteredData = data;
    App.currentPage = 1; // Reset to first page
    updateDisplay();
}

// ===== SORTING =====
function sortData(column) {
    if (App.sortColumn === column) {
        App.sortDirection = App.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        App.sortColumn = column;
        App.sortDirection = 'asc';
    }

    App.filteredData.sort((a, b) => {
        let aVal = a[column];
        let bVal = b[column];

        // Convert to numbers if numeric column
        if (['total', 'available', 'hold', 'sold', 'requested', 'retail', 'wholesale', 'msrp'].includes(column)) {
            aVal = Number(aVal);
            bVal = Number(bVal);
        } else {
            aVal = String(aVal).toLowerCase();
            bVal = String(bVal).toLowerCase();
        }

        if (App.sortDirection === 'asc') {
            return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        } else {
            return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
        }
    });

    updateSortIndicators();
    renderTable();
}

function updateSortIndicators() {
    document.querySelectorAll('.data-table th').forEach(th => {
        th.classList.remove('sort-asc', 'sort-desc');
    });

    const activeTh = document.querySelector(`[data-sort="${App.sortColumn}"]`);
    if (activeTh) {
        activeTh.classList.add(`sort-${App.sortDirection}`);
    }
}

// ===== DISPLAY =====
function updateDisplay() {
    renderTable();
    updateStats();
    updatePagination();
    updateSortIndicators();
}

function updateStats() {
    document.getElementById('total-skus').textContent = INVENTORY_DATABASE.length;
    document.getElementById('total-count').textContent = App.filteredData.length;

    const lowStockCount = INVENTORY_DATABASE.filter(item => item.available > 0 && item.available <= 20).length;
    document.getElementById('low-stock-count').textContent = lowStockCount;
}

function renderTable() {
    const tbody = document.getElementById('table-body');
    tbody.innerHTML = '';

    const start = (App.currentPage - 1) * App.itemsPerPage;
    const end = start + App.itemsPerPage;
    const pageData = App.filteredData.slice(start, end);

    document.getElementById('showing-count').textContent = Math.min(end, App.filteredData.length);

    pageData.forEach(item => {
        const row = document.createElement('tr');
        row.dataset.sku = item.sku;

        // Determine stock status classes
        let availClass = 'numeric';
        if (item.available === 0) {
            availClass += ' out-of-stock';
        } else if (item.available <= 20) {
            availClass += ' low-stock';
        }

        row.innerHTML = `
            <td class="sku">${item.sku}</td>
            <td>${item.name}</td>
            <td>${item.category}</td>
            <td>${item.subcategory}</td>
            <td class="numeric">${item.total}</td>
            <td class="${availClass}">${item.available}</td>
            <td class="numeric">${item.hold}</td>
            <td class="numeric">${item.sold}</td>
            <td class="numeric">${item.requested}</td>
            <td class="numeric">$${item.retail.toFixed(2)}</td>
        `;

        row.addEventListener('click', () => showDetailPanel(item));
        tbody.appendChild(row);
    });
}

function updatePagination() {
    const totalPages = Math.ceil(App.filteredData.length / App.itemsPerPage);

    document.getElementById('total-pages').textContent = totalPages;
    document.getElementById('page-input').value = App.currentPage;
    document.getElementById('page-input').max = totalPages;

    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');

    prevBtn.disabled = App.currentPage === 1;
    nextBtn.disabled = App.currentPage === totalPages || totalPages === 0;
}

// ===== DETAIL PANEL =====
function showDetailPanel(item) {
    const panel = document.getElementById('detail-panel');
    const content = document.getElementById('detail-content');

    let stockStatus = 'In Stock';
    let stockClass = 'success';
    if (item.available === 0) {
        stockStatus = 'Out of Stock';
        stockClass = 'danger';
    } else if (item.available <= 20) {
        stockStatus = 'Low Stock';
        stockClass = 'warning';
    }

    content.innerHTML = `
        <div class="detail-section">
            <h3>SKU: ${item.sku}</h3>
            <div class="detail-grid">
                <span class="detail-label">Product Name:</span>
                <span class="detail-value">${item.name}</span>

                <span class="detail-label">Manufacturer:</span>
                <span class="detail-value">${item.manufacturer}</span>

                <span class="detail-label">Category:</span>
                <span class="detail-value">${item.category}</span>

                <span class="detail-label">Subcategory:</span>
                <span class="detail-value">${item.subcategory}</span>

                <span class="detail-label">Gender:</span>
                <span class="detail-value">${item.gender === 'M' ? 'Men\'s' : item.gender === 'W' ? 'Women\'s' : 'Unisex'}</span>
            </div>
        </div>

        <div class="detail-section">
            <h3>INVENTORY STATUS</h3>
            <div class="detail-grid">
                <span class="detail-label">Total Stock:</span>
                <span class="detail-value">${item.total}</span>

                <span class="detail-label">Available:</span>
                <span class="detail-value ${stockClass}">${item.available}</span>

                <span class="detail-label">On Hold:</span>
                <span class="detail-value warning">${item.hold}</span>

                <span class="detail-label">Sold:</span>
                <span class="detail-value">${item.sold}</span>

                <span class="detail-label">Requested:</span>
                <span class="detail-value">${item.requested}</span>

                <span class="detail-label">Status:</span>
                <span class="detail-value ${stockClass}">${stockStatus}</span>
            </div>
        </div>

        <div class="detail-section">
            <h3>PRICING</h3>
            <div class="detail-grid">
                <span class="detail-label">Wholesale:</span>
                <span class="detail-value">$${item.wholesale.toFixed(2)}</span>

                <span class="detail-label">Retail:</span>
                <span class="detail-value">$${item.retail.toFixed(2)}</span>

                <span class="detail-label">MSRP:</span>
                <span class="detail-value">$${item.msrp.toFixed(2)}</span>

                <span class="detail-label">Margin:</span>
                <span class="detail-value">${(((item.retail - item.wholesale) / item.wholesale) * 100).toFixed(1)}%</span>
            </div>
        </div>

        <div class="detail-section">
            <h3>PRODUCT DETAILS</h3>
            <div class="detail-grid">
                <span class="detail-label">Available Sizes:</span>
                <span class="detail-value">${item.sizes}</span>

                <span class="detail-label">Available Colors:</span>
                <span class="detail-value">${item.colors}</span>
            </div>
        </div>
    `;

    panel.classList.add('active');
}

function closeDetailPanel() {
    document.getElementById('detail-panel').classList.remove('active');
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Search
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        App.filters.search = e.target.value;
        applyFilters();
    });

    document.getElementById('clear-search').addEventListener('click', () => {
        searchInput.value = '';
        App.filters.search = '';
        applyFilters();
    });

    // Filters
    document.getElementById('filter-category').addEventListener('change', (e) => {
        App.filters.category = e.target.value;
        App.filters.subcategory = ''; // Reset subcategory
        updateSubcategoryFilter();
        applyFilters();
    });

    document.getElementById('filter-subcategory').addEventListener('change', (e) => {
        App.filters.subcategory = e.target.value;
        applyFilters();
    });

    document.getElementById('filter-gender').addEventListener('change', (e) => {
        App.filters.gender = e.target.value;
        applyFilters();
    });

    document.getElementById('filter-stock').addEventListener('change', (e) => {
        App.filters.stock = e.target.value;
        applyFilters();
    });

    document.getElementById('reset-filters').addEventListener('click', () => {
        App.filters = { search: '', category: '', subcategory: '', gender: '', stock: '' };
        document.getElementById('search-input').value = '';
        document.getElementById('filter-category').value = '';
        document.getElementById('filter-subcategory').value = '';
        document.getElementById('filter-gender').value = '';
        document.getElementById('filter-stock').value = '';
        updateSubcategoryFilter();
        applyFilters();
    });

    // Sorting
    document.querySelectorAll('.sortable').forEach(th => {
        th.addEventListener('click', () => {
            const column = th.dataset.sort;
            sortData(column);
        });
    });

    // Pagination
    document.getElementById('prev-page').addEventListener('click', () => {
        if (App.currentPage > 1) {
            App.currentPage--;
            updateDisplay();
        }
    });

    document.getElementById('next-page').addEventListener('click', () => {
        const totalPages = Math.ceil(App.filteredData.length / App.itemsPerPage);
        if (App.currentPage < totalPages) {
            App.currentPage++;
            updateDisplay();
        }
    });

    document.getElementById('page-input').addEventListener('change', (e) => {
        const page = parseInt(e.target.value);
        const totalPages = Math.ceil(App.filteredData.length / App.itemsPerPage);
        if (page >= 1 && page <= totalPages) {
            App.currentPage = page;
            updateDisplay();
        } else {
            e.target.value = App.currentPage;
        }
    });

    document.getElementById('items-per-page').addEventListener('change', (e) => {
        App.itemsPerPage = parseInt(e.target.value);
        App.currentPage = 1;
        updateDisplay();
    });

    // Detail panel
    document.getElementById('close-detail').addEventListener('click', closeDetailPanel);

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // ESC to close detail panel
        if (e.key === 'Escape') {
            closeDetailPanel();
        }
        // Ctrl/Cmd + F to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            searchInput.focus();
        }
    });
}

// ===== SCREEN MANAGEMENT =====
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// ===== INITIALIZE ON LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    initializeSetup();
});
