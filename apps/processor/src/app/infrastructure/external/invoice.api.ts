import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

import { InvoiceDTO } from '../../application/dto/invoice';
import { ItemDTO } from '../../application/dto/item';

@Injectable()
export class InvoiceApi {
  constructor(private readonly httpService: HttpService) {}

  getInvoices(amountOfInvoices: number): Observable<AxiosResponse<InvoiceDTO[]>> {
    return this.httpService.get('http://localhost:3900/invoices', {
      params: {
        quatity: amountOfInvoices,
      },
    });
  }

  getItemsPerPage(invoiceId: string, page: number): Observable<AxiosResponse<ItemDTO[]>> {
    return this.httpService.get(
      `http://localhost:3900/invoices/${invoiceId}/items`,
      {
        params: { page },
      }
    );
  }
}
