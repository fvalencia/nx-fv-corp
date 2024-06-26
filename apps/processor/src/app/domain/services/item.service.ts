import { Injectable } from '@nestjs/common';
import { Observable, from } from 'rxjs';

import { ItemRepository } from '../../infrastructure/database/repositories/item.repository';
import { InvoiceItem } from '../../infrastructure/database/entities/invoice-item.entity';

@Injectable()
export class ItemService {
  constructor(private readonly itemRepository: ItemRepository) {}

  saveItems(invoiceId, items): Observable<InvoiceItem[]> {
    return from(this.itemRepository.batchSave(invoiceId, items))
  }
}
