# Inventory Management System - Business Mockup Application

A professional terminal-style inventory management system mockup for StockPropsApp. Designed for realistic business photosets with completely fictional data.

## 🎯 Purpose

This is a **business-grade inventory management interface** optimized for:
- Store managers navigating thousands of SKUs
- Tablet landscape orientation (primary)
- Fast search, filter, and sort operations
- Terminal/database aesthetic
- Professional mockup/prop for photography

## 📊 Features

### Initialization Screen
- **Store/Business Name Input**: Customize your store identity
- **Terminal Color Scheme**: Full color customization
  - Background color
  - Primary text color
  - Accent color
- **Live Preview**: All colors update in real-time

### Loading/Authorization
- **Realistic Progress Indicator**: Multi-step loading sequence
- **System Log**: Terminal-style initialization messages
- **Professional UI**: Database connection simulation

### Main Application

#### Search & Filter
- **Live Search**: Instant filtering across SKU, name, category, manufacturer, colors
- **Category Filter**: Men's Clothing, Women's Clothing, Men's Shoes, Women's Shoes, Accessories
- **Subcategory Filter**: Dynamic subcategories based on selected category
- **Gender Filter**: Men's, Women's, Unisex
- **Stock Status Filter**: In Stock, Low Stock, Out of Stock
- **Reset Filters**: Clear all filters instantly

#### Data Table
- **Sortable Columns**: Click any column header to sort
  - SKU
  - Product Name
  - Category
  - Subcategory
  - Total Stock
  - Available
  - On Hold
  - Sold
  - Requested
  - Retail Price
- **Ascending/Descending**: Toggle sort direction
- **Visual Indicators**: Color-coded stock levels
  - Green: In stock
  - Orange: Low stock (≤20)
  - Red: Out of stock
- **Sticky Header**: Header stays visible while scrolling

#### Pagination
- **Adjustable Page Size**: 25, 50, 100, or 200 items per page
- **Page Navigation**: Previous/Next buttons
- **Jump to Page**: Direct page number input
- **Results Counter**: "Showing X of Y items"

#### Detail Panel
- **Slide-in Panel**: Click any row to view full details
- **Comprehensive Information**:
  - SKU and product name
  - Manufacturer
  - Category and subcategory
  - Inventory status (total, available, on hold, sold, requested)
  - Pricing (wholesale, retail, MSRP, margin)
  - Available sizes and colors
- **Quick Close**: ESC key or X button

### Keyboard Shortcuts
- **Ctrl/Cmd + F**: Focus search box
- **ESC**: Close detail panel

## 📦 Inventory Data

### Categories & Subcategories
- **Men's Clothing** (10 subcategories): Dress Shirts, Casual Shirts, Polos, T-Shirts, Sweaters, Jackets, Dress Pants, Chinos, Jeans, Shorts
- **Women's Clothing** (10 subcategories): Blouses, T-Shirts, Sweaters, Jackets, Dress Pants, Casual Pants, Jeans, Dresses, Skirts, Shorts
- **Men's Shoes** (5 subcategories): Dress Shoes, Casual Shoes, Sneakers, Boots, Sandals
- **Women's Shoes** (5 subcategories): Heels, Flats, Sneakers, Boots, Sandals
- **Accessories** (10 subcategories): Belts, Bags, Wallets, Hats, Scarves, Gloves, Sunglasses, Watches, Jewelry, Ties & Bow Ties

### Data Characteristics
- **300+ Unique SKUs**: Realistic product variations
- **Fictional Manufacturers**: No real brand names or trademarks
- **Realistic Stock Levels**: Randomized but believable inventory numbers
- **Price Ranges**: Wholesale, retail, and MSRP with realistic markups
- **Size & Color Variations**: Appropriate for each category
- **SKU Format**: `{CATEGORY}-{SUBCAT}-{NUMBER}` (e.g., MC-DRS-001, WS-HEL-015)

## 🎨 Design Philosophy

### Terminal/Business Aesthetic
- **Monospace Fonts**: 'Courier New', 'Consolas', 'Monaco'
- **Dark Terminal Theme**: Default dark background with customizable colors
- **High Contrast**: Professional readability
- **Data-Dense**: Maximum information per screen
- **No Graphics**: Text and tables only
- **Grid-Based Layout**: Clean, structured interface
- **Color Coding**: Functional color use for status indicators

### UX for Business Users
- **Speed**: Fast search and filter for navigating thousands of items
- **Efficiency**: Keyboard shortcuts and instant updates
- **Clarity**: Clear data presentation in tabular format
- **Flexibility**: Customizable views and filters

## 📱 Optimization

### Tablet Landscape (Primary)
- Optimized for 1024x768 and above
- Maximum table visibility
- Efficient use of screen space
- Professional landscape layout

### Mobile Portrait (Secondary)
- Responsive tables
- Stacked controls
- Touch-friendly buttons
- Readable font sizes

## 📋 Files

- `index.html` - Main HTML structure with semantic markup
- `styles.css` - Terminal-style CSS with responsive design
- `data.js` - Inventory data generator (300+ SKUs)
- `app.js` - Full application logic (search, filter, sort, pagination)

## 🚀 Usage

### For StockPropsApp
1. **Import all files together**: `index.html`, `styles.css`, `data.js`, `app.js`
2. Files will be auto-inlined during import
3. App works completely offline

### Local Testing
1. Open `index.html` in any modern browser
2. Enter store name and customize colors
3. Click "INITIALIZE SYSTEM"
4. Explore the inventory management interface

## ⚙️ Technical Details

- **Framework**: Vanilla JavaScript (no external dependencies except Tailwind CDN)
- **Data Storage**: In-memory JavaScript arrays
- **Search**: Client-side filtering with instant updates
- **Sort**: In-place array sorting
- **Pagination**: Slice-based pagination
- **Responsive**: CSS Grid and Flexbox
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)

## ⚠️ Important Notes

- All data is **completely fictional**
- No real brand names, trademarks, or copyrighted content
- **Mockup/prop application** for demonstration purposes only
- All manufacturers, products, and SKUs are invented
- Works completely offline with no external API calls
- Optimized for professional business photography

## 🎬 Perfect For

- Business software demonstrations
- Inventory system presentations
- UI/UX portfolio pieces
- Tablet app mockups
- Professional photography props
- E-commerce backend demos
- Training materials

## 🔧 Customization

The app supports full theme customization:
- Background color
- Text color
- Accent color (buttons, highlights, borders)

All supplementary colors (lighter/darker variants) are automatically generated from the base colors.

---

**Version**: 2.0
**Created**: 2025-12-12
**Compatible with**: StockPropsApp v1.0.70+
**Application Type**: Business Inventory Management System
**Data**: 100% Fictional

**Note**: This is a professional business application mockup designed to look authentic and functional for photography while containing only fictional data.
