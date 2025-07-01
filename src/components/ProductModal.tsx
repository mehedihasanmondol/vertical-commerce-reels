
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Heart, Star, MessageCircle, ShoppingCart, ZoomIn, Eye } from 'lucide-react';
import { Product } from '../types/Product';
import { ImageGallery } from './ImageGallery';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

export const ProductModal = ({ isOpen, onClose, product }: ProductModalProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  if (!product) return null;

  const mockRating = 4.2;
  const mockReviewCount = 127;

  const handleAddToCart = () => {
    console.log('Added to cart:', product.name);
    // Add your cart logic here
  };

  const handleBuyNow = () => {
    console.log('Buy now:', product.name);
    // Add your checkout logic here
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] p-0 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full max-h-[95vh]">
          {/* Left Side - Image Gallery */}
          <div className="relative bg-black">
            <ImageGallery images={product.images} isActive={true} />
            
            {/* Gallery Controls */}
            <div className="absolute top-4 right-4 flex space-x-2">
              <Button
                size="sm"
                variant="secondary"
                className="bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
                onClick={() => setShowFullGallery(true)}
              >
                <Eye size={16} className="mr-1" />
                Gallery
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="bg-black/50 backdrop-blur-sm text-white hover:bg-black/70"
              >
                <ZoomIn size={16} className="mr-1" />
                Zoom
              </Button>
            </div>

            {/* Price Badge */}
            <div className="absolute top-4 left-4">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                ${product.price}
              </span>
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="flex flex-col h-full max-h-[95vh]">
            <DialogHeader className="p-6 pb-4 border-b">
              <DialogTitle className="text-2xl font-bold text-left">
                {product.name}
              </DialogTitle>
            </DialogHeader>

            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6">
                {/* Product Description */}
                <div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Product Features */}
                <div>
                  <h4 className="font-semibold mb-3">Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Rating & Reviews */}
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">Reviews</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowReviews(!showReviews)}
                    >
                      <Star size={16} className="mr-1 text-yellow-500 fill-current" />
                      {mockRating} ({mockReviewCount})
                    </Button>
                  </div>
                  
                  {showReviews && (
                    <div className="space-y-4 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={16}
                              className={star <= Math.floor(mockRating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">John D.</span>
                      </div>
                      <p className="text-sm">Amazing product! Highly recommended.</p>
                    </div>
                  )}
                </div>

                {/* Comments */}
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold">Comments</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowComments(!showComments)}
                    >
                      <MessageCircle size={16} className="mr-1" />
                      View Comments
                    </Button>
                  </div>
                  
                  {showComments && (
                    <div className="space-y-4 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg">
                      <div className="text-gray-500 text-center py-4 text-sm">
                        No comments yet. Be the first to comment!
                      </div>
                      <div className="border-t pt-4">
                        <textarea
                          placeholder="Write a comment..."
                          className="w-full p-3 border rounded-lg resize-none text-sm"
                          rows={3}
                        />
                        <Button size="sm" className="mt-2">
                          Post Comment
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>

            {/* Action Buttons - Sticky Footer */}
            <div className="border-t p-6 bg-white dark:bg-gray-950 sticky bottom-0">
              <div className="flex flex-col space-y-3">
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    className="flex-1 flex items-center justify-center"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Heart
                      size={18}
                      className={`mr-2 ${isLiked ? 'text-red-500 fill-current' : ''}`}
                    />
                    {isLiked ? 'Liked' : 'Favorite'}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 flex items-center justify-center"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart size={18} className="mr-2" />
                    Add to Cart
                  </Button>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  onClick={handleBuyNow}
                >
                  Buy Now - ${product.price}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
