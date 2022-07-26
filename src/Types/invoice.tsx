export type InvoiceStatus = "paid" | "pending" | "draft" | "editDraft" | "";

export interface CheckedStatus {
  id: number;
  text: string;
  name: "paid" | "pending" | "draft";
  checked: boolean;
}

export type PaymentTerms = 1 | 7 | 14 | 30;
export interface Invoice {
  id: string;
  createdAt: string;
  timestamp?: Date;
  createdBy?: string;
  documentId?: string;
  paymentDue: string;
  paymentTerms: PaymentTerms;
  description: string;
  clientName: string;
  clientEmail: string;
  status: InvoiceStatus;
  senderAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  clientAddress: {
    street: string;
    city: string;
    postCode: string;
    country: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
}


