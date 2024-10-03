import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user-repository.interface';
import { User } from '../../domain/entities/user.entity';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
} from '@aws-sdk/lib-dynamodb';

@Injectable()
export class DynamoUserRepository implements UserRepository {
  private readonly dynamoDbClient: DynamoDBClient;
  private readonly dynamoDocClient: DynamoDBDocumentClient;
  private readonly tableName = process.env.USERS_TABLE;

  constructor() {
    this.dynamoDbClient = new DynamoDBClient({});
    this.dynamoDocClient = DynamoDBDocumentClient.from(this.dynamoDbClient);
  }

  async save(user: User): Promise<void> {
    const command = new PutCommand({
      TableName: this.tableName,
      Item: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    await this.dynamoDocClient.send(command);
  }

  async findById(userId: string): Promise<User | null> {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: { userId },
    });
    const result = await this.dynamoDocClient.send(command);

    if (!result.Item) {
      return null;
    }

    return new User(
      result.Item.userId,
      result.Item.name,
      result.Item.email,
      result.Item.password,
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const command = new QueryCommand({
      TableName: this.tableName,
      FilterExpression: 'email = :email',
      ExpressionAttributeValues: { ':email': email },
    });
    const result = await this.dynamoDocClient.send(command);

    if (result.Items?.length === 0) {
      return null;
    }

    const item = result.Items[0];
    return new User(item.userId, item.name, item.email, item.password);
  }

  async deleteById(userId: string): Promise<void> {
    const command = new DeleteCommand({
      TableName: this.tableName,
      Key: { userId },
    });

    await this.dynamoDocClient.send(command);
  }
}
