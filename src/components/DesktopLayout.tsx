
import { useState, useEffect } from 'react';
import { Product } from '../types/Product';
import { ProductReel } from './ProductReel';
import { CategorySidebar } from './CategorySidebar';
import { UpcomingProducts } from './UpcomingProducts';
import { RelatedProducts } from './RelatedProducts';

interface DesktopLayoutProps {
  products: Product[];
  currentIndex: number;
  onProductChange: (index: number) => void;
  isDarkMode: boolean;
}

export const DesktopLayout = ({ 
  products, 
  currentIndex, 
  onProductChange, 
  isDarkMode 
}: DesktopLayoutProps) => {
  const [categories] = useState([
    'Electronics',
    'Accessories', 
    'Fitness',
    'Kitchen',
    'Furniture'
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [upcomingProducts, setUpcomingProducts] = useState(products.slice(0, 6));
  const [relatedProducts, setRelatedProducts] = useState(products.slice(1, 9));

  // Update upcoming and related products when current product changes
  useEffect(() => {
    // Get next 6 products for upcoming (showing 3 at a time)
    const nextProducts = [];
    for (let i = 1; i <= 6; i++) {
      const nextIndex = (currentIndex + i) % products.length;
      nextProducts.push(products[nextIndex]);
    }
    setUpcomingProducts(nextProducts);

    // Get related products based on current product category
    const currentProduct = products[currentIndex];
    const related = products
      .filter((p, index) => 
        index !== currentIndex && 
        (selectedCategory === 'All' || p.category === currentProduct?.category)
      )
      .slice(0, 8);
    setRelatedProducts(related);
  }, [currentIndex, products, selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleUpcomingProductSelect = (productIndex: number) => {
    // Find the actual index of the selected product in the main products array
    const selectedProduct = upcomingProducts[productIndex];
    const actualIndex = products.findIndex(p => p.id === selectedProduct.id);
    if (actualIndex !== -1) {
      onProductChange(actualIndex);
    }
  };

  const handleRelatedProductSelect = (product: Product) => {
    const actualIndex = products.findIndex(p => p.id === product.id);
    if (actualIndex !== -1) {
      onProductChange(actualIndex);
    }
  };

  return (
    <div className="flex h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
      {/* Left Sidebar */}
      <div className="w-80 border-r border-gray-200 dark:border-gray-800 flex">
        {/* Categories - 25% of left sidebar */}
        <div className="w-1/4 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
          <CategorySidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        
        {/* Upcoming Products - 75% of left sidebar */}
        <div className="w-3/4 bg-white/30 dark:bg-black/30 backdrop-blur-sm">
          <UpcomingProducts
            products={upcomingProducts}
            onProductSelect={handleUpcomingProductSelect}
          />
        </div>
      </div>

      {/* Center Reel - No gap from top */}
      <div className="flex-1 relative">
        <ProductReel
          products={products}
          currentIndex={currentIndex}
          onProductChange={onProductChange}
        />
      </div>

      {/* Right Sidebar */}
      <div className="w-80 bg-white/30 dark:bg-black/30 backdrop-blur-sm border-l border-gray-200 dark:border-gray-800">
        <RelatedProducts
          products={relatedProducts}
          onProductSelect={handleRelatedProductSelect}
        />
      </div>
    </div>
  );
};
