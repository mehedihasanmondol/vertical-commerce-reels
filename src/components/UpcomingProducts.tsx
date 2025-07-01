
import { useState, useRef, useEffect } from 'react';
import { Product } from '../types/Product';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface UpcomingProductsProps {
  products: Product[];
  onProductSelect: (index: number) => void;
}

export const UpcomingProducts = ({ products, onProductSelect }: UpcomingProductsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaY = startY - e.clientY;
    if (Math.abs(deltaY) > 50) {
      if (deltaY > 0 && currentIndex < products.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (deltaY < 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleProductClick = (index: number) => {
    onProductSelect(index);
  };

  const nextProduct = () => {
    if (currentIndex < products.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevProduct = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
          Up Next
        </h3>
      </div>

      <div className="flex-1 relative overflow-hidden">
        {/* Navigation Arrows */}
        <button
          onClick={prevProduct}
          disabled={currentIndex === 0}
          className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10 p-1 rounded-full bg-black/20 text-white hover:bg-black/40 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronUp size={16} />
        </button>

        <button
          onClick={nextProduct}
          disabled={currentIndex === products.length - 1}
          className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10 p-1 rounded-full bg-black/20 text-white hover:bg-black/40 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronDown size={16} />
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
          {products.map((product, index) => {
            const isActive = index === currentIndex;
            const isPrevious = index === currentIndex - 1;
            const isNext = index === currentIndex + 1;
            
            let transform = 'translateY(100%)';
            let opacity = 0;
            let scale = 0.8;
            let zIndex = 0;

            if (isActive) {
              transform = 'translateY(0%)';
              opacity = 1;
              scale = 1;
              zIndex = 3;
            } else if (isPrevious) {
              transform = 'translateY(-100%)';
              opacity = 0.7;
              scale = 0.9;
              zIndex = 2;
            } else if (isNext) {
              transform = 'translateY(100%)';
              opacity = 0.7;
              scale = 0.9;
              zIndex = 2;
            }

            return (
              <div
                key={product.id}
                className="absolute inset-4 transition-all duration-500 ease-out rounded-xl overflow-hidden cursor-pointer group"
                style={{
                  transform: `${transform} scale(${scale})`,
                  opacity,
                  zIndex,
                }}
                onClick={() => handleProductClick(index)}
              >
                <div className="relative h-full bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Product Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <h4 className="font-semibold text-sm mb-1 line-clamp-2">
                      {product.name}
                    </h4>
                    <p className="text-xs opacity-90">${product.price}</p>
                  </div>

                  {/* Pull Indicator */}
                  {isActive && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/80 group-hover:text-white transition-colors">
                      <div className="flex flex-col items-center space-y-1">
                        <ChevronUp size={20} className="animate-bounce" />
                        <span className="text-xs font-medium">Pull to open</span>
                        <ChevronDown size={20} className="animate-bounce" style={{ animationDelay: '0.5s' }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress Indicators */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col space-y-1">
          {products.map((_, index) => (
            <div
              key={index}
              className={`w-1 h-6 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-white'
                  : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
