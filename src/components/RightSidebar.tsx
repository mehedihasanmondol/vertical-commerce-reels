
import { TrendingReel } from './TrendingReel';
import { RelatedProducts } from './RelatedProducts';

export const RightSidebar = () => {
  return (
    <div className="p-4 space-y-4">
      <TrendingReel />
      <RelatedProducts />
    </div>
  );
};
