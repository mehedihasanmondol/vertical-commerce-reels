
import { useState, useEffect } from 'react';
import { ProductReel } from './ProductReel';
import { NavigationHeader } from './NavigationHeader';
import { BottomNavigation } from './BottomNavigation';
import { mockProducts } from '../data/mockProducts';

export const MobileHome = () => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBottomNavVisible, setIsBottomNavVisible] = useState(true);

  useEffect(() => {
    // Update URL when product changes
    const product = mockProducts[currentProductIndex];
    if (product) {
      window.history.replaceState(null, '', `/${product.slug}`);
    }
  }, [currentProductIndex]);

  const handleProductChange = (index: number) => {
    // Show navigation when scrolling up (to previous reel)
    // Hide navigation when scrolling down (to next reel)
    if (index < currentProductIndex) {
      setIsBottomNavVisible(true);
    } else if (index > currentProductIndex) {
      setIsBottomNavVisible(false);
    }
    
    setCurrentProductIndex(index);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleBottomNav = () => {
    setIsBottomNavVisible(!isBottomNavVisible);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black min-h-screen">
        <NavigationHeader 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode}
        />
        
        <ProductReel 
          products={mockProducts}
          currentIndex={currentProductIndex}
          onProductChange={handleProductChange}
        />
        
        {/* Bottom Navigation Toggle */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50">
          <button
            onClick={toggleBottomNav}
            className="w-16 h-6 bg-white/60 dark:bg-black/60 backdrop-blur-sm rounded-t-full flex items-start justify-center pt-1 hover:bg-white/80 dark:hover:bg-black/80 transition-all duration-300"
          >
            <div className="w-8 h-1 bg-gray-400 dark:bg-gray-300 rounded-full" />
          </button>
        </div>
        
        <BottomNavigation 
          isVisible={isBottomNavVisible}
          onToggle={toggleBottomNav}
        />
      </div>
    </div>
  );
};
