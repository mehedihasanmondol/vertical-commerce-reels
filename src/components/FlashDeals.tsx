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
  const [timeLeft, setTimeLeft] = useState("6h 42m 15s");

  useEffect(() => {
    const timer = setInterval(() => {
      // Update countdown timer logic here
      // For demo purposes, we'll keep it static
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">⚡ Flash Deals</h3>
        <div className="text-red-500 font-semibold">
          Ends in: {timeLeft}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {flashDeals.map((deal) => (
          <div key={deal.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div className="w-full h-32 bg-gray-100 dark:bg-gray-700 rounded-lg mb-3"></div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{deal.name}</h4>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg font-bold text-red-500">${deal.discountPrice}</span>
              <span className="text-sm text-gray-500 line-through">${deal.originalPrice}</span>
              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">-{deal.discount}%</span>
            </div>
            <div className="text-xs text-gray-500 mb-3">Ends in: {deal.timeLeft}</div>
            <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
