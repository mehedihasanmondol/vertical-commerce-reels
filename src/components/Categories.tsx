
import { Badge } from './ui/badge';

const allCategories = [
  { id: 1, name: "Electronics", icon: "📱", count: 245 },
  { id: 2, name: "Fashion", icon: "👕", count: 189 },
  { id: 3, name: "Home & Garden", icon: "🏠", count: 156 },
  { id: 4, name: "Sports", icon: "⚽", count: 98 },
  { id: 5, name: "Books", icon: "📚", count: 203 },
  { id: 6, name: "Beauty", icon: "💄", count: 167 },
  { id: 7, name: "Automotive", icon: "🚗", count: 87 },
  { id: 8, name: "Toys", icon: "🧸", count: 134 },
  { id: 9, name: "Health", icon: "🏥", count: 112 },
  { id: 10, name: "Music", icon: "🎵", count: 95 },
  { id: 11, name: "Food", icon: "🍕", count: 178 },
  { id: 12, name: "Travel", icon: "✈️", count: 67 }
];

export const Categories = () => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Shop by Category</h3>
      
      <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
        {allCategories.map((category) => (
          <div
            key={category.id}
            className="relative group cursor-pointer p-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-all duration-300 text-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 hover:scale-105"
          >
            <div className="absolute -top-1 -right-1">
              <Badge variant="default" className="bg-purple-500 text-white text-xs px-1 py-0.5">
                {category.count}
              </Badge>
            </div>
            <div className="text-lg mb-1">{category.icon}</div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-xs">{category.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
