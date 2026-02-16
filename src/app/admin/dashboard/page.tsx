'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ViewDetailsButton } from '@/components/ui/ViewDetailsButton';
import { AnalysisCard } from '@/components/dashboard/AnalysisCard';
import { QuickActionsCard } from '@/components/dashboard/QuickActionsCard';
import { DataListItem } from '@/components/dashboard/DataListItem';
import { FullPageSkeleton } from '@/components/loading/FullPageSkeleton';
import { getDashboardConfig } from '@/config/dashboard.config';
import { gradients, textGradients } from '@/config/colors.config';
import { UserRole } from '@/types/auth';
import {
  Users,
  Briefcase,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  UserPlus,
  FileText,
  Shield,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const dashboardConfig = getDashboardConfig(UserRole.ADMIN);

const stats = [
  {
    title: 'Total Users',
    value: '50,423',
    change: '+12.5%',
    trend: 'up' as const,
    icon: Users,
    color: gradients.stats.cyan,
  },
  {
    title: 'Active Jobs',
    value: '8,234',
    change: '+8.2%',
    trend: 'up' as const,
    icon: Briefcase,
    color: gradients.stats.blue,
  },
  {
    title: 'Total Revenue',
    value: '$2.4M',
    change: '+23.1%',
    trend: 'up' as const,
    icon: DollarSign,
    color: gradients.stats.green,
  },
  {
    title: 'Platform Activity',
    value: '94.2%',
    change: '-2.3%',
    trend: 'down' as const,
    icon: Activity,
    color: gradients.stats.purple,
  },
];

const recentActivities = [
  {
    user: 'John Doe',
    action: 'created a new job posting',
    time: '2 minutes ago',
    type: 'job',
  },
  {
    user: 'Jane Smith',
    action: 'registered as a new employer',
    time: '15 minutes ago',
    type: 'user',
  },
  {
    user: 'Mike Johnson',
    action: 'completed a job assignment',
    time: '1 hour ago',
    type: 'complete',
  },
  {
    user: 'Sarah Williams',
    action: 'submitted a new report',
    time: '2 hours ago',
    type: 'report',
  },
  {
    user: 'Tech Solutions Inc.',
    action: 'became a verified partner',
    time: '3 hours ago',
    type: 'partner',
  },
];

const topEmployers = [
  { name: 'Tech Corp', jobs: 234, workers: 1200, rating: 4.9 },
  { name: 'Build Masters', jobs: 189, workers: 890, rating: 4.8 },
  { name: 'Service Solutions', jobs: 156, workers: 670, rating: 4.7 },
  { name: 'Home Services Inc.', jobs: 142, workers: 580, rating: 4.6 },
];

const quickActions = [
  {
    title: 'Add User',
    description: 'Create new account',
    icon: UserPlus,
    color: 'blue' as const,
  },
  {
    title: 'Verify Partner',
    description: 'Approve partnerships',
    icon: Shield,
    color: 'purple' as const,
  },
  {
    title: 'Generate Report',
    description: 'Export analytics',
    icon: FileText,
    color: 'emerald' as const,
  },
  {
    title: 'System Settings',
    description: 'Configure platform',
    icon: Settings,
    color: 'orange' as const,
  },
];

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <FullPageSkeleton />;
  }

  return (
    <DashboardLayout menuItems={dashboardConfig.menuItems} title="Admin Dashboard">
      <div className="space-y-4">
        {/* Hero Stats Section */}
        <AnalysisCard
          title="Platform Overview"
          description="Real-time metrics and insights"
          gradient={gradients.admin}
          summaryBoxes={[
            { label: 'This Month', value: '+$284K' },
            { label: 'Growth', value: '↑ 23%', variant: 'success' },
          ]}
          stats={stats}
          columns={4}
        />

        <div className="grid gap-3 lg:grid-cols-3">
          {/* Recent Activity */}
          <Card className={cn("lg:col-span-2 border-0 shadow-xl", gradients.card.white)}>
            <CardHeader className="border-b pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn("h-7 w-7 rounded-lg flex items-center justify-center", `bg-gradient-to-br ${gradients.icon.blue}`)}>
                    <Activity className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Recent Activity</CardTitle>
                    <CardDescription className="mt-0.5 text-xs">Latest platform activities</CardDescription>
                  </div>
                </div>
                <ViewDetailsButton size="md" label="View All" />
              </div>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="space-y-2">
                {recentActivities.map((activity, index) => {
                  const iconMap = {
                    job: Briefcase,
                    user: UserPlus,
                    complete: Activity,
                    report: FileText,
                    partner: Users,
                  };
                  const gradientMap = {
                    job: 'from-blue-500 to-blue-600',
                    user: 'from-green-500 to-green-600',
                    complete: 'from-purple-500 to-purple-600',
                    report: 'from-orange-500 to-orange-600',
                    partner: 'from-pink-500 to-pink-600',
                  };
                  return (
                    <DataListItem
                      key={index}
                      icon={iconMap[activity.type as keyof typeof iconMap]}
                      iconGradient={gradientMap[activity.type as keyof typeof gradientMap]}
                      primaryText={`${activity.user} ${activity.action}`}
                      secondaryText={activity.time}
                    />
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Top Employers */}
          <Card className="border-0 shadow-lg">
            <CardHeader className={cn("border-b pb-3", `bg-gradient-to-r ${gradients.overlay.blue}`)}>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Top Employers</CardTitle>
                  <CardDescription className="mt-0.5 text-xs">Most active this month</CardDescription>
                </div>
                <ViewDetailsButton size="md" label="View All" />
              </div>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="space-y-2">
                {topEmployers.map((employer, index) => (
                  <DataListItem
                    key={index}
                    primaryText={employer.name}
                    secondaryText={`${employer.jobs} jobs • ${employer.workers} workers`}
                    rightContent={
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-semibold">{employer.rating}</span>
                        <span className="text-yellow-500">★</span>
                      </div>
                    }
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <QuickActionsCard
          title="Quick Actions"
          description="Manage your platform efficiently"
          actions={quickActions}
          columns={4}
        />
      </div>
    </DashboardLayout>
  );
}
