# Nested Mockup App Development Request Template

## About This Template

This document is a **prompt template** for requesting AI assistance in creating HTML mockup applications for StockPropsApp. Fill in the `[PLACEHOLDER]` sections with your specific requirements, then copy the entire prompt to your AI assistant.

---

## 📋 Prompt Template (Copy from here)

```
I need you to create an interactive HTML mockup application for StockPropsApp, a mobile Progressive Web App (PWA) that displays nested content in fullscreen mode.

### Purpose & Goals

**What is StockPropsApp?**
StockPropsApp is a mobile PWA that allows users to import and display various content types (images, videos, HTML apps) in fullscreen mode. Users import HTML mockups to demonstrate interactive prototypes, presentations, or dynamic content without building actual applications.

**Mockup App Purpose:**
[PLACEHOLDER: Describe the purpose of your mockup]
Example: "Create an interactive e-commerce product catalog to demonstrate a shopping experience for a client presentation"

**Target Goals:**
[PLACEHOLDER: List specific goals]
Example:
- Display product categories with smooth navigation
- Show product details with image galleries
- Demonstrate checkout flow without actual payment processing
- Mobile-first design optimized for portrait orientation

---

### Technical Requirements & Constraints

**CRITICAL:** The HTML file will be loaded as a blob URL in an iframe sandbox. This creates specific technical constraints:

#### ✅ Supported Patterns

1. **File Structure Options**

   **Option A: Single HTML File (Simplest)**
   - All CSS in `<style>` tags
   - All JavaScript in `<script>` tags
   - Images with relative paths

   **Option B: Multiple Files (Recommended for Complex Projects)**
   - Main HTML file: `index.html` or `app.html`
   - Separate CSS files: `<link rel="stylesheet" href="styles.css">`
   - Separate JS files: `<script src="app.js"></script>`
   - Image files: `<img src="photo.jpg">`
   - **All local files are auto-inlined during import!**

2. **CSS Files**
   - ✓ `<link rel="stylesheet" href="fonts.css">` → Auto-inlined to `<style>` tag
   - ✓ `<link rel="stylesheet" href="styles.css">` → Auto-inlined
   - ✓ Multiple CSS files supported
   - ✓ Use simple filenames or relative paths

3. **JavaScript Files**
   - ✓ `<script src="app.js"></script>` → Auto-inlined to inline `<script>`
   - ✓ `<script src="utils.js"></script>` → Auto-inlined
   - ✓ Multiple JS files supported (e.g., tailwind.js, app.js, data.js)
   - ✓ Files are inlined in the order they appear in HTML

4. **Images & Media**
   - ✓ `<img src="photo.jpg">` → Auto-converted to base64 data URI
   - ✓ `background-image: url('bg.jpg')` → Auto-converted to base64
   - ✓ Use simple relative paths or just filenames
   - ✓ Supported formats: JPG, PNG, GIF, SVG, WebP, BMP

5. **Fonts**
   - ✓ `@font-face { src: url('font.woff2'); }` → Auto-inlined
   - ✓ Multiple font files supported
   - ✓ Supported formats: WOFF, WOFF2, TTF, EOT, OTF
   - ✓ Reference fonts in CSS, include font files in import

6. **External Libraries (CDN)**
   - ✓ React: `<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>`
   - ✓ Babel Standalone: `<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>`
   - ✓ Tailwind: `<script src="https://cdn.tailwindcss.com"></script>`
   - ✓ Any library via CDN (unpkg, cdnjs, jsdelivr)
   - ✓ CDN links are kept as-is (not inlined)

7. **Data Embedding**
   - ✓ Embed data directly in JS: `const products = [{...}]`
   - ✓ Separate data file: `<script src="data.js"></script>` (will be inlined)
   - ✓ Use template literals for large datasets

#### ❌ Unsupported Patterns (Will Break!)

**Important:** Static HTML references (like `<script src>`, `<link href>`, `<img src>`) work fine because they're auto-inlined during import. What DOESN'T work is **dynamic loading via JavaScript**.

1. **Dynamic File Loading via JavaScript**
   - ✗ `fetch('local-file.json')` - Cannot fetch local files at runtime
   - ✗ `fetch('data.json').then(r => r.json())` - Blocked in blob context
   - ✗ `XMLHttpRequest` to local files - Blocked
   - ✗ `new Image().src = 'photo.jpg'` (dynamic loading) - Won't work
   - ✓ **Solution:** Embed data in JavaScript or use `<img>` tags in HTML

2. **ES Modules Between Local Files**
   - ✗ `import X from './component.js'` - Local module imports blocked
   - ✗ `import data from './data.json'` - Local JSON imports blocked
   - ✗ `<script type="module" src="./app.js">` - Local module scripts blocked
   - ✓ **You CAN use:** `<script type="module">` with **inline** code (no src)
   - ✓ **You CAN use:** `<script src="app.js">` (non-module) - will be inlined

3. **Dynamic Script/Style Injection**
   - ✗ `document.createElement('script').src = 'file.js'` - Won't load
   - ✗ `document.createElement('link').href = 'style.css'` - Won't load
   - ✓ **Solution:** Include all `<script>` and `<link>` tags in original HTML

#### 🎨 Best Practices

**DO:**
- ✓ Use separate CSS/JS files for better organization: `<link href="styles.css">`, `<script src="app.js">`
- ✓ OR use inline `<style>` and `<script>` tags for simplicity
- ✓ Reference images with simple filenames: `<img src="photo.jpg">`
- ✓ Use CDN links for external libraries (React, Tailwind, etc.)
- ✓ Embed data in JavaScript: `const data = [{...}]` or `<script src="data.js">`
- ✓ Design for mobile portrait orientation (375x812px base)
- ✓ Use relative units (vh, vw, %, rem) for responsive design
- ✓ Include all resources in the import (HTML + CSS + JS + images together)
- ✓ Test interactivity (buttons, animations, transitions)
- ✓ Keep individual files reasonable (<2MB each)

**DON'T:**
- ✗ Use `fetch()` or `XMLHttpRequest` for local files
- ✗ Use ES module imports between local files: `import X from './file.js'`
- ✗ Dynamically load scripts/styles via JavaScript
- ✗ Use `<script type="module" src="./local.js">` (inline modules are OK)
- ✗ Rely on server-side functionality or APIs
- ✗ Use absolute file paths or `file://` URLs
- ✗ Assume browser APIs like geolocation, camera, etc.
- ✗ Create actual backend functionality (simulate it instead)

