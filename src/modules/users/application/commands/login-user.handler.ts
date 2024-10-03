import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginUserCommand } from './login-user.command';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user-repository.interface';
import * as bcrypt from 'bcrypt';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute(command: LoginUserCommand): Promise<any> {
    const user = await this.userRepository.findByEmail(command.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(
      command.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    return 'JWT';
  }
}
