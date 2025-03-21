'use client';

import { usePurchaseStore } from '@/lib/store/purchaseStore';
import { useRouter } from 'next/navigation';

export default function PhoneVerificationPage() {
  const router = useRouter();
  const { phone, errors, setPhone, setErrors, setStep } = usePurchaseStore();

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // In a real application, you would handle phone verification here
      // For now, we'll just proceed to the next step
      setStep(2);
      router.push('/purchase/identity-verification');
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
                className={`w-8 h-8 rounded-full flex items-center justify-center ${index === 0 ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                  } text-white`}
              >
                {index + 1}
              </div>
              {index !== 4 && (
                <div className="flex-1 h-1 mx-2 bg-gray-300 dark:bg-gray-600" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Mobile Phone</label>
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
          </div>
          <div className="flex justify-end">
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