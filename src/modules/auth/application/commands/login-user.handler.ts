import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginUserCommand } from './login-user.command';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthRepository } from '../../domain/repositories/auth-repository.interface';
import { JwtService } from '@nestjs/jwt';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    @Inject('AuthRepository') private readonly authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async execute(command: LoginUserCommand): Promise<any> {
    const user = await this.authRepository.findByEmail(command.email);

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

    const payload = { sub: user.userId };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
