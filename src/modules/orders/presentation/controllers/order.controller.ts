import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateOrderDTO } from '../../application/dto/create-order.dto';
import { OrderApplicationService } from '../../application/services/order-application.service';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderApplicationService: OrderApplicationService,
  ) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDTO) {
    await this.orderApplicationService.createOrder(
      createOrderDto.userId,
      createOrderDto.productId,
      createOrderDto.quantity,
    );
  }

  @Get(':orderId')
  async getOrderDetails(@Param('orderId') orderId: string) {
    return await this.orderApplicationService.getOrderDetails(orderId);
  }
}
