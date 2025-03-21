export interface UserData {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface PurchaseState {
  selectedPlanId?: string;
  userData?: UserData;
  verificationStatus: {
    identity: boolean;
    phone: boolean;
    payment: boolean;
  };
  paymentDetails?: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
}

export class UserModel implements UserData {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };

  constructor(data: UserData) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.phone = data.phone;
    this.dateOfBirth = data.dateOfBirth;
    this.address = data.address;
  }

  static validate(data: Partial<UserData>): boolean {
    if (!data.firstName || !data.lastName || !data.email) {
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return false;
    }

    if (data.phone) {
      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
      if (!phoneRegex.test(data.phone)) {
        return false;
      }
    }

    return true;
  }

  toJSON(): UserData {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      dateOfBirth: this.dateOfBirth,
      address: this.address,
    };
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

export class PurchaseStateModel implements PurchaseState {
  selectedPlanId?: string;
  userData?: UserData;
  verificationStatus: {
    identity: boolean;
    phone: boolean;
    payment: boolean;
  };
  paymentDetails?: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };

  constructor(data: Partial<PurchaseState> = {}) {
    this.selectedPlanId = data.selectedPlanId;
    this.userData = data.userData;
    this.verificationStatus = data.verificationStatus || {
      identity: false,
      phone: false,
      payment: false,
    };
    this.paymentDetails = data.paymentDetails;
  }

  static validate(data: Partial<PurchaseState>): boolean {
    if (data.userData && !UserModel.validate(data.userData)) {
      return false;
    }

    if (data.paymentDetails) {
      const { cardNumber, expiryDate, cvv } = data.paymentDetails;
      if (!cardNumber || !expiryDate || !cvv) {
        return false;
      }

      const cardRegex = /^[0-9]{13,19}$/;
      const cvvRegex = /^[0-9]{3,4}$/;
      const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;

      if (!cardRegex.test(cardNumber) || !cvvRegex.test(cvv) || !expiryRegex.test(expiryDate)) {
        return false;
      }
    }

    return true;
  }

  isComplete(): boolean {
    return (
      !!this.selectedPlanId &&
      !!this.userData &&
      this.verificationStatus.identity &&
      this.verificationStatus.phone &&
      this.verificationStatus.payment &&
      !!this.paymentDetails
    );
  }

  toJSON(): PurchaseState {
    return {
      selectedPlanId: this.selectedPlanId,
      userData: this.userData,
      verificationStatus: this.verificationStatus,
      paymentDetails: this.paymentDetails,
    };
  }
}
