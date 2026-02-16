import React, { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ViewDetailsButton } from '@/components/ui/ViewDetailsButton';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { gradients } from '@/config/colors.config';

interface DashboardCardProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  iconGradient?: string;
  showViewAll?: boolean;
  onViewAll?: () => void;
  headerClassName?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Reusable Dashboard Card Component
 * 
 * Provides consistent card styling with icon, title, description, and optional "View All" button
 * Used across all role dashboards for sections like "Recent Activity", "Active Jobs", etc.
 * 
 * @example
 * <DashboardCard
 *   title="Recent Activity"
 *   description="Latest platform activities"
 *   icon={Activity}
 *   iconGradient={gradients.icon.blue}
 *   showViewAll
 * >
 *   {activities.map(activity => <ListItem key={activity.id} {...activity} />)}
 * </DashboardCard>
 */
export function DashboardCard({
  title,
  description,
  icon: Icon,
  iconGradient = gradients.icon.blue,
  showViewAll = true,
  onViewAll,
  headerClassName,
  children,
  className,
}: DashboardCardProps) {
  return (
    <Card className={cn("border-0 shadow-lg", gradients.card.white, className)}>
      <CardHeader className={cn("border-b pb-3", headerClassName)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={cn("h-7 w-7 rounded-lg flex items-center justify-center", iconGradient)}>
              <Icon className="h-3.5 w-3.5 text-white" />
            </div>
            <div>
              <CardTitle className="text-base">{title}</CardTitle>
              {description && (
                <CardDescription className="mt-0.5 text-xs">{description}</CardDescription>
              )}
            </div>
          </div>
          {showViewAll && (
            <ViewDetailsButton size="md" label="View All" onClick={onViewAll} />
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-3">
        {children}
      </CardContent>
    </Card>
  );
}
