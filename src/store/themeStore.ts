import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeId = 'default' | 'forest' | 'midnight' | 'navy';

export interface Theme {
    id: ThemeId;
    name: string;
    colors: {
        primary: string;
        secondary: string;
        background: string;
    };
}

export const themes: Theme[] = [
    {
        id: 'default',
        name: 'Default',
        colors: { primary: '#3b82f6', secondary: '#10b981', background: '#F5F5FA' },
    },
    {
        id: 'forest',
        name: 'Forest',
        colors: { primary: '#5C6A5B', secondary: '#374035', background: '#E6E5E7' },
    },
    {
        id: 'midnight',
        name: 'Midnight',
        colors: { primary: '#1E1E1E', secondary: '#545454', background: '#C7C7C7' },
    },
    {
        id: 'navy',
        name: 'Navy',
        colors: { primary: '#292F3D', secondary: '#575A63', background: '#FFFFFF' },
    },
];

interface ThemeStore {
    activeTheme: ThemeId;
    setTheme: (id: ThemeId) => void;
}

export const useThemeStore = create<ThemeStore>()(
    persist(
        (set) => ({
            activeTheme: 'default',
            setTheme: (id) => {
                set({ activeTheme: id });
                if (typeof document !== 'undefined') {
                    document.documentElement.setAttribute('data-theme', id);
                }
            },
        }),
        {
            name: 'jobzen-theme',
        }
    )
);
