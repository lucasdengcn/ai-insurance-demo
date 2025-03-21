'use client';

import PurchaseFormContainer from '@/components/purchase/PurchaseFormContainer';
import PurchaseNavButtons from '@/components/purchase/PurchaseNavButtons';
import PurchaseStepper from '@/components/purchase/PurchaseStepper';
import { usePurchaseStore } from '@/lib/store/purchaseStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function IdentityVerificationPage() {
  const router = useRouter();
  const {
    fullName,
    email,
    identityNumber,
    errors,
    setFullName,
    setEmail,
    setIdentityNumber,
    setErrors,
    setStep
  } = usePurchaseStore();

  useEffect(() => {
    setErrors({});
    return () => {
      setErrors({});
    };
  }, [setErrors]);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName) {
      newErrors.fullName = 'Full name is required';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!identityNumber) {
      newErrors.identityNumber = 'Identity number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // In a real application, you would verify the identity here
      // For now, we'll just proceed to the next step
      setStep(3);
      router.push('/purchase/select-plan');
    }
  };

  return (
    <PurchaseFormContainer>
      <PurchaseStepper currentStep={1} />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            type="text"
            className={`w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 ${errors.fullName ? 'border-red-500' : ''}`}
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              setErrors({ ...errors, fullName: '' });
            }}
            placeholder="Enter your full name"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            className={`w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 ${errors.email ? 'border-red-500' : ''}`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({ ...errors, email: '' });
            }}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Identity Number</label>
          <input
            type="text"
            className={`w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 ${errors.identityNumber ? 'border-red-500' : ''}`}
            value={identityNumber}
            onChange={(e) => {
              setIdentityNumber(e.target.value);
              setErrors({ ...errors, identityNumber: '' });
            }}
            placeholder="Enter your identity number"
          />
          {errors.identityNumber && (
            <p className="mt-1 text-sm text-red-500">{errors.identityNumber}</p>
          )}
        </div>

        <PurchaseNavButtons onNext={handleSubmit} />
      </form>
    </PurchaseFormContainer>
  );
}