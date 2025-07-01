
import { LeftSidebar } from './LeftSidebar';
import { CenterReel } from './CenterReel';
import { RightSidebar } from './RightSidebar';
import { Product } from '../types/Product';

interface DesktopLayoutProps {
  products: Product[];
  currentProductIndex: number;
  onProductChange: (index: number) => void;
}

export const DesktopLayout = ({ products, currentProductIndex, onProductChange }: DesktopLayoutProps) => {
  const currentProduct = products[currentProductIndex];

  return (
    <div className="flex h-screen pt-16"> {/* Account for fixed header */}
      {/* Left Sidebar - 25% width */}
      <div className="w-1/4 border-r border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
        <LeftSidebar 
          products={products}
          currentProductIndex={currentProductIndex}
          onProductChange={onProductChange}
        />
      </div>

      {/* Center Reel - 50% width */}
      <div className="w-1/2 relative">
        <CenterReel 
          products={products}
          currentProductIndex={currentProductIndex}
          onProductChange={onProductChange}
        />
      </div>

      {/* Right Sidebar - 25% width */}
      <div className="w-1/4 border-l border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
        <RightSidebar 
          currentProduct={currentProduct}
          allProducts={products}
        />
      </div>
    </div>
  );
};
