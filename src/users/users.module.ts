import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

//1.import user entity
//2.install typeOrm for nestjs
//3. pnpm install @nestjs/typeorm typeorm sqlite3
//4. insert typeOrm in app controller and configure database --> forRoot // for feature
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
