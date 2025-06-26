
import { useState, useEffect } from 'react';

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
  }
];

export const TrendingSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trendingProducts.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  const currentProduct = trendingProducts[currentIndex];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg mb-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        🔥 Trending Now
      </h3>
      
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border border-orange-200 dark:border-orange-700 rounded-lg p-4 hover:shadow-lg transition-all duration-300 relative">
          <div className="absolute top-2 right-2 z-10">
            <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
              currentProduct.badge === 'New' ? 'bg-green-100 text-green-700 border border-green-200' :
              currentProduct.badge === 'Hot' ? 'bg-red-100 text-red-700 border border-red-200' :
              'bg-orange-100 text-orange-700 border border-orange-200'
            }`}>
              {currentProduct.badge}
            </span>
          </div>
          
          <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg mb-3 flex items-center justify-center">
            <span className="text-4xl">🎯</span>
          </div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 text-center">{currentProduct.name}</h4>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-purple-600">${currentProduct.price}</span>
            <div className="flex items-center">
              <span className="text-yellow-500 text-lg">★</span>
              <span className="text-sm text-gray-500 ml-1 font-medium">{currentProduct.rating}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dots indicator */}
      <div className="flex justify-center mt-4 space-x-2">
        {trendingProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
