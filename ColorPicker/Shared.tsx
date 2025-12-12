
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Home, CreditCard, ArrowRightLeft, Menu, Bell, Wallet, LogOut, ChevronDown, Calendar } from 'lucide-react';
import { ScreenName, AppConfig } from '../types';

// -- LOGO COMPONENT --
export const Logo = ({ size = 64, invert = false }: { size?: number; invert?: boolean }) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
     <circle cx="100" cy="100" r="92" fill={invert ? "#ffffff" : "var(--brand-primary)"} fillOpacity={invert ? "0.12" : "0.08"}/>
      <path d="M70 58L70 142L100 164L130 142L130 58L100 36Z" stroke={invert ? "#ffffff" : "var(--brand-primary)"} strokeWidth="18" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="100" cy="88" r="24" fill="#ff9800"/>
  </svg>
);

// -- APP CONTAINER --
export const AppContainer = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="h-full w-full flex justify-center bg-black">
      <div className="w-full h-full max-w-[480px] bg-brand-bg relative shadow-2xl flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
};

// -- HEADER --
interface HeaderProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  showMenu?: boolean;
  config?: AppConfig;
  onNavigate?: (screen: ScreenName) => void;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, onBack, config, onNavigate }) => {
  return (
    <div className="bg-brand-primary text-white pt-12 pb-6 px-5 shrink-0 relative z-10 shadow-md transition-colors duration-300">
      <div className="flex justify-between items-center">
        {onBack ? (
          <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors active:scale-95 shrink-0">
            <ChevronLeft size={32} />
          </button>
        ) : (
          <div className="w-10"></div>
        )}

        <div className="flex items-center gap-3 flex-1 justify-center">
          <Logo size={subtitle ? 56 : 48} invert />
          <div className="flex flex-col">
            <div className="font-bold text-xl tracking-tight opacity-95 leading-tight">
              {title || config?.bankName || 'Household Bank'}
            </div>
            {subtitle && (
              <div className="text-white/70 text-sm font-normal mt-0.5 leading-tight">
                {subtitle}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => onNavigate?.('FRAUD_ALERT')}
          className="p-2 -mr-2 hover:bg-white/10 rounded-full transition-colors relative shrink-0 active:scale-95 cursor-pointer"
        >
          <Bell size={28} />
          <span className="absolute top-2 right-2 w-3 h-3 bg-brand-accent rounded-full border-2 border-brand-primary animate-pulse"></span>
        </button>
      </div>
    </div>
  );
};

// -- BOTTOM NAV --
export const BottomNav = ({ active, onNavigate }: { active: ScreenName; onNavigate: (s: ScreenName) => void }) => {
  const items = [
    { id: 'DASHBOARD', icon: null, label: 'Home', isLogo: true },
    { id: 'ACCOUNT_DEBIT', icon: Wallet, label: 'Accounts', isLogo: false },
    { id: 'TRANSFER_INPUT', icon: ArrowRightLeft, label: 'Transfer', isLogo: false },
    { id: 'CONFIG', icon: LogOut, label: 'Sign Out', isLogo: false },
  ];

  return (
    <div className="bg-white border-t border-gray-200 pb-safe pt-2 px-6 flex justify-between items-center h-[80px] shrink-0 z-20 shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
      {items.map((item) => {
        const isActive = active === item.id || (active.startsWith('ACCOUNT') && item.id === 'ACCOUNT_DEBIT');
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id as ScreenName)}
            className={`flex flex-col items-center gap-1 w-16 transition-all duration-300 ${isActive ? 'text-brand-primary -translate-y-1' : 'text-gray-400'}`}
          >
            {item.isLogo ? (
              <Logo size={32} invert={!isActive} />
            ) : (
              item.icon && <item.icon size={28} strokeWidth={isActive ? 2.5 : 2} />
            )}
            <span className="text-[11px] font-semibold tracking-wide">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

// -- ACTION BUTTON --
export const ActionButton = ({ onClick, children, variant = 'primary', className = '', disabled = false, style = {} }: any) => {
  const baseStyle = "w-full py-4 rounded-2xl font-bold text-lg transition-transform active:scale-[0.98] shadow-sm mb-3 flex items-center justify-center";
  const styles = {
    primary: "bg-brand-primary text-white hover:brightness-90",
    accent: "bg-brand-accent text-white hover:bg-orange-600",
    outline: "border-2 border-brand-primary text-brand-primary bg-transparent",
    ghost: "bg-gray-100 text-brand-text hover:bg-gray-200"
  };
  
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      style={style}
      className={`${baseStyle} ${styles[variant as keyof typeof styles]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export const Select = ({ label, value, onChange, options, disabled = false }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className={`mb-4 relative ${disabled ? 'opacity-60 pointer-events-none' : ''}`}>
      {label && <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-2">{label}</label>}
      <button 
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className="w-full bg-white border border-gray-200 rounded-2xl p-4 flex justify-between items-center active:bg-gray-50 text-left transition-colors"
      >
        <div>
          <div className="font-bold text-brand-text text-lg">{value?.title || 'Select...'}</div>
          {value?.subtitle && <div className="text-sm text-gray-500">{value.subtitle}</div>}
        </div>
        <ChevronDown size={20} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {options.map((opt: any, i: number) => (
            <div 
              key={i}
              onClick={() => { onChange(opt); setIsOpen(false); }}
              className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-none"
            >
              <div className="font-bold text-brand-text">{opt.title}</div>
              {opt.subtitle && <div className="text-xs text-gray-500">{opt.subtitle}</div>}
            </div>
          ))}
        </div>
      )}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>}
    </div>
  );
};

export const Toggle = ({ label, checked, onChange }: any) => (
  <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-200 mb-6">
     <span className="font-bold text-brand-text">{label}</span>
     <div 
       onClick={() => onChange(!checked)}
       className={`w-12 h-7 rounded-full p-1 transition-colors cursor-pointer ${checked ? 'bg-brand-success' : 'bg-gray-300'}`}
     >
        <div className={`bg-white w-5 h-5 rounded-full shadow-md transition-transform ${checked ? 'translate-x-5' : ''}`}></div>
     </div>
  </div>
);

export const DatePicker = ({ label, value, onChange, disabled = false }: any) => {
  const displayDate = value 
    ? new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) 
    : 'Select Date';

  return (
     <div className={`mb-4 relative ${disabled ? 'opacity-40 pointer-events-none' : ''}`}>
        {label && <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-2">{label}</label>}
        <div className="relative w-full h-[72px]">
           {/* Visual Layer - Pointer events none so clicks go through to input */}
           <div className="absolute inset-0 bg-white border border-gray-200 rounded-2xl p-4 flex justify-between items-center pointer-events-none z-10">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                    <Calendar size={22} />
                 </div>
                 <span className={`font-bold text-xl ${!value ? 'text-gray-300' : 'text-brand-text'}`}>
                    {displayDate}
                 </span>
              </div>
              <ChevronDown size={24} className="text-gray-400" />
           </div>
           
           {/* Actual Input - Absolute positioning with high Z-Index and low opacity to capture all clicks */}
           <input 
             type="date" 
             value={value}
             onChange={(e) => e.target.value && onChange(e.target.value)}
             disabled={disabled}
             className="absolute inset-0 w-full h-full z-50 cursor-pointer block"
             style={{ 
               opacity: 0.01, 
               border: 'none',
               margin: 0,
               padding: 0
             }} 
           />
        </div>
     </div>
  );
};

// -- COLOR PICKER --
interface ColorPickerProps {
  value: string;
  onChange: (hex: string) => void;
  showHexDisplay?: boolean;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange, showHexDisplay = false }) => {
  const [hue, setHue] = useState(210);
  const [sat, setSat] = useState(100);
  const [lig, setLig] = useState(50);

  const areaRef = useRef<HTMLDivElement>(null);

  // Sync internal state with generated hex
  useEffect(() => {
    const hex = hslToHex(hue, sat, lig);
    onChange(hex);
  }, [hue, sat, lig]);

  // Handle 2D Area Click/Drag
  const handleAreaInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    if (!areaRef.current) return;
    const rect = areaRef.current.getBoundingClientRect();

    let clientX, clientY;

    // Safe event handling for both Touch and Mouse
    if ((e as any).touches && (e as any).touches.length > 0) {
       clientX = (e as any).touches[0].clientX;
       clientY = (e as any).touches[0].clientY;
    } else {
       clientX = (e as any).clientX;
       clientY = (e as any).clientY;
    }

    if (clientX === undefined || clientY === undefined) return;

    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));

    // X axis = Saturation (0 to 100)
    // Y axis = Lightness (100 to 0) - Simplified approximation for UI feel
    setSat(Math.round(x * 100));
    setLig(Math.round((1 - y) * 100));
  };

  return (
    <div>
      {showHexDisplay && (
        <div className="flex justify-between items-center mb-4">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block">Brand Color</label>
          <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-lg">
            <span className="text-xs font-mono text-gray-600">{value}</span>
          </div>
        </div>
      )}

      {/* Saturation/Brightness Area */}
      <div
        ref={areaRef}
        className="w-full aspect-video rounded-xl mb-6 relative cursor-crosshair shadow-inner touch-none"
        style={{
          background: `
            linear-gradient(to bottom, transparent 0%, #000 100%),
            linear-gradient(to right, #fff 0%, transparent 100%),
            hsl(${hue}, 100%, 50%)
          `
        }}
        onMouseDown={handleAreaInteraction}
        onMouseMove={(e) => e.buttons === 1 && handleAreaInteraction(e)}
        onTouchMove={handleAreaInteraction}
      >
         <div
           className="absolute w-6 h-6 border-2 border-white rounded-full shadow-lg transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
           style={{
             left: `${sat}%`,
             top: `${100 - lig}%`,
             backgroundColor: value
           }}
         ></div>
      </div>

      {/* Hue Slider */}
      <div className="relative h-4 w-full rounded-full mb-6">
         <input
           type="range"
           min="0"
           max="360"
           value={hue}
           onChange={(e) => setHue(Number(e.target.value))}
           className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
         />
         <div className="w-full h-full rounded-full" style={{ background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)' }}></div>
         <div
            className="absolute top-0 h-full w-2 bg-white border border-gray-300 shadow-md rounded-full pointer-events-none transform -translate-x-1/2"
            style={{ left: `${(hue / 360) * 100}%` }}
         ></div>
      </div>

      {/* Saturation and Lightness Indicators */}
      <div className="flex gap-2">
         <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gray-300" style={{ width: `${sat}%`}}></div>
         </div>
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gray-800" style={{ width: `${lig}%`}}></div>
         </div>
      </div>
    </div>
  );
};

// -- PROFESSIONAL FOOTER --
export const Footer = () => {
  return (
    <div className="bg-gray-50 border-t border-gray-200 py-6 px-6 text-center shrink-0">
      <div className="flex justify-center mb-3">
        <Logo size={32} />
      </div>
      <p className="text-xs text-gray-600 mb-2 font-semibold">
        Member #123456 • Federally Insured
      </p>
      <p className="text-xs text-gray-500 mb-3">
        Equal Housing Opportunity • © 2024 All Rights Reserved
      </p>
      <div className="flex justify-center gap-4 text-xs text-gray-400">
        <button className="hover:text-brand-primary transition-colors">Privacy</button>
        <span>•</span>
        <button className="hover:text-brand-primary transition-colors">Terms</button>
        <span>•</span>
        <button className="hover:text-brand-primary transition-colors">Security</button>
      </div>
    </div>
  );
};

function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
