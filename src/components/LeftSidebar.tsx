
import { Categories } from './Categories';
import { FlashDeals } from './FlashDeals';
import { UpcomingProducts } from './UpcomingProducts';
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
    <div className="p-4 space-y-4">
      <FlashDeals />
      <Categories upcomingProducts={upcomingProducts} />
      <UpcomingProducts products={upcomingProducts} />
    </div>
  );
};
