'use client';

import PurchaseFormContainer from '@/components/purchase/PurchaseFormContainer';
import PurchaseNavButtons from '@/components/purchase/PurchaseNavButtons';
import PurchaseStepper from '@/components/purchase/PurchaseStepper';
import { usePurchaseStore } from '@/lib/store/purchaseStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PaymentPage() {
  const router = useRouter();
  const {
    selectedPlan,
    paymentMethod,
    setPaymentMethod,
    setErrors,
    errors,
    setStep,
    validateCurrentStep
  } = usePurchaseStore();

  useEffect(() => {
    setErrors({});
    return () => {
      setErrors({});
    };
  }, [setErrors]);

  const validateForm = (): boolean => {
    return validateCurrentStep();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // In a real application, you would process the payment here
      // For now, we'll just proceed to the confirmation page
      setStep(5);
      router.push('/purchase/confirmation');
    }
  };

  return (
    <PurchaseFormContainer>
      <PurchaseStepper currentStep={3} />
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Select Payment Method</h3>
          <div className="grid gap-4">
            {['Credit Card', 'Debit Card', 'Bank Transfer'].map((method) => (
              <div
                key={method}
                className={`p-4 border rounded-lg cursor-pointer ${paymentMethod === method ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700'}`}
                onClick={() => {
                  setPaymentMethod(method);
                  setErrors({ ...errors, paymentMethod: '' });
                }}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${paymentMethod === method ? 'border-blue-500' : 'border-gray-400'
                    }`}>
                    {paymentMethod === method && (
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <span className="text-lg">{method}</span>
                </div>
              </div>
            ))}
          </div>
          {errors.paymentMethod && (
            <p className="mt-2 text-sm text-red-500">{errors.paymentMethod}</p>
          )}
        </div>

        {paymentMethod && (
          <div className="border-t pt-6">
            <h4 className="text-lg font-medium mb-4">Order Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Plan ID</span>
                <span>{selectedPlan?.id}</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly Premium</span>
                <span>${selectedPlan?.price}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${selectedPlan?.price}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <PurchaseNavButtons onNext={handleSubmit} nextLabel="Pay Now" />
      </form>
    </PurchaseFormContainer>
  );
}