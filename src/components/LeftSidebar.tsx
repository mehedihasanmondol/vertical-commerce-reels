
import { useState } from 'react';
import { Product } from '../types/Product';

interface LeftSidebarProps {
  products: Product[];
  currentProductIndex: number;
  onProductChange: (index: number) => void;
}

export const LeftSidebar = ({ products, currentProductIndex, onProductChange }: LeftSidebarProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  // Get upcoming products (next 3 products after current)
  const getUpcomingProducts = () => {
    const upcoming = [];
    for (let i = 1; i <= 3; i++) {
      const nextIndex = (currentProductIndex + i) % products.length;
      upcoming.push({ ...products[nextIndex], index: nextIndex });
    }
    return upcoming;
  };

  const upcomingProducts = getUpcomingProducts();

  return (
    <div className="h-full flex flex-col">
      {/* Categories Section - 25% height */}
      <div className="h-1/4 p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Upcoming Products Section - 75% height */}
      <div className="h-3/4 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Up Next</h3>
        </div>
        
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="space-y-0">
            {upcomingProducts.map((product, idx) => (
              <div
                key={`${product.id}-${idx}`}
                onClick={() => onProductChange(product.index)}
                className="cursor-pointer group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300 border-b border-gray-100 dark:border-gray-800"
              >
                <div className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                          ${product.price}
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          {idx + 1} of 3
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
