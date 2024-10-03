import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from './presentation/auth.controller';
import { AuthApplicationService } from './application/services/auth-application.service';
import { AuthRepositoryImpl } from './infrastructure/persistance/auth-repository.impl';
import { JwtModule } from '@nestjs/jwt';
import { LoginUserHandler } from './application/commands/login-user.handler';

export const CommandHandlers = [LoginUserHandler];

@Module({
  imports: [
    CqrsModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthApplicationService,
    {
      provide: 'AuthRepository',
      useClass: AuthRepositoryImpl,
    },
    ...CommandHandlers,
  ],
})
export class AuthModule {}
