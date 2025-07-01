
import { useState, useRef, useEffect } from 'react';
import { Product } from '../types/Product';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface UpcomingProductsProps {
  products: Product[];
  onProductSelect: (index: number) => void;
}

export const UpcomingProducts = ({ products, onProductSelect }: UpcomingProductsProps) => {
  const [scrollIndex, setScrollIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const visibleProducts = 3;
  const maxScrollIndex = Math.max(0, products.length - visibleProducts);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaY = e.clientY - startY;
    setDragOffset(deltaY);

    if (Math.abs(deltaY) > 80) {
      if (deltaY > 0 && scrollIndex > 0) {
        setScrollIndex(scrollIndex - 1);
        setIsDragging(false);
        setDragOffset(0);
      } else if (deltaY < 0 && scrollIndex < maxScrollIndex) {
        setScrollIndex(scrollIndex + 1);
        setIsDragging(false);
        setDragOffset(0);
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleProductClick = (productIndex: number) => {
    onProductSelect(productIndex);
  };

  const nextProducts = () => {
    if (scrollIndex < maxScrollIndex) {
      setScrollIndex(scrollIndex + 1);
    }
  };

  const prevProducts = () => {
    if (scrollIndex > 0) {
      setScrollIndex(scrollIndex - 1);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Static Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-black/80 backdrop-blur-sm sticky top-0 z-10">
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
          Up Next
        </h3>
      </div>

      <div className="flex-1 relative overflow-hidden">
        {/* Navigation Arrows */}
        <button
          onClick={prevProducts}
          disabled={scrollIndex === 0}
          className="absolute top-2 left-1/2 transform -translate-x-1/2 z-20 p-1.5 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
        >
          <ChevronUp size={14} />
        </button>

        <button
          onClick={nextProducts}
          disabled={scrollIndex >= maxScrollIndex}
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 p-1.5 rounded-full bg-black/30 text-white hover:bg-black/50 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
        >
          <ChevronDown size={14} />
        </button>

        {/* Products Container */}
        <div
          ref={containerRef}
          className="h-full relative cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div 
            className="flex flex-col transition-transform duration-300 ease-out"
            style={{
              transform: `translateY(${-scrollIndex * (100 / visibleProducts)}%) translateY(${isDragging ? dragOffset * 0.3 : 0}px)`,
              height: `${(products.length / visibleProducts) * 100}%`
            }}
          >
            {products.map((product, index) => {
              const isVisible = index >= scrollIndex && index < scrollIndex + visibleProducts;
              const position = index - scrollIndex;
              
              return (
                <div
                  key={product.id}
                  className={`relative transition-all duration-500 ease-out cursor-pointer group ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-60 scale-95'
                  }`}
                  style={{
                    height: `${100 / visibleProducts}%`,
                    transform: position === 0 ? 'scale(1.02)' : 'scale(0.98)',
                  }}
                  onClick={() => handleProductClick(index)}
                >
                  <div className="h-full m-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl overflow-hidden relative">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Emergence Effect Overlay */}
                    {position === 0 && (
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/10 pointer-events-none" />
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Product Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <h4 className="font-semibold text-sm mb-1 line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="text-xs opacity-90">${product.price}</p>
                    </div>

                    {/* Emergence Indicator */}
                    {position === 0 && (
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/80 group-hover:text-white transition-all">
                        <div className="flex flex-col items-center space-y-1">
                          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse">
                            <div className="w-0 h-0 border-l-3 border-l-white border-y-2 border-y-transparent ml-0.5" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="absolute right-1 top-1/2 transform -translate-y-1/2 flex flex-col space-y-1">
          {Array.from({ length: Math.ceil(products.length / visibleProducts) }).map((_, index) => (
            <div
              key={index}
              className={`w-1 h-4 rounded-full transition-all ${
                Math.floor(scrollIndex / visibleProducts) === index
                  ? 'bg-white/80'
                  : 'bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
