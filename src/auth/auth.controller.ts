import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Query,
  Patch,
  Delete,
  Session,
  UseGuards,
 } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { UpdateUserDto } from 'src/auth/dto/update-user.dto';
import { AuthService } from '../auth/auth.service';
import { ApiOkResponse, ApiProperty } from '@nestjs/swagger';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
 @Controller('user')
 export class UsersController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.authService.signup(body.email, body.password);
    return user;
  }
  @Post('/signin')
  async signinUser(@Body() body: CreateUserDto, @Session() session: any) {

    if(session.userId) {
      return {
        status: false,
        message: 'Please signout first before signing in again',
      };
    }
    else {

    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.user.id;
    return user;
    }
  }
 @Post('/signout')
  signout(@Session() session: any) {
    session.userId = null;
    return {
      status: true,
      message: 'User signed out successfully',
    };
  }

  @Post('/currentUser')
  whoAmI(@CurrentUser() user: any) {
    return user;
  }

  @Post('/allUsers')
  @UseGuards(AuthGuard)
  getAllUsers() {
    return this.authService.findAllUsers();
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
  removeUser(@Param('id') id: string, @Session() session: any){
        session.userId = null;
    return this.authService.remove(parseInt(id));
  }
  @Patch('/:id')
  @UseGuards(AuthGuard)
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.authService.update(parseInt(id), body);
  }
}
