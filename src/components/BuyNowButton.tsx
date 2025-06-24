
import { useState } from 'react';
import { ShoppingCart, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Product } from '../types/Product';

interface BuyNowButtonProps {
  product: Product;
  className?: string;
}

export const BuyNowButton = ({ product, className = "" }: BuyNowButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleBuyNow = async () => {
    setIsLoading(true);
    
    try {
      // Create a temporary cart item for immediate checkout
      const checkoutItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: 1
      };
      
      // Store in localStorage for checkout page
      localStorage.setItem('cartItems', JSON.stringify([checkoutItem]));
      
      toast({
        title: "Proceeding to checkout",
        description: `${product.name} added for immediate purchase`,
      });
      
      // Navigate to checkout
      navigate('/checkout');
    } catch (error) {
      toast({
        title: "Error",
        description: "Unable to proceed with purchase",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = () => {
    // Get existing cart items
    const existingCart = localStorage.getItem('cartItems');
    const cartItems = existingCart ? JSON.parse(existingCart) : [];
    
    // Check if item already exists
    const existingItemIndex = cartItems.findIndex((item: any) => item.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Increase quantity
      cartItems[existingItemIndex].quantity += 1;
    } else {
      // Add new item
      cartItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: 1,
        features: product.features
      });
    }
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <Button
        onClick={handleAddToCart}
        variant="outline"
        className="flex-1 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
      >
        <ShoppingCart size={16} className="mr-2" />
        Add to Cart
      </Button>
      
      <Button
        onClick={handleBuyNow}
        disabled={isLoading}
        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold"
      >
        <CreditCard size={16} className="mr-2" />
        {isLoading ? 'Processing...' : 'Buy Now'}
      </Button>
    </div>
  );
};
