export interface InsurancePlan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  recommended?: boolean;
}

export class InsurancePlanModel implements InsurancePlan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  recommended?: boolean;

  constructor(data: InsurancePlan) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.features = data.features;
    this.recommended = data.recommended;
  }

  static validate(data: Partial<InsurancePlan>): boolean {
    return (
      typeof data.id === "string" &&
      typeof data.name === "string" &&
      typeof data.description === "string" &&
      typeof data.price === "number" &&
      Array.isArray(data.features) &&
      data.features.every((feature) => typeof feature === "string")
    );
  }

  toJSON(): InsurancePlan {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      features: this.features,
      recommended: this.recommended,
    };
  }
}
