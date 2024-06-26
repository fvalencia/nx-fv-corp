import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { InvoiceItem } from '../entities/invoice-item.entity';

@Injectable()
export class ItemRepository extends Repository<InvoiceItem> {
  constructor(
    @InjectRepository(InvoiceItem)
    repository: Repository<InvoiceItem>
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  batchSave(invoiceId: string, data: Partial<InvoiceItem[]>): Promise<InvoiceItem[]> {
    return this.save(
      this.create(
        data.map((item) => ({
          invoice: { id: invoiceId },
          name: item.name,
          quantity: item.quantity,
          subtotal: item.subtotal,
          price: item.price,
        }))
      )
    );
  }
}
