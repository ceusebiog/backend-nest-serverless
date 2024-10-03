import { Module } from '@nestjs/common';
import { OrderController } from './presentation/controllers/order.controller';
import { OrderApplicationService } from './application/services/order-application.service';
import { OrderRepositoryImpl } from './infrastructure/persistence/order-repository.imp';

@Module({
  controllers: [OrderController],
  providers: [OrderApplicationService, OrderRepositoryImpl],
})
export class OrderModule {}
