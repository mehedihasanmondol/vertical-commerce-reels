
import { Categories } from './Categories';
import { UpcomingProductsReel } from './UpcomingProductsReel';
import { Product } from '../types/Product';

interface LeftSidebarProps {
  currentProductIndex: number;
  products: Product[];
}

export const LeftSidebar = ({ currentProductIndex, products }: LeftSidebarProps) => {
  // Get next 3 products for upcoming section
  const upcomingProducts = products.slice(currentProductIndex + 1, currentProductIndex + 4).concat(
    products.slice(0, Math.max(0, (currentProductIndex + 4) - products.length))
  );

  return (
    <div className="p-4 flex gap-6 h-full">
      {/* Categories Section - 25% width */}
      <div className="w-1/4 flex-shrink-0">
        <Categories upcomingProducts={upcomingProducts} />
      </div>
      
      {/* Upcoming Products Section - 75% width with visual flow */}
      <div className="w-3/4 flex-shrink-0 relative">
        {/* Flow connection line */}
        <div className="absolute -right-4 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-purple-300 to-transparent opacity-30"></div>
        
        <UpcomingProductsReel products={upcomingProducts} />
        
        {/* Flow indicator pointing to main reel */}
        <div className="absolute -right-8 bottom-8 text-purple-400 text-xl animate-pulse">
          →
        </div>
      </div>
    </div>
  );
};
