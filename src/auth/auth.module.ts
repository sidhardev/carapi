import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { UsersController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService],
  controllers: [UsersController],
  exports: [AuthService],
})
export class AuthModule {}
