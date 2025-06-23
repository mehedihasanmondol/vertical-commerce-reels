
import { useState, useRef } from 'react';
import { Home, Search, ShoppingCart, User } from 'lucide-react';

interface CollapsibleBottomNavProps {
  isVisible: boolean;
  onPullUp: () => void;
}

export const CollapsibleBottomNav = ({ isVisible, onPullUp }: CollapsibleBottomNavProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Search, label: 'Search', active: false },
    { icon: ShoppingCart, label: 'Cart', active: false },
    { icon: User, label: 'Profile', active: false },
  ];

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !dragStart) return;
    
    const currentY = e.touches[0].clientY;
    const diff = dragStart - currentY;
    
    // If dragging up more than 30px, show navigation
    if (diff > 30) {
      onPullUp();
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav
        ref={navRef}
        className={`fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-black/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 z-40 transition-transform duration-300 ease-out ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="flex justify-around items-center py-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-300 ${
                  item.active
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <Icon size={20} />
                <span className="text-xs font-medium">{item.label}</span>
                {item.active && (
                  <div className="w-1 h-1 bg-purple-600 dark:bg-purple-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Pull-up Handle - Always visible at bottom */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 cursor-pointer touch-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={onPullUp}
      >
        <div className="w-12 h-6 flex items-start justify-center pt-1">
          <div className="w-8 h-1 bg-white/60 dark:bg-gray-400/60 rounded-full backdrop-blur-sm" />
        </div>
      </div>
    </>
  );
};
