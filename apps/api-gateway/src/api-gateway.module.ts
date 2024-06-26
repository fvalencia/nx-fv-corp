import { Module } from '@nestjs/common';
import { ProcessorController } from './controllers/processor.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [ProcessorController],
  imports: [
    ClientsModule.register([
      {
        name: 'PROCESSOR_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@127.0.0.1:5672/vhost'],
          queue: 'processor-queue',
        },
      },
      {
        name: 'FINANCING_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@127.0.0.1:5672/vhost'],
          queue: 'financing_queue',
        },
      },
    ]),
  ],
})
export class ApiGatewayModule {}
