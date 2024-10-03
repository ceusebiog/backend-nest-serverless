import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrderDetailsQuery } from './get-order-details.query';
import { OrderRepository } from '../../domain/repositories/order-repository.interface';
import { Order } from '../../domain/entities/order.entity';
import { Inject } from '@nestjs/common';

@QueryHandler(GetOrderDetailsQuery)
export class GetOrderDetailsHandler
  implements IQueryHandler<GetOrderDetailsQuery>
{
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepository: OrderRepository,
  ) {}

  async execute(query: GetOrderDetailsQuery): Promise<Order | null> {
    return await this.orderRepository.findById(query.orderId);
  }
}
