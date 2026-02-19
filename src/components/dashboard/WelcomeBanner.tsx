import React from 'react';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface WelcomeBannerAction {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
}

interface WelcomeBannerProps {
  title: string;
  subtitle?: string;
  badgeText?: string;
  badgeIcon?: LucideIcon;
  badgeLabel?: string;
  /** Legacy gradient prop — ignored, banner now uses CSS theme variables */
  gradient?: string;
  primaryAction?: WelcomeBannerAction;
  secondaryAction?: WelcomeBannerAction;
  decorativeIcon?: LucideIcon;
  children?: React.ReactNode;
}

export function WelcomeBanner({
  title,
  subtitle,
  badgeText,
  badgeIcon: BadgeIcon,
  badgeLabel,
  primaryAction,
  secondaryAction,
  decorativeIcon: DecorativeIcon,
  children,
}: WelcomeBannerProps) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl text-white transition-colors duration-300"
      style={{
        background: 'linear-gradient(to bottom right, var(--theme-banner-from), var(--theme-banner-via), var(--theme-banner-to))',
      }}
    >
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:25px_25px]" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -ml-48 -mt-48" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mb-48" />

      <div className="relative p-3 md:p-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex-1 space-y-2">
            {(badgeText || badgeLabel) && BadgeIcon && (
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center shadow-lg">
                    <BadgeIcon className="h-5 w-5 text-white" />
                  </div>
                  {badgeText && (
                    <div className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 bg-green-400 rounded-full flex items-center justify-center text-xs font-bold shadow-md">
                      ✓
                    </div>
                  )}
                </div>
                <div>
                  {badgeLabel && (
                    <div className="text-xs text-white/70 uppercase tracking-wide font-semibold">
                      {badgeLabel}
                    </div>
                  )}
                  {badgeText && (
                    <div className="text-sm font-bold">{badgeText}</div>
                  )}
                </div>
              </div>
            )}

            <div>
              <h1 className="text-lg md:text-xl font-bold mb-1.5">{title}</h1>
              {subtitle && <p className="text-xs text-white/70 max-w-2xl">{subtitle}</p>}
            </div>

            {(primaryAction || secondaryAction) && (
              <div className="flex flex-wrap gap-2">
                {primaryAction && (
                  <Button
                    size="sm"
                    className="bg-white hover:bg-gray-100 shadow-2xl font-semibold"
                    style={{ color: 'var(--theme-banner-via)' }}
                    onClick={primaryAction.onClick}
                  >
                    <primaryAction.icon className="mr-1.5 h-3.5 w-3.5" />
                    {primaryAction.label}
                  </Button>
                )}
                {secondaryAction && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                    onClick={secondaryAction.onClick}
                  >
                    {secondaryAction.label}
                    <secondaryAction.icon className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            )}

            {children && (
              <div className="mt-2 w-full">
                {children}
              </div>
            )}
          </div>

          {DecorativeIcon && (
            <div className="hidden lg:block relative">
              <div className="relative w-28 h-28">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-full blur-lg" />
                <div className="relative w-full h-full bg-white/10 backdrop-blur-xl rounded-full border border-white/30 flex items-center justify-center shadow-lg">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      background: 'linear-gradient(to bottom right, var(--theme-icon-3-from), var(--theme-icon-4-to))',
                    }}
                  >
                    <DecorativeIcon className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