---

### Specific App Requirements

**App Description:**
[PLACEHOLDER: Detailed description of your app]
Example:
"Create a fitness tracking app mockup with 4 main screens:
1. Dashboard showing weekly activity summary with charts
2. Workout library with exercise categories (Cardio, Strength, Yoga)
3. Individual workout detail page with exercise list and timer
4. User profile with achievement badges

Include smooth transitions between screens and interactive elements like expandable cards and progress bars."

**Visual Style:**
[PLACEHOLDER: Design preferences]
Example:
- Modern, clean interface with gradient backgrounds
- Color scheme: Blue (#3B82F6) and green (#10B981) accents
- Card-based layout with rounded corners and shadows
- Sans-serif fonts (system font stack)

**User Interactions:**
[PLACEHOLDER: List interactive features]
Example:
- Tab navigation between main sections
- Click cards to expand details
- Swipe gesture simulation for image galleries
- Animated progress bars and counters
- Modal overlays for detailed views

**Sample Data:**
[PLACEHOLDER: Describe data to include]
Example:
- 5-7 sample products per category
- 3 product categories minimum
- Each product: name, price, image, short description
- Simulated user profile data (name, avatar, stats)

**Screen Layout:**
[PLACEHOLDER: Number and type of screens]
Example:
- 4 main screens with bottom navigation bar
- Each screen should be scrollable
- Header with back button and title
- Mobile viewport: 375x667px (iPhone SE) to 390x844px (iPhone 12)

---

### File Structure

When complete, provide **one of these approaches**:

#### Option A: Single HTML File (Simpler)
1. **Main HTML File:** `[app-name].html`
   - All CSS in `<style>` tags
   - All JavaScript in `<script>` tags
   - Embedded sample data
   - Image references: `<img src="photo.jpg">`

2. **Image Files (if needed):** `image1.jpg`, `image2.png`, etc.
   - Import together with HTML file
   - Will be auto-inlined as base64

#### Option B: Multiple Files (Better Organization)
1. **Main HTML File:** `index.html` or `[app-name].html`
   - Links to CSS: `<link rel="stylesheet" href="styles.css">`
   - Links to JS: `<script src="app.js"></script>`
   - Image references: `<img src="photo.jpg">`

2. **CSS Files:** `styles.css`, `fonts.css`, etc.
   - Will be auto-inlined to `<style>` tags during import

3. **JavaScript Files:** `app.js`, `data.js`, `utils.js`, etc.
   - Will be auto-inlined to `<script>` tags during import
   - Load order: same as in HTML

4. **Image Files:** `photo1.jpg`, `photo2.png`, `icon.svg`, etc.
   - Will be auto-inlined as base64 data URIs

5. **Import Process:**
   - Select ALL files at once when importing (HTML + CSS + JS + images)
   - StockPropsApp will automatically inline everything

#### Both Options Include:
- **Usage Instructions:**
  - How to navigate the mockup
  - What interactive elements are available
  - Any special features or Easter eggs

---

### Expected Deliverables

**Code Quality:**
- Clean, commented code
- Semantic HTML5 structure
- Responsive CSS with mobile-first approach
- Well-organized JavaScript (functions, event handlers)

**Functionality:**
- All navigation works smoothly
- Interactive elements provide visual feedback (hover, active states)
- Transitions and animations are smooth (CSS transitions preferred)
- No console errors when running

**Documentation:**
- Brief comment explaining main sections
- List of interactive features
- Instructions for importing into StockPropsApp

---

### Testing Checklist

Before delivering, verify:
- [ ] HTML file(s) with CSS/JS either inline OR as separate files
- [ ] If using separate files: `<link href="styles.css">` and `<script src="app.js">` (will be auto-inlined)
- [ ] All images use simple relative paths: `<img src="photo.jpg">`
- [ ] External libraries use CDN URLs: `<script src="https://...">`
- [ ] **No** `fetch()` or `XMLHttpRequest` calls to local files
- [ ] **No** ES module imports from local files: `import X from './file.js'`
- [ ] **No** `<script type="module" src="./local.js">` (inline modules OK)
- [ ] Works when HTML file is opened directly in browser
- [ ] Mobile-responsive (test at 375px width minimum)
- [ ] All interactive elements work (buttons, links, tabs)
- [ ] Smooth transitions between screens/sections
- [ ] No JavaScript console errors
- [ ] All files provided together (HTML + CSS + JS + images for import)

---

### Example Structure

#### Example A: Single HTML File

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Your App Name]</title>
    <style>
        /* All CSS here */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        /* ... more styles ... */
    </style>
