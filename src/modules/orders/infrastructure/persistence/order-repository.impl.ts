import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../domain/repositories/order-repository.interface';
import { Order } from '../../domain/entities/order.entity';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb';

@Injectable()
export class OrderRepositoryImpl implements OrderRepository {
  private readonly dynamoDbClient: DynamoDBClient;
  private readonly dynamoDocClient: DynamoDBDocumentClient;
  private readonly tableName = process.env.ORDERS_TABLE;

  constructor() {
    this.dynamoDbClient = new DynamoDBClient({});
    this.dynamoDocClient = DynamoDBDocumentClient.from(this.dynamoDbClient);
  }

  async save(order: Order): Promise<void> {
    const command: PutCommand = new PutCommand({
      TableName: this.tableName,
      Item: {
        orderId: order.orderId,
        userId: order.userId,
        productId: order.productId,
        quantity: order.quantity,
        status: order.status,
      },
    });

    await this.dynamoDocClient.send(command);
  }

  async findById(orderId: string): Promise<Order | null> {
    const command: GetCommand = new GetCommand({
      TableName: this.tableName,
      Key: { orderId },
    });

    const result = await this.dynamoDocClient.send(command);

    if (result.Item) {
      const { userId, productId, quantity, status } = result.Item;
      const order = new Order(userId, productId, quantity);
      order.updateStatus(status);
      return order;
    }

    return null;
  }

  async findByUserId(userId: string): Promise<Order[]> {
    const command: QueryCommand = new QueryCommand({
      TableName: this.tableName,
      IndexName: 'UserIdIndex',
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: { ':userId': userId },
    });

    const result = await this.dynamoDocClient.send(command);

    return result.Items.map(
      (item) =>
        new Order(
          item.userId,
          item.productId,
          item.quantity,
          item.orderId,
          item.status,
        ),
    );
  }
}
