
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
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
      {/* Image Gallery */}
      <div className="relative h-96">
        <ImageGallery images={product.images} isActive={isActive} />
        
        {/* Floating Action Buttons */}
        <div className="absolute top-4 right-4 space-y-3">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-3 rounded-full backdrop-blur-lg transition-all duration-300 ${
              isLiked 
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/25' 
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
          </button>
          
          <button
            onClick={handleShare}
            className="p-3 rounded-full bg-white/20 backdrop-blur-lg text-white hover:bg-white/30 transition-all duration-300"
          >
            <Share2 size={20} />
          </button>
        </div>

        {/* Price Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
            ${product.price}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {product.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            {product.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-70"
          >
            <ShoppingCart size={20} />
            <span>{isAddingToCart ? 'Adding...' : 'Add to Cart'}</span>
          </button>
          
          <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg">
            Buy Now
          </button>
        </div>

        {/* Product Features */}
        <div className="flex flex-wrap gap-2">
          {product.features.map((feature, index) => (
            <span
              key={index}
              className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
