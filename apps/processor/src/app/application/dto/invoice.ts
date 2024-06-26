export interface InvoiceDTO {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  pages: number;
  subtotal: number;
  tax: number;
  total: number;
  paid: boolean;
}
