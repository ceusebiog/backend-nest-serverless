import { Module } from '@nestjs/common';
import { OrderModule } from './modules/orders/order.module';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [OrderModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
