
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import StepByStepCheckout from './StepByStepCheckout';

interface QuickCheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productPrice: number;
}

const QuickCheckout = ({ isOpen, onClose, productName, productPrice }: QuickCheckoutProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Quick Checkout</DialogTitle>
        </DialogHeader>
        <StepByStepCheckout
          productName={productName}
          productPrice={productPrice}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default QuickCheckout;
