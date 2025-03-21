'use client';

interface PurchaseStepperProps {
  currentStep: number;
}

const steps = [
  'Phone Verification',
  'Identity Verification',
  'Select Plan',
  'Payment',
  'Confirmation'
];

export default function PurchaseStepper({ currentStep }: PurchaseStepperProps) {
  return (
    <div className="flex justify-between items-center mb-8">
      {steps.map((step, index) => (
        <div
          key={step}
          className={`flex items-center ${index !== 4 ? 'flex-1' : ''}`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center 
              ${index === currentStep ? 'bg-blue-500' :
                index < currentStep ? 'bg-green-500' :
                  'bg-gray-300 dark:bg-gray-600'
              } text-white`}
          >
            {index < currentStep ? '✓' : index + 1}
          </div>
          {index !== 4 && (
            <div
              className={`flex-1 h-1 mx-2 
                ${index < currentStep ? 'bg-green-500' :
                  'bg-gray-300 dark:bg-gray-600'
                }`
              }
            />
          )}
        </div>
      ))}
    </div>
  );
}