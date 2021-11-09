import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorator/user.decorator';
import { UserDto } from 'src/common/dto/user.dto';
import { UndefinedToNullInterceptor } from 'src/common/interceptor/undefinedToNull.interceptor';
import { JoinRequestDto } from './dto/join.request.dto';
import { UserService } from './users.service';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @ApiResponse({ status: 200, type: UserDto })
  @ApiOperation({
    summary: '내 정보 조회',
    description: '조심하십시오',
  })
  @Get()
  getUsers(@User() user) {
    // return await userService.getUserInfo(id);
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.getUserInfo(id);
  }

  @ApiOperation({
    summary: '회원가입',
  })
  @Post()
  async postUsers(@Body() data: JoinRequestDto) {
    return await this.userService.signIn(data.email, data.password);
  }

  @Patch(':id')
  async updateUserInfo(@Param('id', ParseIntPipe) id: number, @Body() data) {
    return await this.userService.updateUserInfo(id, data);
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
