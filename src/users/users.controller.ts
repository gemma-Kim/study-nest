import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getUsers(@Req() req) {}

  @Post()
  postUsers(@Body() data: JoinRequestDto) {
    console.log('hello post users');

    this.usersService.postUsers(data.email, data.nickname, data.password);
  }

  @Post('login')
  logIn() {}

  @Post('logout')
  logOut() {}
}
