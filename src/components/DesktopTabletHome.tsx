
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
        
        {/* Facebook-style Layout - ProductReel starts from top */}
        <div className="flex w-full pt-16">
          {/* Left Sidebar */}
          <div className="hidden lg:block w-80 fixed left-0 h-full overflow-y-auto scrollbar-hide">
            <LeftSidebar />
          </div>
          
          {/* Center Content - Product Reels */}
          <div className="flex-1 lg:ml-80 lg:mr-80">
            <ProductReel 
              products={mockProducts}
              currentIndex={currentProductIndex}
              onProductChange={handleProductChange}
            />
          </div>
          
          {/* Right Sidebar */}
          <div className="hidden lg:block w-80 fixed right-0 h-full overflow-y-auto scrollbar-hide">
            <RightSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};
