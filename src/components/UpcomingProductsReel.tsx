
import { Product } from '../types/Product';

interface UpcomingProductsReelProps {
  products: Product[];
}

export const UpcomingProductsReel = ({ products }: UpcomingProductsReelProps) => {
  const handleDragStart = (e: React.DragEvent, product: Product) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(product));
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="space-y-3">
      {products.map((product, index) => (
        <div
          key={product.id}
          draggable
          onDragStart={(e) => handleDragStart(e, product)}
          className="relative bg-black rounded-lg overflow-hidden aspect-square group cursor-grab active:cursor-grabbing hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
        >
          {/* Product Image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Overlay with flowing gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent group-hover:from-purple-900/60" />
          
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
                  Next #{index + 1}
                </span>
              </div>
            </div>
          </div>
          
          {/* Drag indicator */}
          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-purple-600/80 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full flex items-center space-x-1">
              <span>↗️</span>
              <span>Drag to Reel</span>
            </div>
          </div>
          
          {/* Flow indicator arrows */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex flex-col space-y-1">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Visual connection indicator */}
      <div className="flex justify-center py-2">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};
