import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from './create-order.command';
import { OrderRepository } from '../../domain/repositories/order-repository.interface';
import { Order } from '../../domain/entities/order.entity';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(command: CreateOrderCommand): Promise<void> {
    const newOrder = new Order(
      command.userId,
      command.productId,
      command.quantity,
    );
    await this.orderRepository.save(newOrder);
  }
}
