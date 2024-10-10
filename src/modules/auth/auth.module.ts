import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from './presentation/auth.controller';
import { AuthApplicationService } from './application/services/auth-application.service';
import { AuthRepositoryImpl } from './infrastructure/persistance/auth-repository.impl';
import { LoginUserHandler } from './application/commands/login-user.handler';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ValidateUserHandler } from './application/commands/validate-user.handler';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshTokenHandler } from './application/commands/refresh-token.handler';

export const CommandHandlers = [
  LoginUserHandler,
  ValidateUserHandler,
  RefreshTokenHandler,
];

@Module({
  imports: [CqrsModule, PassportModule],
  controllers: [AuthController],
  providers: [
    AuthApplicationService,
    {
      provide: 'AuthRepository',
      useClass: AuthRepositoryImpl,
    },
    ...CommandHandlers,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
