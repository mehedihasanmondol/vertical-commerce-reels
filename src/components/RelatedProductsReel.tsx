
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from 'lucide-react';
import { Product } from '../types/Product';

interface RelatedProductsReelProps {
  currentProduct: Product;
}

// Mock related products with more variety
const generateRelatedProducts = (currentProduct: Product) => [
  {
    id: 101,
    name: "Wireless Mouse Pro",
    price: 29,
    rating: 4.2,
    image: "/placeholder.svg",
    category: "Electronics",
    originalPrice: 39
  },
  {
    id: 102,
    name: "USB-C Cable 6ft",
    price: 15,
    rating: 4.7,
    image: "/placeholder.svg",
    category: "Electronics",
    originalPrice: 25
  },
  {
    id: 103,
    name: "Adjustable Phone Stand",
    price: 19,
    rating: 4.4,
    image: "/placeholder.svg",
    category: "Electronics",
    originalPrice: 29
  },
  {
    id: 104,
    name: "Laptop Sleeve 13\"",
    price: 35,
    rating: 4.6,
    image: "/placeholder.svg",
    category: "Electronics",
    originalPrice: 49
  },
  {
    id: 105,
    name: "Bluetooth Speaker",
    price: 45,
    rating: 4.3,
    image: "/placeholder.svg",
    category: "Electronics",
    originalPrice: 69
  },
  {
    id: 106,
    name: "Wireless Charger",
    price: 25,
    rating: 4.5,
    image: "/placeholder.svg",
    category: "Electronics",
    originalPrice: 35
  }
];

export const RelatedProductsReel = ({ currentProduct }: RelatedProductsReelProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [relatedProducts] = useState(() => generateRelatedProducts(currentProduct));
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const productsPerPage = 2; // 2 products in 2-line view
  const totalPages = Math.ceil(relatedProducts.length / productsPerPage);

  useEffect(() => {
    // Auto-scroll every 5 seconds
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000);

    return () => clearInterval(timer);
  }, [totalPages]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const scrollAmount = currentPage * (scrollContainerRef.current.scrollWidth / totalPages);
      scrollContainerRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }, [currentPage, totalPages]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentProducts = relatedProducts.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
          🔗 Related Products
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={prevPage}
            className="p-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={nextPage}
            className="p-1 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      
      <div className="relative overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-hidden scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex-shrink-0 w-full">
            <div className="grid grid-cols-1 gap-3">
              {currentProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">📦</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight mb-1">
                        {product.name}
                      </h4>
                      <div className="text-xs text-blue-600 dark:text-blue-400 mb-2 font-medium">
                        {product.category}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-blue-600">${product.price}</span>
                          {product.originalPrice && (
                            <span className="text-xs text-gray-500 line-through">${product.originalPrice}</span>
                          )}
                        </div>
                        <div className="flex items-center">
                          <Star size={12} className="text-yellow-500 fill-current" />
                          <span className="text-xs text-gray-500 ml-1">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-3">
                    <button className="flex-1 bg-blue-500 text-white py-1.5 rounded-lg hover:bg-blue-600 transition-colors text-xs font-medium flex items-center justify-center space-x-1">
                      <ShoppingCart size={12} />
                      <span>Add to Cart</span>
                    </button>
                    <button className="px-3 py-1.5 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-xs font-medium">
                      Quick View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Page indicators */}
      <div className="flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentPage ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
