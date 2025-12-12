# ColorPicker Component

A reusable color picker component available in two versions:
1. **React Component** - For use in React applications
2. **Standalone HTML/CSS/JS** - For use in any web project

## Features

- 2D saturation/lightness area with visual cursor
- Hue slider with full color spectrum
- Touch and mouse interaction support
- Real-time color updates
- Hex color output
- Visual indicators for saturation and lightness levels

## React Component

### Location
`components/Shared.tsx` - exported as `ColorPicker`

### Usage

```tsx
import { ColorPicker } from './components/Shared';

function MyComponent() {
  const [color, setColor] = useState('#3b82f6');

  return (
    <div>
      <ColorPicker
        value={color}
        onChange={(hex) => setColor(hex)}
        showHexDisplay={true}  // optional, defaults to false
      />
    </div>
  );
}
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | required | Current color in hex format |
| `onChange` | `(hex: string) => void` | required | Callback when color changes |
| `showHexDisplay` | `boolean` | `false` | Show hex value display in header |

### Example in Use
See `screens/ConfigScreen.tsx` for a working example.

## Standalone Version (HTML/CSS/JS)

### Files
- `ColorPicker.js` - JavaScript class
- `ColorPicker.css` - Styles
- `ColorPicker.html` - Demo page

### Usage

1. Include the CSS and JS files:

```html
<link rel="stylesheet" href="ColorPicker.css">
<script src="ColorPicker.js"></script>
```

2. Create a container and initialize:

```html
<div id="my-color-picker"></div>

<script>
  const picker = new ColorPicker(document.getElementById('my-color-picker'), {
    initialColor: '#3b82f6',
    showHexDisplay: true,
    onChange: (hex) => {
      console.log('Color changed to:', hex);
    }
  });
</script>
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `initialColor` | `string` | `'#3b82f6'` | Starting color in hex format |
| `onChange` | `function` | `() => {}` | Callback when color changes |
| `showHexDisplay` | `boolean` | `true` | Show hex value display |

### Methods

| Method | Description |
|--------|-------------|
| `getValue()` | Returns current color as hex string |
| `setValue(hex)` | Sets color programmatically |
| `destroy()` | Removes picker from DOM |

### Demo

Open `ColorPicker.html` in a browser to see a working demo with example usage.

## Technical Details

### Color Conversion
Both versions use HSL (Hue, Saturation, Lightness) color space internally:
- **Hue**: 0-360° (color wheel position)
- **Saturation**: 0-100% (color intensity)
- **Lightness**: 0-100% (brightness)

The picker converts HSL to hex for output.

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile touch support (iOS Safari, Chrome Mobile)
- No polyfills required

## Styling

### React Component
Uses Tailwind CSS classes. Customize by modifying the component in `components/Shared.tsx`.

### Standalone Component
Edit `ColorPicker.css` to customize appearance. All styles are scoped with `.color-picker` prefix.

## Examples

### Get color value
```javascript
// Standalone
const currentColor = picker.getValue(); // "#3b82f6"

// React
// Use the value from your state/onChange callback
```

### Set color programmatically
```javascript
// Standalone
picker.setValue('#ff0000');

// React
// Update your state variable
setColor('#ff0000');
```

### Random color
```javascript
// Standalone
const randomHex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
picker.setValue(randomHex);

// React
const randomHex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
setColor(randomHex);
```
