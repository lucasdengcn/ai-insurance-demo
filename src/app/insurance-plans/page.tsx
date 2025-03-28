import Link from "next/link";

interface InsurancePlan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  recommended?: boolean;
}

const insurancePlans: InsurancePlan[] = [
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

export default function InsurancePlans() {
  return (
    <div className="py-8">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Insurance Plans</h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Choose the perfect insurance plan for your needs
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3 lg:gap-x-8">
          {insurancePlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border ${plan.recommended ? 'border-blue-500' : 'border-gray-200 dark:border-gray-700'} bg-white dark:bg-gray-800 p-8 shadow-sm flex flex-col`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 right-8 inline-flex items-center rounded-full bg-blue-500 px-4 py-1 text-sm font-semibold text-white">
                  Recommended
                </div>
              )}

              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{plan.name}</h3>
                <p className="mt-4 text-gray-600 dark:text-gray-300">{plan.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">${plan.price}</span>
                  <span className="text-base font-medium text-gray-500 dark:text-gray-400">/month</span>
                </p>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-6 w-6 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="ml-3 text-base text-gray-600 dark:text-gray-300">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <Link
                  href={`/insurance-plans/${plan.id}`}
                  className={`block w-full rounded-lg px-6 py-3 text-center text-sm font-semibold text-white ${plan.recommended ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600'} transition-colors duration-200`}
                >
                  Get Started
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}