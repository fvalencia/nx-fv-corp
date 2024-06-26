import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ProcessorModule } from './processor.module';

async function bootstrap() {
  const logger = new Logger('Service-Processor');
  const app = await NestFactory.createMicroservice(ProcessorModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@127.0.0.1:5672/vhost'],
      queue: 'processor-queue',
      queueOptios: {
        durable: true
      }
    }
  });

  app.listen();
  logger.log(`🚀 Processor is up and running ...`);
}

bootstrap();
