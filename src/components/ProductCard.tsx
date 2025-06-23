
import { useState } from 'react';
import { Heart, Share2, ShoppingCart } from 'lucide-react';
import { Product } from '../types/Product';
import { ImageGallery } from './ImageGallery';

interface ProductCardProps {
  product: Product;
  isActive: boolean;
}

export const ProductCard = ({ product, isActive }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsAddingToCart(false);
    console.log('Added to cart:', product.name);
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: product.name,
        text: `Check out this amazing ${product.name}!`,
        url: window.location.href,
      });
    } catch (error) {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      console.log('Link copied to clipboard');
    }
  };

  return (
    <div className="relative w-full h-full bg-black">
      {/* Full-screen Image Gallery */}
      <div className="absolute inset-0">
        <ImageGallery images={product.images} isActive={isActive} />
      </div>

      {/* Vertical Action Buttons - Right Edge */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col space-y-6 z-30">
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`p-4 rounded-full backdrop-blur-lg transition-all duration-300 ${
            isLiked 
              ? 'bg-red-500/80 text-white shadow-lg shadow-red-500/25' 
              : 'bg-black/20 text-white hover:bg-black/40'
          }`}
        >
          <Heart size={24} fill={isLiked ? 'currentColor' : 'none'} />
        </button>
        
        <button
          onClick={handleShare}
          className="p-4 rounded-full bg-black/20 backdrop-blur-lg text-white hover:bg-black/40 transition-all duration-300"
        >
          <Share2 size={24} />
        </button>

        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="p-4 rounded-full bg-black/20 backdrop-blur-lg text-white hover:bg-black/40 transition-all duration-300 disabled:opacity-50"
        >
          <ShoppingCart size={24} />
        </button>
      </div>

      {/* Price Badge - Top Left */}
      <div className="absolute top-6 left-4 z-20">
        <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
          ${product.price}
        </span>
      </div>

      {/* Product Info - Bottom Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 z-20">
        <div className="text-white space-y-3">
          <h3 className="text-2xl font-bold">
            {product.name}
          </h3>
          <p className="text-gray-200 text-sm opacity-90">
            {product.description}
          </p>
          
          {/* Product Features */}
          <div className="flex flex-wrap gap-2">
            {product.features.slice(0, 3).map((feature, index) => (
              <span
                key={index}
                className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Action Buttons Row - Bottom */}
          <div className="flex space-x-3 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className="flex-1 bg-white text-black py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 disabled:opacity-70"
            >
              {isAddingToCart ? 'Adding...' : 'Add to Cart'}
            </button>
            
            <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-all duration-300">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
