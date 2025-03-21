'use client';

import { usePurchaseStore } from '@/lib/store/purchaseStore';
import { useRouter } from 'next/navigation';

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
                className={`w-8 h-8 rounded-full flex items-center justify-center ${index === 1 ? 'bg-blue-500' : index === 0 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'} text-white`}
              >
                {index === 0 ? '✓' : index + 1}
              </div>
              {index !== 4 && (
                <div className={`flex-1 h-1 mx-2 ${index === 0 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
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
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}