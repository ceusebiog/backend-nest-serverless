import { Injectable } from '@nestjs/common';
import { OrderRepository } from '../../domain/repositories/order-repository.interface';
import { Order } from '../../domain/entities/order.entity';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

@Injectable()
export class OrderRepositoryImpl implements OrderRepository {
  private readonly tableName = process.env.DYNAMODB_TABLE || 'OrdersTable';

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

    await docClient.send(command);
  }

  async findById(orderId: string): Promise<Order | null> {
    const comand: GetCommand = new GetCommand({
      TableName: this.tableName,
      Key: { orderId },
    });

    const result = await docClient.send(comand);

    if (result.Item) {
      const { userId, productId, quantity, status } = result.Item;
      const order = new Order(userId, productId, quantity);
      order.updateStatus(status);
      return order;
    }

    return null;
  }
}
