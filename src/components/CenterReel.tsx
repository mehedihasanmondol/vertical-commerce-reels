
import { useState, useEffect, useRef } from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../types/Product';

interface CenterReelProps {
  products: Product[];
  currentProductIndex: number;
  onProductChange: (index: number) => void;
}

export const CenterReel = ({ products, currentProductIndex, onProductChange }: CenterReelProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
        
        const scrollTop = container.scrollTop;
        const containerHeight = container.clientHeight;
        const newIndex = Math.round(scrollTop / containerHeight);
        
        if (newIndex !== currentProductIndex && newIndex >= 0 && newIndex < products.length) {
          onProductChange(newIndex);
        }
      }, 150);
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [currentProductIndex, onProductChange, products.length]);

  return (
    <div className="h-full relative">
      <div 
        ref={containerRef}
        className="h-full overflow-y-auto snap-y snap-mandatory scrollbar-hide"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none' 
        }}
      >
        {products.map((product, index) => (
          <div 
            key={product.id} 
            className="snap-start h-full"
          >
            <ProductCard 
              product={product} 
              isActive={index === currentProductIndex}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
