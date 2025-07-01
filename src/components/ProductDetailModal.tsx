
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Star, MessageCircle, ZoomIn, Eye } from 'lucide-react';
import { Product } from '../types/Product';
import { ImageGallery } from './ImageGallery';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailModal = ({ product, isOpen, onClose }: ProductDetailModalProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!product) return null;

  const mockRating = 4.2;
  const mockReviewCount = 127;

  const handleAddToCart = () => {
    console.log('Added to cart:', product.name);
    // Add to cart logic here
  };

  const handleBuyNow = () => {
    console.log('Buy now:', product.name);
    // Buy now logic here
  };

  const handleZoomView = () => {
    setShowFullGallery(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{product.name}</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={handleZoomView}
                  className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                >
                  <ZoomIn size={16} />
                </button>
              </div>
              
              {/* Image Thumbnails */}
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                      currentImageIndex === index
                        ? 'border-purple-500'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  ${product.price}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {product.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h4 className="font-semibold mb-2">Features</h4>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={`${
                        star <= Math.floor(mockRating)
                          ? 'text-yellow-500 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{mockRating}</span>
                <span className="text-gray-500">({mockReviewCount} reviews)</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="flex space-x-3">
                  <Button
                    onClick={handleAddToCart}
                    variant="outline"
                    className="flex-1"
                  >
                    <ShoppingCart size={16} className="mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    onClick={() => setIsLiked(!isLiked)}
                    variant="outline"
                    className={isLiked ? 'text-red-500 border-red-500' : ''}
                  >
                    <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                  </Button>
                </div>
                
                <Button
                  onClick={handleBuyNow}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Buy Now
                </Button>
              </div>

              {/* Additional Actions */}
              <div className="flex space-x-3 pt-4 border-t">
                <Button variant="ghost" size="sm">
                  <MessageCircle size={16} className="mr-2" />
                  Comments
                </Button>
                <Button variant="ghost" size="sm">
                  <Star size={16} className="mr-2" />
                  Reviews
                </Button>
                <Button variant="ghost" size="sm" onClick={handleZoomView}>
                  <Eye size={16} className="mr-2" />
                  Gallery
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Full Gallery Modal */}
      <Dialog open={showFullGallery} onOpenChange={setShowFullGallery}>
        <DialogContent className="max-w-6xl max-h-[95vh] p-2">
          <div className="h-[80vh]">
            <ImageGallery images={product.images} isActive={true} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
