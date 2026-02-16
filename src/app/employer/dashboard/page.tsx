'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ViewDetailsButton } from '@/components/ui/ViewDetailsButton';
import { FullPageSkeleton } from '@/components/loading/FullPageSkeleton';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { DataListItem } from '@/components/dashboard/DataListItem';
import { StatCard } from '@/components/dashboard/StatCard';
import { QuickActionsCard } from '@/components/dashboard/QuickActionsCard';
import { JobCard } from '@/components/dashboard/JobCard';
import { getDashboardConfig } from '@/config/dashboard.config';
import { gradients } from '@/config/colors.config';
import { UserRole } from '@/types/auth';
import {
  Briefcase,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Plus,
  ArrowUpRight,
  MessageSquare,
  FileText,
  AlertCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const dashboardConfig = getDashboardConfig(UserRole.EMPLOYER);

const stats = [
  {
    title: 'Active Jobs',
    value: '24',
    change: '+3 this week',
    icon: Briefcase,
    color: gradients.stats.blue,
  },
  {
    title: 'Total Workers',
    value: '156',
    change: '+12 this month',
    icon: Users,
    color: gradients.stats.cyan,
  },
  {
    title: 'Completed Jobs',
    value: '842',
    change: '+48 this week',
    icon: CheckCircle2,
    color: gradients.stats.green,
  },
  {
    title: 'Hours This Month',
    value: '3,240',
    change: '840 hrs/week avg',
    icon: Clock,
    color: gradients.stats.purple,
  },
];

const activeJobs = [
  {
    id: 1,
    title: 'Warehouse Operations',
    location: 'Downtown Facility',
    workers: 12,
    required: 15,
    status: 'In Progress',
    urgency: 'Medium',
  },
  {
    id: 2,
    title: 'Delivery Services',
    location: 'Multiple Locations',
    workers: 8,
    required: 10,
    status: 'Recruiting',
    urgency: 'High',
  },
  {
    id: 3,
    title: 'Customer Support',
    location: 'Office - Floor 3',
    workers: 6,
    required: 6,
    status: 'Full',
    urgency: 'Low',
  },
  {
    id: 4,
    title: 'Maintenance Team',
    location: 'Building A & B',
    workers: 4,
    required: 8,
    status: 'Urgent',
    urgency: 'High',
  },
];

const recentWorkers = [
  { name: 'John Smith', role: 'Warehouse Staff', rating: 4.9, jobs: 45, status: 'Active' },
  { name: 'Sarah Johnson', role: 'Delivery Driver', rating: 4.8, jobs: 38, status: 'Active' },
  { name: 'Mike Williams', role: 'Support Agent', rating: 4.7, jobs: 52, status: 'Break' },
  { name: 'Emily Brown', role: 'Maintenance', rating: 4.9, jobs: 31, status: 'Active' },
];

export default function EmployerDashboard() {
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
    <DashboardLayout menuItems={dashboardConfig.menuItems} title="Employer Dashboard">
      <div className="space-y-4">
        {/* Welcome Banner */}
        <WelcomeBanner
          title={dashboardConfig.welcome.title}
          subtitle={dashboardConfig.welcome.subtitle}
          badgeLabel={dashboardConfig.welcome.badgeLabel}
          badgeText={dashboardConfig.welcome.badgeText}
          badgeIcon={dashboardConfig.badgeIcon}
          gradient={dashboardConfig.welcome.gradient}
          decorativeIcon={dashboardConfig.decorativeIcon}
          primaryAction={{
            label: 'Post New Job',
            icon: Plus,
            onClick: () => console.log('Post job'),
          }}
          secondaryAction={{
            label: 'View Applications',
            icon: ArrowUpRight,
            onClick: () => console.log('View applications'),
          }}
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
              gradient={stat.color}
            />
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Active Jobs */}
          <Card className="border-0 shadow-xl">
            <CardHeader className="border-b pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <Briefcase className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-base">Active Jobs</CardTitle>
                    <CardDescription className="mt-0.5 text-xs">Your current postings</CardDescription>
                  </div>
                </div>
                <ViewDetailsButton size="md" label="View All" />
              </div>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="space-y-2">
                {activeJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    id={job.id}
                    title={job.title}
                    location={job.location}
                    status={job.status}
                    statusVariant={
                      job.status === 'Full' ? 'success' :
                      job.status === 'Urgent' || job.urgency === 'High' ? 'error' :
                      'info'
                    }
                    leftBadge={{
                      icon: Users,
                      label: `${job.workers}/${job.required}`
                    }}
                    gradient="blue"
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Workers */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Your Workers</CardTitle>
                  <CardDescription className="text-xs">Active workers on your team</CardDescription>
                </div>
                <ViewDetailsButton size="md" label="View All" />
              </div>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="space-y-2">
                {recentWorkers.map((worker, index) => (
                  <DataListItem
                    key={index}
                    primaryText={worker.name}
                    secondaryText={worker.role}
                    rightContent={
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-semibold">{worker.rating}</span>
                        <span className="text-yellow-500">★</span>
                      </div>
                    }
                    badge={{
                      label: worker.status,
                      variant: worker.status === 'Active' ? 'success' : 'warning'
                    }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <QuickActionsCard
          title="Quick Actions"
          description="Manage your jobs efficiently"
          actions={[
            {
              title: 'Post Job',
              description: 'Create a new job posting',
              icon: Plus,
              color: 'blue',
              onClick: () => console.log('Post Job'),
            },
            {
              title: 'Schedule',
              description: 'Manage work schedules',
              icon: Calendar,
              color: 'purple',
              onClick: () => console.log('Schedule'),
            },
            {
              title: 'Messages',
              description: 'Chat with workers',
              icon: MessageSquare,
              color: 'green',
              onClick: () => console.log('Messages'),
            },
            {
              title: 'Reports',
              description: 'View analytics',
              icon: FileText,
              color: 'emerald',
              onClick: () => console.log('Reports'),
            },
          ]}
          columns={4}
        />
      </div>
    </DashboardLayout>
  );
}
