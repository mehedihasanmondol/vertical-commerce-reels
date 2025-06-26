
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Check, MapPin, Truck, CreditCard, User, Plus, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StepByStepCheckoutProps {
  productName: string;
  productPrice: number;
  onClose: () => void;
}

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

const StepByStepCheckout = ({ productName, productPrice, onClose }: StepByStepCheckoutProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Mock profile data (in real app, this would come from user's profile)
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

  const [selectedAddress, setSelectedAddress] = useState('1');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('1');
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState('1');
  const [paymentChoice, setPaymentChoice] = useState<'now' | 'later'>('later');
  
  // New address form
  const [newAddress, setNewAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: ''
  });

  // New payment method form
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: 'card' as 'card' | 'paypal' | 'bank',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const deliveryMethods = [
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
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handlePlaceOrder();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAddAddress = () => {
    if (!newAddress.name || !newAddress.street || !newAddress.city || !newAddress.state || !newAddress.zipCode) {
      toast({
        title: "Missing Information",
        description: "Please fill in all address fields",
        variant: "destructive"
      });
      return;
    }

    const addressId = (addresses.length + 1).toString();
    const newAddr: Address = {
      id: addressId,
      ...newAddress,
      isDefault: addresses.length === 0
    };

    setAddresses([...addresses, newAddr]);
    setSelectedAddress(addressId);
    setNewAddress({ name: '', street: '', city: '', state: '', zipCode: '' });
    
    toast({
      title: "Address Added",
      description: "New delivery address has been saved to your profile",
    });
  };

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
      description: "New payment method has been saved to your profile",
    });
  };

  const handlePlaceOrder = () => {
    const selectedDelivery = deliveryMethods.find(d => d.id === selectedDeliveryMethod);
    const totalAmount = productPrice + (selectedDelivery?.price || 0);
    
    toast({
      title: "Order Confirmed Successfully!",
      description: `Your order for ${productName} has been confirmed. Total: $${totalAmount.toFixed(2)}`,
    });

    if (paymentChoice === 'now') {
      // Simulate immediate payment process
      setTimeout(() => {
        toast({
          title: "Payment Processing",
          description: "Redirecting to payment gateway...",
        });
      }, 1000);

      setTimeout(() => {
        toast({
          title: "Payment Successful",
          description: "Your payment has been processed successfully!",
        });
      }, 3000);
    } else {
      // Show pay later confirmation
      setTimeout(() => {
        toast({
          title: "Order Saved",
          description: "You can complete payment anytime from your orders page.",
          action: (
            <Button size="sm" onClick={() => navigate('/orders')}>
              View Orders
            </Button>
          ),
        });
      }, 1500);
    }

    onClose();
  };

  const getStepIcon = (step: number) => {
    if (step < currentStep) return <Check className="w-5 h-5" />;
    
    switch (step) {
      case 1: return <User className="w-5 h-5" />;
      case 2: return <MapPin className="w-5 h-5" />;
      case 3: return <Truck className="w-5 h-5" />;
      case 4: return <CreditCard className="w-5 h-5" />;
      default: return <div className="w-5 h-5 rounded-full bg-gray-300" />;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">Customer Information</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Confirm or update your details</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  value={customerInfo.firstName} 
                  onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})} 
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  value={customerInfo.lastName} 
                  onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})} 
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={customerInfo.email} 
                  onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})} 
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone" 
                  value={customerInfo.phone} 
                  onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})} 
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">Delivery Address</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Choose where to deliver your order</p>
            </div>
            <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
              {addresses.map((address) => (
                <div key={address.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <RadioGroupItem value={address.id} id={address.id} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Label htmlFor={address.id} className="font-medium cursor-pointer">
                        {address.name}
                      </Label>
                      {address.isDefault && <Badge variant="secondary">Default</Badge>}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {address.street}, {address.city}, {address.state} {address.zipCode}
                    </p>
                  </div>
                </div>
              ))}
            </RadioGroup>

            {/* Add New Address */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Address
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Delivery Address</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input 
                    placeholder="Address Name (e.g., Home, Office)" 
                    value={newAddress.name}
                    onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                  />
                  <Input 
                    placeholder="Street Address" 
                    value={newAddress.street}
                    onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input 
                      placeholder="City" 
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                    />
                    <Input 
                      placeholder="State" 
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                    />
                  </div>
                  <Input 
                    placeholder="ZIP Code" 
                    value={newAddress.zipCode}
                    onChange={(e) => setNewAddress({...newAddress, zipCode: e.target.value})}
                  />
                  <Button onClick={handleAddAddress} className="w-full">Save Address</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">Delivery Method</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Choose your preferred delivery option</p>
            </div>
            <RadioGroup value={selectedDeliveryMethod} onValueChange={setSelectedDeliveryMethod}>
              {deliveryMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <RadioGroupItem value={method.id} id={method.id} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={method.id} className="font-medium cursor-pointer">
                          {method.name}
                        </Label>
                        {method.isDefault && <Badge variant="secondary">Recommended</Badge>}
                      </div>
                      <span className="font-semibold">${method.price.toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{method.estimatedDays}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>

            {/* Order Summary */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-semibold mb-3">Order Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{productName}</span>
                  <span>${productPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>${deliveryMethods.find(d => d.id === selectedDeliveryMethod)?.price.toFixed(2)}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${(productPrice + (deliveryMethods.find(d => d.id === selectedDeliveryMethod)?.price || 0)).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">Payment Options</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Choose when to complete your payment</p>
            </div>
            
            {/* Payment Timing Choice */}
            <div className="space-y-4 mb-6">
              <RadioGroup value={paymentChoice} onValueChange={(value: 'now' | 'later') => setPaymentChoice(value)}>
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <RadioGroupItem value="later" id="later" />
                  <div className="flex-1">
                    <Label htmlFor="later" className="font-medium cursor-pointer flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Pay Later
                    </Label>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Confirm order now, complete payment anytime</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <RadioGroupItem value="now" id="now" />
                  <div className="flex-1">
                    <Label htmlFor="now" className="font-medium cursor-pointer flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Pay Now
                    </Label>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Complete payment immediately</p>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Payment Method Selection (only show if Pay Now is selected) */}
            {paymentChoice === 'now' && (
              <>
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Select Payment Method</h4>
                  <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                        <RadioGroupItem value={method.id} id={method.id} />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Label htmlFor={method.id} className="font-medium cursor-pointer">
                              {method.name}
                            </Label>
                            {method.isDefault && <Badge variant="secondary">Default</Badge>}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{method.details}</p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>

                  {/* Add New Payment Method */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full mt-3">
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
              </>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step <= currentStep 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}>
              {getStepIcon(step)}
            </div>
            {step < 4 && (
              <div className={`w-8 h-1 mx-2 ${
                step < currentStep ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            Step {currentStep} of {totalSteps}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={currentStep === 1 ? onClose : handlePrevious}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              {currentStep === 1 ? 'Cancel' : 'Previous'}
            </Button>
            
            <Button
              onClick={handleNext}
              className="flex items-center gap-2"
            >
              {currentStep === totalSteps ? 'Confirm Order' : 'Next'}
              {currentStep < totalSteps && <ChevronRight className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StepByStepCheckout;
