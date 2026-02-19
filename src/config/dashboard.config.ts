/**
 * Dashboard Configuration
 * 
 * Centralized configuration for all role-based dashboards.
 * Defines menu items, welcome messages, and theme colors for each role.
 * 
 * Usage:
 * import { getDashboardConfig } from '@/config/dashboard.config';
 * const config = getDashboardConfig(UserRole.ADMIN);
 */

import { UserRole } from '@/types/auth';
import { gradients } from './colors.config';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Settings,
  FileText,
  BarChart3,
  Shield,
  MessageSquare,
  CreditCard,
  Calendar,
  CheckCircle2,
  ClipboardCheck,
  Building2,
  UserCircle2,
  Wrench,
  UsersIcon,
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface MenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface WelcomeConfig {
  title: string;
  subtitle: string;
  badgeText?: string;
  badgeLabel?: string;
  gradient: string;
}

export interface DashboardConfig {
  menuItems: MenuItem[];
  welcome: WelcomeConfig;
  badgeIcon: LucideIcon;
  decorativeIcon: LucideIcon;
}

export const dashboardConfigs: Record<UserRole, DashboardConfig> = {
  [UserRole.ADMIN]: {
    menuItems: [
      { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
      { label: 'Users', href: '/admin/users', icon: Users },
      { label: 'Jobs', href: '/admin/jobs', icon: Briefcase },
      { label: 'Reports', href: '/admin/reports', icon: FileText },
      { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
      { label: 'Settings', href: '/admin/settings', icon: Settings },
    ],
    welcome: {
      title: 'Admin Control Center',
      subtitle: 'You have 8 pending approvals and 3 system alerts requiring attention',
      badgeLabel: 'System Administrator',
      gradient: gradients.admin,
    },
    badgeIcon: Shield,
    decorativeIcon: Shield,
  },

  [UserRole.EMPLOYER]: {
    menuItems: [
      { label: 'Dashboard', href: '/employer/dashboard', icon: LayoutDashboard },
      { label: 'Jobs', href: '/employer/jobs', icon: Briefcase },
      { label: 'Workers', href: '/employer/workers', icon: Users },
      { label: 'Clients', href: '/employer/clients', icon: UserCircle2 },
      { label: 'Applications', href: '/employer/applications', icon: FileText },
      { label: 'Messages', href: '/employer/messages', icon: MessageSquare },
      { label: 'Settings', href: '/employer/settings', icon: Settings },
    ],
    welcome: {
      title: 'Welcome back, Sarah! 👋',
      subtitle: 'You have 12 active jobs and 8 pending applications to review',
      badgeLabel: 'Verified Employer',
      badgeText: 'Premium',
      gradient: gradients.employer,
    },
    badgeIcon: Building2,
    decorativeIcon: Building2,
  },

  [UserRole.WORKER]: {
    menuItems: [
      { label: 'Dashboard', href: '/worker/dashboard', icon: LayoutDashboard },
      { label: 'Find Jobs', href: '/worker/jobs', icon: Briefcase },
      { label: 'My Applications', href: '/worker/applications', icon: FileText },
      { label: 'My Contracts', href: '/worker/contracts', icon: CheckCircle2 },
      { label: 'Messages', href: '/worker/messages', icon: MessageSquare },
      { label: 'Settings', href: '/worker/settings', icon: Settings },
    ],
    welcome: {
      title: 'Find Your Next Opportunity! 🚀',
      subtitle: 'You have 3 new job matches and 2 interview requests waiting',
      badgeLabel: 'Top Rated Worker',
      gradient: gradients.worker,
    },
    badgeIcon: Wrench,
    decorativeIcon: Wrench,
  },

  [UserRole.CLIENT]: {
    menuItems: [
      { label: 'Dashboard', href: '/client/dashboard', icon: LayoutDashboard },
      { label: 'My Requests', href: '/client/requests', icon: Briefcase },
      { label: 'Service Providers', href: '/client/providers', icon: Users },
      { label: 'Messages', href: '/client/messages', icon: MessageSquare },
      { label: 'Invoices', href: '/client/invoices', icon: FileText },
      { label: 'Payments', href: '/client/payments', icon: CreditCard },
    ],
    welcome: {
      title: 'Your Perfect Service Awaits! ✨',
      subtitle: 'You have 2 pending requests and 3 new provider recommendations',
      badgeLabel: 'Verified Client',
      badgeText: 'Premium Member',
      gradient: gradients.client,
    },
    badgeIcon: CheckCircle2,
    decorativeIcon: Users,
  },

  [UserRole.PARTNER]: {
    menuItems: [
      { label: 'Dashboard', href: '/partner/dashboard', icon: LayoutDashboard },
      { label: 'Contracts', href: '/partner/contracts', icon: FileText },
      { label: 'Workers', href: '/partner/workers', icon: Users },
      { label: 'Clients', href: '/partner/clients', icon: UsersIcon },
      { label: 'Invoices', href: '/partner/invoices', icon: CreditCard },
      { label: 'Settings', href: '/partner/settings', icon: Settings },
    ],
    welcome: {
      title: 'Partner Excellence Dashboard',
      subtitle: 'You have 8 active contracts worth $45.2K and 5 new opportunities',
      badgeLabel: 'Elite Partner',
      gradient: gradients.partner,
    },
    badgeIcon: Building2,
    decorativeIcon: UsersIcon,
  },

  [UserRole.INSPECTOR]: {
    menuItems: [
      { label: 'Dashboard', href: '/inspector/dashboard', icon: LayoutDashboard },
      { label: 'Cases', href: '/inspector/cases', icon: ClipboardCheck },
      { label: 'Inspections', href: '/inspector/inspections', icon: Calendar },
      { label: 'Reports', href: '/inspector/reports', icon: FileText },
      { label: 'Messages', href: '/inspector/messages', icon: MessageSquare },
      { label: 'Settings', href: '/inspector/settings', icon: Settings },
    ],
    welcome: {
      title: 'Inspector Control Panel',
      subtitle: 'You have 4 pending inspections and 2 unresolved cases requiring review',
      badgeLabel: 'Compliance Officer',
      gradient: gradients.inspector,
    },
    badgeIcon: ClipboardCheck,
    decorativeIcon: ClipboardCheck,
  },

  [UserRole.UNASSIGNED]: {
    menuItems: [
      { label: 'Complete Profile', href: '/auth/complete-profile', icon: Users },
    ],
    welcome: {
      title: 'Welcome to Jobzen',
      subtitle: 'Please complete your profile to get started',
      badgeLabel: 'New User',
      gradient: 'from-gray-500 via-gray-600 to-gray-700',
    },
    badgeIcon: Users,
    decorativeIcon: Users,
  },
};

/**
 * Get dashboard configuration for a specific role
 * @param role - User role
 * @returns Dashboard configuration object
 */
export function getDashboardConfig(role: UserRole): DashboardConfig {
  return dashboardConfigs[role];
}
