// src/app/dashboard/support/page.tsx
// Support & Help page

'use client';

import { useEffect, useState } from 'react';

interface Ticket {
  id: string;
  subject: string;
  description: string;
  priority: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function SupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ subject: '', description: '', priority: 'medium' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await fetch('/api/support/tickets');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setTickets(data.data || []);
    } catch (err) {
      setError('Failed to load support tickets');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/support/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to create ticket');

      const data = await res.json();
      setTickets([data.data, ...tickets]);
      setFormData({ subject: '', description: '', priority: 'medium' });
      setShowForm(false);
      setSuccess('Support ticket created successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to create support ticket');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Support & Help</h1>

      {error && <div className="bg-red-50 text-red-700 p-4 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-50 text-green-700 p-4 rounded mb-4">{success}</div>}

      {/* New ticket form */}
      <div className="card p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create Support Ticket</h2>
          {!showForm && (
            <button onClick={() => setShowForm(true)} className="btn btn-primary btn-sm">
              New Ticket
            </button>
          )}
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                className="input"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                className="input"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Priority</label>
              <select
                name="priority"
                className="input"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Submit Ticket'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Tickets list */}
      <div className="card p-6">
        <h2 className="text-xl font-bold mb-4">Your Tickets</h2>

        {loading ? (
          <p>Loading tickets...</p>
        ) : tickets.length === 0 ? (
          <p className="text-gray-600">No support tickets yet.</p>
        ) : (
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{ticket.subject}</h3>
                  <div className="space-x-2">
                    <span
                      className={`px-3 py-1 rounded text-xs font-medium ${
                        ticket.priority === 'urgent'
                          ? 'bg-red-100 text-red-800'
                          : ticket.priority === 'high'
                          ? 'bg-orange-100 text-orange-800'
                          : ticket.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {ticket.priority}
                    </span>
                    <span
                      className={`px-3 py-1 rounded text-xs font-medium ${
                        ticket.status === 'resolved'
                          ? 'bg-green-100 text-green-800'
                          : ticket.status === 'in_progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-2">{ticket.description}</p>
                <p className="text-xs text-gray-500">
                  Created: {new Date(ticket.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FAQ */}
      <div className="card p-6 mt-8">
        <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            {
              q: 'How do I cancel my subscription?',
              a: 'Go to Services and click "Cancel Service". Your service will be canceled at the end of your billing period.',
            },
            {
              q: 'Can I change my billing method?',
              a: 'Yes, go to Billing and click "Update Payment Method" to add a new card or payment source.',
            },
            {
              q: 'What payment methods do you accept?',
              a: 'We accept all major credit cards (Visa, Mastercard, American Express) and bank transfers via Stripe.',
            },
          ].map((item, i) => (
            <div key={i} className="border-t pt-4">
              <p className="font-bold mb-2">{item.q}</p>
              <p className="text-gray-600">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
