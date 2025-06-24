
import { useState, useEffect, useRef } from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../types/Product';

interface ProductReelProps {
  products: Product[];
  currentIndex: number;
  onProductChange: (index: number) => void;
}

export const ProductReel = ({ products, currentIndex, onProductChange }: ProductReelProps) => {
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
        
        // Calculate which product is currently in view
        const scrollTop = container.scrollTop;
        // Account for header height (64px) when calculating reel height
        const reelHeight = window.innerHeight - 64;
        const newIndex = Math.round(scrollTop / reelHeight);
        
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
  }, [currentIndex, onProductChange, products.length]);

  return (
    <div 
      ref={containerRef}
      className="overflow-y-auto snap-y snap-mandatory scrollbar-hide"
      style={{ 
        height: 'calc(100vh - 64px)', // Subtract header height
        marginTop: '64px', // Account for fixed header
        scrollbarWidth: 'none', 
        msOverflowStyle: 'none' 
      }}
    >
      {products.map((product, index) => (
        <div 
          key={product.id} 
          className="snap-start relative"
          style={{ height: 'calc(100vh - 64px)' }} // Each reel excludes header height
        >
          <ProductCard 
            product={product} 
            isActive={index === currentIndex}
          />
        </div>
      ))}
    </div>
  );
};
