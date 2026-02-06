'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { StatCard, ServiceCard, ActivityFeed } from '@/components/dashboard';
import { Card, Button } from '@/components/ui';
import { TrendingUp, AlertCircle, CheckCircle, DollarSign } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface Company {
  id: string;
  name: string;
  email: string;
  status: string;
  trial_ends_at?: string;
  activeServices: number;
}

export default function DashboardPage() {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await fetch('/api/companies');
        if (!res.ok) throw new Error('Failed to fetch company');
        const data = await res.json();
        setCompany(data.data);
      } catch (err) {
        setError('Failed to load company information');
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6 border-red-200 bg-red-50">
        <p className="text-red-600">{error}</p>
      </Card>
    );
  }

  if (!company) {
    return <Card className="p-6"><p>No company data found</p></Card>;
  }

  const daysUntilTrialEnds = company.trial_ends_at
    ? Math.ceil(
        (new Date(company.trial_ends_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      )
    : null;

  const mockActivities = [
    {
      id: '1',
      type: 'payment' as const,
      title: 'Payment Received',
      description: '$149.00 for Website Hosting Service',
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      type: 'deployment' as const,
      title: 'Website Update Deployed',
      description: 'Latest website changes are now live',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '3',
      type: 'ticket' as const,
      title: 'Support Ticket Resolved',
      description: 'Your technical issue has been resolved',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  return (
    <motion.div
      className="space-y-8"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {/* Welcome Section */}
      <motion.div variants={staggerItem}>
        <h1 className="text-4xl font-bold text-gray-900">Welcome back, {company.name}!</h1>
        <p className="text-gray-600 mt-2">Manage your services and account below</p>
      </motion.div>

      {/* Status Alerts */}
      <motion.div variants={staggerItem}>
        {company.status === 'trial' && daysUntilTrialEnds !== null && (
          <Card className="p-4 border-amber-200 bg-amber-50">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-900">Trial Account</p>
                <p className="text-sm text-amber-800 mt-1">
                  {daysUntilTrialEnds > 0
                    ? `${daysUntilTrialEnds} days remaining on your trial`
                    : 'Trial has expired'}
                </p>
              </div>
            </div>
          </Card>
        )}

        {company.status === 'active' && (
          <Card className="p-4 border-success bg-green-50">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-900">Account Active</p>
                <p className="text-sm text-green-800 mt-1">Your account is in good standing</p>
              </div>
            </div>
          </Card>
        )}
      </motion.div>

      {/* Stat Cards */}
      <motion.div
        variants={staggerItem}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
      >
        <StatCard
          label="Active Services"
          value={company.activeServices}
          icon={CheckCircle}
          color="blue"
          trend="up"
          trendValue="+1 this month"
        />
        <StatCard
          label="Next Bill Due"
          value="Mar 1"
          icon={DollarSign}
          color="green"
        />
        <StatCard
          label="Support Tickets"
          value="0"
          icon={AlertCircle}
          color="amber"
        />
        <StatCard
          label="Uptime"
          value="99.9%"
          icon={TrendingUp}
          color="purple"
        />
      </motion.div>

      {/* Main Content Grid */}
      <motion.div variants={staggerItem} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Services */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Services</h2>
            <div className="space-y-4">
              <ServiceCard
                title="Website Hosting"
                status="active"
                description="Professional hosting and SSL certificate"
                renewDate="Apr 15, 2026"
                price="$149/month"
                onManage={() => console.log('Manage hosting')}
              />
              <ServiceCard
                title="SEO Package"
                status="active"
                description="Monthly SEO optimization and reporting"
                renewDate="May 1, 2026"
                price="$299/month"
                onManage={() => console.log('Manage SEO')}
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="primary" className="w-full justify-center" asLink href="/dashboard/services">
                Manage Services
              </Button>
              <Button variant="secondary" className="w-full justify-center" asLink href="/dashboard/billing">
                View Invoices
              </Button>
              <Button variant="ghost" className="w-full justify-center" asLink href="/dashboard/support">
                Contact Support
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Info</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600">Email</p>
                <p className="font-medium text-gray-900">{company.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Status</p>
                <p className="font-medium text-gray-900 capitalize">{company.status}</p>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>

      {/* Activity Feed */}
      <motion.div variants={staggerItem}>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        <ActivityFeed activities={mockActivities} />
      </motion.div>
    </motion.div>
  );
}
