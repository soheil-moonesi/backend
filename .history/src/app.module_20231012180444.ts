import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [ProductsModule, AuthModule, UsersModule, OrdersModule,typeOr],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
