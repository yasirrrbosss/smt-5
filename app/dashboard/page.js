'use client';

import { Package, Tag, TrendingUp, Plus } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { useItems } from '../../context/ItemsContext';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StatsCard from '../../components/dashboard/StatsCard';
import RecentItems from '../../components/dashboard/RecentItems';

export default function DashboardPage() {
  const { user } = useAuth();
  const { getStats } = useItems();
  const stats = getStats();

  const quickActions = [
    {
      title: 'Add New Item',
      description: 'Quickly add a new item to your inventory',
      href: '/dashboard/items',
      icon: Plus,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'View All Items',
      description: 'Browse and manage your complete inventory',
      href: '/dashboard/items',
      icon: Package,
      color: 'bg-green-500 hover:bg-green-600'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.displayName || user?.name}!
          </h1>
          <p className="text-blue-100">
            Here&apos;s an overview of your personal inventory
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Total Items"
            value={stats.totalItems}
            icon={Package}
            color="blue"
          />
          <StatsCard
            title="Categories"
            value={stats.categories}
            icon={Tag}
            color="green"
          />
          <StatsCard
            title="Recent Additions"
            value={stats.recentItems.length}
            icon={TrendingUp}
            color="purple"
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                href={action.href}
                className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-center">
                  <div className={`flex-shrink-0 p-3 rounded-lg ${action.color} transition-colors`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Recent Items */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentItems limit={8} />
          </div>
          
          {/* Categories Overview */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Tag className="h-5 w-5 mr-2 text-green-600" />
                Categories
              </h3>
            </div>
            <div className="p-6">
              {stats.categories === 0 ? (
                <div className="text-center py-8">
                  <Tag className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No categories yet</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Add items to see categories here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{stats.categories}</div>
                    <div className="text-sm text-gray-600">Active Categories</div>
                  </div>
                  <Link
                    href="/dashboard/items"
                    className="block w-full text-center bg-green-50 text-green-700 py-2 px-4 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
                  >
                    View All Items
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Getting Started Tips */}
        {stats.totalItems === 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Getting Started
            </h3>
            <div className="space-y-2 text-blue-800">
              <p>Welcome to your personal inventory manager! Here&apos;s how to get started:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Click &quot;Add New Item&quot; to create your first inventory item</li>
                <li>Organize items by categories (e.g., Electronics, Books, Tools)</li>
                <li>Add descriptions and locations to easily find your items</li>
                <li>Use the search feature to quickly locate specific items</li>
              </ul>
            </div>
            <Link
              href="/dashboard/items"
              className="inline-flex items-center mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Item
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}