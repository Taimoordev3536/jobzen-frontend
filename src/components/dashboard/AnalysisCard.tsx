import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SummaryBox {
  label: string;
  value: string;
  variant?: 'default' | 'success' | 'warning';
}

interface AnalysisStat {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
  trend?: 'up' | 'down';
}

interface AnalysisCardProps {
  title: string;
  description?: string;
  gradient: string;
  summaryBoxes?: SummaryBox[];
  stats: AnalysisStat[];
  columns?: 2 | 3 | 4;
  className?: string;
}

/**
 * Analysis Card Component
 * 
 * Displays analytics overview with gradient background, summary boxes, and stat grid
 * Used for dashboard analytics sections showing metrics with trends
 * 
 * @example
 * <AnalysisCard
 *   title="Platform Overview"
 *   description="Real-time metrics and insights"
 *   gradient={gradients.admin}
 *   summaryBoxes={[
 *     { label: 'This Month', value: '+$284K' },
 *     { label: 'Growth', value: '↑ 23%', variant: 'success' }
 *   ]}
 *   stats={[
 *     { title: 'Total Users', value: '1,234', change: '+12%', icon: Users, color: 'from-blue-500...', trend: 'up' }
 *   ]}
 *   columns={4}
 * />
 */
export function AnalysisCard({
  title,
  description,
  gradient,
  summaryBoxes,
  stats,
  columns = 4,
  className,
}: AnalysisCardProps) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-3xl p-4 text-white",
      gradient,
      className
    )}>
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -ml-48 -mb-48" />
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold mb-0.5">{title}</h2>
            {description && (
              <p className="text-xs text-gray-300">{description}</p>
            )}
          </div>
          
          {/* Summary Boxes */}
          {summaryBoxes && summaryBoxes.length > 0 && (
            <div className="hidden md:flex items-center gap-2">
              {summaryBoxes.map((box, index) => (
                <div
                  key={index}
                  className="px-2.5 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
                >
                  <div className="text-xs text-gray-300">{box.label}</div>
                  <div className={cn(
                    "text-base font-bold",
                    box.variant === 'success' && "text-green-400",
                    box.variant === 'warning' && "text-yellow-400"
                  )}>
                    {box.value}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Stats Grid */}
        <div className={cn(
          "grid gap-2.5",
          columns === 2 && "md:grid-cols-2",
          columns === 3 && "md:grid-cols-3",
          columns === 4 && "md:grid-cols-4"
        )}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === 'up' ? TrendingUp : stat.trend === 'down' ? TrendingDown : null;
            
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg bg-white/10 backdrop-blur-md border border-white/20 p-3 hover:bg-white/15 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className={cn(
                    "inline-flex p-2 rounded-lg mb-2 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300",
                    `bg-gradient-to-br ${stat.color}`
                  )}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-xs text-gray-300">{stat.title}</div>
                    <div className="text-xl font-bold">{stat.value}</div>
                    {stat.trend && TrendIcon && (
                      <div className={`inline-flex items-center gap-1 text-xs ${
                        stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        <TrendIcon className="h-3 w-3" />
                        <span>{stat.change}</span>
                      </div>
                    )}
                    {!stat.trend && (
                      <div className="text-xs text-gray-400">{stat.change}</div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
