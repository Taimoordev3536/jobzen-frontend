/**
 * Brand Colors Configuration
 * 
 * Centralized color system for the JobZen application.
 * All colors should be referenced from this file to maintain consistency.
 * 
 * Usage:
 * import { brandColors, gradients } from '@/config/colors.config';
 * 
 * <div style={{ backgroundColor: brandColors.primary }} />
 * <div className={gradients.primary} />
 */

export const brandColors = {
  // Primary Brand Colors
  primary: '#4439CC',
  primaryHover: '#372FA8',
  primaryLight: '#EDEBFF',
  primaryLightHover: '#DCD9FF',
  
  // Secondary Brand Colors
  secondary: '#5B52E6',
  secondaryHover: '#4439CC',
  
  // Status Colors
  success: '#16A34A',
  successHover: '#15803D',
  
  danger: '#DC2626',
  dangerHover: '#B91C1C',
  
  warning: '#F59E0B',
  warningHover: '#D97706',
  
  info: '#0EA5E9',
  infoHover: '#0284C7',
  
  // Neutral Colors
  neutral: '#6B7280',
  neutralHover: '#4B5563',
  
  // Accent Colors
  accent: '#F59E0B',
  accentHover: '#D97706',
} as const;

/**
 * Gradient Classes
 * Pre-defined gradient combinations using Tailwind CSS classes
 */
export const gradients = {
  // Primary Gradients (used in headers, banners)
  primary: 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700',
  primaryBr: 'bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700',
  
  secondary: 'bg-gradient-to-r from-indigo-500 to-purple-500',
  secondaryBr: 'bg-gradient-to-br from-indigo-500 to-purple-500',
  
  // Success Gradients
  success: 'bg-gradient-to-r from-green-500 to-emerald-500',
  successBr: 'bg-gradient-to-br from-green-500 to-emerald-500',
  
  // Role-specific Gradients
  admin: 'bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-900',
  employer: 'bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700',
  worker: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700',
  client: 'bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-600',
  partner: 'bg-gradient-to-r from-indigo-700 via-blue-600 to-indigo-600',
  inspector: 'bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700',
  
  // Stat Card Gradients
  stats: {
    blue: 'from-blue-500 to-indigo-500',
    cyan: 'from-cyan-500 to-teal-500',
    green: 'from-emerald-500 to-teal-500',
    purple: 'from-violet-500 to-purple-500',
    orange: 'from-amber-500 to-orange-500',
    pink: 'from-purple-500 to-pink-500',
    indigo: 'from-blue-500 to-indigo-500',
  },
  
  // Decorative Background Gradients (subtle overlays)
  overlay: {
    blue: 'from-blue-500/5 to-indigo-500/5',
    green: 'from-green-500/5 to-emerald-500/5',
    purple: 'from-purple-500/5 to-pink-500/5',
    orange: 'from-orange-400/20 to-red-400/20',
  },
  
  // Icon/Badge Gradients
  icon: {
    blue: 'from-blue-500 to-purple-500',
    cyan: 'from-blue-500 via-blue-600 to-cyan-600',
    purple: 'from-purple-500 via-purple-600 to-pink-600',
    orange: 'from-amber-400 to-orange-500',
    yellow: 'from-yellow-400 to-orange-500',
  },
  
  // Card Background Gradients
  card: {
    white: 'from-white to-gray-50',
    blue: 'from-blue-50 via-blue-50/50 to-white',
    purple: 'from-purple-50 via-purple-50/50 to-white',
    gray: 'from-gray-50 via-white to-blue-50',
  },
  
  // Hero/Auth Page Gradients
  auth: {
    hero: 'from-blue-600 via-purple-600 to-indigo-700',
    card: 'from-white to-gray-50',
  },
} as const;

/**
 * Text Gradient Classes
 * For creating gradient text effects
 */
export const textGradients = {
  primary: 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent',
  secondary: 'bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent',
  success: 'bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent',
  dark: 'bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent',
} as const;

/**
 * Opacity Values
 * Consistent opacity values for overlays and backgrounds
 */
export const opacities = {
  subtle: '5',
  light: '10',
  medium: '20',
  strong: '30',
  heavy: '40',
} as const;

/**
 * Helper function to create custom gradients
 * @param from - Starting color (Tailwind color class)
 * @param to - Ending color (Tailwind color class)
 * @param direction - Gradient direction ('r' | 'br' | 'bl' | 'tr' | 'tl')
 */
export const createGradient = (
  from: string,
  to: string,
  direction: 'r' | 'br' | 'bl' | 'tr' | 'tl' = 'r'
) => {
  return `bg-gradient-to-${direction} from-${from} to-${to}`;
};

/**
 * Color Palette for UI Elements
 */
export const uiColors = {
  badge: {
    blue: { bg: 'bg-blue-50', text: 'text-blue-700' },
    green: { bg: 'bg-green-100', text: 'text-green-700' },
    yellow: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    red: { bg: 'bg-red-100', text: 'text-red-700' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-700' },
    gray: { bg: 'bg-gray-100', text: 'text-gray-700' },
  },
  border: {
    light: 'border-gray-200',
    medium: 'border-gray-300',
    focus: 'border-blue-500',
  },
  shadow: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    colored: {
      blue: 'shadow-blue-500/40',
      purple: 'shadow-purple-500/40',
      green: 'shadow-green-500/40',
    },
  },
} as const;

export type BrandColor = keyof typeof brandColors;
export type GradientKey = keyof typeof gradients;
export type StatGradientKey = keyof typeof gradients.stats;
