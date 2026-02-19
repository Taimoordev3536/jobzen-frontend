'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ViewDetailsButton } from '@/components/ui/ViewDetailsButton';
import { ActionButton } from '@/components/ui/ActionButton';
import { StatCard } from '@/components/dashboard/StatCard';
import { DataListItem } from '@/components/dashboard/DataListItem';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { AnalysisCard } from '@/components/dashboard/AnalysisCard';
import { ContractCard } from '@/components/dashboard/ContractCard';
import { FullPageSkeleton } from '@/components/loading/FullPageSkeleton';
import { getDashboardConfig } from '@/config/dashboard.config';
import { UserRole } from '@/types/auth';
import {
  Users,
  Briefcase,
  TrendingUp,
  DollarSign,
  UserPlus,
  MessageSquare,
  FileText,
  BarChart3,
  Clock,
  CheckCircle2,
  Star,
  ArrowUpRight,
  Calendar,
  MapPin,
  Award,
} from 'lucide-react';

const dashboardConfig = getDashboardConfig(UserRole.PARTNER);

const stats = [
  {
    title: 'Active Workers',
    value: '143',
    change: '+12 this month',
    icon: Users,
    colorIndex: 1 as const,
  },
  {
    title: 'Active Contracts',
    value: '28',
    change: '6 pending approval',
    icon: Briefcase,
    colorIndex: 2 as const,
  },
  {
    title: 'Monthly Revenue',
    value: '$84,200',
    change: '+24% from last month',
    icon: DollarSign,
    colorIndex: 3 as const,
  },
  {
    title: 'Client Satisfaction',
    value: '4.8',
    change: '127 reviews',
    icon: Star,
    colorIndex: 4 as const,
  },
];

const quickStats = [
  {
    title: 'Jobs Completed',
    value: '234',
    change: 'This month',
    icon: Briefcase,
    colorIndex: 1 as const,
  },
  {
    title: 'Hours Worked',
    value: '5,420',
    change: 'Total hours',
    icon: Clock,
    colorIndex: 2 as const,
  },
  {
    title: 'New Workers',
    value: '12',
    change: 'This month',
    icon: Users,
    colorIndex: 3 as const,
  },
];

const activeContracts = [
  {
    id: 1,
    client: 'Tech Corp Solutions',
    service: 'IT Support Services',
    workers: 15,
    duration: '6 months',
    value: '$45,000',
    status: 'Active',
  },
  {
    id: 2,
    client: 'BuildMasters Inc.',
    service: 'Construction Crew',
    workers: 25,
    duration: '3 months',
    value: '$78,000',
    status: 'Active',
  },
  {
    id: 3,
    client: 'Service Solutions',
    service: 'Customer Support Team',
    workers: 12,
    duration: '12 months',
    value: '$120,000',
    status: 'Pending',
  },
  {
    id: 4,
    client: 'CleanPro Services',
    service: 'Cleaning Staff',
    workers: 8,
    duration: '4 months',
    value: '$28,000',
    status: 'Active',
  },
];

const topWorkers = [
  { name: 'John Smith', role: 'IT Specialist', rating: 4.9, jobs: 45, availability: 'Available' },
  { name: 'Sarah Johnson', role: 'Construction Lead', rating: 4.8, jobs: 52, availability: 'On Job' },
  { name: 'Mike Williams', role: 'Support Agent', rating: 4.9, jobs: 38, availability: 'Available' },
  { name: 'Emily Brown', role: 'Cleaning Supervisor', rating: 4.7, jobs: 41, availability: 'On Job' },
];

const recentActivity = [
  {
    type: 'contract',
    message: 'New contract signed with Tech Corp',
    time: '2 hours ago',
  },
  {
    type: 'worker',
    message: 'John Smith completed job assignment',
    time: '4 hours ago',
  },
  {
    type: 'payment',
    message: 'Payment received from BuildMasters',
    time: '1 day ago',
  },
  {
    type: 'review',
    message: 'New 5-star review from Service Solutions',
    time: '2 days ago',
  },
];

export default function PartnerDashboard() {
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
    <DashboardLayout menuItems={dashboardConfig.menuItems} title="Partner Dashboard">
      <div className="space-y-4">
        {/* Welcome Banner */}
        <WelcomeBanner
          title={dashboardConfig.welcome.title}
          subtitle={dashboardConfig.welcome.subtitle}
          badgeText={dashboardConfig.welcome.badgeText}
          badgeIcon={Award}
          gradient={dashboardConfig.welcome.gradient}
          primaryAction={{
            label: 'Add Workers',
            icon: UserPlus,
            onClick: () => { },
          }}
          secondaryAction={{
            label: 'View Contracts',
            icon: ArrowUpRight,
            onClick: () => { },
          }}
          decorativeIcon={Award}
        />

        {/* Stats Grid */}
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              colorIndex={stat.colorIndex}
            />
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Active Contracts */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Active Contracts</CardTitle>
                  <CardDescription className="text-xs">Your current client agreements</CardDescription>
                </div>
                <ViewDetailsButton size="md" label="View All" />
              </div>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="space-y-2">
                {activeContracts.map((contract) => (
                  <ContractCard
                    key={contract.id}
                    id={contract.id}
                    title={contract.client}
                    subtitle={contract.service}
                    status={contract.status}
                    statusVariant={contract.status === 'Active' ? 'success' : 'warning'}
                    details={[
                      { label: 'Workers', value: String(contract.workers) },
                      { label: 'Duration', value: contract.duration }
                    ]}
                    value={contract.value}
                    gradient="blue"
                    footerContent={
                      <ActionButton variant="secondary" size="sm">
                        Manage
                      </ActionButton>
                    }
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Workers */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Top Workers</CardTitle>
                  <CardDescription className="text-xs">Your best performing team members</CardDescription>
                </div>
                <ViewDetailsButton size="md" label="View All" />
              </div>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="space-y-2">
                {topWorkers.map((worker, index) => (
                  <DataListItem
                    key={index}
                    primaryText={worker.name}
                    secondaryText={worker.role}
                    rightContent={
                      <div className="flex items-center gap-0.5">
                        <span className="text-xs font-semibold">{worker.rating}</span>
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      </div>
                    }
                    badge={{
                      label: worker.availability,
                      variant: worker.availability === 'Available' ? 'success' : 'info'
                    }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid gap-3 md:grid-cols-3">
          {/* Recent Activity */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Recent Activity</CardTitle>
              <CardDescription className="text-xs">Latest updates from your partnership</CardDescription>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="space-y-2">
                {recentActivity.map((activity, index) => {
                  const iconMap = {
                    contract: Briefcase,
                    worker: Users,
                    payment: DollarSign,
                    review: Star,
                  };
                  const colorIndexMap: Record<string, 1 | 2 | 3 | 4> = {
                    contract: 1,
                    worker: 2,
                    payment: 3,
                    review: 4,
                  };
                  return (
                    <DataListItem
                      key={index}
                      icon={iconMap[activity.type as keyof typeof iconMap]}
                      colorIndex={colorIndexMap[activity.type as keyof typeof colorIndexMap]}
                      primaryText={activity.message}
                      secondaryText={activity.time}
                    />
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <AnalysisCard
            title="Quick Stats"
            description="This month's overview"
            stats={quickStats}
            columns={3}
            className="lg:col-span-1"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
