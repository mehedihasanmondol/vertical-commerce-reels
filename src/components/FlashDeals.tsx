
import { useState, useEffect } from 'react';

const flashDeals = [
  {
    id: 1,
    name: "Smart Watch Pro",
    originalPrice: 299,
    discountPrice: 199,
    discount: 33,
    image: "/placeholder.svg",
    timeLeft: "2h 30m"
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    originalPrice: 149,
    discountPrice: 89,
    discount: 40,
    image: "/placeholder.svg",
    timeLeft: "4h 15m"
  },
  {
    id: 3,
    name: "Gaming Mouse",
    originalPrice: 79,
    discountPrice: 49,
    discount: 38,
    image: "/placeholder.svg",
    timeLeft: "1h 45m"
  }
];

export const FlashDeals = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % flashDeals.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const currentDeal = flashDeals[currentIndex];

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700">
          <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg mb-3 flex items-center justify-center">
            <span className="text-4xl">⏰</span>
          </div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-center">{currentDeal.name}</h4>
          <div className="flex items-center justify-center space-x-2 mb-2">
            <span className="text-xl font-bold text-red-500">${currentDeal.discountPrice}</span>
            <span className="text-sm text-gray-500 line-through">${currentDeal.originalPrice}</span>
            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold">-{currentDeal.discount}%</span>
          </div>
          <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 font-semibold">
            Buy Now
          </button>
        </div>
      </div>
      
      {/* Dots indicator */}
      <div className="flex justify-center space-x-2">
        {flashDeals.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
