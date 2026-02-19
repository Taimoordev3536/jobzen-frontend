'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/store/themeStore';
import { themeTokens } from '@/config/colors.config';

/**
 * ThemeProvider
 *
 * Reads the active theme from the store, looks up its token map in
 * colors.config.ts, and injects every --theme-* CSS variable onto
 * <html> at runtime.  This is the only place CSS variables are set —
 * no hardcoded theme blocks live in globals.css.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const { activeTheme } = useThemeStore();

    useEffect(() => {
        const root = document.documentElement;

        // Set data-theme attribute (used by any remaining CSS selectors)
        root.setAttribute('data-theme', activeTheme);

        // Inject all CSS variables for the active theme
        const tokens = themeTokens[activeTheme] ?? themeTokens['default'];
        Object.entries(tokens).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
    }, [activeTheme]);

    return <>{children}</>;
}
