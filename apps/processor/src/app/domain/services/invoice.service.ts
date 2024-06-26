import { Injectable } from '@nestjs/common';
import { Observable, from } from 'rxjs';

import { InvoiceRepository } from '../../infrastructure/database/repositories/invoice.repository';
import { Invoice } from '../../infrastructure/database/entities/invoice.entity';

@Injectable()
export class InvoiceService {
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  saveInvoices(invoices: Partial<Invoice>[]): Observable<Invoice[]> {
    return from(this.invoiceRepository.batchSave(invoices));
  }
}
