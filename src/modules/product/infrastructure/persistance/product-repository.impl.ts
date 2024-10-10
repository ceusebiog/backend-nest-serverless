import { Injectable } from '@nestjs/common';
import { IProductRepository } from '../../domain/reporitories/product.repository';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { Product } from '../../domain/entities/product.entity';

@Injectable()
export class ProductRepositoryImpl implements IProductRepository {
  private readonly dynamoDbClient: DynamoDBClient;
  private readonly dynamoDocClient: DynamoDBDocumentClient;
  private readonly tableName = process.env.PRODUCTS_TABLE;

  constructor() {
    this.dynamoDbClient = new DynamoDBClient({});
    this.dynamoDocClient = DynamoDBDocumentClient.from(this.dynamoDbClient);
  }

  async createProduct(product: Product): Promise<void> {
    const command: PutCommand = new PutCommand({
      TableName: this.tableName,
      Item: {
        productId: product.productId,
        name: product.name,
        price: product.price,
        stock: product.stock,
        description: product.description,
      },
    });

    await this.dynamoDocClient.send(command);
  }
}
