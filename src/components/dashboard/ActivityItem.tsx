import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ActivityItemProps {
  icon: LucideIcon;
  iconColor?: 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'red' | 'yellow';
  title: string;
  subtitle?: string;
  timestamp: string;
  className?: string;
}

const iconColorClasses = {
  blue: 'bg-blue-100 text-blue-600',
  green: 'bg-green-100 text-green-600',
  purple: 'bg-purple-100 text-purple-600',
  orange: 'bg-orange-100 text-orange-600',
  pink: 'bg-pink-100 text-pink-600',
  red: 'bg-red-100 text-red-600',
  yellow: 'bg-yellow-100 text-yellow-600',
};

/**
 * Activity Item Component
 * 
 * Displays a single activity/event item with icon, title, subtitle, and timestamp
 * Used in activity feeds, recent events, notifications, etc.
 * 
 * @example
 * <ActivityItem
 *   icon={Briefcase}
 *   iconColor="blue"
 *   title="New job posted"
 *   subtitle="by Tech Corp"
 *   timestamp="2 hours ago"
 * />
 */
export function ActivityItem({
  icon: Icon,
  iconColor = 'blue',
  title,
  subtitle,
  timestamp,
  className,
}: ActivityItemProps) {
  return (
    <div className={cn(
      "flex items-start gap-3 p-3 border border-gray-200 rounded-lg",
      "hover:shadow-lg transition-all duration-300 bg-white",
      className
    )}>
      <div className={cn(
        "h-7 w-7 rounded-lg flex items-center justify-center shadow-md flex-shrink-0",
        iconColorClasses[iconColor]
      )}>
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs">
          <span className="font-semibold">{title}</span>
          {subtitle && (
            <span className="text-muted-foreground"> {subtitle}</span>
          )}
        </p>
        <p className="text-[10px] text-muted-foreground mt-0.5">{timestamp}</p>
      </div>
    </div>
  );
}
