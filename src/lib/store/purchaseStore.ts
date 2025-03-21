import { create } from "zustand";

interface InsurancePlan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  recommended?: boolean;
}

interface PurchaseState {
  step: number;
  phone: string;
  verificationCode: string;
  email: string;
  fullName: string;
  identityNumber: string;
  selectedPlan: InsurancePlan | null;
  paymentMethod: string;
  errors: {
    [key: string]: string;
  };
  setStep: (step: number) => void;
  setPhone: (phone: string) => void;
  setVerificationCode: (verificationCode: string) => void;
  setEmail: (email: string) => void;
  setFullName: (fullName: string) => void;
  setIdentityNumber: (identityNumber: string) => void;
  setSelectedPlan: (plan: InsurancePlan | null) => void;
  setPaymentMethod: (method: string) => void;
  setErrors: (errors: { [key: string]: string }) => void;
  reset: () => void;
}

const initialState = {
  step: 1,
  phone: "",
  verificationCode: "",
  email: "",
  fullName: "",
  identityNumber: "",
  selectedPlan: null,
  paymentMethod: "",
  errors: {},
};

export const usePurchaseStore = create<PurchaseState>((set) => ({
  ...initialState,
  setStep: (step) => set({ step }),
  setPhone: (phone) => set({ phone }),
  setVerificationCode: (verificationCode) => set({ verificationCode }),
  setEmail: (email) => set({ email }),
  setFullName: (fullName) => set({ fullName }),
  setIdentityNumber: (identityNumber) => set({ identityNumber }),
  setSelectedPlan: (selectedPlan) => set({ selectedPlan }),
  setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
  setErrors: (errors) => set({ errors }),
  reset: () => set(initialState),
}));