</head>
<body>
    <div id="app">
        <img src="logo.png" alt="Logo">
        <!-- Your app content -->
    </div>

    <!-- External libraries (CDN) -->
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <!-- Your JavaScript -->
    <script type="text/babel">
        const appData = { /* Your data here */ };
        // Your React components or vanilla JS...
    </script>
</body>
</html>
```

#### Example B: Multiple Files (Recommended for Complex Apps)

**index.html:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Your App Name]</title>

    <!-- Local CSS files - will be auto-inlined -->
    <link rel="stylesheet" href="fonts.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="app">
        <img src="logo.png" alt="Logo">
        <img src="background.jpg" class="bg">
    </div>

    <!-- External CDN libraries -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- Local JS files - will be auto-inlined in order -->
    <script src="data.js"></script>
    <script src="app.js"></script>
</body>
</html>
```

**fonts.css:**
```css
@font-face {
    font-family: 'CustomFont';
    src: url('custom-font.woff2') format('woff2'),
         url('custom-font.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
/* Fonts will be auto-inlined as base64 */
```

**styles.css:**
```css
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
    font-family: 'CustomFont', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background-image: url('background.jpg'); /* Will be auto-inlined */
}
/* ... more styles ... */
```

**data.js:**
```javascript
// Sample data
const products = [
    { id: 1, name: "Product 1", price: 29.99 },
    { id: 2, name: "Product 2", price: 39.99 }
];
```

**app.js:**
```javascript
// Your application logic
document.addEventListener('DOMContentLoaded', () => {
    // Use the data from data.js
    console.log('Products:', products);
    // Your app code...
});
```

**Files to import together:**
- `index.html`
- `fonts.css`
- `styles.css`
- `data.js`
- `app.js`
- `custom-font.woff2`
- `custom-font.woff`
- `logo.png`
- `background.jpg`

All files will be automatically inlined during import!

---

## Additional Notes

[PLACEHOLDER: Any special considerations or requirements]
Example:
- Must work offline (no external API calls)
- Include dark mode toggle
- Add loading animations for better UX
- Simulate real-time data updates with intervals

```

---

## 🔧 Usage Instructions

1. **Copy the template** above (starting from "I need you to create...")
2. **Fill in all `[PLACEHOLDER]` sections** with your specific requirements
3. **Remove placeholder examples** or replace with your actual requirements
4. **Paste the complete prompt** to your AI assistant (Claude, ChatGPT, etc.)
5. **Review the generated code** and test in a browser before importing
6. **Import to StockPropsApp** along with any required image files

## 📚 Related Documentation

- **User Manual:** `/pwa/user-manual.html` - How to import and use mockup apps
- **Developer Guide:** `/pwa/developer-guide.html` - Detailed technical documentation with examples

---

**Version:** 1.0
**Last Updated:** 2025-12-08
**Compatible with:** StockPropsApp v1.0.70+
