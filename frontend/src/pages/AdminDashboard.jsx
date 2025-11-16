import React from 'react';
import { Shield, Package, Users, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

// Simple placeholder for an admin link card
const AdminCard = ({ to, title, description, icon: Icon }) => (
  <Link 
    to={to}
    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-start space-x-4"
  >
    <div 
      className="flex-shrink-0 p-3 rounded-full"
      style={{ backgroundColor: 'var(--color-primary-accent)' }}
    >
      <Icon className="w-6 h-6" style={{ color: 'var(--color-primary-dark)' }} />
    </div>
    <div>
      <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--color-primary-dark)' }}>
        {title}
      </h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </Link>
);

const AdminDashboard = () => {
  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--color-light-accent)' }}>
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold flex items-center" style={{ color: 'var(--color-primary-dark)' }}>
          <Shield className="w-10 h-10 mr-4" />
          Admin Dashboard
        </h1>
        <p className="text-lg text-gray-700 mt-2">
          Manage your store's products, orders, and users.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AdminCard
          to="/admin/products"
          title="Manage Products"
          description="Add, edit, or remove products from your inventory."
          icon={Package}
        />
        <AdminCard
          to="/admin/orders"
          title="View Orders"
          description="Review and manage all customer orders."
          icon={Users}
        />
        <AdminCard
          to="/admin/settings"
          title="Store Settings"
          description="Update store details, payment, and shipping."
          icon={Settings}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;