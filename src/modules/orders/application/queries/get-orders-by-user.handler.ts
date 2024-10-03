import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrdersByUserQuery } from './get-orders-by-user.query';
import { Inject } from '@nestjs/common';
import { OrderRepository } from '../../domain/repositories/order-repository.interface';
import { Order } from '../../domain/entities/order.entity';

@QueryHandler(GetOrdersByUserQuery)
export class GetOrdersByUserHandler
  implements IQueryHandler<GetOrdersByUserQuery>
{
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
  ) {}

  async execute(query: GetOrdersByUserQuery): Promise<Order[]> {
    return this.orderRepository.findByUserId(query.userId);
  }
}
