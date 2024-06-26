export class Invoice {
  readonly id: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  subtotal: string;
  tax: number;
  total: number;
  paid: number;   
}
