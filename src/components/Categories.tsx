
import { Badge } from './ui/badge';
import { CategoriesModal } from './CategoriesModal';

const featuredCategories = [
  { id: 1, name: "Electronics", icon: "📱", count: 245 },
  { id: 2, name: "Fashion", icon: "👕", count: 189 },
  { id: 3, name: "Home & Garden", icon: "🏠", count: 156 },
  { id: 4, name: "Sports", icon: "⚽", count: 98 }
];

export const Categories = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Shop by Category</h3>
        <CategoriesModal />
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {featuredCategories.map((category) => (
          <div
            key={category.id}
            className="relative group cursor-pointer p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-all duration-300 text-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 hover:scale-105"
          >
            <div className="absolute -top-1 -right-1">
              <Badge variant="default" className="bg-purple-500 text-white text-xs px-1.5 py-0.5">
                {category.count}
              </Badge>
            </div>
            <div className="text-2xl mb-1">{category.icon}</div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-xs">{category.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
