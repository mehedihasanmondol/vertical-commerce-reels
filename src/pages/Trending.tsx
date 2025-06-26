
import { NavigationHeader } from '../components/NavigationHeader';
import { useState } from 'react';

const trendingProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 89,
    rating: 4.5,
    image: "/placeholder.svg",
    badge: "Trending",
    description: "Premium wireless headphones with noise cancellation"
  },
  {
    id: 2,
    name: "Smart Phone Case",
    price: 24,
    rating: 4.8,
    image: "/placeholder.svg",
    badge: "New",
    description: "Protective case with wireless charging support"
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 156,
    rating: 4.3,
    image: "/placeholder.svg",
    badge: "Hot",
    description: "Portable speaker with 360-degree sound"
  },
  {
    id: 4,
    name: "Fitness Tracker",
    price: 199,
    rating: 4.6,
    image: "/placeholder.svg",
    badge: "Trending",
    description: "Advanced fitness tracking with heart rate monitor"
  },
  {
    id: 5,
    name: "Smart Watch",
    price: 299,
    rating: 4.7,
    image: "/placeholder.svg",
    badge: "Hot",
    description: "Full-featured smartwatch with GPS and health monitoring"
  },
  {
    id: 6,
    name: "Wireless Earbuds",
    price: 129,
    rating: 4.4,
    image: "/placeholder.svg",
    badge: "Trending",
    description: "True wireless earbuds with active noise cancellation"
  }
];

const Trending = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black min-h-screen">
        <NavigationHeader 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode}
        />
        
        <div className="pt-20 px-4 max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
              🔥 Trending Now
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Discover the hottest products everyone is talking about</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border border-orange-200 dark:border-orange-700 rounded-lg p-6 hover:shadow-lg transition-all duration-300 relative cursor-pointer"
              >
                <div className="absolute top-4 right-4">
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    product.badge === 'New' ? 'bg-green-100 text-green-700 border border-green-200' :
                    product.badge === 'Hot' ? 'bg-red-100 text-red-700 border border-red-200' :
                    'bg-orange-100 text-orange-700 border border-orange-200'
                  }`}>
                    {product.badge}
                  </span>
                </div>
                
                <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-6xl">🎯</span>
                </div>
                
                <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{product.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-purple-600">${product.price}</span>
                  <div className="flex items-center">
                    <span className="text-yellow-500 text-lg">★</span>
                    <span className="text-sm text-gray-500 ml-1 font-medium">{product.rating}</span>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-purple-600 to-orange-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-orange-700 transition-all duration-300 font-semibold">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;
