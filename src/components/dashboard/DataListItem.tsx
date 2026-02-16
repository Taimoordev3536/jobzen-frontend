import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DataListItemProps {
  icon?: LucideIcon;
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

/**
 * Data List Item Component
 * 
 * Generic list item for displaying data with icon, text, badge, and right content
 * Used in tables, lists, and data grids across dashboards
 * 
 * @example
 * <DataListItem
 *   icon={DollarSign}
 *   iconGradient="from-green-500 to-emerald-500"
 *   primaryText="Payment received"
 *   secondaryText="Invoice #1234 • Dec 22"
 *   badge={{ label: 'Paid', variant: 'success' }}
 *   rightContent={<span className="font-bold">$450</span>}
 * />
 */
export function DataListItem({
  icon: Icon,
  iconGradient = 'from-blue-500 to-indigo-500',
  primaryText,
  secondaryText,
  rightContent,
  badge,
  onClick,
  className,
}: DataListItemProps) {
  return (
    <div
      className={cn(
        "group relative flex items-center justify-between p-3",
        "border border-gray-200 rounded-lg bg-white",
        "hover:shadow-lg transition-all duration-300 overflow-hidden",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {/* Hover gradient effect */}
      <div className={cn(
        "absolute top-0 right-0 w-24 h-24 rounded-full -mr-12 -mt-12",
        "group-hover:scale-150 transition-transform duration-500 opacity-5",
        `bg-gradient-to-br ${iconGradient}`
      )} />

      <div className="flex items-center gap-2.5 relative flex-1 min-w-0">
        {Icon && (
          <div className={cn(
            "h-7 w-7 rounded-lg flex items-center justify-center flex-shrink-0",
            "transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300",
            `bg-gradient-to-br ${iconGradient}`
          )}>
            <Icon className="h-3.5 w-3.5 text-white" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-xs truncate">{primaryText}</p>
          {secondaryText && (
            <p className="text-[10px] text-muted-foreground truncate mt-0.5">
              {secondaryText}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 relative">
        {rightContent}
        {badge && (
          <span className={cn(
            "px-2 py-0.5 text-[10px] font-semibold rounded-full whitespace-nowrap",
            badgeVariants[badge.variant]
          )}>
            {badge.label}
          </span>
        )}
      </div>
    </div>
  );
}
