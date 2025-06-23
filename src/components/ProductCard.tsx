
import { useState } from 'react';
import { Heart, Share2, BarChart3, Star, MessageCircle } from 'lucide-react';
import { Product } from '../types/Product';
import { ImageGallery } from './ImageGallery';
import { Comments } from './Comments';

interface ProductCardProps {
  product: Product;
  isActive: boolean;
}

export const ProductCard = ({ product, isActive }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

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

  const handleReviewAnalytics = () => {
    console.log('Opening review analytics for:', product.name);
  };

  const handleQuickReview = () => {
    console.log('Opening quick review for:', product.name);
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
          onClick={() => setShowComments(true)}
          className="p-4 rounded-full bg-black/20 backdrop-blur-lg text-white hover:bg-black/40 transition-all duration-300"
        >
          <MessageCircle size={24} />
        </button>

        <button
          onClick={handleShare}
          className="p-4 rounded-full bg-black/20 backdrop-blur-lg text-white hover:bg-black/40 transition-all duration-300"
        >
          <Share2 size={24} />
        </button>

        <button
          onClick={handleReviewAnalytics}
          className="p-4 rounded-full bg-black/20 backdrop-blur-lg text-white hover:bg-black/40 transition-all duration-300"
        >
          <BarChart3 size={24} />
        </button>

        <button
          onClick={handleQuickReview}
          className="p-4 rounded-full bg-black/20 backdrop-blur-lg text-white hover:bg-black/40 transition-all duration-300"
        >
          <Star size={24} />
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
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold flex-1">
              {product.name}
            </h3>
            <button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition-all duration-300 ml-4">
              Buy Now
            </button>
          </div>
          
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
        </div>
      </div>

      {/* Comments Modal */}
      <Comments
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        productId={product.id}
      />
    </div>
  );
