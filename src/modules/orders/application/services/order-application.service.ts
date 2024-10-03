import { Injectable } from '@nestjs/common';
import { Order } from '../../domain/entities/order.entity';
import { OrderRepositoryImpl } from '../../infrastructure/persistence/order-repository.imp';
import { CreateOrderCommand } from '../commands/create-order.command';
import { GetOrderDetailsQuery } from '../queries/get-order-details.query';

@Injectable()
export class OrderApplicationService {
  constructor(private readonly orderRepository: OrderRepositoryImpl) {}

  async createOrder(command: CreateOrderCommand): Promise<Order> {
    const newOrder = new Order(
      command.userId,
      command.productId,
      command.quantity,
    );

    await this.orderRepository.save(newOrder);

    return newOrder;
  }

  async getOrderDetails(query: GetOrderDetailsQuery): Promise<Order | null> {
    return await this.orderRepository.findById(query.orderId);
  }
}
