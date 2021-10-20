import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorator/user.decorator';
import { UserDto } from 'src/common/dto/user.dto';
import { UndefinedToNullInterceptor } from 'src/common/interceptor/undefinedToNull.interceptor';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('users')
@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiResponse({ status: 200, type: UserDto })
  @ApiOperation({
    summary: '내 정보 조회',
    description: '조심하십시오',
  })
  @Get()
  getUsers(@User() user) {
    return user;
  }

  @ApiOperation({
    summary: '회원가입',
  })
  @Post()
  postUsers(@Body() data: JoinRequestDto) {
    console.log('hello post users');

    this.usersService.postUsers(data.email, data.nickname, data.password);
  }

  @ApiOperation({
    summary: '로그인',
  })
  @Post('login')
  logIn() {}

  @ApiOperation({
    summary: '로그아웃',
  })
  @Post('logout')
  logOut() {}
}
