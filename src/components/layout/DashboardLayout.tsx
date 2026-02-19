'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore, themes, type ThemeId } from '@/store/themeStore';
import { brandColors } from '@/config/colors.config';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Briefcase,
  LayoutDashboard,
  Users,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Search,
  Building2,
  Wrench,
  UserCircle2,
  UsersIcon,
  Shield,
  MessageSquare,
  FileText,
  CreditCard,
  BarChart3,
  Calendar,
  MapPin,
  Clock,
  Palette,
  Check,
} from 'lucide-react';
import { getInitials } from '@/lib/utils';

interface MenuItem {
  label: string;
  href: string;
  icon: any;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  menuItems: MenuItem[];
  title: string;
}

export function DashboardLayout({ children, menuItems, title }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { activeTheme, setTheme } = useThemeStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [themePickerOpen, setThemePickerOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) {
        setThemePickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return Shield;
      case 'employer': return Building2;
      case 'worker': return Wrench;
      case 'client': return UserCircle2;
      case 'partner': return UsersIcon;
      default: return Users;
    }
  };

  const RoleIcon = user ? getRoleIcon(user.role) : Users;

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: 'var(--theme-page-bg)' }}
    >
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-56 border-r shadow-lg transform transition-all duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        style={{
          backgroundColor: 'var(--theme-sidebar-bg)',
          borderColor: 'var(--theme-sidebar-border)',
        }}
      >
        <div className="flex flex-col h-full relative">
          {/* Logo */}
          <div
            className="relative flex items-center justify-between h-14 px-4 border-b"
            style={{ borderColor: 'var(--theme-sidebar-border)' }}
          >
            <Link href="/" className="flex items-center gap-2 group h-full">
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-105"
                style={{
                  background: 'linear-gradient(to bottom right, var(--theme-logo-from), var(--theme-logo-via), var(--theme-logo-to))',
                }}
              >
                <Briefcase className="h-4 w-4 text-white" />
              </div>
              <span
                className="text-lg font-bold leading-none my-auto bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(to right, var(--theme-logo-from), var(--theme-logo-via), var(--theme-logo-to))',
                }}
              >
                Jobzen
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg transition-all duration-200 flex items-center justify-center"
              style={{ color: 'var(--theme-nav-text)' }}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* User Info */}
          <div className="relative p-3">
            <div
              className="rounded-xl p-3 border shadow-sm hover:shadow-md transition-all duration-300"
              style={{
                backgroundColor: 'var(--theme-user-card-bg)',
                borderColor: 'var(--theme-user-card-border)',
              }}
            >
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <Avatar className="h-10 w-10 border-2 border-white shadow-md">
                    <AvatarFallback
                      className="text-white font-semibold text-sm"
                      style={{
                        background: 'linear-gradient(to bottom right, var(--theme-avatar-from), var(--theme-avatar-to))',
                      }}
                    >
                      {user ? getInitials(user.name || user.email) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate" style={{ color: 'var(--theme-nav-text)' }}>
                    {user?.name || user?.email}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <RoleIcon className="h-3 w-3" style={{ color: 'var(--theme-role-color)' } as any} />
                    <span className="text-xs font-medium capitalize" style={{ color: 'var(--theme-role-color)' }}>
                      {user?.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="relative flex-1 overflow-y-auto px-3 pb-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-200"
                  style={isActive ? {
                    background: `linear-gradient(to right, var(--theme-nav-active-from), var(--theme-nav-active-to))`,
                    color: 'var(--theme-nav-active-text)',
                    boxShadow: `0 4px 12px var(--theme-nav-active-shadow)`,
                  } : {
                    color: 'var(--theme-nav-text)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      const el = e.currentTarget as HTMLElement;
                      el.style.backgroundColor = 'var(--theme-nav-hover-bg)';
                      // change icon wrapper bg and icon color
                      const iconWrap = el.querySelector('.nav-icon-wrap') as HTMLElement | null;
                      const iconEl = el.querySelector('.nav-icon-wrap svg') as HTMLElement | null;
                      if (iconWrap) iconWrap.style.backgroundColor = 'var(--theme-accent-light-hover, #DBEAFE)';
                      if (iconEl) iconEl.style.color = 'var(--theme-nav-hover-icon)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      const el = e.currentTarget as HTMLElement;
                      el.style.backgroundColor = '';
                      const iconWrap = el.querySelector('.nav-icon-wrap') as HTMLElement | null;
                      const iconEl = el.querySelector('.nav-icon-wrap svg') as HTMLElement | null;
                      if (iconWrap) iconWrap.style.backgroundColor = 'var(--theme-accent-light)';
                      if (iconEl) iconEl.style.color = '#6b7280';
                    }
                  }}
                >
                  <div
                    className="nav-icon-wrap p-1.5 rounded-lg transition-all duration-200 shrink-0"
                    style={{
                      backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'var(--theme-accent-light)',
                    }}
                  >
                    <Icon
                      className="h-4 w-4 transition-colors duration-200"
                      style={{ color: isActive ? '#ffffff' : brandColors.neutral } as any}
                    />
                  </div>
                  <span className="text-sm font-semibold">
                    {item.label}
                  </span>
                  {isActive && (
                    <div className="ml-auto h-1.5 w-1.5 bg-white rounded-full shadow-lg animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>



          {/* Footer */}
          <div
            className="relative p-3 border-t space-y-1"
            style={{ borderColor: 'var(--theme-sidebar-border)' }}
          >
            <Link
              href="/settings"
              className="group flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-200"
              style={{ color: 'var(--theme-nav-text)' }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = 'var(--theme-nav-hover-bg)';
                const iconWrap = el.querySelector('.nav-icon-wrap') as HTMLElement | null;
                const iconEl = el.querySelector('.nav-icon-wrap svg') as HTMLElement | null;
                if (iconWrap) iconWrap.style.backgroundColor = 'var(--theme-accent-light-hover, #DBEAFE)';
                if (iconEl) iconEl.style.color = 'var(--theme-nav-hover-icon)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.backgroundColor = '';
                const iconWrap = el.querySelector('.nav-icon-wrap') as HTMLElement | null;
                const iconEl = el.querySelector('.nav-icon-wrap svg') as HTMLElement | null;
                if (iconWrap) iconWrap.style.backgroundColor = 'var(--theme-accent-light)';
                if (iconEl) iconEl.style.color = brandColors.neutral;
              }}
            >
              <div className="nav-icon-wrap p-1.5 rounded-lg transition-all duration-200 shrink-0" style={{ backgroundColor: 'var(--theme-accent-light)' }}>
                <Settings className="h-4 w-4 transition-colors duration-200" style={{ color: brandColors.neutral } as any} />
              </div>
              <span className="text-sm font-semibold">Settings</span>
            </Link>
            <button
              onClick={handleLogout}
              className="group w-full flex items-center gap-2.5 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 hover:shadow-sm"
            >
              <div className="p-1.5 bg-red-50 rounded-lg group-hover:bg-red-100 transition-all duration-300">
                <LogOut className="h-4 w-4 text-red-600" />
              </div>
              <span className="text-sm font-semibold">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:pl-56">
        {/* Header */}
        <header
          className="sticky top-0 z-30 backdrop-blur-xl border-b shadow-sm transition-colors duration-300"
          style={{
            backgroundColor: 'var(--theme-navbar-bg)',
            borderColor: 'var(--theme-sidebar-border)',
          }}
        >
          <div className="flex items-center justify-between h-[54px] px-4">
            <div className="flex items-center gap-3 h-full">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-1.5 rounded-lg transition-all duration-200 flex items-center justify-center"
                style={{ color: 'var(--theme-nav-text)' }}
              >
                <Menu className="h-5 w-5" />
              </button>
              <h1
                className="text-base font-bold leading-none my-auto"
                style={{ color: 'var(--theme-nav-text)' }}
              >
                {title}
              </h1>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Search */}
              <button
                className="p-1.5 rounded-lg transition-all duration-200 hover:shadow-sm flex items-center justify-center"
                style={{ color: 'var(--theme-nav-text)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--theme-nav-hover-bg)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = ''; }}
              >
                <Search className="h-4 w-4" />
              </button>

              {/* Notifications */}
              <button
                className="relative p-1.5 rounded-lg transition-all duration-200 hover:shadow-sm flex items-center justify-center"
                style={{ color: 'var(--theme-nav-text)' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--theme-nav-hover-bg)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = ''; }}
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 bg-red-500 rounded-full shadow-md animate-pulse" />
              </button>

              <div className="relative" ref={themeRef}>
                <button
                  onClick={() => { setThemePickerOpen(!themePickerOpen); setProfileOpen(false); }}
                  className="p-1.5 rounded-lg transition-all duration-200 hover:shadow-sm flex items-center justify-center"
                  title="Change theme"
                  style={{ color: 'var(--theme-nav-text)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--theme-nav-hover-bg)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = ''; }}
                >
                  <Palette className="h-4 w-4" />
                </button>

                {themePickerOpen && (
                  <div
                    className="absolute right-0 mt-2 w-40 rounded-xl shadow-xl border p-2 z-40 animate-in"
                    style={{
                      backgroundColor: 'var(--theme-sidebar-bg)',
                      borderColor: 'var(--theme-sidebar-border)',
                    }}
                  >
                    <p
                      className="text-[10px] font-bold uppercase tracking-wider mb-1.5 px-1"
                      style={{ color: 'var(--theme-nav-text)', opacity: 0.6 }}
                    >
                      Choose Theme
                    </p>
                    <div className="space-y-0.5">
                      {themes.map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => { setTheme(theme.id); setThemePickerOpen(false); }}
                          className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg transition-all duration-200 group"
                          style={{
                            backgroundColor: activeTheme === theme.id ? 'var(--theme-accent-light)' : 'transparent',
                          }}
                          onMouseEnter={(e) => {
                            if (activeTheme !== theme.id) {
                              (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--theme-nav-hover-bg)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (activeTheme !== theme.id) {
                              (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                            }
                          }}
                        >
                          {/* Color swatches */}
                          <div className="flex gap-0.5 shrink-0">
                            <div
                              className="h-3 w-3 rounded-full border border-white/30 shadow-sm"
                              style={{ backgroundColor: theme.colors.primary }}
                            />
                            <div
                              className="h-3 w-3 rounded-full border border-white/30 shadow-sm"
                              style={{ backgroundColor: theme.colors.secondary }}
                            />
                            <div
                              className="h-3 w-3 rounded-full border border-black/10 shadow-sm"
                              style={{ backgroundColor: theme.colors.background }}
                            />
                          </div>
                          <span
                            className="text-xs font-semibold flex-1 text-left"
                            style={{ color: 'var(--theme-nav-text)' }}
                          >
                            {theme.name}
                          </span>
                          {activeTheme === theme.id && (
                            <Check
                              className="h-3 w-3 shrink-0"
                              style={{ color: 'var(--theme-accent)' } as any}
                            />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => { setProfileOpen(!profileOpen); setThemePickerOpen(false); }}
                  className="flex items-center justify-center gap-1.5 p-1 pr-2 rounded-lg transition-all duration-200 hover:shadow-sm"
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--theme-nav-hover-bg)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = ''; }}
                >
                  <Avatar className="h-7 w-7 border-2 border-white shadow-md">
                    <AvatarFallback
                      className="text-white font-semibold text-xs"
                      style={{
                        background: 'linear-gradient(to bottom right, var(--theme-avatar-from), var(--theme-avatar-to))',
                      }}
                    >
                      {user ? getInitials(user.name || user.email) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-3.5 w-3.5" style={{ color: 'var(--theme-nav-text)' } as any} />
                </button>

                {profileOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 rounded-xl shadow-xl border p-1.5 z-40 animate-in"
                    style={{
                      backgroundColor: 'var(--theme-sidebar-bg)',
                      borderColor: 'var(--theme-sidebar-border)',
                    }}
                  >
                    <div
                      className="px-2.5 py-2 rounded-lg border mb-1"
                      style={{
                        backgroundColor: 'var(--theme-user-card-bg)',
                        borderColor: 'var(--theme-user-card-border)',
                      }}
                    >
                      <p className="font-bold text-xs truncate" style={{ color: 'var(--theme-nav-text)' }}>
                        {user?.name || user?.email}
                      </p>
                      <p className="text-[10px] mt-0.5 truncate" style={{ color: 'var(--theme-nav-text)', opacity: 0.6 }}>
                        {user?.email}
                      </p>
                    </div>
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-2 py-1.5 text-xs font-medium rounded-lg transition-all duration-200"
                      style={{ color: 'var(--theme-nav-text)' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--theme-nav-hover-bg)'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = ''; }}
                    >
                      <div className="p-0.5 rounded" style={{ backgroundColor: 'var(--theme-accent-light)' }}>
                        <Users className="h-3 w-3" style={{ color: 'var(--theme-accent)' } as any} />
                      </div>
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-2 px-2 py-1.5 text-xs font-medium rounded-lg transition-all duration-200"
                      style={{ color: 'var(--theme-nav-text)' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--theme-nav-hover-bg)'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = ''; }}
                    >
                      <div className="p-0.5 rounded" style={{ backgroundColor: 'var(--theme-accent-light)' }}>
                        <Settings className="h-3 w-3" style={{ color: 'var(--theme-accent)' } as any} />
                      </div>
                      Settings
                    </Link>
                    <div
                      className="h-px my-1"
                      style={{ backgroundColor: 'var(--theme-sidebar-border)' }}
                    />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                    >
                      <div className="p-0.5 bg-red-50 rounded">
                        <LogOut className="h-3 w-3 text-red-600" />
                      </div>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
