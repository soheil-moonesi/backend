import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'test', 
      signOptions: { expiresIn: '1m' },
       
    }),

  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
