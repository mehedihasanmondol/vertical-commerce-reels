
interface CategorySidebarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategorySidebar = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: CategorySidebarProps) => {
  const allCategories = ['All', ...categories];

  return (
    <div className="p-4 h-full flex flex-col">
      <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4 uppercase tracking-wide">
        Categories
      </h3>
      
      <div className="flex-1 space-y-2 overflow-y-auto">
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`w-full text-left p-3 rounded-lg transition-all duration-200 text-sm font-medium ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-102'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};
