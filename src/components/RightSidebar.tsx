
import { HeroBanner } from './HeroBanner';
import { TrendingSection } from './TrendingSection';
import { RelatedProducts } from './RelatedProducts';

export const RightSidebar = () => {
  return (
    <div className="p-4 space-y-4">
      {/* <HeroBanner /> */}
      <TrendingSection />
      <RelatedProducts />
    </div>
  );
};
