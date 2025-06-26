
const categories = [
  { id: 1, name: "Electronics", icon: "📱", count: 245 },
  { id: 2, name: "Fashion", icon: "👕", count: 189 },
  { id: 3, name: "Home & Garden", icon: "🏠", count: 156 },
  { id: 4, name: "Sports", icon: "⚽", count: 98 },
  { id: 5, name: "Books", icon: "📚", count: 203 },
  { id: 6, name: "Beauty", icon: "💄", count: 167 },
  { id: 7, name: "Automotive", icon: "🚗", count: 87 },
  { id: 8, name: "Toys", icon: "🧸", count: 134 }
];

export const Categories = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Shop by Category</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div 
            key={category.id} 
            className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="text-3xl mb-2">{category.icon}</div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-center mb-1">{category.name}</h4>
            <span className="text-xs text-gray-500">{category.count} items</span>
          </div>
        ))}
      </div>
    </div>
  );
};
