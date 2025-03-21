'use client';

import PurchaseFormContainer from '@/components/purchase/PurchaseFormContainer';
import PurchaseStepper from '@/components/purchase/PurchaseStepper';
import { usePurchaseStore } from '@/lib/store/purchaseStore';
import { useRouter } from 'next/navigation';

export default function ConfirmationPage() {
  const router = useRouter();
  const { fullName, email, selectedPlan, paymentMethod } = usePurchaseStore();

  return (
    <PurchaseFormContainer>
      <PurchaseStepper currentStep={4} />
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Purchase Successful!</h2>
          <p className="text-gray-600 dark:text-gray-300">Thank you for choosing our insurance service.</p>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-medium mb-4">Purchase Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Name</span>
              <span className="font-medium">{fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Email</span>
              <span className="font-medium">{email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Plan ID</span>
              <span className="font-medium">{selectedPlan?.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Monthly Premium</span>
              <span className="font-medium">${selectedPlan?.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Payment Method</span>
              <span className="font-medium">{paymentMethod}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </PurchaseFormContainer>
  );
}