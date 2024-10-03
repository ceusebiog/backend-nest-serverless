import { Module } from '@nestjs/common';
import { OrderController } from './presentation/controllers/order.controller';
import { OrderApplicationService } from './application/services/order-application.service';
import { OrderRepositoryImpl } from './infrastructure/persistence/order-repository.impl';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateOrderHandler } from './application/commands/create-order.handler';
import { GetOrderDetailsHandler } from './application/queries/get-order-details.handler';
import { OrderCreatedHandler } from './application/events/order-created.handler';
import { GetOrdersByUserHandler } from './application/queries/get-orders-by-user.handler';

export const CommandHandlers = [CreateOrderHandler];
export const EventHandlers = [OrderCreatedHandler];
export const QueryHandlers = [GetOrderDetailsHandler, GetOrdersByUserHandler];

@Module({
  imports: [CqrsModule],
  controllers: [OrderController],
  providers: [
    OrderApplicationService,
    {
      provide: 'OrderRepository',
      useClass: OrderRepositoryImpl,
    },
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class OrderModule {}
