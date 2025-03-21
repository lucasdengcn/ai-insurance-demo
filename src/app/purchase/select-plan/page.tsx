'use client';

import PurchaseFormContainer from '@/components/purchase/PurchaseFormContainer';
import PurchaseNavButtons from '@/components/purchase/PurchaseNavButtons';
import PurchaseStepper from '@/components/purchase/PurchaseStepper';
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
    <PurchaseFormContainer>
      <PurchaseStepper currentStep={2} />
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

        <PurchaseNavButtons onNext={handleSubmit} />
      </form>
    </PurchaseFormContainer>
  );
}