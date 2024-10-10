import { Product } from '../entities/product.entity';

export interface IProductRepository {
  createProduct(product: Product): Promise<void>;
}
