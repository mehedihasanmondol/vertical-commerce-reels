
import { useState } from 'react';
import { X, CreditCard, Shield, Truck, Check, User, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Product } from '../types/Product';

interface QuickCheckoutProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

interface CheckoutData {
  customer: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
  shipping: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    instructions: string;
  };
  delivery: {
    method: string;
    speed: string;
  };
  payment: {
    method: string;
    saveCard: boolean;
  };
}

export const QuickCheckout = ({ product, isOpen, onClose }: QuickCheckoutProps) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<'details' | 'payment' | 'success'>('details');
  
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    customer: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
    },
    shipping: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US',
      instructions: '',
    },
    delivery: {
      method: 'standard',
      speed: 'standard',
    },
    payment: {
      method: 'card',
      saveCard: true,
    },
  });

  const deliveryOptions = [
    { id: 'standard', name: 'Standard Delivery', time: '5-7 business days', price: 0 },
    { id: 'express', name: 'Express Delivery', time: '2-3 business days', price: 9.99 },
    { id: 'overnight', name: 'Overnight Delivery', time: 'Next business day', price: 24.99 },
  ];

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'paypal', name: 'PayPal', icon: Shield },
    { id: 'applepay', name: 'Apple Pay', icon: Shield },
  ];

  const selectedDelivery = deliveryOptions.find(opt => opt.id === checkoutData.delivery.method) || deliveryOptions[0];
  const subtotal = product.price;
  const deliveryFee = selectedDelivery.price;
  const tax = (subtotal + deliveryFee) * 0.08;
  const total = subtotal + deliveryFee + tax;

  const updateCheckoutData = (section: keyof CheckoutData, field: string, value: string | boolean) => {
    setCheckoutData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleQuickBuy = async () => {
    // Basic validation
    const { customer, shipping } = checkoutData;
    if (!customer.email || !customer.firstName || !customer.lastName || !shipping.address || !shipping.city || !shipping.zipCode) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setCurrentStep('success');
      setIsProcessing(false);
      
      toast({
        title: "Order Successful!",
        description: "Your order has been placed successfully.",
      });

      // Auto close after success
      setTimeout(() => {
        onClose();
        setCurrentStep('details');
      }, 3000);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-t-2xl sm:rounded-2xl shadow-2xl animate-in slide-in-from-bottom-full sm:slide-in-from-bottom-0 duration-300 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900 z-10">
          <h3 className="text-lg font-semibold">Quick Checkout</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {currentStep === 'details' && (
            <div className="p-4 space-y-6">
              {/* Product Summary */}
              <div className="flex gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-sm line-clamp-2">{product.name}</h4>
                  <div className="text-xl font-bold text-purple-600 mt-1">
                    ${product.price}
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <User size={18} className="text-purple-600" />
                  <h4 className="font-semibold">Customer Information</h4>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="First Name *"
                    value={checkoutData.customer.firstName}
                    onChange={(e) => updateCheckoutData('customer', 'firstName', e.target.value)}
                    className="text-sm"
                  />
                  <Input
                    placeholder="Last Name *"
                    value={checkoutData.customer.lastName}
                    onChange={(e) => updateCheckoutData('customer', 'lastName', e.target.value)}
                    className="text-sm"
                  />
                </div>
                
                <Input
                  placeholder="Email Address *"
                  type="email"
                  value={checkoutData.customer.email}
                  onChange={(e) => updateCheckoutData('customer', 'email', e.target.value)}
                  className="text-sm"
                />
                
                <Input
                  placeholder="Phone Number (Optional)"
                  type="tel"
                  value={checkoutData.customer.phone}
                  onChange={(e) => updateCheckoutData('customer', 'phone', e.target.value)}
                  className="text-sm"
                />
              </div>

              {/* Shipping Address */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin size={18} className="text-purple-600" />
                  <h4 className="font-semibold">Shipping Address</h4>
                </div>
                
                <Input
                  placeholder="Street Address *"
                  value={checkoutData.shipping.address}
                  onChange={(e) => updateCheckoutData('shipping', 'address', e.target.value)}
                  className="text-sm"
                />
                
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="City *"
                    value={checkoutData.shipping.city}
                    onChange={(e) => updateCheckoutData('shipping', 'city', e.target.value)}
                    className="text-sm"
                  />
                  <Input
                    placeholder="ZIP Code *"
                    value={checkoutData.shipping.zipCode}
                    onChange={(e) => updateCheckoutData('shipping', 'zipCode', e.target.value)}
                    className="text-sm"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="State"
                    value={checkoutData.shipping.state}
                    onChange={(e) => updateCheckoutData('shipping', 'state', e.target.value)}
                    className="text-sm"
                  />
                  <Select 
                    value={checkoutData.shipping.country} 
                    onValueChange={(value) => updateCheckoutData('shipping', 'country', value)}
                  >
                    <SelectTrigger className="text-sm">
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Textarea
                  placeholder="Delivery Instructions (Optional)"
                  value={checkoutData.shipping.instructions}
                  onChange={(e) => updateCheckoutData('shipping', 'instructions', e.target.value)}
                  className="text-sm resize-none"
                  rows={2}
                />
              </div>

              {/* Delivery Method */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={18} className="text-purple-600" />
                  <h4 className="font-semibold">Delivery Method</h4>
                </div>
                
                <div className="space-y-2">
                  {deliveryOptions.map((option) => (
                    <label key={option.id} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <input
                        type="radio"
                        name="delivery"
                        value={option.id}
                        checked={checkoutData.delivery.method === option.id}
                        onChange={(e) => updateCheckoutData('delivery', 'method', e.target.value)}
                        className="text-purple-600"
                      />
                      <Truck size={16} className="text-gray-500" />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{option.name}</div>
                        <div className="text-xs text-gray-500">{option.time}</div>
                      </div>
                      <div className="font-semibold text-sm">
                        {option.price === 0 ? 'FREE' : `$${option.price}`}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard size={18} className="text-purple-600" />
                  <h4 className="font-semibold">Payment Method</h4>
                </div>
                
                <div className="space-y-2">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <label key={method.id} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={checkoutData.payment.method === method.id}
                          onChange={(e) => updateCheckoutData('payment', 'method', e.target.value)}
                          className="text-purple-600"
                        />
                        <Icon size={16} className="text-gray-500" />
                        <span className="font-medium text-sm">{method.name}</span>
                      </label>
                    );
                  })}
                </div>
                
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={checkoutData.payment.saveCard}
                    onChange={(e) => updateCheckoutData('payment', 'saveCard', e.target.checked)}
                    className="text-purple-600"
                  />
                  <span>Save payment method for future purchases</span>
                </label>
              </div>

              {/* Order Summary */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-2 bg-gray-50 dark:bg-gray-800">
                <h4 className="font-semibold mb-2">Order Summary</h4>
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Delivery ({selectedDelivery.name})</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <hr className="border-gray-200 dark:border-gray-600" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Button */}
              <Button
                onClick={handleQuickBuy}
                disabled={isProcessing}
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing Order...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CreditCard size={18} />
                    Complete Order - ${total.toFixed(2)}
                  </div>
                )}
              </Button>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Secure checkout powered by Stripe. Your information is encrypted and secure.
              </p>
            </div>
          )}

          {currentStep === 'success' && (
            <div className="text-center py-8 px-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={32} className="text-green-600 dark:text-green-400" />
              </div>
              <h4 className="text-lg font-semibold mb-2">Order Confirmed!</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Thank you for your purchase. You'll receive an email confirmation shortly.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-4">
                <p className="text-sm font-medium">Estimated Delivery</p>
                <p className="text-lg font-bold text-purple-600">{selectedDelivery.time}</p>
              </div>
              <div className="text-xs text-gray-500">
                Order Total: ${total.toFixed(2)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
