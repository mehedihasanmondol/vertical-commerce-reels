
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
    <div className="p-3 h-full pt-6">
      <div className="space-y-2">
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`w-full text-left p-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
              selectedCategory === category
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};
