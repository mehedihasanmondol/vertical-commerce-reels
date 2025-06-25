import { useState } from 'react';
import { NavigationHeader } from '@/components/NavigationHeader';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, MapPin, CreditCard, Truck } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank';
  name: string;
  details: string;
  isDefault: boolean;
}

interface DeliveryMethod {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
  isDefault: boolean;
}

const Profile = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567'
  });

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: 'Home',
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      isDefault: true
    },
    {
      id: '2',
      name: 'Office',
      street: '456 Business Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      isDefault: false
    }
  ]);

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

  const [deliveryMethods, setDeliveryMethods] = useState<DeliveryMethod[]>([
    {
      id: '1',
      name: 'Standard Delivery',
      price: 5.99,
      estimatedDays: '3-5 business days',
      isDefault: true
    },
    {
      id: '2',
      name: 'Express Delivery',
      price: 12.99,
      estimatedDays: '1-2 business days',
      isDefault: false
    },
    {
      id: '3',
      name: 'Next Day Delivery',
      price: 24.99,
      estimatedDays: 'Next business day',
      isDefault: false
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-black dark:to-purple-900">
      <NavigationHeader isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
      
      <main className="container mx-auto px-4 py-6 pb-20 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Profile</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your account and preferences</p>
        </div>

        {/* Customer Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400 font-semibold">CI</span>
              </div>
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" value={customerInfo.firstName} onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})} />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" value={customerInfo.lastName} onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={customerInfo.email} onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})} />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={customerInfo.phone} onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delivery Addresses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                Delivery Addresses
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Address
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Address</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input placeholder="Address Name (e.g., Home, Office)" />
                    <Input placeholder="Street Address" />
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="City" />
                      <Input placeholder="State" />
                    </div>
                    <Input placeholder="ZIP Code" />
                    <Button className="w-full">Save Address</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {addresses.map((address) => (
              <div key={address.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{address.name}</h3>
                    {address.isDefault && <Badge variant="secondary">Default</Badge>}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {address.street}, {address.city}, {address.state} {address.zipCode}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                Payment Methods
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Payment
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Payment Method</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Payment Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="card">Credit/Debit Card</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input placeholder="Card Number" />
                    <div className="grid grid-cols-2 gap-2">
                      <Input placeholder="MM/YY" />
                      <Input placeholder="CVV" />
                    </div>
                    <Button className="w-full">Save Payment Method</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{method.name}</h3>
                    {method.isDefault && <Badge variant="secondary">Default</Badge>}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{method.details}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Delivery Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              Preferred Delivery Methods
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {deliveryMethods.map((method) => (
              <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{method.name}</h3>
                    {method.isDefault && <Badge variant="secondary">Default</Badge>}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    ${method.price.toFixed(2)} - {method.estimatedDays}
                  </p>
                </div>
                <Button 
                  size="sm" 
                  variant={method.isDefault ? "default" : "outline"}
                  onClick={() => {
                    setDeliveryMethods(prev => prev.map(m => ({
                      ...m,
                      isDefault: m.id === method.id
                    })));
                  }}
                >
                  {method.isDefault ? "Default" : "Set Default"}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Profile;
