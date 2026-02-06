// src/app/dashboard/page.tsx
// Dashboard overview

'use client';

import { useEffect, useState } from 'react';

interface Company {
  id: string;
  name: string;
  email: string;
  status: string;
  trial_ends_at: string;
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="bg-red-50 text-red-700 p-4 rounded">{error}</div>;
  if (!company) return <div>No company data</div>;

  const daysUntilTrialEnds = company.trial_ends_at
    ? Math.ceil(
        (new Date(company.trial_ends_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      )
    : null;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Welcome, {company.name}!</h1>

      {/* Status alerts */}
      {company.status === 'trial' && daysUntilTrialEnds !== null && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-8">
          <p className="font-medium">Trial Account</p>
          <p>
            {daysUntilTrialEnds > 0
              ? `${daysUntilTrialEnds} days remaining`
              : 'Trial has expired'}
            . Upgrade to continue using services.
          </p>
        </div>
      )}

      {company.status === 'active' && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-8">
          <p className="font-medium">✓ Account Active</p>
        </div>
      )}

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card p-6">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Account Status</h3>
          <p className="text-3xl font-bold text-blue-600 capitalize">{company.status}</p>
        </div>

        <div className="card p-6">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Active Services</h3>
          <p className="text-3xl font-bold text-green-600">{company.activeServices}</p>
        </div>

        <div className="card p-6">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Account Email</h3>
          <p className="text-lg font-medium">{company.email}</p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="card p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="space-y-2">
          <a href="/dashboard/services" className="block btn btn-primary w-full text-center">
            Manage Services
          </a>
          <a href="/dashboard/billing" className="block btn btn-secondary w-full text-center">
            View Billing
          </a>
          <a href="/dashboard/support" className="block btn btn-secondary w-full text-center">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
