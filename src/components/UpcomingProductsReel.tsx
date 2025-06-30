
import { Product } from '../types/Product';

interface UpcomingProductsReelProps {
  products: Product[];
}

export const UpcomingProductsReel = ({ products }: UpcomingProductsReelProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
        Upcoming Products
      </h3>
      
      <div className="space-y-4">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="relative bg-black rounded-lg overflow-hidden aspect-square group cursor-pointer"
          >
            {/* Product Image */}
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            {/* Product Info */}
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <div className="text-white">
                <h4 className="font-semibold text-sm truncate mb-1">
                  {product.name}
                </h4>
                <div className="flex items-center justify-between">
                  <span className="text-green-400 font-bold text-sm">
                    ${product.price}
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs">
                    #{index + 1}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Product Number Badge */}
            <div className="absolute top-2 right-2">
              <div className="bg-purple-600/80 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full">
                Product {index + 1}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
