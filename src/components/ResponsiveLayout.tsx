
import { useIsMobile } from '@/hooks/use-mobile';
import { ProductReel } from './ProductReel';
import { NavigationHeader } from './NavigationHeader';
import { BottomNavigation } from './BottomNavigation';
import { DesktopLayout } from './DesktopLayout';
import { Product } from '../types/Product';

interface ResponsiveLayoutProps {
  products: Product[];
  currentProductIndex: number;
  onProductChange: (index: number) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isBottomNavVisible: boolean;
  toggleBottomNav: () => void;
}

export const ResponsiveLayout = ({
  products,
  currentProductIndex,
  onProductChange,
  isDarkMode,
  toggleDarkMode,
  isBottomNavVisible,
  toggleBottomNav
}: ResponsiveLayoutProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    // Mobile View - Current reel experience
    return (
      <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black min-h-screen">
          <NavigationHeader 
            isDarkMode={isDarkMode} 
            toggleDarkMode={toggleDarkMode}
          />
          
          <ProductReel 
            products={products}
            currentIndex={currentProductIndex}
            onProductChange={onProductChange}
          />
          
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

  // Desktop View - Three-section layout
  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black min-h-screen">
        <NavigationHeader 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode}
        />
        
        <DesktopLayout
          products={products}
          currentProductIndex={currentProductIndex}
          onProductChange={onProductChange}
        />
      </div>
    </div>
  );
};
