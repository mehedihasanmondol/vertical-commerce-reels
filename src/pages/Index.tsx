
import { useState, useEffect } from 'react';
import { ProductReel } from '../components/ProductReel';
import { NavigationHeader } from '../components/NavigationHeader';
import { BottomNavigation } from '../components/BottomNavigation';
import { mockProducts } from '../data/mockProducts';

const Index = () => {
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
        
        <ProductReel 
          products={mockProducts}
          currentIndex={currentProductIndex}
          onProductChange={handleProductChange}
        />
        
        <BottomNavigation />
      </div>
    </div>
  );
};

export default Index;
