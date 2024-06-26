import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { Invoice } from '../entities/invoice.entity';

@Injectable()
export class InvoiceRepository extends Repository<Invoice> {
  constructor(
    @InjectRepository(Invoice)
    private readonly repository: Repository<Invoice>
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  batchSave(data: Partial<Invoice>[]): Promise<Invoice[]> {
    return this.save(
      this.create(
        data.map((row) => ({
          invoiceNumber: row.invoiceNumber,
          customerName: row.customerName,
          customerEmail: row.customerEmail,
          subtotal: row.subtotal,
          tax: row.tax,
          total: row.total,
          paid: row.paid,
        }))
      )
    );
  }
}
