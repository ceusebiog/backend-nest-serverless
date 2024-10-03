import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from './presentation/controllers/auth.controller';
import { UserController } from './presentation/controllers/user.controller';
import { CreateUserCommand } from './application/commands/create-user.command';
import { LoginUserCommand } from './application/commands/login-user.command';
import { UserRepositoryImpl } from './infrastructure/persistance/user-repository.impl';
import { UserApplicationService } from './application/services/user-application.service';
import { AuthApplicationService } from './application/services/auth-application.service';

export const CommandHandlers = [CreateUserCommand, LoginUserCommand];

@Module({
  imports: [CqrsModule],
  controllers: [AuthController, UserController],
  providers: [
    UserApplicationService,
    AuthApplicationService,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImpl,
    },
    ...CommandHandlers,
  ],
})
export class UserModule {}
