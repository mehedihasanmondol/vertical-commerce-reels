
import { useState, useEffect } from 'react';
import { ProductReel } from '../components/ProductReel';
import { NavigationHeader } from '../components/NavigationHeader';
import { CollapsibleBottomNav } from '../components/CollapsibleBottomNav';
import { mockProducts } from '../data/mockProducts';

const Index = () => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showBottomNav, setShowBottomNav] = useState(true);

  useEffect(() => {
    // Update URL when product changes
    const product = mockProducts[currentProductIndex];
    if (product) {
      window.history.replaceState(null, '', `/${product.slug}`);
    }
  }, [currentProductIndex]);

  useEffect(() => {
    // Hide bottom navigation when scrolling, show when stopped
    let hideTimeout: NodeJS.Timeout;
    
    if (isScrolling) {
      setShowBottomNav(false);
    } else {
      // Show navigation again after scrolling stops
      hideTimeout = setTimeout(() => {
        setShowBottomNav(true);
      }, 1000);
    }

    return () => clearTimeout(hideTimeout);
  }, [isScrolling]);

  const handleProductChange = (index: number) => {
    setCurrentProductIndex(index);
    // Show navigation when navigating to previous reel
    if (index < currentProductIndex) {
      setShowBottomNav(true);
    }
  };

  const handleScrollStateChange = (scrolling: boolean) => {
    setIsScrolling(scrolling);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handlePullUpNav = () => {
    setShowBottomNav(true);
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
          onScrollStateChange={handleScrollStateChange}
        />
        
        <CollapsibleBottomNav 
          isVisible={showBottomNav}
          onPullUp={handlePullUpNav}
        />
      </div>
    </div>
  );
};

export default Index;
