
import { useEffect } from 'react';
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PaymentSuccess = () => {
  useEffect(() => {
    // Clear any cart data on successful payment
    localStorage.removeItem('cartItems');
  }, []);

  const orderNumber = `ORD-${Date.now().toString().slice(-6)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-black">
      <div className="flex flex-col items-center justify-center px-4 py-20">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 max-w-md w-full text-center">
          <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
          
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Payment Successful!
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Order Number</p>
            <p className="font-bold text-lg text-gray-900 dark:text-white">{orderNumber}</p>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-blue-500" />
                <span>Confirmation email sent</span>
              </div>
              <CheckCircle size={16} className="text-green-500" />
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Package size={16} className="text-orange-500" />
                <span>Preparing for shipment</span>
              </div>
              <div className="w-4 h-4 border-2 border-orange-500 rounded-full animate-pulse" />
            </div>
          </div>
          
          <div className="space-y-3">
            <Link to="/" className="block">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Continue Shopping
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
            
            <Link to="/orders" className="block">
              <Button variant="outline" className="w-full">
                View Order Details
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@example.com" className="text-purple-600 hover:underline">
              support@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
