/**
 * Brand Colors Configuration
 *
 * ╔══════════════════════════════════════════════════════╗
 * ║  SINGLE SOURCE OF TRUTH FOR ALL APP COLORS          ║
 * ║  Edit values here → entire app updates automatically ║
 * ╚══════════════════════════════════════════════════════╝
 *
 * Usage:
 *   import { brandColors, themeTokens } from '@/config/colors.config';
 */

// ─── Brand / Semantic Colors ────────────────────────────────────────────────

export const brandColors = {
  // Primary Brand
  primary: '#4439CC',
  primaryHover: '#372FA8',
  primaryLight: '#EDEBFF',
  primaryLightHover: '#DCD9FF',

  // Secondary Brand
  secondary: '#5B52E6',
  secondaryHover: '#4439CC',

  // Status
  success: '#16A34A',
  successHover: '#15803D',

  danger: '#DC2626',
  dangerHover: '#B91C1C',

  warning: '#F59E0B',
  warningHover: '#D97706',

  info: '#0EA5E9',
  infoHover: '#0284C7',

  // Neutral
  neutral: '#6B7280',
  neutralHover: '#4B5563',

  // Accent
  accent: '#F59E0B',
  accentHover: '#D97706',
} as const;

// ─── Gradient Classes ────────────────────────────────────────────────────────

export const gradients = {
  primary: 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700',
  primaryBr: 'bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700',
  secondary: 'bg-gradient-to-r from-indigo-500 to-purple-500',
  secondaryBr: 'bg-gradient-to-br from-indigo-500 to-purple-500',
  success: 'bg-gradient-to-r from-green-500 to-emerald-500',
  successBr: 'bg-gradient-to-br from-green-500 to-emerald-500',
  admin: 'bg-gradient-to-br from-indigo-900 via-blue-900 to-indigo-900',
  employer: 'bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700',
  worker: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700',
  client: 'bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-600',
  partner: 'bg-gradient-to-r from-indigo-700 via-blue-600 to-indigo-600',
  inspector: 'bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700',
  stats: {
    blue: 'bg-gradient-to-br from-blue-500 to-indigo-500',
    cyan: 'bg-gradient-to-br from-cyan-500 to-teal-500',
    green: 'bg-gradient-to-br from-emerald-500 to-teal-500',
    purple: 'bg-gradient-to-br from-violet-500 to-purple-500',
    orange: 'bg-gradient-to-br from-amber-500 to-orange-500',
    pink: 'bg-gradient-to-br from-purple-500 to-pink-500',
    indigo: 'bg-gradient-to-br from-blue-500 to-indigo-500',
  },
  overlay: {
    blue: 'from-blue-500/5 to-indigo-500/5',
    green: 'from-green-500/5 to-emerald-500/5',
    purple: 'from-purple-500/5 to-pink-500/5',
    orange: 'from-orange-400/20 to-red-400/20',
  },
  icon: {
    blue: 'from-blue-500 to-purple-500',
    cyan: 'from-blue-500 via-blue-600 to-cyan-600',
    purple: 'from-purple-500 via-purple-600 to-pink-600',
    orange: 'from-amber-400 to-orange-500',
    yellow: 'from-yellow-400 to-orange-500',
  },
  card: {
    white: 'bg-gradient-to-br from-white to-gray-50',
    blue: 'bg-gradient-to-br from-blue-50 via-blue-50/50 to-white',
    purple: 'bg-gradient-to-br from-purple-50 via-purple-50/50 to-white',
    gray: 'bg-gradient-to-br from-gray-50 via-white to-blue-50',
  },
  auth: {
    hero: 'from-blue-600 via-purple-600 to-indigo-700',
    card: 'from-white to-gray-50',
  },
} as const;

// ─── Text Gradients ──────────────────────────────────────────────────────────

export const textGradients = {
  primary: 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent',
  secondary: 'bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent',
  success: 'bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent',
  dark: 'bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent',
} as const;

