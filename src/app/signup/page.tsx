// src/app/signup/page.tsx
// Signup page

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error?.details) {
          setErrors(data.error.details);
        } else {
          setErrors({ _general: data.error?.message || 'Signup failed' });
        }
        return;
      }

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err) {
      setErrors({ _general: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="card max-w-md w-full p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>

        {errors._general && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {errors._general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Company Name</label>
            <input
              type="text"
              name="companyName"
              className="input"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
            {errors.companyName && <p className="error-text">{errors.companyName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="error-text text-xs">{errors.password}</p>}
            <p className="text-xs text-gray-500 mt-1">
              Min 12 chars, uppercase, lowercase, number, special char
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              name="passwordConfirm"
              className="input"
              value={formData.passwordConfirm}
              onChange={handleChange}
              required
            />
            {errors.passwordConfirm && <p className="error-text">{errors.passwordConfirm}</p>}
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-sm text-center">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:text-blue-700">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
