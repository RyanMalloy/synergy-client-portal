// src/app/dashboard/settings/page.tsx
// Account settings page

'use client';

import { useEffect, useState } from 'react';

interface Company {
  id: string;
  name: string;
  email: string;
  billing_email: string;
  billing_address: string;
}

export default function SettingsPage() {
  const [company, setCompany] = useState<Company | null>(null);
  const [formData, setFormData] = useState({ name: '', billingEmail: '', billingAddress: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await fetch('/api/companies');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setCompany(data.data);
        setFormData({
          name: data.data.name,
          billingEmail: data.data.billing_email || '',
          billingAddress: data.data.billing_address || '',
        });
      } catch (err) {
        setError('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch('/api/companies', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to update');

      setSuccess('Settings saved successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

      {error && <div className="bg-red-50 text-red-700 p-4 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-50 text-green-700 p-4 rounded mb-4">{success}</div>}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Company settings */}
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-4">Company Information</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Company Name</label>
              <input
                type="text"
                name="name"
                className="input"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Billing Email</label>
              <input
                type="email"
                name="billingEmail"
                className="input"
                value={formData.billingEmail}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Billing Address</label>
              <textarea
                name="billingAddress"
                className="input"
                rows={4}
                value={formData.billingAddress}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>

        {/* Security settings */}
        <div className="card p-6">
          <h2 className="text-xl font-bold mb-4">Security</h2>

          <div className="space-y-4">
            <div>
              <p className="font-medium mb-2">Account Email</p>
              <p className="text-gray-600 mb-4">{company?.email}</p>
              <button className="btn btn-secondary btn-sm">Change Email</button>
            </div>

            <div className="border-t pt-4">
              <p className="font-medium mb-2">Password</p>
              <p className="text-gray-600 text-sm mb-4">
                Change your password to keep your account secure
              </p>
              <button className="btn btn-secondary btn-sm">Change Password</button>
            </div>

            <div className="border-t pt-4">
              <p className="font-medium mb-2">Two-Factor Authentication</p>
              <p className="text-gray-600 text-sm mb-4">
                Add an extra layer of security to your account
              </p>
              <button className="btn btn-secondary btn-sm">Enable 2FA</button>
            </div>
          </div>
        </div>
      </div>

      {/* Danger zone */}
      <div className="card p-6 border-red-200 mt-8">
        <h2 className="text-xl font-bold text-red-600 mb-4">Danger Zone</h2>
        <p className="text-gray-600 mb-4">
          Permanently delete your account and all associated data.
        </p>
        <button className="btn bg-red-600 text-white hover:bg-red-700">
          Delete Account
        </button>
      </div>
    </div>
  );
}
