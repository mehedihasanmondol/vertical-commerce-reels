
import { useState } from 'react';
import { X, CreditCard, Shield, Truck, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Product } from '../types/Product';

interface QuickCheckoutProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickCheckout = ({ product, isOpen, onClose }: QuickCheckoutProps) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'details' | 'payment' | 'success'>('details');

  const handleQuickBuy = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStep('success');
      setIsProcessing(false);
      
      toast({
        title: "Order Successful!",
        description: "Your order has been placed successfully.",
      });

      // Auto close after success
      setTimeout(() => {
        onClose();
        setPaymentStep('details');
      }, 2000);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl shadow-2xl animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold">Quick Buy</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {paymentStep === 'details' && (
            <>
              {/* Product Summary */}
              <div className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-sm line-clamp-2">{product.name}</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <span
                        key={index}
                        className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="text-xl font-bold text-purple-600 mt-1">
                    ${product.price}
                  </div>
                </div>
              </div>

              {/* Quick Benefits */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="flex flex-col items-center p-2">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-1">
                    <Truck size={16} className="text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center p-2">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-1">
                    <Shield size={16} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Secure Payment</span>
                </div>
                <div className="flex flex-col items-center p-2">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mb-1">
                    <Check size={16} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">30-Day Return</span>
                </div>
              </div>

              {/* Order Summary */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${product.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${(product.price * 0.08).toFixed(2)}</span>
                </div>
                <hr className="border-gray-200 dark:border-gray-600" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${(product.price * 1.08).toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <Button
                  onClick={handleQuickBuy}
                  disabled={isProcessing}
                  className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CreditCard size={18} />
                      Buy Now - ${(product.price * 1.08).toFixed(2)}
                    </div>
                  )}
                </Button>
                
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  Secure checkout powered by Stripe. Your payment information is encrypted and secure.
                </p>
              </div>
            </>
          )}

          {paymentStep === 'success' && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-600 dark:text-green-400" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Order Confirmed!</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Thank you for your purchase. You'll receive an email confirmation shortly.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                <p className="text-sm font-medium">Estimated Delivery</p>
                <p className="text-lg font-bold text-purple-600">2-3 Business Days</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
