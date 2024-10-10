import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ProductApplicationService } from '../../application/services/product-application.service';
import { CreateProductDto } from '../../application/dto/create-product.dto';
import { UpdateProductDto } from '../../application/dto/update-product.dto';

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

  @Patch(':productId')
  async updateProduct(
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    await this.productApplicationServices.updateProduct(
      productId,
      updateProductDto.name,
      updateProductDto.price,
      updateProductDto.stock,
      updateProductDto.description,
    );
  }
}
