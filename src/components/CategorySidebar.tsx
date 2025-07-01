
import { ShoppingCart, Headphones, Dumbbell, ChefHat, Armchair } from 'lucide-react';

interface CategorySidebarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categoryIcons = {
  'All': ShoppingCart,
  'Electronics': Headphones,
  'Accessories': ShoppingCart, 
  'Fitness': Dumbbell,
  'Kitchen': ChefHat,
  'Furniture': Armchair
};

export const CategorySidebar = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: CategorySidebarProps) => {
  const allCategories = ['All', ...categories];

  return (
    <div className="p-2 h-full flex flex-col">
      <div className="flex-1 space-y-3 overflow-y-auto">
        {allCategories.map((category) => {
          const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || ShoppingCart;
          
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`w-full p-3 rounded-lg transition-all duration-200 flex items-center justify-center ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-102'
              }`}
              title={category}
            >
              <IconComponent size={20} />
            </button>
          );
        })}
      </div>
    </div>
  );
};
