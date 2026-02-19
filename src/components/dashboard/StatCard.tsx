import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  /** colorIndex 1–4 maps to --theme-icon-{n}-* CSS variables. Defaults to 1. */
  colorIndex?: 1 | 2 | 3 | 4;
  /** Legacy gradient string — ignored, kept for API compatibility */
  gradient?: string;
}

export function StatCard({ title, value, change, icon: Icon, colorIndex = 1 }: StatCardProps) {
  const iconFrom = `var(--theme-icon-${colorIndex}-from)`;
  const iconTo = `var(--theme-icon-${colorIndex}-to)`;

  return (
    <div className="group relative">
      <Card
        className="relative border overflow-hidden transition-all duration-300"
        style={{
          backgroundColor: 'var(--theme-card-bg)',
          borderColor: 'var(--theme-card-border)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 0 24px 6px color-mix(in srgb, ${iconFrom} 30%, transparent)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
        }}
      >
        <CardContent className="p-3 space-y-2 relative">
          {/* Decorative corner circle */}
          <div
            className="absolute top-0 right-0 w-20 h-20 rounded-full -mr-10 -mt-10 opacity-10"
            style={{ background: `linear-gradient(to bottom right, ${iconFrom}, ${iconTo})` }}
          />

          <div className="flex items-start justify-between">
            <div
              className="p-2 rounded-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
              style={{ background: `linear-gradient(to bottom right, ${iconFrom}, ${iconTo})` }}
            >
              <Icon className="h-4 w-4 text-white" />
            </div>
          </div>

          <div>
            <div
              className="text-xs font-semibold uppercase tracking-wide mb-0.5"
              style={{ color: 'var(--theme-card-subtext)' }}
            >
              {title}
            </div>
            <div
              className="text-xl font-black tracking-tight mb-0.5"
              style={{ color: 'var(--theme-card-text)' }}
            >
              {value}
            </div>
            <div className="text-xs font-medium" style={{ color: 'var(--theme-card-subtext)' }}>
              {change}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
