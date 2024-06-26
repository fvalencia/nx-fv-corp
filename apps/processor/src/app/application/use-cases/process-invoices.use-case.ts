import {
  Observable,
  concat,
  delay,
  forkJoin,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { Injectable, Logger } from '@nestjs/common';

import { InvoiceApi } from '../../infrastructure/external/invoice.api';
import { InvoiceService } from '../../domain/services/invoice.service';
import { ProcessInvoicesReponse } from '../dto/process-response';
import { ItemService } from '../../domain/services/item.service';

@Injectable()
export class ProcessInvoicesUseCase {
  private readonly logger = new Logger('Service-Processor');

  constructor(
    private readonly invoiceApi: InvoiceApi,
    private readonly invoiceService: InvoiceService,
    private readonly itemService: ItemService
  ) {}

  processInvoices(): Observable<ProcessInvoicesReponse> {
    return this.invoiceApi.getInvoices(20).pipe(
      delay(1000),
      tap(() => this.logger.log('🏁 Starting Processing!')),
      map((response) => response.data),
      switchMap((data) => {
        // Batch storing invoices in database
        const dict = data.reduce(
          (acc, current) => ({
            ...acc,
            [current.invoiceNumber]: current.pages,
          }),
          {}
        );

        const invoices = data.map(
          ({
            invoiceNumber,
            customerName,
            customerEmail,
            subtotal,
            tax,
            total,
            paid,
          }) => ({
            invoiceNumber,
            customerName,
            customerEmail,
            subtotal,
            tax,
            total,
            paid,
          })
        );

        return this.invoiceService
          .saveInvoices(invoices)
          .pipe(
            map((result) =>
              result.map((invoice) => [invoice.id, dict[invoice.invoiceNumber]])
            )
          );
      }),
      tap((tupleIds) => this.logger.log(`Stored invoices: [${tupleIds}]`)),
      tap(() => this.logger.log('👏 Done batch processing invoices')),
      tap(() => this.logger.log('🏁 Starting Invoice Item Fetching!')),
      switchMap((tupleIds: [string, number][]) =>
        // Concat we only one to process one batch at the time.
        concat(
          ...[
            ...tupleIds.map((tup) =>
              this.fetchPagesForInvoiceId(tup[0], tup[1])
            ),
            of({ result: 'Invoices Proccesed' }).pipe(
              tap(() => this.logger.log('👏 Done batch processing invoices'))
            ) as Observable<ProcessInvoicesReponse>,
          ]
        )
      )
    );
  }

  fetchPagesForInvoiceId(
    invoiceId: string,
    numberOfPages: number
  ): Observable<ProcessInvoicesReponse> {
    return of(invoiceId).pipe(
      tap(() => this.logger.log(`👉 Starting processing id: ${invoiceId}`)),
      switchMap(() =>
        // Parallel request of each page for a given invoice
        forkJoin(
          [...Array(numberOfPages).keys()].map((page) =>
            this.invoiceApi.getItemsPerPage(invoiceId, page).pipe(
              delay(1000),
              map((response) => response.data),
              switchMap((data) =>
                this.itemService
                  .saveItems(invoiceId, data)
                  .pipe(map((result) => result.length))
              )
            )
          )
        ).pipe(
          map((results) => results.reduce((acc, current) => acc + current, 0))
        )
      ),
      tap((result) => this.logger.log(`Items added: ${result}`)),
      tap(() => this.logger.log(`👍 Done processing id: ${invoiceId}`)),
      map(() => ({ result: invoiceId }))
    );
  }
}
