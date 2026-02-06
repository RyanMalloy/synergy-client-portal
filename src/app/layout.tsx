// src/app/layout.tsx
// Root layout

import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Synergy Client Portal',
  description: 'Manage your services, billing, and account',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <main>{children}</main>
      </body>
    </html>
  );
}
