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
  const [timeLeft, setTimeLeft] = useState("6h 42m 15s");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % flashDeals.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      // Update countdown timer logic here
      // For demo purposes, we'll keep it static
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentDeal = flashDeals[currentIndex];

  return (
    <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg p-6 mb-6 border border-red-200 dark:border-red-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
          ⚡ Flash Deal
        </h3>
        <div className="text-red-500 font-semibold text-sm bg-white dark:bg-gray-800 px-3 py-1 rounded-full border">
          Ends in: {timeLeft}
        </div>
      </div>
      
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {flashDeals.map((deal, index) => (
            <div key={deal.id} className="w-full flex-shrink-0">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700">
                <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-4xl">⏰</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-center">{deal.name}</h4>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-xl font-bold text-red-500">${deal.discountPrice}</span>
                  <span className="text-sm text-gray-500 line-through">${deal.originalPrice}</span>
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold">-{deal.discount}%</span>
                </div>
                <div className="text-xs text-gray-500 mb-3 text-center">Ends in: {deal.timeLeft}</div>
                <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 font-semibold">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Dots indicator */}
      <div className="flex justify-center mt-4 space-x-2">
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
