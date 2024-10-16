import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  QueryCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { Injectable } from '@nestjs/common';
import { AuthRepository } from '../../domain/repositories/auth-repository.interface';

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {
  private readonly dynamoDbClient: DynamoDBClient;
  private readonly dynamoDocClient: DynamoDBDocumentClient;
  private readonly tableName = process.env.USERS_TABLE;

  constructor() {
    this.dynamoDbClient = new DynamoDBClient({});
    this.dynamoDocClient = DynamoDBDocumentClient.from(this.dynamoDbClient);
  }

  async findByEmail(
    email: string,
  ): Promise<{ userId: string; password: string } | null> {
    const command = new QueryCommand({
      TableName: this.tableName,
      IndexName: 'EmailIndex',
      KeyConditionExpression: 'email = :email',
      ExpressionAttributeValues: { ':email': email },
      ProjectionExpression: 'userId, password',
    });
    const result = await this.dynamoDocClient.send(command);

    if (result.Items?.length === 0) {
      return null;
    }

    const item = result.Items[0];
    return { userId: item.userId, password: item.password };
  }

  async findById(userId: string): Promise<boolean | null> {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: { userId },
      ProjectionExpression: 'userId',
    });

    const result = await this.dynamoDocClient.send(command);

    if (result.Item) {
      return true;
    }

    return false;
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    const command = new UpdateCommand({
      TableName: this.tableName,
      Key: { userId },
      UpdateExpression: 'set refreshToken = :refreshToken',
      ExpressionAttributeValues: {
        ':refreshToken': refreshToken,
      },
    });

    await this.dynamoDocClient.send(command);
  }

  async getRefreshToken(userId: string): Promise<string | null> {
    const command = new GetCommand({
      TableName: this.tableName,
      Key: { userId },
      ProjectionExpression: 'refreshToken',
    });
    const result = await this.dynamoDocClient.send(command);

    if (result.Item) {
      return null;
    }

    return result.Item.refreshToken;
  }
}
