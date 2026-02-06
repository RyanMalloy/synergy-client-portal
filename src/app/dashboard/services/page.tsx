// src/app/dashboard/services/page.tsx
// Services management page

'use client';

import { useEffect, useState } from 'react';

interface Subscription {
  id: string;
  name: string;
  status: string;
  base_price_cents: number;
  billing_cycle: string;
  current_period_end: string;
  features: string[];
}

interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  billing_cycle: string;
  features: string[];
  tier: string;
}

export default function ServicesPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [availableServices, setAvailableServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subRes, servRes] = await Promise.all([
          fetch('/api/subscriptions'),
          fetch('/api/services'),
        ]);

        if (!subRes.ok || !servRes.ok) throw new Error('Failed to fetch');

        const subData = await subRes.json();
        const servData = await servRes.json();

        setSubscriptions(subData.data || []);
        setAvailableServices(servData.data || []);
      } catch (err) {
        setError('Failed to load services');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCancel = async (subscriptionId: string) => {
    if (!confirm('Are you sure? This will cancel at the end of your billing period.')) return;

    try {
      const res = await fetch(`/api/subscriptions/${subscriptionId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setSubscriptions(subscriptions.filter((s) => s.id !== subscriptionId));
      } else {
        setError('Failed to cancel subscription');
      }
    } catch (err) {
      setError('Error canceling subscription');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Services</h1>

      {error && <div className="bg-red-50 text-red-700 p-4 rounded mb-4">{error}</div>}

      {/* Active subscriptions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Your Services</h2>

        {loading ? (
          <p>Loading services...</p>
        ) : subscriptions.length === 0 ? (
          <p className="text-gray-600">No active subscriptions.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {subscriptions.map((sub) => (
              <div key={sub.id} className="card p-6">
                <h3 className="text-xl font-bold mb-2">{sub.name}</h3>
                <p className="text-gray-600 mb-4">
                  ${(sub.base_price_cents / 100).toFixed(2)}/{sub.billing_cycle}
                </p>
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Features:</p>
                  <ul className="text-sm space-y-1">
                    {sub.features?.slice(0, 3).map((feature, i) => (
                      <li key={i} className="text-gray-700">
                        ✓ {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-2">
                  <span
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      sub.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {sub.status}
                  </span>
                </div>
                <button
                  onClick={() => handleCancel(sub.id)}
                  className="btn btn-danger btn-sm mt-4 w-full"
                >
                  Cancel Service
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Available services */}
      <div>
        <h2 className="text-xl font-bold mb-4">Available Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {availableServices.map((service) => (
            <div key={service.id} className="card p-6 border-2 border-blue-200">
              <h3 className="text-xl font-bold mb-2">{service.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{service.description}</p>
              <p className="text-2xl font-bold mb-4">
                ${service.basePrice.toFixed(2)}/{service.billing_cycle}
              </p>
              <ul className="text-sm space-y-2 mb-6">
                {service.features?.map((feature, i) => (
                  <li key={i} className="text-gray-700">
                    ✓ {feature}
                  </li>
                ))}
              </ul>
              <button className="btn btn-primary w-full">Subscribe Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
