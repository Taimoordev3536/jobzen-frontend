import React from 'react';
import { Button } from './button';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { brandColors } from '@/config/colors.config';

type ActionVariant =
  | 'primary'       // Main CTA — uses theme accent
  | 'secondary'     // Secondary CTA — uses theme accent (lighter)
  | 'outline'       // Outlined — uses theme accent border/text
  | 'soft-primary'  // Soft — uses theme accent light bg
  | 'danger'        // Destructive — stays red
  | 'success'       // Positive — stays green
  | 'accent'        // Highlight — stays amber
  | 'neutral'       // Muted — stays gray
  | 'info';         // Informational — stays sky

interface ActionButtonProps {
  variant: ActionVariant;
  children: React.ReactNode;
  onClick?: () => void;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

/**
 * Variants that use the theme accent color are driven by CSS variables.
 * Semantic variants (danger, success, accent, neutral, info) keep fixed colors.
 */
const THEME_VARIANTS = new Set(['primary', 'secondary', 'outline', 'soft-primary']);

export const ActionButton: React.FC<ActionButtonProps> = ({
  variant,
  children,
  onClick,
  icon: Icon,
  iconPosition = 'left',
  size = 'md',
  className,
  disabled = false,
}) => {
  const sizeStyles = {
    sm: 'h-6 px-2.5 text-[10px]',
    md: 'h-8 px-4 text-xs',
    lg: 'h-10 px-6 text-sm',
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-3.5 w-3.5',
    lg: 'h-4 w-4',
  };

  // Fixed semantic colors (not theme-driven)
  const staticVariantStyles: Partial<Record<ActionVariant, string>> = {
    danger: `bg-[${brandColors.danger}] hover:bg-[${brandColors.dangerHover}] text-white border-0 shadow-sm hover:shadow-md`,
    success: `bg-[${brandColors.success}] hover:bg-[${brandColors.successHover}] text-white border-0 shadow-sm hover:shadow-md`,
    accent: `bg-[${brandColors.accent}] hover:bg-[${brandColors.accentHover}] text-white border-0 shadow-sm hover:shadow-md`,
    neutral: `bg-[${brandColors.neutral}] hover:bg-[${brandColors.neutralHover}] text-white border-0 shadow-sm hover:shadow-md`,
    info: `bg-[${brandColors.info}] hover:bg-[${brandColors.infoHover}] text-white border-0 shadow-sm hover:shadow-md`,
  };

  // For theme-driven variants, build inline style + minimal className
  const getThemeStyle = (): React.CSSProperties => {
    switch (variant) {
      case 'primary':
        return {
          background: 'var(--theme-accent)',
          color: '#ffffff',
          border: 'none',
        };
      case 'secondary':
        return {
          background: 'var(--theme-nav-active-to)',
          color: '#ffffff',
          border: 'none',
        };
      case 'outline':
        return {
          background: 'transparent',
          color: 'var(--theme-accent)',
          border: '1px solid var(--theme-accent)',
        };
      case 'soft-primary':
        return {
          background: 'var(--theme-accent-light)',
          color: 'var(--theme-accent)',
          border: 'none',
        };
      default:
        return {};
    }
  };

  const isThemeVariant = THEME_VARIANTS.has(variant);

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative font-medium rounded-lg transition-all duration-300 shadow-sm hover:shadow-md',
        !isThemeVariant && staticVariantStyles[variant],
        sizeStyles[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
      style={isThemeVariant ? getThemeStyle() : undefined}
    >
      <span className="flex items-center gap-1.5">
        {Icon && iconPosition === 'left' && <Icon className={iconSizes[size]} />}
        {children}
        {Icon && iconPosition === 'right' && <Icon className={iconSizes[size]} />}
      </span>
    </Button>
  );
};
