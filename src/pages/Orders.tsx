
import { useState } from 'react';
import { NavigationHeader } from '@/components/NavigationHeader';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Package, CreditCard, Calendar, DollarSign, Plus, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank';
  name: string;
  details: string;
  isDefault: boolean;
}

const Orders = () => {
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('1');
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      name: 'Visa ending in 1234',
      details: '**** **** **** 1234',
      isDefault: true
    },
    {
      id: '2',
      type: 'paypal',
      name: 'PayPal',
      details: 'john.doe@example.com',
      isDefault: false
    }
  ]);

  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: 'card' as 'card' | 'paypal' | 'bank',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      productName: 'Premium Wireless Headphones',
      price: 199.99,
      status: 'pending',
      paymentStatus: 'unpaid',
      orderDate: '2024-06-24',
      deliveryAddress: '123 Main Street, New York, NY 10001',
      deliveryMethod: 'Standard Delivery'
    },
    {
      id: '2',
      productName: 'Smart Fitness Watch',
      price: 299.99,
      status: 'pending',
      paymentStatus: 'unpaid',
      orderDate: '2024-06-25',
      deliveryAddress: '123 Main Street, New York, NY 10001',
      deliveryMethod: 'Express Delivery'
    },
    {
      id: '3',
      productName: 'Premium Bluetooth Speaker',
      price: 129.99,
      status: 'shipped',
      paymentStatus: 'paid',
      orderDate: '2024-06-20',
      deliveryAddress: '123 Main Street, New York, NY 10001',
      deliveryMethod: 'Express Delivery'
    },
    {
      id: '4',
      productName: 'Smart Home Hub',
      price: 199.99,
      status: 'delivered',
      paymentStatus: 'paid',
      orderDate: '2024-06-15',
      deliveryAddress: '456 Business Ave, New York, NY 10002',
      deliveryMethod: 'Next Day Delivery'
    }
  ]);

  const handleAddPaymentMethod = () => {
    if (!newPaymentMethod.cardNumber || !newPaymentMethod.expiryDate || !newPaymentMethod.cvv || !newPaymentMethod.cardholderName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all payment method fields",
        variant: "destructive"
      });
      return;
    }

    const paymentId = (paymentMethods.length + 1).toString();
    const newPayment: PaymentMethod = {
      id: paymentId,
      type: newPaymentMethod.type,
      name: `${newPaymentMethod.type === 'card' ? 'Card' : 'PayPal'} ending in ${newPaymentMethod.cardNumber.slice(-4)}`,
      details: `**** **** **** ${newPaymentMethod.cardNumber.slice(-4)}`,
      isDefault: paymentMethods.length === 0
    };

    setPaymentMethods([...paymentMethods, newPayment]);
    setSelectedPaymentMethod(paymentId);
    setNewPaymentMethod({ type: 'card', cardNumber: '', expiryDate: '', cvv: '', cardholderName: '' });
    
    toast({
      title: "Payment Method Added",
      description: "New payment method has been saved successfully",
    });
  };

  const handlePayment = (orderId: string) => {
    toast({
      title: "Payment Processing",
      description: "Processing your payment...",
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

  const unpaidOrders = orders.filter(order => order.paymentStatus === 'unpaid');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-black dark:to-purple-900">
      <NavigationHeader isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
      
      <main className="container mx-auto px-4 py-6 pb-20 pt-20 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Orders</h1>
          <p className="text-gray-600 dark:text-gray-300">Track and manage your orders</p>
        </div>

        {/* Quick Payment Section for Unpaid Orders */}
        {unpaidOrders.length > 0 && (
          <Card className="border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-400">
                <Clock className="w-5 h-5" />
                Pending Payments ({unpaidOrders.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-orange-700 dark:text-orange-300 mb-4">
                You have {unpaidOrders.length} order{unpaidOrders.length > 1 ? 's' : ''} waiting for payment.
              </p>
              
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium">Select Payment Method</Label>
                  <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod} className="mt-2">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center space-x-3 p-3 border rounded-lg bg-white dark:bg-gray-800">
                        <RadioGroupItem value={method.id} id={`quick-${method.id}`} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Label htmlFor={`quick-${method.id}`} className="font-medium cursor-pointer">
                              {method.name}
                            </Label>
                            {method.isDefault && <Badge variant="secondary">Default</Badge>}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{method.details}</p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add New Payment Method
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Payment Method</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Select value={newPaymentMethod.type} onValueChange={(value: 'card' | 'paypal' | 'bank') => setNewPaymentMethod({...newPaymentMethod, type: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Payment Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="card">Credit/Debit Card</SelectItem>
                          <SelectItem value="paypal">PayPal</SelectItem>
                          <SelectItem value="bank">Bank Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input 
                        placeholder="Cardholder Name" 
                        value={newPaymentMethod.cardholderName}
                        onChange={(e) => setNewPaymentMethod({...newPaymentMethod, cardholderName: e.target.value})}
                      />
                      <Input 
                        placeholder="Card Number" 
                        value={newPaymentMethod.cardNumber}
                        onChange={(e) => setNewPaymentMethod({...newPaymentMethod, cardNumber: e.target.value})}
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input 
                          placeholder="MM/YY" 
                          value={newPaymentMethod.expiryDate}
                          onChange={(e) => setNewPaymentMethod({...newPaymentMethod, expiryDate: e.target.value})}
                        />
                        <Input 
                          placeholder="CVV" 
                          value={newPaymentMethod.cvv}
                          onChange={(e) => setNewPaymentMethod({...newPaymentMethod, cvv: e.target.value})}
                        />
                      </div>
                      <Button onClick={handleAddPaymentMethod} className="w-full">Save Payment Method</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        )}

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
