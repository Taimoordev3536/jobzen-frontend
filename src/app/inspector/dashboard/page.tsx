'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ViewDetailsButton } from '@/components/ui/ViewDetailsButton';
import { StatCard } from '@/components/dashboard/StatCard';
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner';
import { QuickActionsCard } from '@/components/dashboard/QuickActionsCard';
import { CaseCard } from '@/components/dashboard/CaseCard';
import { FullPageSkeleton } from '@/components/loading/FullPageSkeleton';
import { getDashboardConfig } from '@/config/dashboard.config';
import { gradients } from '@/config/colors.config';
import { UserRole } from '@/types/auth';
import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  Users,
  Clock,
  TrendingUp,
  Shield,
  Search,
  Activity,
  UserPlus,
  ArrowUpRight,
  ClipboardCheck,
  AlertCircle,
  XCircle,
  Calendar,
  Building2,
} from 'lucide-react';

const dashboardConfig = getDashboardConfig(UserRole.INSPECTOR);

const stats = [
  {
    title: 'Active Cases',
    value: '23',
    change: '+5 this week',
    icon: AlertTriangle,
    gradient: gradients.stats.orange,
  },
  {
    title: 'Resolved Cases',
    value: '187',
    change: '+12 this month',
    icon: CheckCircle2,
    gradient: gradients.stats.green,
  },
  {
    title: 'Inspections Done',
    value: '342',
    change: '28 this week',
    icon: ClipboardCheck,
    gradient: gradients.stats.cyan,
  },
  {
    title: 'Pending Reviews',
    value: '15',
    change: '3 urgent',
    icon: Clock,
    gradient: gradients.stats.purple,
  },
];

const recentCases = [
  {
    id: 'CASE-2341',
    title: 'Payment Dispute',
    type: 'Financial',
    priority: 'High',
    worker: 'John Smith',
    employer: 'ABC Corp',
    status: 'Under Review',
    createdAt: '2 hours ago',
  },
  {
    id: 'CASE-2340',
    title: 'Safety Violation Report',
    type: 'Safety',
    priority: 'Urgent',
    worker: 'Sarah Johnson',
    employer: 'XYZ Industries',
    status: 'Investigation',
    createdAt: '5 hours ago',
  },
  {
    id: 'CASE-2339',
    title: 'Contract Breach',
    type: 'Legal',
    priority: 'Medium',
    worker: 'Mike Williams',
    employer: 'Tech Solutions',
    status: 'Evidence Collection',
    createdAt: '1 day ago',
  },
  {
    id: 'CASE-2338',
    title: 'Working Hours Complaint',
    type: 'Compliance',
    priority: 'Low',
    worker: 'Emily Brown',
    employer: 'Retail Plus',
    status: 'Documentation',
    createdAt: '2 days ago',
  },
];

const upcomingInspections = [
  {
    id: 1,
    company: 'Manufacturing Corp',
    type: 'Site Inspection',
    date: 'Feb 15, 2026',
    time: '10:00 AM',
    location: 'Downtown Facility',
    priority: 'High',
  },
  {
    id: 2,
    company: 'Construction Ltd',
    type: 'Safety Audit',
    date: 'Feb 16, 2026',
    time: '2:00 PM',
    location: 'Building Site A',
    priority: 'Medium',
  },
  {
    id: 3,
    company: 'Service Providers Inc',
    type: 'Compliance Check',
    date: 'Feb 17, 2026',
    time: '11:30 AM',
    location: 'Office - Floor 3',
    priority: 'Low',
  },
];

export default function InspectorDashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // 800ms loading time

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <FullPageSkeleton />;
  }

  return (
    <DashboardLayout menuItems={dashboardConfig.menuItems} title="Inspector Dashboard">
      <div className="space-y-4">
        {/* Welcome Banner */}
        <WelcomeBanner
          title={dashboardConfig.welcome.title}
          subtitle={dashboardConfig.welcome.subtitle}
          badgeText={dashboardConfig.welcome.badgeText}
          badgeIcon={Shield}
          gradient={dashboardConfig.welcome.gradient}
          primaryAction={{
            label: 'Search Cases',
            icon: Search,
            onClick: () => {},
          }}
          secondaryAction={{
            label: 'New Inspection',
            icon: ArrowUpRight,
            onClick: () => {},
          }}
          decorativeIcon={ClipboardCheck}
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

        <div className="grid gap-4 lg:grid-cols-2">
          {/* Recent Cases */}
          <Card className="border-0 shadow-xl">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Recent Cases</CardTitle>
                    <CardDescription className="mt-0.5">Active disputes and issues</CardDescription>
                  </div>
                </div>
                <ViewDetailsButton size="md" label="View All" />
              </div>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="space-y-1.5">
                {recentCases.map((case_) => (
                  <CaseCard
                    key={case_.id}
                    id={case_.id}
                    title={case_.title}
                    caseId={case_.id}
                    type={case_.type}
                    priority={case_.priority}
                    status={case_.status}
                    parties={{
                      party1: case_.worker,
                      party2: case_.employer
                    }}
                    timestamp={case_.createdAt}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Inspections */}
          <Card className="border-0 shadow-xl">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Upcoming Inspections</CardTitle>
                    <CardDescription className="mt-0.5">Scheduled site visits</CardDescription>
                  </div>
                </div>
                <ViewDetailsButton size="md" label="View All" />
              </div>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="space-y-1.5">
                {upcomingInspections.map((inspection) => (
                  <div key={inspection.id} className="p-2.5 border border-gray-200 rounded-lg hover:shadow-lg transition-all duration-300 bg-white">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5 min-w-0 flex-1">
                        <Building2 className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                        <h4 className="font-semibold text-xs truncate">{inspection.company}</h4>
                      </div>
                      <span className={`px-1 py-0.5 text-[10px] font-semibold rounded whitespace-nowrap ${
                        inspection.priority === 'High' ? 'bg-red-100 text-red-600' :
                        inspection.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        {inspection.priority}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-500 mb-1">{inspection.type}</p>
                    <div className="flex items-center justify-between text-[10px] text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{inspection.date} • {inspection.time}</span>
                      </div>
                      <span className="text-gray-500 truncate ml-2">{inspection.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <QuickActionsCard
          title="Quick Actions"
          description="Inspector tools and utilities"
          actions={[
            {
              title: 'Submit Report',
              description: 'File inspection report',
              icon: FileText,
              color: 'blue',
              onClick: () => console.log('Submit Report'),
            },
            {
              title: 'Start Inspection',
              description: 'Begin new audit',
              icon: ClipboardCheck,
              color: 'green',
              onClick: () => console.log('Start Inspection'),
            },
            {
              title: 'Review Case',
              description: 'Handle disputes',
              icon: AlertTriangle,
              color: 'orange',
              onClick: () => console.log('Review Case'),
            },
            {
              title: 'Compliance Check',
              description: 'Verify standards',
              icon: Shield,
              color: 'purple',
              onClick: () => console.log('Compliance Check'),
            },
          ]}
          columns={4}
        />
      </div>
    </DashboardLayout>
  );
}
