
import { Heart, ShoppingCart, Moon, Sun, Search } from 'lucide-react';
import { Input } from './ui/input';

interface NavigationHeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const NavigationHeader = ({ isDarkMode, toggleDarkMode }: NavigationHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
      <div className="flex justify-between items-center px-4 py-3 gap-4">
        <div className="flex items-center space-x-2 flex-shrink-0">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            ReelShop
          </h1>
          <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
            Free Shipping
          </span>
        </div>
        
        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent rounded-full"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-3 flex-shrink-0">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button className="relative p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <Heart size={18} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>
          
          <button className="relative p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <ShoppingCart size={18} />
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              2
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
