// src/app/page.tsx
// Home / Landing page

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="container py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Synergy</h1>
          <div className="space-x-4">
            <a href="/login" className="text-gray-600 hover:text-gray-900">
              Login
            </a>
            <a href="/signup" className="btn btn-primary">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="container py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-4 text-gray-900">
            Manage Your Services with Ease
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Simple, secure billing and service management for your business.
          </p>
          <a href="/signup" className="inline-block btn btn-primary btn-lg">
            Start Free Trial
          </a>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-16">
        <div className="container">
          <h3 className="text-3xl font-bold text-center mb-12">Key Features</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Easy Billing',
                desc: 'Manage subscriptions and invoices in one place',
              },
              {
                title: 'Secure Payment',
                desc: 'Powered by Stripe for safe, encrypted transactions',
              },
              {
                title: '24/7 Support',
                desc: 'Our team is here to help whenever you need',
              },
            ].map((feature, i) => (
              <div key={i} className="card p-8">
                <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-blue-600 text-white py-16">
        <div className="container text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to get started?</h3>
          <a href="/signup" className="inline-block btn bg-white text-blue-600 hover:bg-gray-100">
            Create Your Account Today
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container flex justify-between">
          <p>&copy; 2024 Synergy Development LLC. All rights reserved.</p>
          <div className="space-x-4">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
