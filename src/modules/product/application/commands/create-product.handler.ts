import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from './create-product.command';
import { Inject } from '@nestjs/common';
import { IProductRepository } from '../../domain/reporitories/product.repository';
import { Product } from '../../domain/entities/product.entity';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    @Inject('IProductRepository')
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(command: CreateProductCommand): Promise<void> {
    const newProduct = new Product(
      command.name,
      command.price,
      command.stock,
      command.description,
    );

    await this.productRepository.createProduct(newProduct);
  }
}
