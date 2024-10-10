import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductApplicationService } from './application/services/product-application.service';
import { ProductRepositoryImpl } from './infrastructure/persistance/product-repository.impl';
import { ProductController } from './presentation/controllers/product.controller';
import { CreateProductHandler } from './application/commands/create-product.handler';

export const CommandHandlers = [CreateProductHandler];

@Module({
  imports: [CqrsModule],
  controllers: [ProductController],
  providers: [
    ProductApplicationService,
    {
      provide: 'IProductRepository',
      useClass: ProductRepositoryImpl,
    },
    ...CommandHandlers,
  ],
})
export class ProductModule {}
