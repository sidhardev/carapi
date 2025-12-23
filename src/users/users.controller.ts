import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
@Controller('auth')
export class UsersController {
  constructor(private UsersService: UsersService) {}
  @Post('/signup')
  CreateUser(@Body() body: CreateUserDto) {
    this.UsersService.create(body.email, body.password);
  }

    @Get('/:id')
    findUser(@Param('id') id: string) {
        return this.UsersService.findOne(parseInt(id));
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.UsersService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.UsersService.remove(parseInt(id));
    }   


}
