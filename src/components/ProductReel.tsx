
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
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  // Handle viewport height changes for mobile browser toolbar
  useEffect(() => {
    const handleResize = () => {
      // Use the larger of the two values to prevent layout shifts
      const newHeight = Math.max(window.innerHeight, document.documentElement.clientHeight);
      setViewportHeight(newHeight);
    };

    // Set initial height
    handleResize();
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

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
        // Use the stable viewport height minus header height
        const reelHeight = viewportHeight - 64;
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
  }, [currentIndex, onProductChange, products.length, viewportHeight]);

  const reelHeight = viewportHeight - 64;

  return (
    <div 
      ref={containerRef}
      className="overflow-y-auto snap-y snap-mandatory scrollbar-hide"
      style={{ 
        height: `${reelHeight}px`,
        marginTop: '64px', // Account for fixed header
        scrollbarWidth: 'none', 
        msOverflowStyle: 'none' 
      }}
    >
      {products.map((product, index) => (
        <div 
          key={product.id} 
          className="snap-start relative"
          style={{ height: `${reelHeight}px` }}
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
