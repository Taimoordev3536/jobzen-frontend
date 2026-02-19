'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/themeStore';

interface QuickAction {
  title: string;
  description: string;
  icon: LucideIcon;
  color: 'blue' | 'purple' | 'green' | 'emerald' | 'orange' | 'amber' | 'pink' | 'indigo';
  onClick?: () => void;
}

interface QuickActionsCardProps {
  title?: string;
  description?: string;
  actions: QuickAction[];
  columns?: 2 | 3 | 4;
  className?: string;
}

/* ── Original multi-color themes (used when activeTheme === 'default') ── */
const colorThemes = {
  blue: {
    bg: 'from-blue-50 via-blue-50/50 to-white',
    border: 'border-blue-100 hover:border-blue-300',
    shadow: 'hover:shadow-blue-500/20',
    gradient: 'from-blue-500/0 via-blue-500/0 to-blue-500/5 group-hover:from-blue-500/10 group-hover:via-blue-500/5 group-hover:to-blue-500/10',
    decorative: 'from-blue-400/20 to-cyan-400/20',
    iconBg: 'from-blue-500 via-blue-600 to-cyan-600',
    iconShadow: 'shadow-blue-500/40',
    hoverText: 'group-hover:text-blue-600',
  },
  purple: {
    bg: 'from-purple-50 via-purple-50/50 to-white',
    border: 'border-purple-100 hover:border-purple-300',
    shadow: 'hover:shadow-purple-500/20',
    gradient: 'from-purple-500/0 via-purple-500/0 to-purple-500/5 group-hover:from-purple-500/10 group-hover:via-purple-500/5 group-hover:to-purple-500/10',
    decorative: 'from-purple-400/20 to-pink-400/20',
    iconBg: 'from-purple-500 via-purple-600 to-pink-600',
    iconShadow: 'shadow-purple-500/40',
    hoverText: 'group-hover:text-purple-600',
  },
  green: {
    bg: 'from-green-50 via-green-50/50 to-white',
    border: 'border-green-100 hover:border-green-300',
    shadow: 'hover:shadow-green-500/20',
    gradient: 'from-green-500/0 via-green-500/0 to-green-500/5 group-hover:from-green-500/10 group-hover:via-green-500/5 group-hover:to-green-500/10',
    decorative: 'from-green-400/20 to-emerald-400/20',
    iconBg: 'from-green-500 via-green-600 to-emerald-600',
    iconShadow: 'shadow-green-500/40',
    hoverText: 'group-hover:text-green-600',
  },
  emerald: {
    bg: 'from-emerald-50 via-emerald-50/50 to-white',
    border: 'border-emerald-100 hover:border-emerald-300',
    shadow: 'hover:shadow-emerald-500/20',
    gradient: 'from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 group-hover:from-emerald-500/10 group-hover:via-emerald-500/5 group-hover:to-emerald-500/10',
    decorative: 'from-emerald-400/20 to-teal-400/20',
    iconBg: 'from-emerald-500 via-emerald-600 to-teal-600',
    iconShadow: 'shadow-emerald-500/40',
    hoverText: 'group-hover:text-emerald-600',
  },
  orange: {
    bg: 'from-orange-50 via-orange-50/50 to-white',
    border: 'border-orange-100 hover:border-orange-300',
    shadow: 'hover:shadow-orange-500/20',
    gradient: 'from-orange-500/0 via-orange-500/0 to-orange-500/5 group-hover:from-orange-500/10 group-hover:via-orange-500/5 group-hover:to-orange-500/10',
    decorative: 'from-orange-400/20 to-amber-400/20',
    iconBg: 'from-orange-500 via-orange-600 to-amber-600',
    iconShadow: 'shadow-orange-500/40',
    hoverText: 'group-hover:text-orange-600',
  },
  amber: {
    bg: 'from-amber-50 via-amber-50/50 to-white',
    border: 'border-amber-100 hover:border-amber-300',
    shadow: 'hover:shadow-amber-500/20',
    gradient: 'from-amber-500/0 via-amber-500/0 to-amber-500/5 group-hover:from-amber-500/10 group-hover:via-amber-500/5 group-hover:to-amber-500/10',
    decorative: 'from-amber-400/20 to-yellow-400/20',
    iconBg: 'from-amber-500 via-amber-600 to-yellow-600',
    iconShadow: 'shadow-amber-500/40',
    hoverText: 'group-hover:text-amber-600',
  },
  pink: {
    bg: 'from-pink-50 via-pink-50/50 to-white',
    border: 'border-pink-100 hover:border-pink-300',
    shadow: 'hover:shadow-pink-500/20',
    gradient: 'from-pink-500/0 via-pink-500/0 to-pink-500/5 group-hover:from-pink-500/10 group-hover:via-pink-500/5 group-hover:to-pink-500/10',
    decorative: 'from-pink-400/20 to-rose-400/20',
    iconBg: 'from-pink-500 via-pink-600 to-rose-600',
    iconShadow: 'shadow-pink-500/40',
    hoverText: 'group-hover:text-pink-600',
  },
  indigo: {
    bg: 'from-indigo-50 via-indigo-50/50 to-white',
    border: 'border-indigo-100 hover:border-indigo-300',
    shadow: 'hover:shadow-indigo-500/20',
    gradient: 'from-indigo-500/0 via-indigo-500/0 to-indigo-500/5 group-hover:from-indigo-500/10 group-hover:via-indigo-500/5 group-hover:to-indigo-500/10',
    decorative: 'from-indigo-400/20 to-purple-400/20',
    iconBg: 'from-indigo-500 via-indigo-600 to-purple-600',
    iconShadow: 'shadow-indigo-500/40',
    hoverText: 'group-hover:text-indigo-600',
  },
};

