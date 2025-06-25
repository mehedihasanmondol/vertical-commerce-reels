import { useState } from 'react';
import { Heart, Share2, MessageCircle, Star, ShoppingCart } from 'lucide-react';
import { Product } from '../types/Product';
import { ImageGallery } from './ImageGallery';
import { QuickCheckout } from './QuickCheckout';

interface ProductCardProps {
  product: Product;
  isActive: boolean;
}

export const ProductCard = ({ product, isActive }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showRatingReview, setShowRatingReview] = useState(false);
  const [showQuickCheckout, setShowQuickCheckout] = useState(false);

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

  const handleQuickReview = () => {
    console.log('Opening quick review for:', product.name);
  };

  const handleComments = () => {
    setShowComments(!showComments);
    console.log('Toggle comments for:', product.name);
  };

  const handleRatingReview = () => {
    setShowRatingReview(!showRatingReview);
    console.log('Toggle rating & review for:', product.name);
  };

  const handleBuyNow = () => {
    setShowQuickCheckout(true);
    console.log('Buy now clicked for:', product.name);
  };

  const handleAddToCart = () => {
    console.log('Add to cart clicked for:', product.name);
  };

  // Mock rating data
  const mockRating = 4.2;
  const mockReviewCount = 127;

  return (
    <>
      <div className="relative w-full h-full bg-black">
        {/* Full-screen Image Gallery */}
        <div className="absolute inset-0">
          <ImageGallery images={product.images} isActive={isActive} />
        </div>

        {/* Vertical Action Buttons - Right Edge with safe area */}
        <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 flex flex-col space-y-3 sm:space-y-4 z-30">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2.5 sm:p-3 rounded-full backdrop-blur-lg transition-all duration-300 ${
              isLiked 
                ? 'bg-red-500/80 text-white shadow-lg shadow-red-500/25' 
                : 'bg-black/20 text-white hover:bg-black/40'
            }`}
          >
            <Heart size={18} className="sm:w-5 sm:h-5" fill={isLiked ? 'currentColor' : 'none'} />
          </button>
          
          <button
            onClick={handleShare}
            className="p-2.5 sm:p-3 rounded-full bg-black/20 backdrop-blur-lg text-white hover:bg-black/40 transition-all duration-300"
          >
            <Share2 size={18} className="sm:w-5 sm:h-5" />
          </button>

          <button
            onClick={handleQuickReview}
            className="p-2.5 sm:p-3 rounded-full bg-black/20 backdrop-blur-lg text-white hover:bg-black/40 transition-all duration-300"
          >
            <Star size={18} className="sm:w-5 sm:h-5" />
          </button>

          <button
            onClick={handleAddToCart}
            className="p-2.5 sm:p-3 rounded-full bg-green-600/80 backdrop-blur-lg text-white hover:bg-green-700/80 transition-all duration-300 shadow-lg shadow-green-600/25"
          >
            <ShoppingCart size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Price Badge - Top Left, now properly positioned below header */}
        <div className="absolute top-4 sm:top-6 left-2 sm:left-4 z-20">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-sm sm:text-base shadow-lg">
            ${product.price}
          </span>
        </div>

        {/* Product Info - Bottom Overlay with proper safe area handling */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-20" 
             style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}>
          <div className="text-white space-y-2 sm:space-y-3 p-3 sm:p-4 pb-4 sm:pb-6">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-xl font-bold mb-1 sm:mb-2 leading-tight">
                  {product.name}
                </h3>
                <p className="text-gray-200 text-xs sm:text-sm opacity-90 leading-relaxed line-clamp-2">
                  {product.description}
                </p>
              </div>
              <button
                onClick={handleBuyNow}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold hover:scale-105 transition-all duration-300 text-xs sm:text-sm flex-shrink-0 shadow-lg"
              >
                Buy Now
              </button>
            </div>
            
            {/* Product Features */}
            <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-3">
              {product.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="bg-white/20 backdrop-blur-sm text-white px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-xs font-medium"
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* Comment and Rating & Review Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button
                onClick={handleComments}
                className="flex items-center gap-1 sm:gap-1.5 bg-white/20 backdrop-blur-sm text-white px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-white/30 transition-all duration-300 font-medium"
              >
                <MessageCircle size={12} className="sm:w-3.5 sm:h-3.5" />
                <span>Comments</span>
              </button>

              <button
                onClick={handleRatingReview}
                className="flex items-center gap-1 sm:gap-1.5 bg-white/20 backdrop-blur-sm text-white px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-white/30 transition-all duration-300 font-medium"
              >
                <Star size={12} className="sm:w-3.5 sm:h-3.5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold">{mockRating}</span>
                <span className="text-xs opacity-80">({mockReviewCount})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Comments Overlay */}
        {showComments && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-end">
            <div className="w-full bg-white dark:bg-gray-900 rounded-t-2xl p-4 sm:p-6 max-h-2/3 overflow-y-auto"
                 style={{ marginBottom: 'max(0px, env(safe-area-inset-bottom))' }}>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base sm:text-lg font-semibold">Comments</h4>
                <button
                  onClick={() => setShowComments(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div className="text-gray-500 text-center py-8 text-sm sm:text-base">
                  No comments yet. Be the first to comment!
                </div>
                <div className="border-t pt-4">
                  <textarea
                    placeholder="Write a comment..."
                    className="w-full p-3 border rounded-lg resize-none text-sm sm:text-base"
                    rows={3}
                  />
                  <button className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base">
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rating & Review Overlay */}
        {showRatingReview && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-end">
            <div className="w-full bg-white dark:bg-gray-900 rounded-t-2xl p-4 sm:p-6 max-h-2/3 overflow-y-auto"
                 style={{ marginBottom: 'max(0px, env(safe-area-inset-bottom))' }}>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-base sm:text-lg font-semibold">Rating & Reviews</h4>
                <button
                  onClick={() => setShowRatingReview(false)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                {/* Overall Rating */}
                <div className="text-center py-4 border-b">
                  <div className="text-2xl sm:text-3xl font-bold text-yellow-500">{mockRating}</div>
                  <div className="flex justify-center gap-1 my-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={18}
                        className={`sm:w-5 sm:h-5 ${star <= Math.floor(mockRating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">{mockReviewCount} reviews</div>
                </div>
                
                {/* Mock Reviews */}
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} size={14} className="sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs sm:text-sm text-gray-600">John D.</span>
                    </div>
                    <p className="text-xs sm:text-sm">Amazing product! Highly recommended.</p>
                  </div>
                  
                  <div className="border-b pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((star) => (
                          <Star key={star} size={14} className="sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                        ))}
                        <Star size={14} className="sm:w-4 sm:h-4 text-gray-300" />
                      </div>
                      <span className="text-xs sm:text-sm text-gray-600">Sarah M.</span>
                    </div>
                    <p className="text-xs sm:text-sm">Good quality, fast shipping.</p>
                  </div>
                </div>
                
                <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base">
                  Write a Review
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Checkout Modal */}
      <QuickCheckout
        product={product}
        isOpen={showQuickCheckout}
        onClose={() => setShowQuickCheckout(false)}
      />
    </>
  );
};
