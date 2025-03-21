'use client';

import PurchaseFormContainer from '@/components/purchase/PurchaseFormContainer';
import PurchaseNavButtons from '@/components/purchase/PurchaseNavButtons';
import PurchaseStepper from '@/components/purchase/PurchaseStepper';
import { usePurchaseStore } from '@/lib/store/purchaseStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PhoneVerificationPage() {
  const router = useRouter();
  const {
    phone,
    verificationCode,
    errors,
    setPhone,
    setVerificationCode,
    setErrors,
    setStep,
    reset
  } = usePurchaseStore();

  useEffect(() => {
    setErrors({});
    return () => {
      setErrors({});
    };
  }, [setErrors]);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!phone) {
      newErrors.phone = 'Phone number is required';
    }

    if (!verificationCode) {
      newErrors.verificationCode = 'Verification code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // In a real application, you would verify the code here
      // For now, we'll just proceed to the next step
      setStep(2);
      router.push('/purchase/identity-verification');
    }
  };

  return (
    <PurchaseFormContainer>
      <PurchaseStepper currentStep={0} />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <input
            type="tel"
            className={`w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 ${errors.phone ? 'border-red-500' : ''}`}
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setErrors({ ...errors, phone: '' });
            }}
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Verification Code</label>
          <input
            type="text"
            className={`w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 ${errors.verificationCode ? 'border-red-500' : ''}`}
            value={verificationCode}
            onChange={(e) => {
              setVerificationCode(e.target.value);
              setErrors({ ...errors, verificationCode: '' });
            }}
            placeholder="Enter verification code"
          />
          {errors.verificationCode && (
            <p className="mt-1 text-sm text-red-500">{errors.verificationCode}</p>
          )}
        </div>

        <PurchaseNavButtons
          onNext={handleSubmit}
          showPrevious={false}
        />
      </form>
    </PurchaseFormContainer>
  );
}