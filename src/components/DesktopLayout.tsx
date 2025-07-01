
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
  const [upcomingProducts, setUpcomingProducts] = useState(products.slice(0, 3));
  const [relatedProducts, setRelatedProducts] = useState(products.slice(1, 7));

  // Update upcoming and related products when current product changes
  useEffect(() => {
    // Get next 3 products for upcoming
    const nextProducts = [];
    for (let i = 1; i <= 3; i++) {
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
      .slice(0, 6);
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
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
      {/* Left Sidebar - Fixed width 300px to match drawing proportions */}
      <div className="w-80 border-r border-gray-200 dark:border-gray-800 flex flex-col">
        {/* Categories Section - 30% of left sidebar height */}
        <div className="h-[30%] bg-white/50 dark:bg-black/50 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
          <CategorySidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        
        {/* Upcoming Products Section - 70% of left sidebar height */}
        <div className="h-[70%] bg-white/30 dark:bg-black/30 backdrop-blur-sm">
          <UpcomingProducts
            products={upcomingProducts}
            onProductSelect={handleUpcomingProductSelect}
          />
        </div>
      </div>

      {/* Center Reel - Takes remaining space between sidebars */}
      <div className="flex-1 relative">
        <ProductReel
          products={products}
          currentIndex={currentIndex}
          onProductChange={onProductChange}
        />
      </div>

      {/* Right Sidebar - Fixed width 320px for better product display */}
      <div className="w-80 bg-white/30 dark:bg-black/30 backdrop-blur-sm border-l border-gray-200 dark:border-gray-800">
        <RelatedProducts
          products={relatedProducts}
          onProductSelect={handleRelatedProductSelect}
        />
      </div>
    </div>
  );
};
