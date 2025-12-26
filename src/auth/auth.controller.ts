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
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
import { AuthService } from '../auth/auth.service';

@Controller('auth')
export class UsersController {
  constructor( private authService: AuthService) {}
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
return this.authService.signup(body.email, body.password);
}
  @Post('/signin')
  signinUser(@Body() body: CreateUserDto) {
    return this.authService.signin(body.email, body.password);
  }

  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.authService.findOne(parseInt(id));
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.authService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.authService.remove(parseInt(id));
  }
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.authService.update(parseInt(id), body);
  }
}
