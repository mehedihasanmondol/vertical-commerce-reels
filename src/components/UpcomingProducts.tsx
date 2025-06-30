
import { Product } from '../types/Product';

interface UpcomingProductsProps {
  products: Product[];
}

export const UpcomingProducts = ({ products }: UpcomingProductsProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
        📅 UP Next
      </h3>
      
      <div className="space-y-3">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-lg">📦</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                  {product.name}
                </h4>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-blue-600 font-bold text-sm">${product.price}</span>
                  <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                    #{index + 1}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {product.features.slice(0, 2).map((feature, featureIndex) => (
                <span
                  key={featureIndex}
                  className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
