
import { Categories } from './Categories';
import { FlashDeals } from './FlashDeals';

export const LeftSidebar = () => {
  return (
    <div className="p-4 space-y-6">
      <Categories />
      <FlashDeals />
    </div>
  );
};
