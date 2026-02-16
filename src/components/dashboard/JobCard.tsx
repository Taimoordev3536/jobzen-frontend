import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import { ViewDetailsButton } from '@/components/ui/ViewDetailsButton';
import { cn } from '@/lib/utils';

interface JobCardProps {
  id: string | number;
  title: string;
  subtitle?: string;
  location?: string;
  date?: string;
  time?: string;
  pay?: string;
  status: string;
  statusVariant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  leftBadge?: {
    icon: LucideIcon;
    label: string;
  };
  rightContent?: ReactNode;
  gradient?: string;
  onViewDetails?: () => void;
  onClick?: () => void;
  className?: string;
}

const statusVariants = {
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  error: 'bg-red-100 text-red-700',
  info: 'bg-blue-100 text-blue-700',
  neutral: 'bg-gray-100 text-gray-700',
};

const gradientColors = {
  blue: 'from-blue-500/5 to-purple-500/5',
  green: 'from-green-500/5 to-emerald-500/5',
  purple: 'from-purple-500/5 to-pink-500/5',
  orange: 'from-orange-500/5 to-amber-500/5',
  indigo: 'from-blue-500/5 to-indigo-500/5',
};

/**
 * Job Card Component
 * 
 * Reusable card for displaying job/task information
 * Features gradient backgrounds, status badges, location, date/time
 * 
 * @example
 * <JobCard
 *   id={1}
 *   title="Warehouse Associate"
 *   subtitle="Amazon Logistics"
 *   location="Seattle, WA"
 *   date="Feb 15, 2026"
 *   time="8:00 AM - 5:00 PM"
 *   pay="$25/hr"
 *   status="Confirmed"
 *   statusVariant="success"
 *   gradient="blue"
 * />
 */
export function JobCard({
  id,
  title,
  subtitle,
  location,
  date,
  time,
  pay,
  status,
  statusVariant = 'info',
  leftBadge,
  rightContent,
  gradient = 'blue',
  onViewDetails,
  onClick,
  className,
}: JobCardProps) {
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
        {/* Header with title and status */}
        <div className="flex items-start justify-between mb-1.5">
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-sm mb-1 truncate">{title}</h4>
            {subtitle && (
              <p className="text-xs text-muted-foreground truncate">{subtitle}</p>
            )}
          </div>
          <span className={cn(
            "px-2 py-0.5 text-[10px] font-bold rounded-full shadow-sm whitespace-nowrap ml-2",
            statusVariants[statusVariant]
          )}>
            {status}
          </span>
        </div>

        {/* Details section */}
        <div className="space-y-1 mt-2">
          {location && (
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate">{location}</span>
            </div>
          )}
          
          {(date || time) && (
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{date}{time && ` • ${time}`}</span>
            </div>
          )}
        </div>

        {/* Footer with actions */}
        {(leftBadge || pay || rightContent || onViewDetails) && (
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2">
              {leftBadge && (
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-gray-100 rounded-lg">
                  <leftBadge.icon className="h-3 w-3 text-gray-600" />
                  <span className="text-xs font-semibold">{leftBadge.label}</span>
                </div>
              )}
              {pay && (
                <span className="text-base font-bold text-green-600">{pay}</span>
              )}
            </div>
            {rightContent || (onViewDetails && <ViewDetailsButton size="md" onClick={onViewDetails} />)}
          </div>
        )}
      </div>
    </div>
  );
}
