
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
  }, [currentIndex, onProductChange, products.length]);

  return (
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
  );
};
