import { Injectable } from '@nestjs/common';
import { Order } from '../../domain/entities/order.entity';
import { CreateOrderCommand } from '../commands/create-order.command';
import { GetOrderDetailsQuery } from '../queries/get-order-details.query';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Injectable()
export class OrderApplicationService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createOrder(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<void> {
    const command = new CreateOrderCommand(userId, productId, quantity);

    await this.commandBus.execute(command);
  }

  async getOrderDetails(orderId: string): Promise<Order | null> {
    const query = new GetOrderDetailsQuery(orderId);

    return await this.queryBus.execute(query);
  }
}
