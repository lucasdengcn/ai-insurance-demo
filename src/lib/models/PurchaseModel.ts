export interface InsurancePlan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  recommended?: boolean;
}

export interface PurchaseData {
  step: number;
  phone: string;
  verificationCode: string;
  email: string;
  fullName: string;
  identityNumber: string;
  selectedPlan: InsurancePlan | null;
  paymentMethod: string;
  errors: { [key: string]: string };
}

export class PurchaseModel implements PurchaseData {
  step: number;
  phone: string;
  verificationCode: string;
  email: string;
  fullName: string;
  identityNumber: string;
  selectedPlan: InsurancePlan | null;
  paymentMethod: string;
  errors: { [key: string]: string };

  constructor(data: Partial<PurchaseData> = {}) {
    this.step = data.step || 1;
    this.phone = data.phone || "";
    this.verificationCode = data.verificationCode || "";
    this.email = data.email || "";
    this.fullName = data.fullName || "";
    this.identityNumber = data.identityNumber || "";
    this.selectedPlan = data.selectedPlan || null;
    this.paymentMethod = data.paymentMethod || "";
    this.errors = data.errors || {};
  }

  static validate(data: Partial<PurchaseData>): { [key: string]: string } {
    const errors: { [key: string]: string } = {};

    if (data.phone !== undefined && !data.phone) {
      errors.phone = "Phone number is required";
    }

    if (data.verificationCode !== undefined && !data.verificationCode) {
      errors.verificationCode = "Verification code is required";
    }

    if (data.fullName !== undefined && !data.fullName) {
      errors.fullName = "Full name is required";
    }

    if (data.email !== undefined) {
      if (!data.email) {
        errors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = "Please enter a valid email address";
      }
    }

    if (data.identityNumber !== undefined && !data.identityNumber) {
      errors.identityNumber = "Identity number is required";
    }

    return errors;
  }

  validateCurrentStep(): boolean {
    let fieldsToValidate: Partial<PurchaseData> = {};

    switch (this.step) {
      case 1:
        fieldsToValidate = {
          phone: this.phone,
          verificationCode: this.verificationCode,
        };
        break;
      case 2:
        fieldsToValidate = {
          fullName: this.fullName,
          email: this.email,
          identityNumber: this.identityNumber,
        };
        break;
      case 3:
        fieldsToValidate = {
          selectedPlan: this.selectedPlan,
        };
        break;
      case 4:
        fieldsToValidate = {
          paymentMethod: this.paymentMethod,
        };
        break;
    }

    const errors = PurchaseModel.validate(fieldsToValidate);
    this.errors = errors;
    return Object.keys(errors).length === 0;
  }

  toJSON(): PurchaseData {
    return {
      step: this.step,
      phone: this.phone,
      verificationCode: this.verificationCode,
      email: this.email,
      fullName: this.fullName,
      identityNumber: this.identityNumber,
      selectedPlan: this.selectedPlan,
      paymentMethod: this.paymentMethod,
      errors: this.errors,
    };
  }

  reset(): void {
    this.step = 1;
    this.phone = "";
    this.verificationCode = "";
    this.email = "";
    this.fullName = "";
    this.identityNumber = "";
    this.selectedPlan = null;
    this.paymentMethod = "";
    this.errors = {};
  }
}
