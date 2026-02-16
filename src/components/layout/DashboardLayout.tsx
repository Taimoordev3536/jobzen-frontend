'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return Shield;
      case 'employer':
        return Building2;
      case 'worker':
        return Wrench;
      case 'client':
        return UserCircle2;
      case 'partner':
        return UsersIcon;
      default:
        return Users;
    }
  };

  const RoleIcon = user ? getRoleIcon(user.role) : Users;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-56 bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full relative">
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/20 via-transparent to-gray-50/30 pointer-events-none" />
          
          {/* Logo */}
          <div className="relative flex items-center justify-between h-14 px-4 border-b border-gray-200">
            <Link href="/" className="flex items-center gap-2 group h-full">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-105">
                <Briefcase className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent leading-none my-auto">
                Jobzen
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 flex items-center justify-center"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* User Info */}
          <div className="relative p-3">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <Avatar className="h-10 w-10 border-2 border-white shadow-md">
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold text-sm">
                      {user ? getInitials(user.name || user.email) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">{user?.name || user?.email}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <RoleIcon className="h-3 w-3 text-indigo-600" />
                    <span className="text-xs font-medium text-indigo-600 capitalize">{user?.role}</span>
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
                  className={`group flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-500/25'
                      : 'text-gray-700 hover:bg-gray-100 hover:shadow-sm'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'bg-white/20' 
                      : 'bg-gray-100 group-hover:bg-indigo-100'
                  }`}>
                    <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-indigo-600'}`} />
                  </div>
                  <span className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-gray-700 group-hover:text-gray-900'}`}>
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
          <div className="relative p-3 border-t border-gray-200 space-y-1">
            <Link
              href="/settings"
              className="group flex items-center gap-2.5 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:shadow-sm"
            >
              <div className="p-1.5 bg-gray-100 rounded-lg group-hover:bg-indigo-100 transition-all duration-300">
                <Settings className="h-4 w-4 text-gray-600 group-hover:text-indigo-600 transition-colors duration-300" />
              </div>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">Settings</span>
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
          className="fixed inset-0 bg-gradient-to-br from-gray-900/50 via-blue-900/50 to-purple-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:pl-56">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
          <div className="flex items-center justify-between h-[54px] px-4">
            <div className="flex items-center gap-3 h-full">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gradient-to-br hover:from-gray-100 hover:to-gray-50 rounded-lg transition-all duration-200 flex items-center justify-center"
              >
                <Menu className="h-5 w-5" />
              </button>
              <h1 className="text-base font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent leading-none my-auto">{title}</h1>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Search */}
              <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gradient-to-br hover:from-gray-100 hover:to-gray-50 rounded-lg transition-all duration-200 hover:shadow-sm flex items-center justify-center">
                <Search className="h-4 w-4" />
              </button>

              {/* Notifications */}
              <button className="relative p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gradient-to-br hover:from-gray-100 hover:to-gray-50 rounded-lg transition-all duration-200 hover:shadow-sm flex items-center justify-center">
                <Bell className="h-4 w-4" />
                <span className="absolute top-0.5 right-0.5 h-1.5 w-1.5 bg-gradient-to-br from-red-500 to-pink-500 rounded-full shadow-md shadow-red-500/50 animate-pulse" />
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center justify-center gap-1.5 p-1 pr-2 hover:bg-gradient-to-br hover:from-gray-100 hover:to-gray-50 rounded-lg transition-all duration-200 hover:shadow-sm"
                >
                  <Avatar className="h-7 w-7 border-2 border-white shadow-md">
                    <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold text-xs">
                      {user ? getInitials(user.name || user.email) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
                </button>

                {profileOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setProfileOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-gray-200/50 p-1.5 z-40 animate-in">
                      <div className="px-3 py-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100/50 mb-1.5">
                        <p className="font-bold text-xs text-gray-900">{user?.name || user?.email}</p>
                        <p className="text-xs text-gray-600 mt-0.5 truncate">{user?.email}</p>
                      </div>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-3 py-2 text-xs font-medium hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 rounded-lg transition-all duration-200"
                      >
                        <div className="p-1 bg-gray-100 rounded">
                          <Users className="h-3.5 w-3.5 text-gray-600" />
                        </div>
                        Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center gap-2 px-3 py-2 text-xs font-medium hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 rounded-lg transition-all duration-200"
                      >
                        <div className="p-1 bg-gray-100 rounded">
                          <Settings className="h-3.5 w-3.5 text-gray-600" />
                        </div>
                        Settings
                      </Link>
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-1.5" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 rounded-lg transition-all duration-200"
                      >
                        <div className="p-1 bg-red-50 rounded">
                          <LogOut className="h-3.5 w-3.5 text-red-600" />
                        </div>
                        Logout
                      </button>
                    </div>
                  </>
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
