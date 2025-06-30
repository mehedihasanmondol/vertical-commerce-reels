
import { TrendingSection } from './TrendingSection';
import { RelatedProductsReel } from './RelatedProductsReel';
import { Product } from '../types/Product';

interface RightSidebarProps {
  currentProduct: Product;
}

export const RightSidebar = ({ currentProduct }: RightSidebarProps) => {
  return (
    <div className="p-4 space-y-6">
      <RelatedProductsReel currentProduct={currentProduct} />
      <TrendingSection />
    </div>
  );
};
