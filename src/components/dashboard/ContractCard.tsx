import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContractCardProps {
  id: string | number;
  title: string;
  subtitle?: string;
  status: string;
  statusVariant?: 'success' | 'warning' | 'error' | 'info';
  details?: {
    label: string;
    value: string;
  }[];
  value?: string;
  gradient?: string;
  footerContent?: ReactNode;
  onClick?: () => void;
  className?: string;
}

const statusVariants = {
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  error: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
};

const gradientColors = {
  blue: 'from-blue-500/5 to-indigo-500/5',
  green: 'from-green-500/5 to-emerald-500/5',
  purple: 'from-purple-500/5 to-pink-500/5',
  orange: 'from-orange-500/5 to-amber-500/5',
};

/**
 * Contract Card Component
 * 
 * Reusable card for displaying contract/agreement information
 * Features status badges, detail grids, value display
 * 
 * @example
 * <ContractCard
 *   id={1}
 *   title="Tech Solutions Inc."
 *   subtitle="Software Development"
 *   status="Active"
 *   statusVariant="success"
 *   details={[
 *     { label: 'Workers', value: '12' },
 *     { label: 'Duration', value: '6 months' }
 *   ]}
 *   value="$45,000"
 *   gradient="blue"
 * />
 */
export function ContractCard({
  id,
  title,
  subtitle,
  status,
  statusVariant = 'info',
  details = [],
  value,
  gradient = 'blue',
  footerContent,
  onClick,
  className,
}: ContractCardProps) {
  return (
    <div
      className={cn(
        "group relative p-3 border border-gray-200 rounded-lg",
        "hover:shadow-lg transition-all duration-300 bg-white overflow-hidden",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {/* Animated gradient background */}
      <div className={cn(
        "absolute top-0 right-0 w-24 h-24 rounded-full -mr-12 -mt-12",
        "group-hover:scale-150 transition-transform duration-500",
        `bg-gradient-to-br ${gradientColors[gradient as keyof typeof gradientColors] || gradientColors.blue}`
      )} />

      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-1.5">
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm truncate">{title}</h4>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-0.5 truncate">{subtitle}</p>
            )}
          </div>
          <span className={cn(
            "px-1.5 py-0.5 text-[10px] font-semibold rounded-full whitespace-nowrap ml-2",
            statusVariants[statusVariant]
          )}>
            {status}
          </span>
        </div>

        {/* Details grid */}
        {details.length > 0 && (
          <div className={cn(
            "grid gap-2 mt-2 text-xs",
            details.length === 2 && "grid-cols-2",
            details.length === 3 && "grid-cols-3",
            details.length > 3 && "grid-cols-2"
          )}>
            {details.map((detail, index) => (
              <div key={index}>
                <p className="text-muted-foreground text-[10px]">{detail.label}</p>
                <p className="font-semibold">{detail.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Footer with value and actions */}
        {(value || footerContent) && (
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
            {value && (
              <span className="text-base font-bold text-green-600">{value}</span>
            )}
            {footerContent}
          </div>
        )}
      </div>
    </div>
  );
}
