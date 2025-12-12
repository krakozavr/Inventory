/**
 * ColorPicker - A standalone color picker component
 * Pure HTML + CSS + JavaScript (no framework dependencies)
 *
 * Usage:
 * const picker = new ColorPicker(containerElement, {
 *   initialColor: '#3b82f6',
 *   onChange: (hex) => console.log('Color changed:', hex)
 * });
 */

class ColorPicker {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      initialColor: options.initialColor || '#3b82f6',
      onChange: options.onChange || (() => {}),
      showHexDisplay: options.showHexDisplay !== false
    };

    // Internal state
    this.hue = 210;
    this.sat = 100;
    this.lig = 50;

    this.render();
    this.attachEventListeners();

    // Initialize with initial color if provided
    if (options.initialColor) {
      const hsl = this.hexToHsl(options.initialColor);
      this.hue = hsl.h;
      this.sat = hsl.s;
      this.lig = hsl.l;
      this.updateUI();
    }
  }

  render() {
    const html = `
      <div class="color-picker">
        ${this.options.showHexDisplay ? `
          <div class="color-picker-header">
            <label class="color-picker-label">Color</label>
            <div class="color-picker-hex-display">
              <span class="color-picker-hex-value">${this.hslToHex(this.hue, this.sat, this.lig)}</span>
            </div>
          </div>
        ` : ''}

        <div class="color-picker-area-wrapper">
          <div class="color-picker-area" data-area>
            <div class="color-picker-cursor" data-cursor></div>
          </div>
        </div>

        <div class="color-picker-hue-wrapper">
          <input
            type="range"
            min="0"
            max="360"
            value="${this.hue}"
            class="color-picker-hue-input"
            data-hue-input
          />
          <div class="color-picker-hue-track"></div>
          <div class="color-picker-hue-thumb" data-hue-thumb></div>
        </div>

        <div class="color-picker-indicators">
          <div class="color-picker-indicator">
            <div class="color-picker-indicator-fill" data-sat-indicator></div>
          </div>
          <div class="color-picker-indicator">
            <div class="color-picker-indicator-fill dark" data-lig-indicator></div>
          </div>
        </div>
      </div>
    `;

    this.container.innerHTML = html;
    this.cacheElements();
  }

  cacheElements() {
    this.elements = {
      area: this.container.querySelector('[data-area]'),
      cursor: this.container.querySelector('[data-cursor]'),
      hueInput: this.container.querySelector('[data-hue-input]'),
      hueThumb: this.container.querySelector('[data-hue-thumb]'),
      hexValue: this.container.querySelector('.color-picker-hex-value'),
      satIndicator: this.container.querySelector('[data-sat-indicator]'),
      ligIndicator: this.container.querySelector('[data-lig-indicator]')
    };
  }

  attachEventListeners() {
    // Area interactions
    this.elements.area.addEventListener('mousedown', (e) => {
      this.handleAreaInteraction(e);
      const onMouseMove = (e) => this.handleAreaInteraction(e);
      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    this.elements.area.addEventListener('touchstart', (e) => {
      e.preventDefault();
      this.handleAreaInteraction(e);
    });

    this.elements.area.addEventListener('touchmove', (e) => {
      e.preventDefault();
      this.handleAreaInteraction(e);
    });

    // Hue slider
    this.elements.hueInput.addEventListener('input', (e) => {
      this.hue = parseInt(e.target.value);
      this.updateColor();
    });
  }

  handleAreaInteraction(e) {
    const rect = this.elements.area.getBoundingClientRect();

    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));

    this.sat = Math.round(x * 100);
    this.lig = Math.round((1 - y) * 100);

    this.updateColor();
  }

  updateColor() {
    const hex = this.hslToHex(this.hue, this.sat, this.lig);
    this.updateUI();
    this.options.onChange(hex);
  }

  updateUI() {
    const hex = this.hslToHex(this.hue, this.sat, this.lig);

    // Update area background
    this.elements.area.style.background = `
      linear-gradient(to bottom, transparent 0%, #000 100%),
      linear-gradient(to right, #fff 0%, transparent 100%),
      hsl(${this.hue}, 100%, 50%)
    `;

    // Update cursor position and color
    this.elements.cursor.style.left = `${this.sat}%`;
    this.elements.cursor.style.top = `${100 - this.lig}%`;
    this.elements.cursor.style.backgroundColor = hex;

    // Update hue thumb position
    this.elements.hueThumb.style.left = `${(this.hue / 360) * 100}%`;

    // Update hex display
    if (this.elements.hexValue) {
      this.elements.hexValue.textContent = hex;
    }

    // Update indicators
    this.elements.satIndicator.style.width = `${this.sat}%`;
    this.elements.ligIndicator.style.width = `${this.lig}%`;
  }

  hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  hexToHsl(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return { h: 0, s: 0, l: 0 };

    let r = parseInt(result[1], 16) / 255;
    let g = parseInt(result[2], 16) / 255;
    let b = parseInt(result[3], 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }

  getValue() {
    return this.hslToHex(this.hue, this.sat, this.lig);
  }

  setValue(hex) {
    const hsl = this.hexToHsl(hex);
    this.hue = hsl.h;
    this.sat = hsl.s;
    this.lig = hsl.l;
    this.updateUI();
  }

  destroy() {
    this.container.innerHTML = '';
  }
}

// Export for use in modules or make available globally
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ColorPicker;
}
if (typeof window !== 'undefined') {
  window.ColorPicker = ColorPicker;
}
