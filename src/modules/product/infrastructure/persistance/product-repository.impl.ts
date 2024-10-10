import { Injectable } from '@nestjs/common';
import { IProductRepository } from '../../domain/reporitories/product.repository';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
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

  async updateProduct(
    productId: string,
    params: Record<string, any>,
  ): Promise<any> {
    let updateExpression: string = '';
    let expressionAttributeValues: Record<string, any> = {};
    let isFirst: boolean = true;

    for (const p in params) {
      if (isFirst) {
        updateExpression = 'set ';
        isFirst = false;
      } else updateExpression += ', ';

      updateExpression += `${p} = :{p}`;
      expressionAttributeValues[`:${p}`] = params[p];
    }

    const command: UpdateCommand = new UpdateCommand({
      TableName: this.tableName,
      Key: { productId },
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
    });

    await this.dynamoDocClient.send(command);
  }
}
