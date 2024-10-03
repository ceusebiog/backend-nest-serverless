import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrderDTO } from '../../application/dto/create-order.dto';
import { OrderApplicationService } from '../../application/services/order-application.service';
import { CreateOrderCommand } from '../../application/commands/create-order.command';
import { GetOrderDetailsQuery } from '../../application/queries/get-order-details.query';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderApplicationService: OrderApplicationService,
  ) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDTO) {
    const command = new CreateOrderCommand(
      createOrderDto.userId,
      createOrderDto.productId,
      createOrderDto.quantity,
    );
    const result = await this.orderApplicationService.createOrder(command);
    return result;
  }

  @Get(':orderId')
  async getOrderDetails(@Param('orderId') orderId: string) {
    const query = new GetOrderDetailsQuery(orderId);
    const result = await this.orderApplicationService.getOrderDetails(query);
    return result;
  }
}
