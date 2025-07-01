
import { useState } from 'react';
import { Product } from '../types/Product';
import { ProductDetailModal } from './ProductDetailModal';

interface RightSidebarProps {
  currentProduct: Product;
  allProducts: Product[];
}

export const RightSidebar = ({ currentProduct, allProducts }: RightSidebarProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Get related products based on current product's category
  const getRelatedProducts = () => {
    return allProducts
      .filter(product => 
        product.id !== currentProduct.id && 
        product.category === currentProduct.category
      )
      .slice(0, 6); // Show up to 6 related products
  };

  const relatedProducts = getRelatedProducts();

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Related Products</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Similar to {currentProduct.name}
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto scrollbar-hide p-4">
          <div className="grid grid-cols-2 gap-3">
            {relatedProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="cursor-pointer group bg-white dark:bg-gray-900 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute top-2 right-2">
                    <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                      ${product.price}
                    </span>
                  </div>
                </div>
                
                <div className="p-3">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {product.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex flex-wrap gap-1">
                      {product.features.slice(0, 2).map((feature, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {relatedProducts.length === 0 && (
            <div className="flex items-center justify-center h-32 text-gray-500 dark:text-gray-400">
              <p className="text-sm text-center">
                No related products found<br />
                <span className="text-xs">Try exploring other categories</span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
};
