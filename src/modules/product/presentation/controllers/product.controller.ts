import { Body, Controller, Post } from '@nestjs/common';
import { ProductApplicationService } from '../../application/services/product-application.service';
import { CreateProductDto } from '../../application/dto/create-product.dto';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productApplicationServices: ProductApplicationService,
  ) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    await this.productApplicationServices.createProduct(
      createProductDto.name,
      createProductDto.price,
      createProductDto.stock,
      createProductDto.description,
    );
  }
}
