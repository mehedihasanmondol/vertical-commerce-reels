
import { useState, useEffect } from 'react';
import { NavigationHeader } from './NavigationHeader';
import { ProductReel } from './ProductReel';
import { LeftSidebar } from './LeftSidebar';
import { RightSidebar } from './RightSidebar';
import { mockProducts } from '../data/mockProducts';

export const DesktopTabletHome = () => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Update URL when product changes
    const product = mockProducts[currentProductIndex];
    if (product) {
      window.history.replaceState(null, '', `/${product.slug}`);
    }
  }, [currentProductIndex]);

  const handleProductChange = (index: number) => {
    setCurrentProductIndex(index);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black min-h-screen">
        <NavigationHeader 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode}
        />
        
        {/* Adjusted Layout - Slimmer center reel, wider right sidebar */}
        <div className="flex w-full pt-16">
          {/* Left Sidebar - Fixed width */}
          <div className="hidden lg:block w-72 fixed left-0 h-full overflow-y-auto scrollbar-hide">
            <LeftSidebar 
              currentProductIndex={currentProductIndex}
              products={mockProducts}
            />
          </div>
          
          {/* Center Content - Slimmer Product Reel */}
          <div className="flex-1 lg:ml-72 lg:mr-96 max-w-md mx-auto">
            <ProductReel 
              products={mockProducts}
              currentIndex={currentProductIndex}
              onProductChange={handleProductChange}
            />
          </div>
          
          {/* Right Sidebar - Wider for better product display */}
          <div className="hidden lg:block w-96 fixed right-0 h-full overflow-y-auto scrollbar-hide">
            <RightSidebar 
              currentProduct={mockProducts[currentProductIndex]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
