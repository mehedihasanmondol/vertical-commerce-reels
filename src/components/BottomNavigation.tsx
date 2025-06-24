
import { Home, Search, ShoppingCart, User } from 'lucide-react';

interface BottomNavigationProps {
  isVisible?: boolean;
  onToggle?: () => void;
}

export const BottomNavigation = ({ isVisible = true, onToggle }: BottomNavigationProps) => {
  const navItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Search, label: 'Search', active: false },
    { icon: ShoppingCart, label: 'Cart', active: false },
    { icon: User, label: 'Profile', active: false },
  ];

  return (
    <nav 
      className={`fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-black/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 z-40 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex justify-around items-center py-2 pb-safe">
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
  );
};
