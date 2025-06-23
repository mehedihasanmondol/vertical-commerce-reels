
import { useState, useEffect, useRef } from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../types/Product';
import { ChevronUp } from 'lucide-react';

interface ProductReelProps {
  products: Product[];
  currentIndex: number;
  onProductChange: (index: number) => void;
  onScrollStateChange: (isScrolling: boolean) => void;
}

export const ProductReel = ({ products, currentIndex, onProductChange, onScrollStateChange }: ProductReelProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      onScrollStateChange(true);
      clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
        onScrollStateChange(false);
        
        // Calculate which product is currently in view
        const scrollTop = container.scrollTop;
        const windowHeight = window.innerHeight;
        const newIndex = Math.round(scrollTop / windowHeight);
        
        if (newIndex !== currentIndex && newIndex >= 0 && newIndex < products.length) {
          onProductChange(newIndex);
        }
      }, 150);
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [currentIndex, onProductChange, onScrollStateChange, products.length]);

  const goToPrevious = () => {
    const container = containerRef.current;
    if (!container || currentIndex <= 0) return;
    
    const windowHeight = window.innerHeight;
    container.scrollTo({
      top: (currentIndex - 1) * windowHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative">
      <div 
        ref={containerRef}
        className="h-screen overflow-y-auto snap-y snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product, index) => (
          <div 
            key={product.id} 
            className="h-screen snap-start relative"
          >
            <ProductCard 
              product={product} 
              isActive={index === currentIndex}
            />
          </div>
        ))}
      </div>

      {/* Left Navigation Button */}
      {currentIndex > 0 && (
        <button
          onClick={goToPrevious}
          className="fixed left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 backdrop-blur-lg text-white hover:bg-black/50 transition-all duration-300 z-40"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
};
