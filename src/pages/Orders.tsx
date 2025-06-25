import { useState } from 'react';
import { NavigationHeader } from '@/components/NavigationHeader';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, CreditCard, Calendar, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Order {
  id: string;
  productName: string;
  price: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  paymentStatus: 'unpaid' | 'paid';
  orderDate: string;
  deliveryAddress: string;
  deliveryMethod: string;
}

const Orders = () => {
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      productName: 'Sleek Wireless Headphones',
      price: 89.99,
      status: 'pending',
      paymentStatus: 'unpaid',
      orderDate: '2024-06-24',
      deliveryAddress: '123 Main Street, New York, NY 10001',
      deliveryMethod: 'Standard Delivery'
    },
    {
      id: '2',
      productName: 'Premium Bluetooth Speaker',
      price: 129.99,
      status: 'shipped',
      paymentStatus: 'paid',
      orderDate: '2024-06-20',
      deliveryAddress: '123 Main Street, New York, NY 10001',
      deliveryMethod: 'Express Delivery'
    },
    {
      id: '3',
      productName: 'Smart Fitness Watch',
      price: 199.99,
      status: 'delivered',
      paymentStatus: 'paid',
      orderDate: '2024-06-15',
      deliveryAddress: '456 Business Ave, New York, NY 10002',
      deliveryMethod: 'Next Day Delivery'
    }
  ]);

  const handlePayment = (orderId: string) => {
    toast({
      title: "Payment Initiated",
      description: "Redirecting to payment gateway...",
    });
    
    // Simulate payment process
    setTimeout(() => {
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { ...order, paymentStatus: 'paid', status: 'paid' }
          : order
      ));
      
      toast({
        title: "Payment Successful",
        description: "Your order has been paid successfully!",
      });
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'paid': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'shipped': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'delivered': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    return status === 'paid' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-black dark:to-purple-900">
      <NavigationHeader isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
      
      <main className="container mx-auto px-4 py-6 pb-20 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Orders</h1>
          <p className="text-gray-600 dark:text-gray-300">Track and manage your orders</p>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{order.productName}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                      <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                        {order.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-lg font-bold">
                      <DollarSign className="w-4 h-4" />
                      {order.price.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">Order #{order.id}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-300">Ordered: {order.orderDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600 dark:text-gray-300">{order.deliveryMethod}</span>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Delivery to:</strong> {order.deliveryAddress}
                </div>

                {order.paymentStatus === 'unpaid' && (
                  <div className="flex gap-2 pt-2">
                    <Button 
                      onClick={() => handlePayment(order.id)}
                      className="flex items-center gap-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      Pay Now
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No orders yet</h3>
            <p className="text-gray-600 dark:text-gray-300">Start shopping to see your orders here</p>
          </div>
        )}
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Orders;
