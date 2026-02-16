'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ViewDetailsButton } from '@/components/ui/ViewDetailsButton';
import { ActionButton } from '@/components/ui/ActionButton';
import { StatCard } from '@/components/dashboard/StatCard';
import { DataListItem } from '@/components/dashboard/DataListItem';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { ContractCard } from '@/components/dashboard/ContractCard';
import { FullPageSkeleton } from '@/components/loading/FullPageSkeleton';
import { getDashboardConfig } from '@/config/dashboard.config';
import { gradients } from '@/config/colors.config';
import { UserRole } from '@/types/auth';
import {
  Briefcase,
  Users,
  MessageSquare,
  FileText,
  CreditCard,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Calendar,
  MapPin,
  Plus,
  ArrowUpRight,
  Star,
  DollarSign,
} from 'lucide-react';

const dashboardConfig = getDashboardConfig(UserRole.CLIENT);

const stats = [
  {
    title: 'Active Requests',
    value: '8',
    change: '+2 this week',
    icon: Briefcase,
    gradient: gradients.stats.blue,
  },
  {
    title: 'Service Providers',
    value: '12',
    change: '4 verified partners',
    icon: Users,
    gradient: gradients.stats.cyan,
  },
  {
    title: 'Completed Jobs',
    value: '47',
    change: '+5 this month',
    icon: CheckCircle2,
    gradient: gradients.stats.green,
  },
  {
    title: 'Total Spent',
    value: '$18,240',
    change: '$4.2K this month',
    icon: DollarSign,
    gradient: gradients.stats.purple,
  },
];

const activeRequests = [
  {
    id: 1,
    title: 'Office Cleaning Services',
    provider: 'CleanPro Solutions',
    date: 'Dec 28, 2024',
    workers: 4,
    status: 'In Progress',
    urgency: 'Medium',
  },
  {
    id: 2,
    title: 'IT Support Team',
    provider: 'Tech Masters Inc.',
    date: 'Dec 29, 2024',
    workers: 2,
    status: 'Scheduled',
    urgency: 'High',
  },
  {
    id: 3,
    title: 'Security Personnel',
    provider: 'SecureGuard Co.',
    date: 'Dec 30, 2024',
    workers: 6,
    status: 'Pending Quote',
    urgency: 'Low',
  },
  {
    id: 4,
    title: 'Catering Services',
    provider: 'Gourmet Catering',
    date: 'Jan 2, 2025',
    workers: 8,
    status: 'Quote Received',
    urgency: 'Medium',
  },
];

const serviceProviders = [
  { name: 'CleanPro Solutions', category: 'Cleaning', rating: 4.9, jobs: 23, verified: true },
  { name: 'Tech Masters Inc.', category: 'IT Services', rating: 4.8, jobs: 15, verified: true },
  { name: 'SecureGuard Co.', category: 'Security', rating: 4.7, jobs: 31, verified: true },
  { name: 'BuildRight Construction', category: 'Construction', rating: 4.9, jobs: 12, verified: false },
];

const recentInvoices = [
  { id: 'INV-1234', service: 'Office Cleaning', date: 'Dec 22', amount: 450, status: 'Paid' },
  { id: 'INV-1235', service: 'IT Support', date: 'Dec 20', amount: 890, status: 'Paid' },
  { id: 'INV-1236', service: 'Security Services', date: 'Dec 18', amount: 1200, status: 'Pending' },
  { id: 'INV-1237', service: 'Maintenance', date: 'Dec 15', amount: 320, status: 'Paid' },
];

export default function ClientDashboard() {
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
    <DashboardLayout menuItems={dashboardConfig.menuItems} title="Client Dashboard">
      <div className="space-y-4">
        {/* Welcome Banner */}
        <WelcomeBanner
          title={dashboardConfig.welcome.title}
          subtitle={dashboardConfig.welcome.subtitle}
          badgeText={dashboardConfig.welcome.badgeText}
          badgeIcon={CheckCircle2}
          gradient={dashboardConfig.welcome.gradient}
          primaryAction={{
            label: 'New Request',
            icon: Plus,
            onClick: () => {},
          }}
          secondaryAction={{
            label: 'Browse Providers',
            icon: ArrowUpRight,
            onClick: () => {},
          }}
          decorativeIcon={Users}
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
              gradient={stat.gradient}
            />
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Active Requests */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Active Requests</CardTitle>
                  <CardDescription className="text-xs">Your current service requests</CardDescription>
                </div>
                <ViewDetailsButton size="md" label="View All" />
              </div>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="space-y-2">
                {activeRequests.map((request) => (
                  <ContractCard
                    key={request.id}
                    id={request.id}
                    title={request.title}
                    subtitle={request.provider}
                    status={request.urgency}
                    statusVariant={
                      request.urgency === 'High' ? 'error' :
                      request.urgency === 'Medium' ? 'warning' :
                      'success'
                    }
                    details={[
                      { label: 'Date', value: request.date },
                      { label: 'Workers', value: `${request.workers} workers` }
                    ]}
                    gradient="purple"
                    footerContent={
                      <span className={`text-xs font-medium ${
                        request.status === 'In Progress' ? 'text-blue-600' :
                        request.status === 'Scheduled' ? 'text-green-600' :
                        'text-yellow-600'
                      }`}>
                        {request.status}
                      </span>
                    }
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Service Providers */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Service Providers</CardTitle>
                  <CardDescription className="text-xs">Your trusted partners</CardDescription>
                </div>
                <ViewDetailsButton size="md" label="View All" />
              </div>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="space-y-2">
                {serviceProviders.map((provider, index) => (
                  <DataListItem
                    key={index}
                    primaryText={provider.name}
                    secondaryText={provider.category}
                    rightContent={
                      <>
                        <div className="flex items-center gap-0.5">
                          <span className="text-xs font-semibold">{provider.rating}</span>
                          <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        </div>
                        <p className="text-[10px] text-muted-foreground">{provider.jobs} completed</p>
                      </>
                    }
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Invoices */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b bg-gradient-to-r from-indigo-50 to-blue-50 pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">
                  Recent Invoices
                </CardTitle>
                <CardDescription className="mt-0.5 text-xs">Your payment history and pending invoices</CardDescription>
              </div>
                <ViewDetailsButton size="md" label="View All" />
            </div>
          </CardHeader>
          <CardContent className="pt-3">
            <div className="space-y-2">
              {recentInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-gray-50">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-lg flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" style={{backgroundColor: '#463BD0'}}>
                      <FileText className="h-3.5 w-3.5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-xs">{invoice.service}</p>
                      <p className="text-[10px] text-muted-foreground">{invoice.id} • {invoice.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm">${invoice.amount}</p>
                    <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${
                      invoice.status === 'Paid' ? 'bg-green-100 text-green-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {invoice.status}
                    </span>
                    <ActionButton variant="primary" size="sm">
                      Download
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
