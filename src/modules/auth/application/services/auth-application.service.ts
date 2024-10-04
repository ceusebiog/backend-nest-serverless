import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { LoginUserCommand } from '../commands/login-user.command';

@Injectable()
export class AuthApplicationService {
  constructor(private readonly commandBus: CommandBus) {}

  async loginUser(email: string, password: string): Promise<any> {
    const command = new LoginUserCommand(email, password);

    return await this.commandBus.execute(command);
  }
}
