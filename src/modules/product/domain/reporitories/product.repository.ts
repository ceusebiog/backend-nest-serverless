import { Product } from '../entities/product.entity';

export interface IProductRepository {
  createProduct(product: Product): Promise<void>;
  updateProduct(productId: string, params: Record<string, any>): Promise<void>;
}
