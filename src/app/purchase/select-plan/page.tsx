'use client';

import { usePurchaseStore } from '@/lib/store/purchaseStore';
import { useRouter } from 'next/navigation';

const insurancePlans = [
  {
    id: "basic",
    name: "Basic Coverage",
    description: "Essential protection for individuals and small families",
    price: 99.99,
    features: [
      "Personal liability coverage",
      "Property damage protection",
      "24/7 customer support",
      "Mobile app access"
    ]
  },
  {
    id: "premium",
    name: "Premium Coverage",
    description: "Comprehensive coverage with enhanced benefits",
    price: 199.99,
    features: [
      "All Basic Coverage features",
      "Extended liability coverage",
      "Natural disaster protection",
      "Emergency medical expenses",
      "Priority claims processing"
    ],
    recommended: true
  },
  {
    id: "business",
    name: "Business Coverage",
    description: "Complete protection for your business operations",
    price: 299.99,
    features: [
      "All Premium Coverage features",
      "Business interruption coverage",
      "Cyber liability protection",
      "Employee coverage",
      "Professional liability insurance",
      "Custom risk assessment"
    ]
  }
];

export default function SelectPlanPage() {
  const router = useRouter();
  const { selectedPlan, setSelectedPlan, setStep, setErrors, errors } = usePurchaseStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) {
      setErrors({ plan: 'Please select an insurance plan' });
      return;
    }

    setStep(4);
    router.push('/purchase/payment');
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
                className={`w-8 h-8 rounded-full flex items-center justify-center ${index === 2 ? 'bg-blue-500' : index < 2 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                  } text-white`}
              >
                {index < 2 ? '✓' : index + 1}
              </div>
              {index !== 4 && (
                <div className={`flex-1 h-1 mx-2 ${index < 2 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6">
            {insurancePlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative p-6 border rounded-lg cursor-pointer transition-all ${selectedPlan?.id === plan.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700'
                  }`}
                onClick={() => {
                  setSelectedPlan(plan);
                  setErrors({});
                }}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 right-8 inline-flex items-center rounded-full bg-blue-500 px-4 py-1 text-sm font-semibold text-white">
                    Recommended
                  </div>
                )}
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{plan.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">{plan.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">${plan.price}</p>
                    <p className="text-sm text-gray-500">/month</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {errors.plan && (
            <p className="text-sm text-red-500">{errors.plan}</p>
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
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}