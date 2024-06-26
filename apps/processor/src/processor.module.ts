import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProcessorController } from './app/application/controllers/processor.controller';
import {
  ProcessInvoicesUseCase,
} from './app/application/use-cases/process-invoices.use-case';
import { Invoice } from './app/infrastructure/database/entities/invoice.entity';
import { InvoiceItem } from './app/infrastructure/database/entities/invoice-item.entity';
import { InvoiceRepository } from './app/infrastructure/database/repositories/invoice.repository';
import { ItemRepository } from './app/infrastructure/database/repositories/item.repository';
import { InvoiceService } from './app/domain/services/invoice.service';
import { ItemService } from './app/domain/services/item.service';
import { InvoiceApi } from './app/infrastructure/external/invoice.api';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'processor',
      password: 'jw8s0F4',
      database: 'invoice',
      autoLoadEntities: true,
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Invoice, InvoiceItem]),
    HttpModule,
  ],
  controllers: [ProcessorController],
  providers: [
    ProcessInvoicesUseCase,
    InvoiceService,
    ItemService,
    InvoiceRepository,
    ItemRepository,
    InvoiceApi
  ],
})
export class ProcessorModule {}
