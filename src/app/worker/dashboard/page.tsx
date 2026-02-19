'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ViewDetailsButton } from '@/components/ui/ViewDetailsButton';
import { ActionButton } from '@/components/ui/ActionButton';
import { StatCard } from '@/components/dashboard/StatCard';
import { DataListItem } from '@/components/dashboard/DataListItem';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { JobCard } from '@/components/dashboard/JobCard';
import { FullPageSkeleton } from '@/components/loading/FullPageSkeleton';
import { getDashboardConfig } from '@/config/dashboard.config';
import { UserRole } from '@/types/auth';
import {
  Briefcase,
  Calendar,
  MessageSquare,
  FileText,
  Wallet,
  Clock,
  MapPin,
  DollarSign,
  Star,
  Award,
  CheckCircle2,
  ArrowUpRight,
  Search,
} from 'lucide-react';

const dashboardConfig = getDashboardConfig(UserRole.WORKER);

const stats = [
  {
    title: 'Active Jobs',
    value: '3',
    change: '2 upcoming',
    icon: Briefcase,
    colorIndex: 1 as const,
  },
  {
    title: 'This Month Earnings',
    value: '$2,840',
    change: '+18% from last month',
    icon: DollarSign,
    colorIndex: 2 as const,
  },
  {
    title: 'Hours Worked',
    value: '127',
    change: '32 hrs this week',
    icon: Clock,
    colorIndex: 3 as const,
  },
  {
    title: 'Rating',
    value: '4.9',
    change: '48 reviews',
    icon: Star,
    colorIndex: 4 as const,
  },
];

const upcomingJobs = [
  {
    id: 1,
    title: 'Warehouse Operations',
    company: 'Tech Corp',
    date: 'Today',
    time: '2:00 PM - 10:00 PM',
    location: 'Downtown Facility',
    pay: '$25/hr',
    status: 'Confirmed',
  },
  {
    id: 2,
    title: 'Delivery Services',
    company: 'Quick Logistics',
    date: 'Tomorrow',
    time: '8:00 AM - 4:00 PM',
    location: 'Multiple Stops',
    pay: '$22/hr',
    status: 'Confirmed',
  },
  {
    id: 3,
    title: 'Customer Support',
    company: 'Service Solutions',
    date: 'Dec 28',
    time: '9:00 AM - 5:00 PM',
    location: 'Office - Remote',
    pay: '$20/hr',
    status: 'Pending',
  },
];

const recentEarnings = [
  { job: 'Warehouse Shift', date: 'Dec 22', hours: 8, amount: 200, status: 'Paid' },
  { job: 'Delivery Service', date: 'Dec 21', hours: 8, amount: 176, status: 'Paid' },
  { job: 'Support Desk', date: 'Dec 20', hours: 6, amount: 120, status: 'Pending' },
  { job: 'Maintenance', date: 'Dec 19', hours: 4, amount: 92, status: 'Paid' },
];

const availableJobs = [
  {
    title: 'Warehouse Assistant',
    company: 'BuildMasters Co.',
    location: 'North District',
    pay: '$24/hr',
    type: 'Full-time',
  },
  {
    title: 'Delivery Driver',
    company: 'Express Delivery',
    location: 'City Center',
    pay: '$23/hr',
    type: 'Part-time',
  },
  {
    title: 'Support Agent',
    company: 'Tech Support Inc.',
    location: 'Remote',
    pay: '$21/hr',
    type: 'Full-time',
  },
];

export default function WorkerDashboard() {
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
    <DashboardLayout menuItems={dashboardConfig.menuItems} title="Worker Dashboard">
      <div className="space-y-4">
        {/* Welcome Banner */}
        <WelcomeBanner
          title={dashboardConfig.welcome.title}
          subtitle={dashboardConfig.welcome.subtitle}
          badgeText={dashboardConfig.welcome.badgeText}
          badgeIcon={Star}
          gradient={dashboardConfig.welcome.gradient}
          primaryAction={{
            label: 'Browse Jobs',
            icon: Search,
            onClick: () => { },
          }}
          secondaryAction={{
            label: 'My Schedule',
            icon: Calendar,
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

        <div className="grid gap-3 md:grid-cols-2">
          {/* Upcoming Jobs */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Upcoming Jobs</CardTitle>
                  <CardDescription className="text-xs">Your scheduled work for this week</CardDescription>
                </div>
                <ViewDetailsButton size="md" label="View All" />
              </div>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="space-y-2">
                {upcomingJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    id={job.id}
                    title={job.title}
                    subtitle={job.company}
                    location={job.location}
                    date={job.date}
                    time={job.time}
                    pay={job.pay}
                    status={job.status}
                    statusVariant={job.status === 'Confirmed' ? 'success' : 'warning'}
                    gradient="indigo"
                    onViewDetails={() => console.log('View job', job.id)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Earnings */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Recent Earnings</CardTitle>
                  <CardDescription className="text-xs">Your payment history</CardDescription>
                </div>
                <ViewDetailsButton size="md" label="View All" />
              </div>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="space-y-2">
                {recentEarnings.map((earning, index) => (
                  <DataListItem
                    key={index}
                    icon={DollarSign}
                    colorIndex={2}
                    primaryText={earning.job}
                    secondaryText={`${earning.date} • ${earning.hours} hours`}
                    rightContent={<p className="font-bold text-sm">${earning.amount}</p>}
                    badge={{
                      label: earning.status,
                      variant: earning.status === 'Paid' ? 'success' : 'warning'
                    }}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Available Jobs */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="h-7 w-7 rounded-lg flex items-center justify-center"
                  style={{ background: 'linear-gradient(to bottom right, var(--theme-icon-1-from), var(--theme-icon-1-to))' }}
                >
                  <Search className="h-3.5 w-3.5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold">Available Jobs Near You</CardTitle>
                  <CardDescription className="text-[10px]">Browse and apply to new opportunities</CardDescription>
                </div>
              </div>
              <ViewDetailsButton size="md" label="View All" />
            </div>
          </CardHeader>
          <CardContent className="p-3">
            <div className="grid gap-2 md:grid-cols-3">
              {availableJobs.map((job, index) => (
                <div
                  key={index}
                  className="group relative rounded-lg p-2.5 border hover:shadow-lg transition-all duration-300"
                  style={{ backgroundColor: 'var(--theme-card-bg)', borderColor: 'var(--theme-card-border)' }}
                >
                  <div className="flex items-start gap-2 mb-2">
                    <div
                      className="h-7 w-7 rounded-lg flex items-center justify-center text-white font-bold text-xs flex-shrink-0 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                      style={{ background: 'linear-gradient(to bottom right, var(--theme-icon-1-from), var(--theme-icon-1-to))' }}
                    >
                      {job.company.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-xs truncate" style={{ color: 'var(--theme-card-text)' }}>{job.title}</h4>
                      <p className="text-[10px] truncate mt-0.5" style={{ color: 'var(--theme-card-subtext)' }}>{job.company}</p>
                    </div>
                  </div>

                  <div className="space-y-1.5 mb-2">
                    <div className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--theme-card-subtext)' }}>
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span>{job.location}</span>
                    </div>

                    <span className={`inline-block px-1.5 py-0.5 text-[10px] font-medium rounded ${job.type === 'Full-time' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'
                      }`}>
                      {job.type}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="text-sm font-bold text-emerald-600">{job.pay}</div>
                    <ActionButton variant="primary" size="sm">
                      Apply Now
                    </ActionButton>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
