
import { NavigationHeader } from '../components/NavigationHeader';
import { useState, useEffect } from 'react';

const flashDeals = [
  {
    id: 1,
    name: "Smart Watch Pro",
    originalPrice: 299,
    discountPrice: 199,
    discount: 33,
    image: "/placeholder.svg",
    timeLeft: "2h 30m",
    description: "Advanced smartwatch with health monitoring and GPS",
    stock: 15
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    originalPrice: 149,
    discountPrice: 89,
    discount: 40,
    image: "/placeholder.svg",
    timeLeft: "4h 15m",
    description: "Premium wireless earbuds with noise cancellation",
    stock: 8
  },
  {
    id: 3,
    name: "Gaming Mouse",
    originalPrice: 79,
    discountPrice: 49,
    discount: 38,
    image: "/placeholder.svg",
    timeLeft: "1h 45m",
    description: "High-precision gaming mouse with RGB lighting",
    stock: 23
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    originalPrice: 129,
    discountPrice: 79,
    discount: 39,
    image: "/placeholder.svg",
    timeLeft: "3h 20m",
    description: "Portable Bluetooth speaker with 360-degree sound",
    stock: 12
  },
  {
    id: 5,
    name: "Laptop Stand",
    originalPrice: 59,
    discountPrice: 35,
    discount: 41,
    image: "/placeholder.svg",
    timeLeft: "5h 10m",
    description: "Adjustable aluminum laptop stand for ergonomic working",
    stock: 18
  },
  {
    id: 6,
    name: "Phone Charger",
    originalPrice: 39,
    discountPrice: 19,
    discount: 51,
    image: "/placeholder.svg",
    timeLeft: "6h 45m",
    description: "Fast wireless charging pad compatible with all devices",
    stock: 7
  }
];

const FlashSale = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState("23:59:59");

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      // Simple countdown simulation
      const now = new Date();
      const hours = 23 - now.getHours();
      const minutes = 59 - now.getMinutes();
      const seconds = 59 - now.getSeconds();
      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black min-h-screen">
        <NavigationHeader 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode}
        />
        
        <div className="pt-20 px-4 max-w-6xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
              ⚡ Flash Sale
            </h1>
            <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-full inline-block mb-4">
              <span className="text-lg font-bold">⏰ Ends in: {timeLeft}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">Limited time offers - grab them before they're gone!</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flashDeals.map((deal) => (
              <div
                key={deal.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-red-200 dark:border-red-700 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded-bl-lg">
                  <span className="text-sm font-bold">-{deal.discount}%</span>
                </div>
                
                <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-6xl">⏰</span>
                </div>
                
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">{deal.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{deal.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-red-500">${deal.discountPrice}</span>
                    <span className="text-lg text-gray-500 line-through">${deal.originalPrice}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                    ⏱ {deal.timeLeft} left
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    📦 {deal.stock} left in stock
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 font-bold">
                  Buy Now - Limited Time!
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSale;
