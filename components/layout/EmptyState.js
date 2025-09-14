'use client';

import { Package, Plus, Search, Filter } from 'lucide-react';

const EmptyState = ({
  icon: Icon = Package,
  title = 'No items found',
  description = 'Get started by adding your first item',
  actionLabel = 'Add Item',
  onAction,
  variant = 'default' // 'default', 'search', 'filter'
}) => {
  const variants = {
    default: {
      icon: Package,
      title: 'No items yet',
      description: 'Get started by adding your first item to your inventory.',
      actionLabel: 'Add Your First Item'
    },
    search: {
      icon: Search,
      title: 'No results found',
      description: 'Try adjusting your search terms or browse all items.',
      actionLabel: 'Clear Search'
    },
    filter: {
      icon: Filter,
      title: 'No items match your filters',
      description: 'Try adjusting your filters or browse all items.',
      actionLabel: 'Clear Filters'
    }
  };

  const config = variants[variant] || variants.default;
  const DisplayIcon = Icon || config.icon;
  const displayTitle = title || config.title;
  const displayDescription = description || config.description;
  const displayActionLabel = actionLabel || config.actionLabel;

  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full">
          <DisplayIcon className="w-8 h-8 text-gray-400" />
        </div>
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        {displayTitle}
      </h3>
      
      <p className="text-gray-500 mb-6 max-w-sm mx-auto">
        {displayDescription}
      </p>
      
      {onAction && (
        <button
          onClick={onAction}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          {displayActionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;