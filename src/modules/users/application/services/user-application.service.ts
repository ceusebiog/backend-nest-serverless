import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command';

@Injectable()
export class UserApplicationService {
  constructor(private readonly commandBus: CommandBus) {}

  async createUser(
    name: string,
    email: string,
    password: string,
  ): Promise<any> {
    const command = new CreateUserCommand(name, email, password);

    this.commandBus.execute(command);
  }
}
