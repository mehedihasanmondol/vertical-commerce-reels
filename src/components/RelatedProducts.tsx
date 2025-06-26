
import { useState, useEffect } from 'react';

// Mock related products - in real app this would be based on current product
const relatedProducts = [
  {
    id: 1,
    name: "Wireless Mouse",
    price: 29,
    rating: 4.2,
    image: "/placeholder.svg",
    category: "Electronics"
  },
  {
    id: 2,
    name: "USB-C Cable",
    price: 15,
    rating: 4.7,
    image: "/placeholder.svg",
    category: "Electronics"
  },
  {
    id: 3,
    name: "Phone Stand",
    price: 19,
    rating: 4.4,
    image: "/placeholder.svg",
    category: "Electronics"
  },
  {
    id: 4,
    name: "Laptop Sleeve",
    price: 35,
    rating: 4.6,
    image: "/placeholder.svg",
    category: "Electronics"
  }
];

export const RelatedProducts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % relatedProducts.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const currentProduct = relatedProducts[currentIndex];

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
        🔗 Related Products
      </h3>
      
      <div className="relative overflow-hidden">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md border border-gray-200 dark:border-gray-700">
          <div className="w-full h-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg mb-3 flex items-center justify-center">
            <span className="text-4xl">📦</span>
          </div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-center">{currentProduct.name}</h4>
          <div className="text-xs text-blue-600 dark:text-blue-400 mb-2 text-center font-medium">
            {currentProduct.category}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-blue-600">${currentProduct.price}</span>
            <div className="flex items-center">
              <span className="text-yellow-500">★</span>
              <span className="text-sm text-gray-500 ml-1">{currentProduct.rating}</span>
            </div>
          </div>
          <button className="w-full mt-3 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
            Add to Cart
          </button>
        </div>
      </div>
      
      {/* Dots indicator */}
      <div className="flex justify-center space-x-2">
        {relatedProducts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
