
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    originalPrice: 129,
    discountPrice: 79,
    discount: 39,
    image: "/placeholder.svg",
    timeLeft: "3h 20m"
  }
];

export const FlashSaleReel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate('/flash-sale');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
          ⚡ Flash Sale
        </h3>
        <button 
          onClick={handleViewAll}
          className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium"
        >
          View All
        </button>
      </div>
      
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {flashDeals.map((deal) => (
          <div
            key={deal.id}
            className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="w-full h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg mb-2 flex items-center justify-center">
              <span className="text-2xl">⏰</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">{deal.name}</h4>
            <div className="flex items-center justify-between text-xs mb-2">
              <div className="flex items-center space-x-1">
                <span className="font-bold text-red-500">${deal.discountPrice}</span>
                <span className="text-gray-500 line-through">${deal.originalPrice}</span>
              </div>
              <span className="bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-semibold">-{deal.discount}%</span>
            </div>
            <div className="text-xs text-orange-600 dark:text-orange-400 font-medium">⏱ {deal.timeLeft}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
