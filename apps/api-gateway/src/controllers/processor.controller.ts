import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientProxy } from '@nestjs/microservices';
import { timeout } from 'rxjs/operators';

@Controller('processor')
@ApiTags('processor')
export class ProcessorController {
  constructor(
    @Inject('PROCESSOR_SERVICE')
    private readonly processorServiceClient: ClientProxy,
    @Inject('FINANCING_SERVICE')
    private readonly financingServiceClient: ClientProxy
  ) {}

  @Get('/data')
  getData() {
    return this.processorServiceClient
      .send({ cmd: 'start-processor' }, '')
      // .pipe(timeout(5000));
  }
}
