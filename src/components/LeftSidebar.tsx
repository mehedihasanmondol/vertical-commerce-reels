
import { Categories } from './Categories';
import { FlashSaleReel } from './FlashSaleReel';

export const LeftSidebar = () => {
  return (
    <div className="p-4 space-y-4">
      <FlashSaleReel />
      <Categories />
    </div>
  );
};
