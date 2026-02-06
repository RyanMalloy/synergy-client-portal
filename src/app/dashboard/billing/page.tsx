// src/app/dashboard/billing/page.tsx
// Billing & Invoices page

'use client';

import { useEffect, useState } from 'react';

interface Invoice {
  id: string;
  invoice_number: string;
  amount: number;
  currency: string;
  status: string;
  due_date: string;
  paid_at: string | null;
  pdf_url: string | null;
  created_at: string;
}

export default function BillingPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await fetch('/api/invoices');
        if (!res.ok) throw new Error('Failed to fetch invoices');
        const data = await res.json();
        setInvoices(data.data || []);
      } catch (err) {
        setError('Failed to load invoices');
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Billing & Invoices</h1>

      {/* Billing information */}
      <div className="card p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Payment Method</h2>
        <p className="text-gray-600 mb-4">
          Update your payment method or billing address below.
        </p>
        <button className="btn btn-primary">Update Payment Method</button>
      </div>

      {/* Invoices */}
      <div className="card p-6">
        <h2 className="text-xl font-bold mb-4">Invoice History</h2>

        {error && <div className="bg-red-50 text-red-700 p-4 rounded mb-4">{error}</div>}

        {loading ? (
          <p>Loading invoices...</p>
        ) : invoices.length === 0 ? (
          <p className="text-gray-600">No invoices yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold">Invoice</th>
                  <th className="text-left py-3 px-4 font-semibold">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">Due Date</th>
                  <th className="text-left py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4">{invoice.invoice_number}</td>
                    <td className="py-3 px-4">
                      ${invoice.amount.toFixed(2)} {invoice.currency}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded text-xs font-medium ${
                          invoice.status === 'paid'
                            ? 'bg-green-100 text-green-800'
                            : invoice.status === 'open'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : '—'}
                    </td>
                    <td className="py-3 px-4">
                      {invoice.pdf_url && (
                        <a href={invoice.pdf_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                          Download PDF
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
