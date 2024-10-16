import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { LoginUserCommand } from '../commands/login-user.command';
import { ValidateUserCommand } from '../commands/validate-user.command';
import { RefreshTokenCommand } from '../commands/refresh-token.command';

@Injectable()
export class AuthApplicationService {
  constructor(private readonly commandBus: CommandBus) {}

  async loginUser(email: string, password: string): Promise<any> {
    const command = new LoginUserCommand(email, password);

    return await this.commandBus.execute(command);
  }

  async refreshToken(refreshToken: string): Promise<any> {
    const command = new RefreshTokenCommand(refreshToken);

    return await this.commandBus.execute(command);
  }

  async validateUser(userId: string): Promise<any> {
    const command = new ValidateUserCommand(userId);

    return await this.commandBus.execute(command);
  }
}
