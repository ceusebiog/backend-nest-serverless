import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateProductCommand } from '../commands/create-product.command';
import { UpdateProductCommand } from '../commands/update-product.command';

@Injectable()
export class ProductApplicationService {
  constructor(private readonly commandBus: CommandBus) {}

  async createProduct(
    name: string,
    price: number,
    stock: number,
    description?: string,
  ): Promise<void> {
    const command = new CreateProductCommand(name, price, stock, description);

    await this.commandBus.execute(command);
  }

  async updateProduct(
    productId: string,
    name: string,
    price: number,
    stock: number,
    description?: string,
  ): Promise<void> {
    const command = new UpdateProductCommand(
      productId,
      name,
      price,
      stock,
      description,
    );

    await this.commandBus.execute(command);
  }
}
