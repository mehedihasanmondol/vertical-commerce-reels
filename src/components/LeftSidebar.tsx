
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
    <div className="p-4 flex gap-4 h-full">
      {/* Categories Section - 25% width */}
      <div className="w-1/4 flex-shrink-0">
        <Categories upcomingProducts={upcomingProducts} />
      </div>
      
      {/* Upcoming Products Section - 75% width */}
      <div className="w-3/4 flex-shrink-0">
        <UpcomingProductsReel products={upcomingProducts} />
      </div>
    </div>
  );
};
