import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RefreshTokenCommand } from './refresh-token.command';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from '../../domain/repositories/auth-repository.interface';
import { JwtService } from '@nestjs/jwt';

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenHandler
  implements ICommandHandler<RefreshTokenCommand>
{
  constructor(
    @Inject('AuthRepository') private readonly authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async execute(command: RefreshTokenCommand): Promise<any> {
    try {
      const payload = this.jwtService.verify(command.refreshToken);

      const refreshToken = await this.authRepository.getRefreshToken(
        payload.userId,
      );

      if (refreshToken !== command.refreshToken) {
        throw new Error();
      }

      const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });

      return {
        access_token: accessToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
