import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from './presentation/controllers/user.controller';
import { UserRepositoryImpl } from './infrastructure/persistance/user-repository.impl';
import { UserApplicationService } from './application/services/user-application.service';
import { CreateUserHandler } from './application/commands/create-user.handler';

export const CommandHandlers = [CreateUserHandler];

@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [
    UserApplicationService,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImpl,
    },
    ...CommandHandlers,
  ],
})
export class UserModule {}
