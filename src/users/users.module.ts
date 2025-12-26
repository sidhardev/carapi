import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from 'src/auth/auth.controller';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';

@Module({
  controllers: [UsersController],
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, AuthService],
  exports: [UsersService],
})
export class UsersModule {}
