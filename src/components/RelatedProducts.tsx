
import { useState } from 'react';
import { Product } from '../types/Product';
import { ProductModal } from './ProductModal';

interface RelatedProductsProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
}

export const RelatedProducts = ({ products, onProductSelect }: RelatedProductsProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Group products into pairs for 2-per-row layout
  const productPairs = [];
  for (let i = 0; i < products.length; i += 2) {
    productPairs.push(products.slice(i, i + 2));
  }

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-black/80 backdrop-blur-sm sticky top-0 z-10">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            Related Products
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {productPairs.map((pair, pairIndex) => (
            <div key={pairIndex} className="grid grid-cols-2 gap-3">
              {pair.map((product) => (
                <div
                  key={product.id}
                  className="relative aspect-[3/4] bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg overflow-hidden cursor-pointer group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={() => handleProductClick(product)}
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Price Badge */}
                  <div className="absolute top-2 right-2 bg-white/90 text-black px-2 py-1 rounded-full text-xs font-bold">
                    ${product.price}
                  </div>

                  {/* Product Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translateY-2 group-hover:translateY-0 transition-transform duration-300">
                    <h4 className="font-semibold text-xs mb-1 line-clamp-2">
                      {product.name}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {product.features.slice(0, 2).map((feature, index) => (
                        <span
                          key={index}
                          className="bg-white/20 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-full text-xs"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* View Details Icon */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        product={selectedProduct}
      />
    </>
  );
};
