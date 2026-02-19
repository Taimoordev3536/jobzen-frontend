import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DataListItemProps {
  icon?: LucideIcon;
  /** colorIndex 1–4 maps to --theme-icon-{n}-* CSS variables. Defaults to 1. */
  colorIndex?: 1 | 2 | 3 | 4;
  /** Legacy: still accepted for backward compat but CSS variables take priority */
  iconGradient?: string;
  primaryText: string;
  secondaryText?: string;
  rightContent?: ReactNode;
  badge?: {
    label: string;
    variant: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  };
  onClick?: () => void;
  className?: string;
}

const badgeVariants = {
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  error: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
  neutral: 'bg-gray-100 text-gray-700',
};

export function DataListItem({
  icon: Icon,
  colorIndex = 1,
  primaryText,
  secondaryText,
  rightContent,
  badge,
  onClick,
  className,
}: DataListItemProps) {
  const iconFrom = `var(--theme-icon-${colorIndex}-from)`;
  const iconTo = `var(--theme-icon-${colorIndex}-to)`;

  return (
    <div
      className={cn(
        'group relative flex items-center justify-between p-3',
        'border rounded-lg',
        'hover:shadow-lg transition-all duration-300 overflow-hidden',
        onClick && 'cursor-pointer',
        className,
      )}
      style={{
        backgroundColor: 'var(--theme-card-bg)',
        borderColor: 'var(--theme-card-border)',
      }}
      onClick={onClick}
    >
      {/* Hover gradient effect */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-500 opacity-5"
        style={{
          background: `linear-gradient(to bottom right, ${iconFrom}, ${iconTo})`,
        }}
      />

      <div className="flex items-center gap-2.5 relative flex-1 min-w-0">
        {Icon && (
          <div
            className="h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
            style={{
              background: `linear-gradient(to bottom right, ${iconFrom}, ${iconTo})`,
            }}
          >
            <Icon className="h-3.5 w-3.5 text-white" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-xs truncate" style={{ color: 'var(--theme-card-text)' }}>
            {primaryText}
          </p>
          {secondaryText && (
            <p className="text-[10px] truncate mt-0.5" style={{ color: 'var(--theme-card-subtext)' }}>
              {secondaryText}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 relative">
        {rightContent}
        {badge && (
          <span
            className={cn(
              'px-2 py-0.5 text-[10px] font-semibold rounded-full whitespace-nowrap',
              badgeVariants[badge.variant],
            )}
          >
            {badge.label}
          </span>
        )}
      </div>
    </div>
  );
}
