import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ProcessInvoicesUseCase } from '../use-cases/process-invoices.use-case';
import { ProcessInvoicesReponse } from '../dto/process-response';

@Controller()
export class ProcessorController {
  constructor(
    private readonly processInvoicesUseCase: ProcessInvoicesUseCase
  ) {}

  @MessagePattern({ cmd: 'start-processor' })
  startProcessor(): Observable<ProcessInvoicesReponse> {
    return this.processInvoicesUseCase.processInvoices();
  }
}
