
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const trendingProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 89,
    rating: 4.5,
    image: "/placeholder.svg",
    badge: "Trending"
  },
  {
    id: 2,
    name: "Smart Phone Case",
    price: 24,
    rating: 4.8,
    image: "/placeholder.svg",
    badge: "New"
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 156,
    rating: 4.3,
    image: "/placeholder.svg",
    badge: "Hot"
  },
  {
    id: 4,
    name: "Fitness Tracker",
    price: 199,
    rating: 4.6,
    image: "/placeholder.svg",
    badge: "Trending"
  },
  {
    id: 5,
    name: "Smart Watch",
    price: 299,
    rating: 4.7,
    image: "/placeholder.svg",
    badge: "Hot"
  }
];

export const TrendingReel = () => {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate('/trending');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
          🔥 Trending Now
        </h3>
        <button 
          onClick={handleViewAll}
          className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 text-sm font-medium"
        >
          View All
        </button>
      </div>
      
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {trendingProducts.map((product) => (
          <div
            key={product.id}
            className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border border-orange-200 dark:border-orange-700 rounded-lg p-3 hover:shadow-lg transition-all duration-300 relative cursor-pointer"
          >
            <div className="absolute top-2 right-2">
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                product.badge === 'New' ? 'bg-green-100 text-green-700 border border-green-200' :
                product.badge === 'Hot' ? 'bg-red-100 text-red-700 border border-red-200' :
                'bg-orange-100 text-orange-700 border border-orange-200'
              }`}>
                {product.badge}
              </span>
            </div>
            
            <div className="w-full h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg mb-2 flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">{product.name}</h4>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-purple-600">${product.price}</span>
              <div className="flex items-center">
                <span className="text-yellow-500">★</span>
                <span className="text-xs text-gray-500 ml-1 font-medium">{product.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
