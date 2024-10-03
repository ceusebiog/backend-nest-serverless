import { Module } from '@nestjs/common';
import { OrderModule } from './modules/orders/order.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [OrderModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
