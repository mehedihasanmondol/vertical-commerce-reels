
import { useState, useEffect } from 'react';
import { ArrowLeft, CreditCard, Truck, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CustomerInfo {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

const Checkout = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [items, setItems] = useState<CheckoutItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });

  useEffect(() => {
    // In a real app, you'd get this from state management or localStorage
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
      setItems(JSON.parse(cartItems));
    } else {
      // Sample items for demo
      setItems([
        {
          id: '1',
          name: 'Premium Wireless Headphones',
          price: 199.99,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
          quantity: 1
        }
      ]);
    }
  }, []);

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return Object.values(customerInfo).every(value => value.trim() !== '');
  };

  const handlePayment = async () => {
    if (!isFormValid()) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart
      localStorage.removeItem('cartItems');
      
      toast({
        title: "Payment Successful!",
        description: "Your order has been placed successfully",
      });
      
      navigate('/payment-success');
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
        <div className="bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
          <div className="flex items-center justify-between px-4 py-4">
            <Link to="/cart" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
              <ArrowLeft size={20} />
              <span>Back to Cart</span>
            </Link>
            <h1 className="text-xl font-bold">Checkout</h1>
            <div className="w-16" />
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center px-4 py-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No items to checkout</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
            Your cart is empty. Add some items before checking out.
          </p>
          <Link to="/">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black pb-20">
      {/* Header */}
      <div className="bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-4">
          <Link to="/cart" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
            <ArrowLeft size={20} />
            <span>Back</span>
          </Link>
          <h1 className="text-xl font-bold">Checkout</h1>
          <div className="w-16" />
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Order Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          {items.map((item) => (
            <div key={item.id} className="flex gap-3 mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-medium text-sm">{item.name}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Qty: {item.quantity}</p>
                <p className="font-semibold text-purple-600">${item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Customer Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                value={customerInfo.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={customerInfo.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              value={customerInfo.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={customerInfo.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="Street Address"
              value={customerInfo.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="City"
                value={customerInfo.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="State"
                value={customerInfo.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <input
              type="text"
              placeholder="ZIP Code"
              value={customerInfo.zipCode}
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CreditCard size={20} />
            Payment Information
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Card Number"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="CVV"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <input
              type="text"
              placeholder="Cardholder Name"
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Security Features */}
        <div className="flex items-center justify-center space-x-6 py-4">
          <div className="flex items-center space-x-2 text-green-600">
            <Shield size={16} />
            <span className="text-xs">SSL Secured</span>
          </div>
          <div className="flex items-center space-x-2 text-blue-600">
            <Truck size={16} />
            <span className="text-xs">Fast Delivery</span>
          </div>
        </div>

        {/* Order Total */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <hr className="border-gray-200 dark:border-gray-600" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <Button
          onClick={handlePayment}
          disabled={isProcessing || !isFormValid()}
          className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold disabled:opacity-50"
        >
          {isProcessing ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
        </Button>
      </div>
    </div>
  );
};

export default Checkout;
