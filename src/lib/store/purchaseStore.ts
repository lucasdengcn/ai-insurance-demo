import { create } from "zustand";
import { PurchaseModel, type PurchaseData } from "../models/PurchaseModel";

interface PurchaseState extends PurchaseData {
  setStep: (step: number) => void;
  setPhone: (phone: string) => void;
  setVerificationCode: (verificationCode: string) => void;
  setEmail: (email: string) => void;
  setFullName: (fullName: string) => void;
  setIdentityNumber: (identityNumber: string) => void;
  setSelectedPlan: (plan: PurchaseData["selectedPlan"]) => void;
  setPaymentMethod: (method: string) => void;
  setErrors: (errors: PurchaseData["errors"]) => void;
  validateCurrentStep: () => boolean;
  reset: () => void;
}

const purchaseModel = new PurchaseModel();

export const usePurchaseStore = create<PurchaseState>((set) => ({
  ...purchaseModel.toJSON(),
  setStep: (step) => {
    purchaseModel.step = step;
    set(purchaseModel.toJSON());
  },
  setPhone: (phone) => {
    purchaseModel.phone = phone;
    set(purchaseModel.toJSON());
  },
  setVerificationCode: (verificationCode) => {
    purchaseModel.verificationCode = verificationCode;
    set(purchaseModel.toJSON());
  },
  setEmail: (email) => {
    purchaseModel.email = email;
    set(purchaseModel.toJSON());
  },
  setFullName: (fullName) => {
    purchaseModel.fullName = fullName;
    set(purchaseModel.toJSON());
  },
  setIdentityNumber: (identityNumber) => {
    purchaseModel.identityNumber = identityNumber;
    set(purchaseModel.toJSON());
  },
  setSelectedPlan: (selectedPlan) => {
    purchaseModel.selectedPlan = selectedPlan;
    set(purchaseModel.toJSON());
  },
  setPaymentMethod: (paymentMethod) => {
    purchaseModel.paymentMethod = paymentMethod;
    set(purchaseModel.toJSON());
  },
  setErrors: (errors) => {
    purchaseModel.errors = errors;
    set(purchaseModel.toJSON());
  },
  validateCurrentStep: () => {
    const isValid = purchaseModel.validateCurrentStep();
    set(purchaseModel.toJSON());
    return isValid;
  },
  reset: () => {
    purchaseModel.reset();
    set(purchaseModel.toJSON());
  },
}));
