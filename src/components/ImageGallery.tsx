
import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  isActive: boolean;
}

export const ImageGallery = ({ images, isActive }: ImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset to first image when reel becomes inactive
  useEffect(() => {
    if (!isActive) {
      setCurrentImageIndex(0);
    }
  }, [isActive]);

  const nextImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Handle touch events for horizontal swiping within the reel
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && images.length > 1) {
      nextImage();
    }
    if (isRightSwipe && images.length > 1) {
      prevImage();
    }
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Images Container */}
      <div 
        ref={containerRef}
        className="flex w-full h-full transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <img
              src={image}
              alt={`Product image ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Only show if multiple images */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all duration-300 z-10"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-20 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all duration-300 z-10"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Slider controls at bottom - side by side */}
      {images.length > 1 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-4 z-10">
          {/* Dots Indicator */}
          <div className="flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? 'bg-white scale-125'
                    : 'bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Swipe Indicator - only show on first image */}
          {currentImageIndex === 0 && (
            <div className="text-white/70 text-sm animate-pulse bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full whitespace-nowrap">
              Swipe for more →
            </div>
          )}
        </div>
      )}
    </div>
  );
};
