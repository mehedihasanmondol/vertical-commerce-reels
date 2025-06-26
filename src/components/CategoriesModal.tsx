
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
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

export const CategoriesModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 text-sm font-medium">
          Other Categories
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>All Categories</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {allCategories.map((category) => (
            <div
              key={category.id}
              className="relative group cursor-pointer p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-all duration-300 text-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 hover:scale-105"
            >
              <div className="absolute -top-2 -right-2">
                <Badge variant="default" className="bg-purple-500 text-white text-xs px-2 py-1">
                  {category.count}
                </Badge>
              </div>
              <div className="text-3xl mb-2">{category.icon}</div>
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{category.name}</h4>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
