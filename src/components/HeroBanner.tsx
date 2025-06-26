
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const banners = [
  {
    id: 1,
    title: "Summer Sale",
    subtitle: "Up to 70% off on selected items",
    image: "/placeholder.svg",
    cta: "Shop Now"
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Discover the latest trends",
    image: "/placeholder.svg",
    cta: "Explore"
  },
  {
    id: 3,
    title: "Premium Collection",
    subtitle: "Luxury products for discerning customers",
    image: "/placeholder.svg",
    cta: "View Collection"
  }
];

export const HeroBanner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="relative w-full h-64 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg overflow-hidden mb-6">
      <div className="absolute inset-0 flex items-center justify-center text-white text-center p-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">{banners[currentBanner].title}</h2>
          <p className="text-lg mb-4">{banners[currentBanner].subtitle}</p>
          <button className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            {banners[currentBanner].cta}
          </button>
        </div>
      </div>
      
      {/* Navigation Arrows */}
      <button 
        onClick={prevBanner}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
      >
        <ChevronLeft size={32} />
      </button>
      <button 
        onClick={nextBanner}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
      >
        <ChevronRight size={32} />
      </button>
      
      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentBanner ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
