export interface Claim {
  id: string;
  userId: string;
  policyId: string;
  type: "medical" | "property" | "liability";
  status: "pending" | "reviewing" | "approved" | "rejected";
  description: string;
  amount: number;
  documents?: string[];
  createdAt: number;
  updatedAt: number;
}

export class ClaimModel implements Claim {
  id: string;
  userId: string;
  policyId: string;
  type: "medical" | "property" | "liability";
  status: "pending" | "reviewing" | "approved" | "rejected";
  description: string;
  amount: number;
  documents?: string[];
  createdAt: number;
  updatedAt: number;

  constructor(data: Claim) {
    this.id = data.id;
    this.userId = data.userId;
    this.policyId = data.policyId;
    this.type = data.type;
    this.status = data.status;
    this.description = data.description;
    this.amount = data.amount;
    this.documents = data.documents;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  static validate(data: Partial<Claim>): boolean {
    if (
      !data.userId ||
      !data.policyId ||
      !data.type ||
      !data.description ||
      typeof data.amount !== "number"
    ) {
      return false;
    }

    if (!["medical", "property", "liability"].includes(data.type)) {
      return false;
    }

    if (data.status && !["pending", "reviewing", "approved", "rejected"].includes(data.status)) {
      return false;
    }

    if (data.amount <= 0) {
      return false;
    }

    if (data.documents && !Array.isArray(data.documents)) {
      return false;
    }

    return true;
  }

  toJSON(): Claim {
    return {
      id: this.id,
      userId: this.userId,
      policyId: this.policyId,
      type: this.type,
      status: this.status,
      description: this.description,
      amount: this.amount,
      documents: this.documents,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  updateStatus(newStatus: Claim["status"]): void {
    this.status = newStatus;
    this.updatedAt = Date.now();
  }

  addDocument(documentPath: string): void {
    if (!this.documents) {
      this.documents = [];
    }
    this.documents.push(documentPath);
    this.updatedAt = Date.now();
  }

  removeDocument(documentPath: string): void {
    if (this.documents) {
      this.documents = this.documents.filter((doc) => doc !== documentPath);
      this.updatedAt = Date.now();
    }
  }
}
