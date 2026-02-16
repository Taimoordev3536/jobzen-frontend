import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  gradient: string;
}

export function StatCard({ title, value, change, icon, gradient }: StatCardProps) {
  const Icon = icon;
  
  return (
    <div className="group relative">
      <div className={cn(
        "absolute -inset-0.5 rounded-xl blur opacity-25 group-hover:opacity-100 transition duration-500",
        `bg-gradient-to-r ${gradient}`
      )} />
      <Card className="relative border-0 shadow-lg bg-white overflow-hidden">
        <div className={cn(
          "absolute top-0 right-0 w-20 h-20 rounded-full -mr-10 -mt-10 opacity-10",
          `bg-gradient-to-br ${gradient}`
        )} />
        <CardContent className="p-3 space-y-2 relative">
          <div className="flex items-start justify-between">
            <div className={cn(
              "p-2 rounded-lg shadow-md transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300",
              `bg-gradient-to-br ${gradient}`
            )}>
              <Icon className="h-4 w-4 text-white" />
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-0.5">
              {title}
            </div>
            <div className="text-xl font-black tracking-tight mb-0.5">
              {value}
            </div>
            <div className="text-xs text-gray-600 font-medium">
              {change}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
