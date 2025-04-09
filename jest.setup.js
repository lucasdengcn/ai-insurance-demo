// Import jest-dom extensions for DOM element assertions
import "@testing-library/jest-dom";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => "",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock zustand store
jest.mock("@/lib/store/purchaseStore", () => ({
  usePurchaseStore: jest.fn(() => ({
    step: 1,
    phone: "",
    verificationCode: "",
    email: "",
    fullName: "",
    identityNumber: "",
    selectedPlan: null,
    paymentMethod: "",
    errors: {},
    setStep: jest.fn(),
    setPhone: jest.fn(),
    setVerificationCode: jest.fn(),
    setEmail: jest.fn(),
    setFullName: jest.fn(),
    setIdentityNumber: jest.fn(),
    setSelectedPlan: jest.fn(),
    setPaymentMethod: jest.fn(),
    setErrors: jest.fn(),
    validateCurrentStep: jest.fn().mockReturnValue(true),
    reset: jest.fn(),
  })),
}));
