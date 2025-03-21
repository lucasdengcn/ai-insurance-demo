'use client';

import { usePurchaseStore } from '@/lib/store/purchaseStore';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
  const router = useRouter();
  const {
    selectedPlan,
    paymentMethod,
    setPaymentMethod,
    setErrors,
    errors,
    setStep
  } = usePurchaseStore();

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Purchase Insurance</h1>
        <div className="flex justify-between items-center mb-8">
          {['Phone Verification', 'Identity Verification', 'Select Plan', 'Payment', 'Confirmation'].map((step, index) => (
            <div
              key={step}
              className={`flex items-center ${index !== 4 ? 'flex-1' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${index === 3 ? 'bg-blue-500' : index < 3 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                  } text-white`}
              >
                {index < 3 ? '✓' : index + 1}
              </div>
              {index !== 4 && (
                <div className={`flex-1 h-1 mx-2 ${index < 3 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
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

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Previous
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}