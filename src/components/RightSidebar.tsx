
import { HeroBanner } from './HeroBanner';
import { TrendingSection } from './TrendingSection';
import { ReviewsSection } from './ReviewsSection';

export const RightSidebar = () => {
  return (
    <div className="p-4 space-y-6">
      <HeroBanner />
      <TrendingSection />
      <ReviewsSection />
    </div>
  );
};
