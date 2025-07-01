
import { useState, useEffect } from 'react';
import { ProductReel } from '../components/ProductReel';
import { NavigationHeader } from '../components/NavigationHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import { DesktopLayout } from '../components/DesktopLayout';
import { useIsMobile } from '../hooks/use-mobile';
import { mockProducts } from '../data/mockProducts';

const Index = () => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBottomNavVisible, setIsBottomNavVisible] = useState(true);
  const [previousProductIndex, setPreviousProductIndex] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Update URL when product changes
    const product = mockProducts[currentProductIndex];
    if (product) {
      window.history.replaceState(null, '', `/${product.slug}`);
    }
  }, [currentProductIndex]);

  const handleProductChange = (index: number) => {
    setPreviousProductIndex(currentProductIndex);
    
    // Show navigation when scrolling up (to previous reel)
    // Hide navigation when scrolling down (to next reel)
    if (index < currentProductIndex) {
      // Scrolling up - show navigation
      setIsBottomNavVisible(true);
    } else if (index > currentProductIndex) {
      // Scrolling down - hide navigation
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

  // Mobile View
  if (isMobile) {
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
          
          {/* 50/50 Bottom Navigation Toggle - Always visible */}
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
  }

  // Desktop View - No margin-top, full height
  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <NavigationHeader 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode}
      />
      
      <div className="h-screen" style={{ paddingTop: '64px' }}>
        <DesktopLayout
          products={mockProducts}
          currentIndex={currentProductIndex}
          onProductChange={handleProductChange}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

export default Index;
