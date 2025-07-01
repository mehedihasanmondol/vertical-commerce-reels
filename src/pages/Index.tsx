
import { useState, useEffect } from 'react';
import { ResponsiveLayout } from '../components/ResponsiveLayout';
import { mockProducts } from '../data/mockProducts';

const Index = () => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBottomNavVisible, setIsBottomNavVisible] = useState(true);
  const [previousProductIndex, setPreviousProductIndex] = useState(0);

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

  return (
    <ResponsiveLayout
      products={mockProducts}
      currentProductIndex={currentProductIndex}
      onProductChange={handleProductChange}
      isDarkMode={isDarkMode}
      toggleDarkMode={toggleDarkMode}
      isBottomNavVisible={isBottomNavVisible}
      toggleBottomNav={toggleBottomNav}
    />
  );
};

export default Index;
