import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ValidateUserCommand } from './validate-user.command';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from '../../domain/repositories/auth-repository.interface';

@CommandHandler(ValidateUserCommand)
export class ValidateUserHandler
  implements ICommandHandler<ValidateUserCommand>
{
  constructor(
    @Inject('AuthRepository') private readonly authRepository: AuthRepository,
  ) {}

  async execute(command: ValidateUserCommand): Promise<boolean> {
    const userValidated = await this.authRepository.findById(command.userId);

    if (!userValidated) {
      throw new UnauthorizedException();
    }

    return userValidated;
  }
}
