
interface CategorySidebarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categoryImages = {
  'All': 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=100&h=100&fit=crop&crop=center',
  'Electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=100&h=100&fit=crop&crop=center',
  'Accessories': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop&crop=center',
  'Fitness': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=center',
  'Kitchen': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=100&h=100&fit=crop&crop=center',
  'Furniture': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop&crop=center'
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
          const imageUrl = categoryImages[category as keyof typeof categoryImages] || categoryImages['All'];
          
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`w-full p-2 rounded-lg transition-all duration-200 flex items-center justify-center relative overflow-hidden ${
                selectedCategory === category
                  ? 'ring-2 ring-purple-500 ring-offset-2 scale-105 shadow-lg'
                  : 'hover:scale-102 hover:ring-1 hover:ring-gray-300'
              }`}
              title={category}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={imageUrl}
                  alt={category}
                  className="w-full h-full object-cover"
                />
              </div>
              {selectedCategory === category && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-lg" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
