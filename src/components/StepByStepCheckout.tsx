
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Check, MapPin, Truck, CreditCard, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface StepByStepCheckoutProps {
  productName: string;
  productPrice: number;
  onClose: () => void;
}

const StepByStepCheckout = ({ productName, productPrice, onClose }: StepByStepCheckoutProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Mock profile data (in real app, this would come from user's profile)
  const [customerInfo, setCustomerInfo] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567'
  });

  const [selectedAddress, setSelectedAddress] = useState('1');
  const addresses = [
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
  ];

  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState('1');
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

  const handlePlaceOrder = () => {
    const selectedDelivery = deliveryMethods.find(d => d.id === selectedDeliveryMethod);
    const totalAmount = productPrice + (selectedDelivery?.price || 0);
    
    toast({
      title: "Order Placed Successfully!",
      description: `Your order for ${productName} has been placed. Total: $${totalAmount.toFixed(2)}`,
    });

    // Simulate order creation and show payment suggestion
    setTimeout(() => {
      toast({
        title: "Payment Suggestion",
        description: "Would you like to pay now or pay later?",
        action: (
          <div className="flex gap-2">
            <Button size="sm" onClick={() => navigate('/orders')}>
              Pay Later
            </Button>
            <Button size="sm" variant="outline" onClick={() => {
              toast({
                title: "Payment Initiated",
                description: "Redirecting to payment gateway...",
              });
            }}>
              Pay Now
            </Button>
          </div>
        ),
      });
    }, 1500);

    onClose();
  };

  const getStepIcon = (step: number) => {
    if (step < currentStep) return <Check className="w-5 h-5" />;
    
    switch (step) {
      case 1: return <User className="w-5 h-5" />;
      case 2: return <MapPin className="w-5 h-5" />;
      case 3: return <Truck className="w-5 h-5" />;
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

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              step <= currentStep 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}>
              {getStepIcon(step)}
            </div>
            {step < 3 && (
              <div className={`w-12 h-1 mx-2 ${
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
              {currentStep === totalSteps ? 'Place Order' : 'Next'}
              {currentStep < totalSteps && <ChevronRight className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StepByStepCheckout;