// ─── UI Colors ───────────────────────────────────────────────────────────────

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

// ─── Theme Tokens ─────────────────────────────────────────────────────────────
//
// This is the MASTER color map for all themes.
// ThemeProvider reads this at runtime and injects each key as a CSS variable.
// To change any color: edit the value here — no need to touch globals.css or components.
//
// Variable naming: keys are CSS variable names (with leading --)

export type ThemeTokenMap = Record<string, string>;

export const themeTokens: Record<string, ThemeTokenMap> = {

  // ── Default (Original Multi-Color) ─────────────────────────────────────────
  default: {
    // Overrides for Shadcn UI
    '--primary': '244.5 57% 51.2%', // #4439CC
    '--primary-foreground': '0 0% 100%', // #ffffff
    '--ring': '244.5 57% 51.2%', // #4439CC
    '--border': '220 13% 91%', // #e5e7eb
    '--input': '220 13% 91%', // #e5e7eb

    '--theme-page-bg': '#F5F5FA',
    '--theme-sidebar-bg': '#ffffff',
    '--theme-sidebar-border': '#e5e7eb',
    '--theme-navbar-bg': 'rgba(255, 255, 255, 0.85)',
    '--theme-nav-active-from': '#4439CC',
    '--theme-nav-active-to': '#5B52E6',
    '--theme-nav-active-shadow': 'rgba(68, 57, 204, 0.25)',
    '--theme-nav-hover-bg': '#f3f4f6',
    '--theme-nav-hover-icon': '#4439CC',
    '--theme-nav-text': '#374151',
    '--theme-nav-active-text': '#ffffff',
    '--theme-accent': '#4439CC',
    '--theme-accent-light': '#f3f4f6',
    '--theme-accent-light-hover': '#DBEAFE',
    '--theme-logo-from': '#4439CC',
    '--theme-logo-via': '#5B52E6',
    '--theme-logo-to': '#7C75F0',
    '--theme-avatar-from': '#4439CC',
    '--theme-avatar-to': '#7C75F0',
    '--theme-role-color': '#4439CC',
    '--theme-user-card-bg': '#f3f4f6',
    '--theme-user-card-border': '#e5e7eb',
    // Banner
    '--theme-banner-from': '#1e3a8a',
    '--theme-banner-via': '#4439CC',
    '--theme-banner-to': '#6d28d9',
    // Cards
    '--theme-card-bg': '#ffffff',
    '--theme-card-border': '#e5e7eb',
    '--theme-card-text': '#111827',
    '--theme-card-subtext': '#6b7280',
    // Icon slots — multi-color (slot 1=blue, 2=green, 3=violet, 4=amber)
    '--theme-icon-1-from': '#3b82f6',
    '--theme-icon-1-to': '#6366f1',
    '--theme-icon-2-from': '#10b981',
    '--theme-icon-2-to': '#14b8a6',
    '--theme-icon-3-from': '#8b5cf6',
    '--theme-icon-3-to': '#a855f7',
    '--theme-icon-4-from': '#f59e0b',
    '--theme-icon-4-to': '#f97316',
    // Quick Actions Card
    '--theme-qa-card-bg': '#FAFAFA',
    '--theme-qa-card-border': '#e5e7eb',
    '--theme-qa-card-hover-border': '#4439CC',
    '--theme-qa-icon-from': '#4439CC',
    '--theme-qa-icon-to': '#5B52E6',
  },

  // ── Forest (Green) ──────────────────────────────────────────────────────────
  forest: {
    // Overrides for Shadcn UI
    '--primary': '116 8% 39%', // #5C6A5B (Accent)
    '--primary-foreground': '0 0% 100%', // #ffffff
    '--ring': '116 8% 39%',
    '--border': '60 3% 82%', // #d4d3d0
    '--input': '60 3% 82%', // #d4d3d0

    '--theme-page-bg': '#E6E5E7',
    '--theme-sidebar-bg': '#f0f0ee',
    '--theme-sidebar-border': '#d4d3d0',
    '--theme-navbar-bg': 'rgba(240, 240, 238, 0.9)',
    '--theme-nav-active-from': '#374035',
    '--theme-nav-active-to': '#5C6A5B',
    '--theme-nav-active-shadow': 'rgba(55, 64, 53, 0.3)',
    '--theme-nav-hover-bg': '#e0dedd',
    '--theme-nav-hover-icon': '#374035',
    '--theme-nav-text': '#374035',
    '--theme-nav-active-text': '#ffffff',
    '--theme-accent': '#5C6A5B',
    '--theme-accent-light': '#dde8dc',
    '--theme-accent-light-hover': '#c8ddc7',
    '--theme-logo-from': '#374035',
    '--theme-logo-via': '#5C6A5B',
    '--theme-logo-to': '#7a8f79',
    '--theme-avatar-from': '#374035',
    '--theme-avatar-to': '#5C6A5B',
    '--theme-role-color': '#374035',
    '--theme-user-card-bg': '#e0dedd',
    '--theme-user-card-border': '#d4d3d0',
    '--theme-banner-from': '#2a3029',
    '--theme-banner-via': '#374035',
    '--theme-banner-to': '#4a5948',
    '--theme-card-bg': '#f5f4f2',
    '--theme-card-border': '#d4d3d0',
    '--theme-card-text': '#1a2019',
    '--theme-card-subtext': '#5a6859',
    '--theme-icon-1-from': '#374035',
    '--theme-icon-1-to': '#5C6A5B',
    '--theme-icon-2-from': '#5C6A5B',
    '--theme-icon-2-to': '#7a8f79',
    '--theme-icon-3-from': '#4a5948',
    '--theme-icon-3-to': '#6b7d6a',
    '--theme-icon-4-from': '#7a8f79',
    '--theme-icon-4-to': '#9aaf99',
    '--theme-qa-card-bg': '#eceae8',
    '--theme-qa-card-border': '#d4d3d0',
    '--theme-qa-card-hover-border': '#374035',
    '--theme-qa-icon-from': '#374035',
    '--theme-qa-icon-to': '#5C6A5B',
  },

  // ── Midnight (Dark) ─────────────────────────────────────────────────────────
  midnight: {
    // Overrides for Shadcn UI
    '--primary': '0 0% 12%', // #1E1E1E
    '--primary-foreground': '0 0% 100%', // #ffffff
    '--ring': '0 0% 12%',
    '--border': '0 0% 85%', // #d8d8d8
    '--input': '0 0% 85%', // #d8d8d8

    '--theme-page-bg': '#C7C7C7',
    '--theme-sidebar-bg': '#f0f0f0',
    '--theme-sidebar-border': '#d8d8d8',
    '--theme-navbar-bg': 'rgba(240, 240, 240, 0.9)',
    '--theme-nav-active-from': '#1E1E1E',
    '--theme-nav-active-to': '#545454',
    '--theme-nav-active-shadow': 'rgba(30, 30, 30, 0.3)',
    '--theme-nav-hover-bg': '#e0e0e0',
    '--theme-nav-hover-icon': '#1E1E1E',
    '--theme-nav-text': '#1E1E1E',
    '--theme-nav-active-text': '#ffffff',
    '--theme-accent': '#1E1E1E',
    '--theme-accent-light': '#e8e8e8',
    '--theme-accent-light-hover': '#d8d8d8',
    '--theme-logo-from': '#1E1E1E',
    '--theme-logo-via': '#545454',
    '--theme-logo-to': '#888888',
    '--theme-avatar-from': '#1E1E1E',
    '--theme-avatar-to': '#545454',
    '--theme-role-color': '#545454',
    '--theme-user-card-bg': '#e0e0e0',
    '--theme-user-card-border': '#d8d8d8',
    '--theme-banner-from': '#111111',
    '--theme-banner-via': '#1E1E1E',
    '--theme-banner-to': '#2d2d2d',
    '--theme-card-bg': '#f0f0f0',
    '--theme-card-border': '#d8d8d8',
    '--theme-card-text': '#111111',
    '--theme-card-subtext': '#545454',
    '--theme-icon-1-from': '#1E1E1E',
    '--theme-icon-1-to': '#545454',
    '--theme-icon-2-from': '#545454',
    '--theme-icon-2-to': '#888888',
    '--theme-icon-3-from': '#2d2d2d',
    '--theme-icon-3-to': '#666666',
    '--theme-icon-4-from': '#888888',
    '--theme-icon-4-to': '#aaaaaa',
    '--theme-qa-card-bg': '#e8e8e8',
    '--theme-qa-card-border': '#d8d8d8',
    '--theme-qa-card-hover-border': '#1E1E1E',
    '--theme-qa-icon-from': '#1E1E1E',
    '--theme-qa-icon-to': '#545454',
  },

  // ── Navy (Blue-Dark) ────────────────────────────────────────────────────────
  navy: {
    // Overrides for Shadcn UI
    '--primary': '222 20% 20%', // #292F3D
    '--primary-foreground': '0 0% 100%', // #ffffff
    '--ring': '222 20% 20%',
    '--border': '223 16% 90%', // #e2e4e9
    '--input': '223 16% 90%', // #e2e4e9

    '--theme-page-bg': '#FFFFFF',
    '--theme-sidebar-bg': '#ffffff',
    '--theme-sidebar-border': '#e2e4e9',
    '--theme-navbar-bg': 'rgba(255, 255, 255, 0.9)',
    '--theme-nav-active-from': '#292F3D',
    '--theme-nav-active-to': '#575A63',
    '--theme-nav-active-shadow': 'rgba(41, 47, 61, 0.3)',
    '--theme-nav-hover-bg': '#f0f1f4',
    '--theme-nav-hover-icon': '#292F3D',
    '--theme-nav-text': '#292F3D',
    '--theme-nav-active-text': '#ffffff',
    '--theme-accent': '#292F3D',
    '--theme-accent-light': '#e8eaf0',
    '--theme-accent-light-hover': '#d8dbe6',
    '--theme-logo-from': '#292F3D',
    '--theme-logo-via': '#575A63',
    '--theme-logo-to': '#8a8f9e',
    '--theme-avatar-from': '#292F3D',
    '--theme-avatar-to': '#575A63',
    '--theme-role-color': '#292F3D',
    '--theme-user-card-bg': '#f0f1f4',
    '--theme-user-card-border': '#e2e4e9',
    '--theme-banner-from': '#1a2030',
    '--theme-banner-via': '#292F3D',
    '--theme-banner-to': '#383e4e',
    '--theme-card-bg': '#ffffff',
    '--theme-card-border': '#e2e4e9',
    '--theme-card-text': '#111827',
    '--theme-card-subtext': '#575A63',
    '--theme-icon-1-from': '#292F3D',
    '--theme-icon-1-to': '#575A63',
    '--theme-icon-2-from': '#575A63',
    '--theme-icon-2-to': '#8a8f9e',
    '--theme-icon-3-from': '#383e4e',
    '--theme-icon-3-to': '#6b7280',
    '--theme-icon-4-from': '#8a8f9e',
    '--theme-icon-4-to': '#b0b5c0',
    '--theme-qa-card-bg': '#f5f6f8',
    '--theme-qa-card-border': '#e2e4e9',
    '--theme-qa-card-hover-border': '#292F3D',
    '--theme-qa-icon-from': '#292F3D',
    '--theme-qa-icon-to': '#575A63',
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const createGradient = (
  from: string,
  to: string,
  direction: 'r' | 'br' | 'bl' | 'tr' | 'tl' = 'r'
) => `bg-gradient-to-${direction} from-${from} to-${to}`;

export type BrandColor = keyof typeof brandColors;
export type GradientKey = keyof typeof gradients;
export type StatGradientKey = keyof typeof gradients.stats;
