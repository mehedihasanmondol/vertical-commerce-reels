
import { Product } from '../types/Product';

interface RelatedProductsProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
}

export const RelatedProducts = ({ products, onProductSelect }: RelatedProductsProps) => {
  // Ensure we only show 4 products maximum for 2x2 grid
  const displayProducts = products.slice(0, 4);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
          Related Products
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-4 h-full">
          {displayProducts.map((product) => (
            <div
              key={product.id}
              className="relative aspect-square bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl overflow-hidden cursor-pointer group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={() => onProductSelect(product)}
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Price Badge */}
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-black px-2 py-1 rounded-full text-xs font-bold">
                ${product.price}
              </div>

              {/* Product Info */}
              <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h4 className="font-semibold text-xs mb-1 line-clamp-2">
                  {product.name}
                </h4>
                <div className="flex flex-wrap gap-1">
                  {product.features.slice(0, 1).map((feature, index) => (
                    <span
                      key={index}
                      className="bg-white/20 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-full text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Play Icon */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-l-4 border-l-white border-y-2 border-y-transparent ml-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