export function QuickActionsCard({
  title = 'Quick Actions',
  description,
  actions,
  columns = 4,
  className,
}: QuickActionsCardProps) {
  const { activeTheme } = useThemeStore();
  const isDefault = activeTheme === 'default';

  return (
    <Card className={cn(
      "border-0 shadow-xl overflow-hidden relative",
      isDefault
        ? "bg-gradient-to-br from-gray-50 via-white to-blue-50"
        : undefined,
      className
    )}
      style={!isDefault ? { backgroundColor: 'var(--theme-card-bg)', borderColor: 'var(--theme-card-border)' } : undefined}
    >
      {isDefault && (
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full -mr-24 -mt-24 blur-3xl" />
      )}

      <CardHeader className="relative">
        <CardTitle
          className={cn("text-lg font-bold", isDefault && "bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent")}
          style={!isDefault ? { color: 'var(--theme-card-text)' } : undefined}
        >
          {title}
        </CardTitle>
        {description && (
          <CardDescription
            className={isDefault ? "mt-1 text-gray-600" : "mt-1"}
            style={!isDefault ? { color: 'var(--theme-card-subtext)' } : undefined}
          >
            {description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="relative">
        <div className={cn(
          "grid gap-3",
          columns === 2 && "sm:grid-cols-2",
          columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
          columns === 4 && "sm:grid-cols-2 lg:grid-cols-4"
        )}>
          {actions.map((action, index) => {
            const Icon = action.icon;

            /* ── Default theme: use original per-color Tailwind classes ── */
            if (isDefault) {
              const theme = colorThemes[action.color];
              return (
                <div
                  key={index}
                  onClick={action.onClick}
                  className={cn(
                    "group relative overflow-hidden rounded-xl border transition-all duration-500",
                    "hover:shadow-lg hover:-translate-y-1",
                    action.onClick && "cursor-pointer",
                    `bg-gradient-to-br ${theme.bg}`,
                    theme.border,
                    theme.shadow
                  )}
                >
                  <div className={cn("absolute inset-0 transition-all duration-500", `bg-gradient-to-br ${theme.gradient}`)} />
                  <div className={cn("absolute top-0 right-0 w-24 h-24 rounded-full -mr-12 -mt-12 blur-xl group-hover:scale-150 transition-transform duration-700", `bg-gradient-to-br ${theme.decorative}`)} />
                  <div className="relative p-4 flex flex-col items-center text-center gap-3">
                    <div className={cn("h-12 w-12 rounded-xl shadow-lg flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500", `bg-gradient-to-br ${theme.iconBg}`, theme.iconShadow)}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className={cn("font-semibold text-sm text-gray-900 transition-colors", theme.hoverText)}>{action.title}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{action.description}</p>
                    </div>
                  </div>
                </div>
              );
            }

            /* ── Non-default theme: use CSS variables so all cards match the theme ── */
            const slot = ((index % 4) + 1) as 1 | 2 | 3 | 4;
            const iconFrom = `var(--theme-icon-${slot}-from)`;
            const iconTo = `var(--theme-icon-${slot}-to)`;

            return (
              <div
                key={index}
                onClick={action.onClick}
                className={cn(
                  "group relative overflow-hidden rounded-xl border-2 transition-all duration-300",
                  "hover:shadow-lg hover:-translate-y-0.5",
                  action.onClick && "cursor-pointer",
                )}
                style={{
                  backgroundColor: 'var(--theme-qa-card-bg)',
                  borderColor: 'var(--theme-qa-card-border)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--theme-qa-card-hover-border)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--theme-qa-card-border)';
                }}
              >
                <div
                  className="absolute top-0 right-0 w-24 h-24 rounded-full -mr-12 -mt-12 blur-xl opacity-20 group-hover:scale-150 transition-transform duration-700"
                  style={{ background: `linear-gradient(to bottom right, ${iconFrom}, ${iconTo})` }}
                />
                <div className="relative p-4 flex flex-col items-center text-center gap-3">
                  <div
                    className="h-12 w-12 rounded-xl shadow-md flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                    style={{ background: `linear-gradient(to bottom right, ${iconFrom}, ${iconTo})` }}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm transition-colors" style={{ color: iconFrom }}>
                      {action.title}
                    </h3>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--theme-card-subtext)' }}>
                      {action.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
