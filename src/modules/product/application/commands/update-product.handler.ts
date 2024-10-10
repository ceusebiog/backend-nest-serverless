import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductCommand } from './update-product.command';
import { Inject } from '@nestjs/common';
import { IProductRepository } from '../../domain/reporitories/product.repository';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler
  implements ICommandHandler<UpdateProductCommand>
{
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(command: UpdateProductCommand): Promise<void> {
    const { productId, name, price, stock, description } = command;
    let params: Record<string, any> = {};

    if (name) params['name'] = name;
    if (price) params['price'] = price;
    if (stock) params['stock'] = stock;
    if (description) params['description'] = description;

    await this.productRepository.updateProduct(productId, params);
  }
}
