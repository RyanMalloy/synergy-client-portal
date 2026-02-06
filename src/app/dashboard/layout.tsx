// src/app/dashboard/layout.tsx
// Dashboard layout

'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const navLinks = [
    { href: '/dashboard', label: 'Overview', icon: '📊' },
    { href: '/dashboard/billing', label: 'Billing', icon: '💳' },
    { href: '/dashboard/services', label: 'Services', icon: '⚙️' },
    { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
    { href: '/dashboard/support', label: 'Support', icon: '💬' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 shadow">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600 mb-8">Synergy</h1>
          <nav className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  pathname === link.href
                    ? 'bg-blue-100 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.icon} {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout button */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
          <button
            onClick={handleLogout}
            disabled={loading}
            className="btn btn-secondary w-full"
          >
            {loading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
