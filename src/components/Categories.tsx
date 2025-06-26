
import { useState, useEffect } from 'react';
import { Badge } from './ui/badge';

const categories = [
  { id: 1, name: "Electronics", icon: "📱", count: 245 },
  { id: 2, name: "Fashion", icon: "👕", count: 189 },
  { id: 3, name: "Home & Garden", icon: "🏠", count: 156 },
  { id: 4, name: "Sports", icon: "⚽", count: 98 },
  { id: 5, name: "Books", icon: "📚", count: 203 },
  { id: 6, name: "Beauty", icon: "💄", count: 167 },
  { id: 7, name: "Automotive", icon: "🚗", count: 87 },
  { id: 8, name: "Toys", icon: "🧸", count: 134 }
];

export const Categories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % categories.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const currentCategory = categories[currentIndex];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Shop by Category</h3>
      
      <div className="flex justify-center">
        <div className="relative group cursor-pointer p-6 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-300 min-w-[200px] text-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 hover:scale-105">
          {/* Badge for item count */}
          <div className="absolute -top-2 -right-2">
            <Badge variant="default" className="bg-purple-500 text-white text-xs px-2 py-1">
              {currentCategory.count}
            </Badge>
          </div>
          
          <div className="text-5xl mb-3 animate-fade-in">{currentCategory.icon}</div>
          <h4 className="font-semibold text-gray-900 dark:text-white text-lg">{currentCategory.name}</h4>
        </div>
      </div>
      
      {/* Dots indicator */}
      <div className="flex justify-center mt-4 space-x-2">
        {categories.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-purple-500' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
