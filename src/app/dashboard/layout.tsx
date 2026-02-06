'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import { LayoutDashboard, DollarSign, Wrench, Settings, MessageSquare, LogOut } from 'lucide-react';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/services', label: 'Services', icon: Wrench },
  { href: '/dashboard/billing', label: 'Billing', icon: DollarSign },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  { href: '/dashboard/support', label: 'Support', icon: MessageSquare },
];

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
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-deep-navy">Synergy</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                  isActive
                    ? 'bg-soft-blue text-synergy-blue font-semibold'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-6 border-t border-gray-200">
          <Button
            variant="secondary"
            size="md"
            onClick={handleLogout}
            disabled={loading}
            className="w-full justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            {loading ? 'Logging out...' : 'Logout'}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 bg-gray-50 min-h-screen">
        <div className="p-8 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
